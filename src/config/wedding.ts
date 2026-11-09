import type { WeddingConfig } from "@/types/wedding";

/**
 * All invitation content lives here. Every detail below is taken from the
 * printed Karra family wedding card. Components read from this file only.
 */
export const wedding: WeddingConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    title: "Kiran & Tejaswi — Wedding Invitation",
    description:
      "The Karra family invites you to the wedding of Chi. K. Kiran Kumar and Chi. La. Sou. B. Tejaswi on Thursday, 3 December 2026 at Royal Garden Hall, Cuttack.",
    locale: "en-IN",
    timeZone: "Asia/Kolkata",
  },

  /**
   * Painted watercolour backgrounds, one portrait (~800×1420) and one landscape (~1920×1080) per section.
   * Put your licensed or commissioned artwork in public/images/art/ and fill in the paths, e.g.
   *   hero: { mobile: "/images/art/hero-mobile.webp", desktop: "/images/art/hero-desktop.webp" },
   * Empty slots fall back to the built-in SVG garlands, leaves and kolam.
   */
  art: {
    cover: { mobile: "", desktop: "" },
    hero: { mobile: "/images/hero-mobile.webp", desktop: "/images/hero-desktop.webp" },
    moments: { mobile: "/images/photo-bg-mobile.webp", desktop: "/images/photo-bg-desktop.webp" },
    welcome: { mobile: "/images/welcome-mobile.webp", desktop: "/images/welcome-desktop.webp" },
    venue: { mobile: "/images/venue-mobile.webp", desktop: "/images/venue-desktop.webp" },
    schedule: { mobile: "/images/photo-bg-mobile.webp", desktop: "/images/photo-bg-desktop.webp" },
    countdown: { mobile: "/images/countdown-mobile.webp", desktop: "/images/countdown-desktop.webp" },
  },
  showCardExtras: true,

  blessing: "Srirasthu · Shubhamasthu · Avighnamasthu",

  couple: {
    groom: { short: "Kiran", formal: "Chi. K. Kiran Kumar", nickname: "Sonu" },
    bride: {
      short: "Tejaswi",
      formal: "Chi. La. Sou. B. Tejaswi",
      nickname: "Teju",
      parentsLine: "Daughter of Smt. Basina Laxmi & Sri Basavaraju",
    },
    monogram: "K & T",
  },

  weddingDate: "2026-12-03T04:42:00+05:30",
  hero: { timeLabel: "Sumuhurtham · 4:42 A.M." },

  welcome: {
    headingLine1: "Dear Friends",
    headingLine2: "& Family,",
    message:
      "With great joy, we invite you and your family to join us as we celebrate the wedding of our beloved younger son.",
    hostedBy: ["Sri Karra Nageswar Rao", "Smt. Karra Jyoti"],
  },

  inMemory: {
    title: "Our Beloved Grandparents",
    names: ["Late Smt. Karra Damayanti", "Late Sri Karra Nilakantha Rao"],
  },

  events: [
    {
      id: "tilak",
      name: "Tilak Dharanam",
      start: "2026-11-30T15:30:00+05:30",
      timeLabel: "3:30 P.M. onwards",
      description: "The groom is blessed with the sacred tilak as the celebrations begin.",
      icon: "tilak",
    },
    {
      id: "reception",
      name: "Reception",
      start: "2026-12-02T19:30:00+05:30",
      timeLabel: "7:30 P.M. onwards",
      description: "An evening to celebrate with our family, relatives and friends.",
      icon: "reception",
    },
    {
      id: "wedding",
      name: "Wedding Ceremony",
      start: "2026-12-03T04:42:00+05:30",
      timeLabel: "Sumuhurtham at 4:42 A.M.",
      description: "The most auspicious moment, when the sacred wedding rites take place.",
      icon: "wedding",
    },
  ],

  venue: {
    name: "Royal Garden Hall",
    lines: ["Mohammadia Bazar, Near Prajatantra Press", "Cuttack, Odisha - 753002"],
    mapsQuery: "Royal Garden Hall, Mohammadia Bazar, Near Prajatantra Press, Cuttack, Odisha 753002",
  },

  journey: {
    subtitle: "Celebrating the timeless traditions of a Telugu wedding",
    groups: [
      {
        title: "Pre-Wedding Celebrations",
        rituals: [
          { name: "Pasupu Muhurtham", text: "A prayer to seek God’s blessings for a happy beginning." },
          { name: "Pandiri Raata", text: "A traditional ceremony that marks the beginning of the wedding celebrations." },
          { name: "Pelli Koduku", text: "A special ceremony where the groom is blessed before the wedding." },
          { name: "Pradhanu", text: "A joyful exchange of gifts and blessings between the two families." },
          { name: "Engagement", text: "The beautiful moment when two families officially come together." },
          { name: "Mehendi", text: "A joyful celebration where the bride’s hands are adorned with beautiful henna designs." },
          { name: "Haldi", text: "A traditional turmeric ceremony held to bless the bride and groom." },
          { name: "Kalugoru Sambhralu", text: "A cherished family celebration filled with love, laughter and togetherness." },
          { name: "Reception", text: "An evening to celebrate with our family, relatives and friends." },
        ],
      },
      {
        title: "Sacred Wedding Ceremony",
        rituals: [
          { name: "Sumuhurtham", text: "The most auspicious moment when the wedding ceremony takes place." },
          { name: "Bhashikam", text: "A sacred ritual performed to seek God’s protection and blessings." },
          { name: "Addu Tera", text: "A traditional screen placed between the bride and groom before they first see each other." },
          { name: "Kanyadanam", text: "A heartfelt moment when the bride’s parents lovingly entrust their daughter to the groom." },
          { name: "Jeelakarra Bellam", text: "A beautiful ritual symbolising the couple’s unity and lifelong togetherness." },
          { name: "Mangala Sutra Dharana", text: "The sacred moment when the groom ties the Mangala Sutra around the bride’s neck." },
          { name: "Talambralu", text: "The bride and groom shower each other with sacred rice as a blessing for a happy married life." },
          { name: "Arundhati Nakshatra Darshanam", text: "The couple seek blessings by looking at the Arundhati star, a symbol of an ideal married life." },
        ],
      },
      {
        title: "Post-Wedding Ceremony",
        rituals: [
          { name: "Sri Satyanarayana Vratham", text: "A special prayer offering gratitude, seeking peace, happiness and God’s blessings for the couple and their family." },
        ],
      },
    ],
  },

  saptapadi: {
    intro:
      "These seven sacred vows reflect the values of love, trust, respect and togetherness that have inspired happy marriages for generations.",
    vows: [
      { title: "To Care for Each Other", text: "To support and care for one another through every stage of life." },
      { title: "To Stand by Each Other", text: "To face every joy and every challenge together." },
      { title: "To Build a Happy Home", text: "To build a life filled with love, understanding and shared responsibility." },
      { title: "To Cherish Our Family", text: "To honour, respect and care for our family always." },
      { title: "To Walk with Kindness", text: "To treat each other with patience, understanding and compassion." },
      { title: "To Be Faithful Companions", text: "To remain true friends and lifelong companions." },
      { title: "To Share a Lifetime of Love", text: "To walk hand in hand, sharing love, trust and happiness forever." },
    ],
    closing: "May these timeless vows fill the couple’s journey with love, happiness, peace and countless blessings.",
  },

  moments: {
    enabled: true,
    items: [
      {
        image: { src: "/images/sample-photo-3.webp", alt: "Kiran & Tejaswi", width: 800, height: 1000 },
        quote: "Two hearts, one soul, a lifetime of beautiful moments.",
      },
      {
        image: { src: "/images/sample-photo-2.webp", alt: "Tejaswi", width: 800, height: 1000 },
        quote: "Every love story is beautiful, but ours is my favourite.",
      },
      {
        image: { src: "/images/sample-photo-1.webp", alt: "Kiran", width: 800, height: 1000 },
        quote: "In your arms, I have found my forever home.",
      },
    ],
  },

  rsvp: {
    enabled: true,
    deadline: "2026-11-27T23:59:00+05:30",
    maxGuests: 6,
    intro: "Your presence is the greatest blessing. Kindly let us know if you can join us.",
  },

  closing: {
    message: "Your presence and blessings will make our celebration complete.",
    complimentsFrom: "The Karra Family",
  },

  music: { src: "/images/Traditional.mp3", title: "traditional" },
};
