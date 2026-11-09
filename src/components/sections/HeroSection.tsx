import { wedding } from "@/config/wedding";
import { dateParts } from "@/lib/utils";
import { DotDivider, LeafClump, LotusDrop, MarigoldGarland, PinIcon } from "@/components/ornaments/Ornaments";
import { FallingPetals } from "@/components/ui/FallingPetals";
import { Item, Stagger } from "@/components/ui/Reveal";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

function Name({ text }: { text: string }) {
  // Shrinks long names so they never wrap or clip (same rule as the reference).
  const scale = Math.min(1, 9 / Math.max(1, text.length));
  return (
    <span
      className="relative block px-4 font-display uppercase leading-none tracking-[0.06em] text-ink"
      style={{ fontSize: `calc(clamp(2.4rem, 1.6rem + 4.5vw, 4rem) * ${scale})` }}
    >
      <span className="relative z-[1]">{text}</span>
      <span aria-hidden="true" className="name-sheen">
        {text}
      </span>
    </span>
  );
}

export function HeroSection() {
  const { groom, bride } = wedding.couple;
  const d = dateParts(wedding.weddingDate);
  const art = wedding.art.hero;
  const painted = hasArt(art);

  return (
    <section
      id="hero"
      aria-label="Save the date"
      className={`paper relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6 pb-16 text-center ${
        painted ? "justify-start pt-[34svh] sm:pt-[36svh] lg:pt-[40vh]" : "justify-center pt-14"
      }`}
    >
      {painted ? (
        <SectionArt art={art} position="center top" eager />
      ) : (
        <>
          {/* Marigold garlands framing the card */}
          <MarigoldGarland count={9} className="pointer-events-none absolute left-[3%] top-0 h-[64svh] sm:left-[6%]" />
          <MarigoldGarland count={6} className="pointer-events-none absolute left-[10%] top-0 hidden h-[42svh] sm:block" style={{ ["--sway" as string]: "7s" }} />
          <MarigoldGarland count={9} className="pointer-events-none absolute right-[3%] top-0 h-[64svh] sm:right-[6%]" style={{ ["--sway" as string]: "6.5s" }} />
          <MarigoldGarland count={6} className="pointer-events-none absolute right-[10%] top-0 hidden h-[42svh] sm:block" style={{ ["--sway" as string]: "7.5s" }} />
          <LeafClump />
          <LeafClump flip />
        </>
      )}
      <FallingPetals />

      <Stagger className="relative z-20 flex w-full max-w-[min(100%,520px)] flex-col items-center">
        <Item className={painted ? "hidden" : undefined}>
          <p className="mb-6 max-w-[15rem] text-balance font-serif text-[clamp(0.68rem,0.6rem+0.4vw,0.85rem)] font-semibold leading-relaxed tracking-[0.16em] text-olive sm:max-w-none">
            || {wedding.blessing} ||
          </p>
        </Item>
        <Item className="mb-1.5">
          <LotusDrop size={24} />
        </Item>
        <Item>
          <p className="mb-1.5 font-script text-[clamp(1.35rem,1.1rem+1.4vw,1.9rem)] leading-none text-ink opacity-90">Save the Date</p>
        </Item>
        <Item className="w-full">
          <h1 className="flex flex-col items-center">
            <Name text={groom.short} />
            <span className="my-[-2px] font-script text-[clamp(1.5rem,1.1rem+2vw,2.4rem)] lowercase leading-none text-ink">and</span>
            <Name text={bride.short} />
          </h1>
        </Item>
        <Item>
          <p className="mb-1.5 mt-2 font-serif text-[clamp(0.6rem,0.55rem+0.3vw,0.75rem)] uppercase tracking-[0.3em] text-olive opacity-85">
            Are Getting Married
          </p>
        </Item>
        <Item className="mb-2">
          <DotDivider width={110} />
        </Item>
        <Item>
          <p className="mb-2 flex items-center justify-center gap-2.5 font-display leading-none text-ink">
            <span className="text-[clamp(1.15rem,1rem+1vw,1.6rem)] tracking-[0.06em]">{d.month}</span>
            <span aria-hidden="true" className="font-serif text-[1.1rem] text-olive opacity-60">|</span>
            <span className="text-[clamp(2rem,1.6rem+2.4vw,3rem)] tracking-[0.04em]">{d.day}</span>
            <span aria-hidden="true" className="font-serif text-[1.1rem] text-olive opacity-60">|</span>
            <span className="text-[clamp(1.15rem,1rem+1vw,1.6rem)] tracking-[0.04em]">{d.year}</span>
          </p>
        </Item>
        <Item>
          <p className="font-display text-[clamp(0.9rem,0.8rem+0.6vw,1.15rem)] uppercase tracking-[0.14em] text-ink">{d.weekday}</p>
        </Item>
        <Item>
          <p className="mb-2.5 mt-0.5 font-display text-[clamp(0.8rem,0.75rem+0.4vw,1rem)] tracking-[0.08em] text-ink">{wedding.hero.timeLabel}</p>
        </Item>
        <Item className="mb-1">
          <PinIcon size={14} />
        </Item>
        <Item className="flex flex-col items-center">
          <p className="font-serif text-[clamp(0.8rem,0.75rem+0.4vw,0.95rem)] font-semibold uppercase leading-[1.45] tracking-[0.14em] text-ink">
            {wedding.venue.name}
          </p>
          {wedding.venue.lines.map((l) => (
            <p key={l} className="max-w-[18rem] font-serif text-[clamp(0.72rem,0.68rem+0.3vw,0.85rem)] font-semibold uppercase leading-[1.45] tracking-[0.12em] text-ink/85">
              {l}
            </p>
          ))}
        </Item>
      </Stagger>

      <a
        href="#moments"
        aria-label="Scroll down"
        className="absolute bottom-[max(14px,env(safe-area-inset-bottom))] left-1/2 z-20 flex min-h-11 min-w-11 -translate-x-1/2 items-end justify-center"
      >
        <span className="bob flex flex-col items-center gap-1">
          <span className="font-serif text-[8px] font-semibold uppercase tracking-[0.28em] text-ink/55">Scroll</span>
          <svg viewBox="0 0 18 11" width="13" height="8" fill="none" stroke="#4A3E20" strokeWidth="1.5" strokeLinecap="round" className="opacity-50" aria-hidden="true">
            <path d="M1 1.5 9 9.5l8-8" />
          </svg>
        </span>
      </a>
    </section>
  );
}
