import { wedding } from "@/config/wedding";
import { HangingVine, Kolam, LotusDivider } from "@/components/ornaments/Ornaments";
import { Item, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** The formal invitation lines from the printed card. */
export function CoupleSection() {
  const { groom, bride } = wedding.couple;
  return (
    <section aria-labelledby="couple-title" className="paper-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <HangingVine className="w-[30vw] max-w-[160px]" />
      <HangingVine flip className="w-[30vw] max-w-[160px]" />
      <Kolam size={4} className="pointer-events-none absolute -bottom-16 -left-16 w-48 opacity-50" />
      <Kolam size={4} className="pointer-events-none absolute -bottom-16 -right-16 w-48 opacity-50" />

      <Stagger className="relative z-10 flex w-full max-w-[460px] flex-col items-center">
        <SectionHeading id="couple-title" label="Wedding Invitation" title="The Blessed Union" />

        <Item className="mt-9">
          <p className="font-display text-[clamp(1.15rem,0.95rem+1.2vw,1.6rem)] leading-tight tracking-[0.04em] text-ink">{groom.formal}</p>
          <p className="mt-1 font-serif text-[1rem] italic text-olive">({groom.nickname})</p>
        </Item>
        <Item className="my-4 flex items-center gap-3 text-gold-deep" aria-hidden="true">
          <span className="h-[0.75px] w-10 bg-current opacity-60" />
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3.2 5 6.6 5c2.1 0 3.5 1.1 5.4 3.2C13.9 6.1 15.3 5 17.4 5c3.4 0 5.7 3.4 4.2 6.8C19.5 16.4 12 21 12 21Z" />
          </svg>
          <span className="h-[0.75px] w-10 bg-current opacity-60" />
        </Item>
        <Item>
          <p className="font-display text-[clamp(1.15rem,0.95rem+1.2vw,1.6rem)] leading-tight tracking-[0.04em] text-ink">{bride.formal}</p>
          <p className="mt-1 font-serif text-[1rem] italic text-olive">({bride.nickname})</p>
          <p className="mt-2 font-serif text-[0.95rem] font-semibold text-ink/85">{bride.parentsLine}</p>
        </Item>

        <Item className="mt-12 w-full rounded-sm border border-gold/35 bg-cream/70 px-5 py-6 shadow-[0_8px_24px_-14px_rgba(74,62,32,0.35)]">
          <p className="font-serif text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">In Loving Memory</p>
          <p className="mt-1 font-script text-[1.5rem] leading-tight text-ink">{wedding.inMemory.title}</p>
          <div className="mt-2 flex flex-col items-center font-serif text-[1rem] font-semibold text-olive">
            <span>{wedding.inMemory.names[0]}</span>
            <span className="font-script text-[1.2rem] leading-tight text-ink">&amp;</span>
            <span>{wedding.inMemory.names[1]}</span>
          </div>
          <LotusDivider className="mt-3" />
        </Item>
      </Stagger>
    </section>
  );
}
