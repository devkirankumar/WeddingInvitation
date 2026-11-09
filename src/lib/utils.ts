import { wedding } from "@/config/wedding";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const { locale, timeZone } = wedding.site;

function fmt(iso: string, options: Intl.DateTimeFormatOptions) {
  // Fixed locale + time zone keeps server and client output identical (no hydration drift).
  return new Intl.DateTimeFormat(locale, { timeZone, ...options }).format(new Date(iso));
}

/** "Thursday, 3 December 2026" */
export const formatLongDate = (iso: string) =>
  fmt(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** "Thu, 3 Dec 2026" */
export const formatShortDate = (iso: string) =>
  fmt(iso, { weekday: "short", day: "numeric", month: "short", year: "numeric" });

/** Parts for the hero's "DEC | 03 | 2026" layout. */
export function dateParts(iso: string) {
  return {
    weekday: fmt(iso, { weekday: "long" }),
    day: fmt(iso, { day: "2-digit" }),
    month: fmt(iso, { month: "short" }).replace(".", "").toUpperCase(),
    year: fmt(iso, { year: "numeric" }),
  };
}

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
