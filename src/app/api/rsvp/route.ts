import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { wedding } from "@/config/wedding";
import { validateRsvp, type RsvpInput } from "@/lib/rsvp";

export const runtime = "nodejs";

const DATA_FILE = path.join(process.cwd(), "data", "rsvps.json");
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

/**
 * Persists RSVPs to data/rsvps.json. On read-only/serverless hosts this write
 * fails gracefully — swap this for a database, sheet or email provider in production.
 */
async function persist(entry: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    let list: unknown[] = [];
    try {
      list = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    list.push(entry);
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
  } catch (error) {
    console.warn("[rsvp] could not write to disk; logging instead", error);
    console.info("[rsvp]", JSON.stringify(entry));
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Please wait a minute and try again." }, { status: 429 });
  }

  let body: Partial<RsvpInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We could not read your response." }, { status: 400 });
  }

  const input: RsvpInput = {
    name: String(body.name ?? ""),
    contact: String(body.contact ?? ""),
    attendance: body.attendance === "accept" || body.attendance === "decline" ? body.attendance : "",
    guests: Number(body.guests ?? 0),
    events: Array.isArray(body.events) ? body.events.map(String) : [],
    message: String(body.message ?? ""),
    website: String(body.website ?? ""),
  };

  // Silently accept bot submissions without storing them.
  if (input.website) return NextResponse.json({ ok: true }, { status: 201 });

  if (Date.now() > new Date(wedding.rsvp.deadline).getTime()) {
    return NextResponse.json({ ok: false, message: "RSVPs have closed. Please contact the family directly." }, { status: 410 });
  }

  const errors = validateRsvp(input, {
    maxGuests: wedding.rsvp.maxGuests,
    eventIds: wedding.events.map((e) => e.id),
  });
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  await persist({
    name: input.name.trim(),
    contact: input.contact.trim(),
    attendance: input.attendance,
    guests: input.attendance === "accept" ? input.guests : 0,
    events: input.attendance === "accept" ? input.events : [],
    message: input.message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
