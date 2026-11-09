"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, LoaderCircle, Minus, Plus, Send } from "lucide-react";
import { wedding } from "@/config/wedding";
import { cn, formatLongDate, formatShortDate } from "@/lib/utils";
import { RSVP_LIMITS, validateRsvp, type RsvpErrors, type RsvpInput } from "@/lib/rsvp";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HangingVine, LotusDivider } from "@/components/ornaments/Ornaments";

type Status = "idle" | "submitting" | "success" | "error";

const initial: RsvpInput = { name: "", contact: "", attendance: "", guests: 1, events: [], message: "", website: "" };
const opts = { maxGuests: wedding.rsvp.maxGuests, eventIds: wedding.events.map((e) => e.id) };

export function RSVPSection() {
  const [form, setForm] = useState<RsvpInput>(initial);
  const [errors, setErrors] = useState<RsvpErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof RsvpErrors, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [submittedAs, setSubmittedAs] = useState<RsvpInput | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const [closed, setClosed] = useState(false);
  useEffect(() => setClosed(Date.now() > new Date(wedding.rsvp.deadline).getTime()), []);

  const update = <K extends keyof RsvpInput>(key: K, value: RsvpInput[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    // errors are recomputed live but only shown for touched fields
    setErrors(validateRsvp(next, opts));
    if (key === "message") setTouched((t) => ({ ...t, message: true }));
  };

  const blur = (key: keyof RsvpErrors) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const all = validateRsvp(form, opts);
    setErrors((e) => ({ ...e, [key]: all[key] }));
  };

  const toggleEvent = (id: string) =>
    update("events", form.events.includes(id) ? form.events.filter((e) => e !== id) : [...form.events, id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateRsvp(form, opts);
    setErrors(found);
    if (Object.keys(found).length) {
      setTouched({ name: true, contact: true, attendance: true, guests: true, events: true, message: true });
      // move focus to the first invalid field
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(),
      );
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: RsvpErrors };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }
      setSubmittedAs(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerMessage(
        err instanceof TypeError
          ? "You seem to be offline. Please check your connection and try again."
          : (err as Error).message,
      );
    }
  }

  const err = (k: keyof RsvpErrors) => (touched[k] ? errors[k] : undefined);
  const errId = (k: string) => `${uid}-${k}-error`;
  const attending = form.attendance === "accept";

  return (
    <section id="rsvp" aria-labelledby="rsvp-title" className="paper relative overflow-hidden px-6 py-24">
      <HangingVine className="w-[30vw] max-w-[160px]" />
      <HangingVine flip className="w-[30vw] max-w-[160px]" />
      <div className="relative z-10 mx-auto max-w-xl">
        <Stagger className="flex flex-col items-center text-center">
          <SectionHeading id="rsvp-title" label="Kindly Respond" title="Will You Join Us?" />
        </Stagger>
        <Reveal className="mt-4 text-center">
          <p className="text-[1rem] text-ink/85">{wedding.rsvp.intro}</p>
          <p className="mt-2 font-serif text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-gold-deep">
            Please reply by {formatLongDate(wedding.rsvp.deadline)}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10">
          <div className="relative rounded-md border border-gold/40 bg-cream/85 px-5 py-8 shadow-[0_16px_40px_-24px_rgba(74,62,32,0.45)] sm:px-9 sm:py-10">
            <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-sm border border-gold/25" />
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" && submittedAs ? (
                <Success key="success" data={submittedAs} onReset={() => { setForm(initial); setErrors({}); setTouched({}); setStatus("idle"); }} />
              ) : closed ? (
                <motion.p key="closed" className="text-center italic text-ink">
                  RSVPs have now closed. For any changes, please contact the family directly.
                </motion.p>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-6"
                  aria-describedby={status === "error" ? `${uid}-server` : undefined}
                >
                  {/* honeypot */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} />
                    </label>
                  </div>

                  <Field label="Your full name" htmlFor={`${uid}-name`} error={err("name")} errorId={errId("name")}>
                    <input
                      id={`${uid}-name`}
                      className="field"
                      type="text"
                      autoComplete="name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      maxLength={RSVP_LIMITS.nameMax}
                      placeholder="e.g. Priya Mehta"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => blur("name")}
                      aria-invalid={Boolean(err("name"))}
                      aria-describedby={err("name") ? errId("name") : undefined}
                      required
                    />
                  </Field>

                  <Field
                    label="Email or phone"
                    htmlFor={`${uid}-contact`}
                    error={err("contact")}
                    errorId={errId("contact")}
                  >
                    <input
                      id={`${uid}-contact`}
                      className="field"
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="next"
                      placeholder="you@example.com or +91 98765 43210"
                      value={form.contact}
                      onChange={(e) => update("contact", e.target.value)}
                      onBlur={() => blur("contact")}
                      aria-invalid={Boolean(err("contact"))}
                      aria-describedby={err("contact") ? errId("contact") : undefined}
                      required
                    />
                  </Field>

                  <fieldset aria-describedby={err("attendance") ? errId("attendance") : undefined}>
                    <legend className="mb-2.5 font-serif text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-olive">Will you attend?</legend>
                    <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
                      {(
                        [
                          { value: "accept", label: "Joyfully accept" },
                          { value: "decline", label: "Regretfully decline" },
                        ] as const
                      ).map((o) => {
                        const checked = form.attendance === o.value;
                        return (
                          <label
                            key={o.value}
                            className={cn(
                              "flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border px-4 transition-colors",
                              checked
                                ? "border-gold-deep bg-gold/12 text-ink"
                                : "border-gold/35 text-ink/85 hover:border-gold/50",
                              err("attendance") && !form.attendance && "border-sindoor",
                            )}
                          >
                            <input
                              type="radio"
                              name="attendance"
                              value={o.value}
                              checked={checked}
                              onChange={() => update("attendance", o.value)}
                              aria-invalid={Boolean(err("attendance"))}
                              className="peer sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={cn(
                                "grid size-5 shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60",
                                checked ? "border-gold-deep bg-gold-deep" : "border-gold/50",
                              )}
                            >
                              {checked && <span className="size-2 rounded-full bg-cream" />}
                            </span>
                            <span className="text-[1.05rem]">{o.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    <ErrorText id={errId("attendance")} message={err("attendance")} />
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {attending && (
                      <motion.div
                        key="attending"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="-mx-1 overflow-hidden px-1"
                      >
                        <div className="flex flex-col gap-6 pt-1">
                          <div>
                            <p id={`${uid}-guests-label`} className="mb-2.5 font-serif text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-olive">
                              Number of guests (including you)
                            </p>
                            <div className="flex items-center gap-3" role="group" aria-labelledby={`${uid}-guests-label`}>
                              <button
                                type="button"
                                onClick={() => update("guests", Math.max(1, form.guests - 1))}
                                disabled={form.guests <= 1}
                                aria-label="Fewer guests"
                                className="grid size-12 place-items-center rounded-full border border-gold/50 text-ink transition-colors enabled:hover:bg-gold/10 disabled:opacity-35"
                              >
                                <Minus className="size-4" />
                              </button>
                              <output
                                aria-live="polite"
                                className="w-14 text-center font-display text-3xl tabular-nums text-ink"
                              >
                                {form.guests}
                              </output>
                              <button
                                type="button"
                                onClick={() => update("guests", Math.min(wedding.rsvp.maxGuests, form.guests + 1))}
                                disabled={form.guests >= wedding.rsvp.maxGuests}
                                aria-label="More guests"
                                className="grid size-12 place-items-center rounded-full border border-gold/50 text-ink transition-colors enabled:hover:bg-gold/10 disabled:opacity-35"
                              >
                                <Plus className="size-4" />
                              </button>
                              <span className="text-sm italic text-olive/70">max {wedding.rsvp.maxGuests}</span>
                            </div>
                            <ErrorText id={errId("guests")} message={err("guests")} />
                          </div>

                          <fieldset aria-describedby={err("events") ? errId("events") : undefined}>
                            <legend className="mb-2.5 font-serif text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-olive">
                              Celebrations you’ll attend
                            </legend>
                            <div className="flex flex-wrap gap-2">
                              {wedding.events.map((ev) => {
                                const on = form.events.includes(ev.id);
                                return (
                                  <label
                                    key={ev.id}
                                    className={cn(
                                      "relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.98rem] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/60",
                                      on ? "border-gold-deep bg-gold/15 text-ink" : "border-gold/35 text-ink/80 hover:border-gold/50",
                                    )}
                                  >
                                    <input
                                      type="checkbox"
                                      className="sr-only"
                                      checked={on}
                                      onChange={() => toggleEvent(ev.id)}
                                      aria-invalid={Boolean(err("events"))}
                                    />
                                    {on && <Check aria-hidden="true" className="size-3.5 text-olive" />}
                                    {ev.name}
                                    <span className="text-xs text-olive/70">· {formatShortDate(ev.start)}</span>
                                  </label>
                                );
                              })}
                            </div>
                            <button
                              type="button"
                              onClick={() => update("events", form.events.length === opts.eventIds.length ? [] : [...opts.eventIds])}
                              className="mt-2 min-h-11 font-serif text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-deep underline-offset-4 hover:underline"
                            >
                              {form.events.length === opts.eventIds.length ? "Clear all" : "Select all"}
                            </button>
                            <ErrorText id={errId("events")} message={err("events")} />
                          </fieldset>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Field
                    label="Wishes for the couple (optional)"
                    htmlFor={`${uid}-message`}
                    error={err("message")}
                    errorId={errId("message")}
                    hint={`${form.message.length}/${RSVP_LIMITS.messageMax}`}
                  >
                    <textarea
                      id={`${uid}-message`}
                      className="field min-h-[120px] resize-y"
                      rows={4}
                      maxLength={RSVP_LIMITS.messageMax + 20}
                      placeholder="Share a blessing, a memory or a song request…"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      aria-invalid={Boolean(err("message"))}
                      aria-describedby={err("message") ? errId("message") : undefined}
                    />
                  </Field>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        id={`${uid}-server`}
                        role="alert"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-sindoor/30 bg-sindoor/5 px-4 py-3 text-[0.98rem] text-sindoor"
                      >
                        {serverMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button type="submit" className="btn-ink mt-1 w-full disabled:cursor-wait disabled:opacity-80" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send aria-hidden="true" className="size-4" strokeWidth={1.6} />
                        Send RSVP
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="font-serif text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-olive">
          {label}
        </label>
        {hint && <span className="text-xs tabular-nums text-olive/70">{hint}</span>}
      </div>
      {children}
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden pt-2 text-[0.95rem] text-sindoor"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Success({ data, onReset }: { data: RsvpInput; onReset: () => void }) {
  const accepted = data.attendance === "accept";
  const first = data.name.trim().split(/\s+/)[0];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center py-4 text-center"
      role="status"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }}
        className="grid size-16 place-items-center rounded-full border border-gold/60 bg-gold/10"
      >
        <Heart className="size-7 fill-gold/30 text-olive" strokeWidth={1.3} />
      </motion.span>
      <p className="mt-6 font-script text-[clamp(2.4rem,10vw,3rem)] leading-tight text-ink">Thank you, {first}</p>
      <LotusDivider className="mt-3" />
      <p className="mt-5 max-w-sm text-pretty text-ink">
        {accepted
          ? `We’re overjoyed you’ll be celebrating with us${data.guests > 1 ? ` — all ${data.guests} of you` : ""}. A confirmation will follow closer to the day.`
          : "We will miss you dearly, and we are so grateful for your love and blessings."}
      </p>
      <button type="button" onClick={onReset} className="btn-outline mt-8">
        Submit another response
      </button>
    </motion.div>
  );
}
