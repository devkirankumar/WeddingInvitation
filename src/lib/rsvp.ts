export type Attendance = "accept" | "decline";

export interface RsvpInput {
  name: string;
  contact: string;
  attendance: Attendance | "";
  guests: number;
  events: string[];
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
}

export type RsvpErrors = Partial<Record<"name" | "contact" | "attendance" | "guests" | "events" | "message", string>>;

export const RSVP_LIMITS = {
  nameMax: 80,
  messageMax: 500,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;

/** Shared by the form (instant feedback) and the API route (authoritative check). */
export function validateRsvp(
  input: RsvpInput,
  opts: { maxGuests: number; eventIds: string[] },
): RsvpErrors {
  const errors: RsvpErrors = {};
  const name = input.name.trim();

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length < 2) errors.name = "Your name looks a little short.";
  else if (name.length > RSVP_LIMITS.nameMax) errors.name = `Please keep your name under ${RSVP_LIMITS.nameMax} characters.`;

  const contact = input.contact.trim();
  if (!contact) errors.contact = "Add an email or phone number so we can reach you.";
  else if (!EMAIL_RE.test(contact) && !PHONE_RE.test(contact))
    errors.contact = "Please enter a valid email address or phone number.";

  if (input.attendance !== "accept" && input.attendance !== "decline")
    errors.attendance = "Please let us know whether you can attend.";

  if (input.attendance === "accept") {
    if (!Number.isInteger(input.guests) || input.guests < 1 || input.guests > opts.maxGuests)
      errors.guests = `Please choose between 1 and ${opts.maxGuests} guests.`;
    if (!input.events.length) errors.events = "Select at least one celebration you will attend.";
    else if (input.events.some((id) => !opts.eventIds.includes(id))) errors.events = "Please choose from the listed celebrations.";
  }

  if (input.message.length > RSVP_LIMITS.messageMax)
    errors.message = `Please keep your note under ${RSVP_LIMITS.messageMax} characters.`;

  return errors;
}
