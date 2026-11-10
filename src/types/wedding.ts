export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface WeddingEvent {
  id: string;
  name: string;
  /** ISO 8601 with offset, e.g. 2026-12-03T04:42:00+05:30 */
  start: string;
  /** Overrides the formatted start time, e.g. "Sumuhurtham at 4:42 A.M." */
  timeLabel?: string;
  description: string;
  icon: "tilak" | "haldi" | "reception" | "wedding";
}

export interface Ritual {
  name: string;
  text: string;
}

export interface Vow {
  title: string;
  text: string;
}

export interface Moment {
  image: ImageAsset;
  quote: string;
}

/** Painted background for a section. Paths are under /public; leave empty to use the built-in SVG art. */
export interface ArtSlot {
  mobile: string;
  desktop: string;
}

export interface WeddingConfig {
  art: Partial<Record<"cover" | "hero" | "moments" | "welcome" | "venue" | "schedule" | "countdown", ArtSlot>>;
  /** Extra panels from the printed card (couple, rituals, Saptapadi) that the template itself does not have. */
  showCardExtras: boolean;
  site: {
    url: string;
    title: string;
    description: string;
    locale: string;
    timeZone: string;
  };
  /** Opening blessing line printed at the top of the card. */
  blessing: string;
  couple: {
    groom: { short: string; formal: string; nickname: string };
    bride: { short: string; formal: string; nickname: string; parentsLine: string };
    monogram: string;
  };
  /** Main muhurtham — drives the hero date and the countdown. */
  weddingDate: string;
  hero: { timeLabel: string };
  welcome: {
    headingLine1: string;
    headingLine2: string;
    message: string;
    hostedBy: string[];
  };
  inMemory: { title: string; names: string[] };
  events: WeddingEvent[];
  venue: {
    name: string;
    lines: string[];
    mapsQuery: string;
  };
  journey: {
    subtitle: string;
    groups: { title: string; rituals: Ritual[] }[];
  };
  saptapadi: { intro: string; vows: Vow[]; closing: string };
  /** Set `enabled: false` to hide the photo cards until the couple's own photos are ready. */
  moments: { enabled: boolean; items: Moment[] };
  rsvp: { enabled: boolean; deadline: string; maxGuests: number; intro: string };
  closing: { message: string; complimentsFrom: string };
  music: {
    /** Optional path to an audio file in /public. When empty, a soft generated melody plays instead. */
    src?: string;
    title: string;
  };
}
