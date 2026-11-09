import { wedding } from "@/config/wedding";
import { DotDivider, HangingVine, LeafClump } from "@/components/ornaments/Ornaments";
import { Item, Reveal, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Saptapadi — the seven sacred vows, from the inner panel of the card. */
export function SaptapadiSection() {
  const s = wedding.saptapadi;
  return (
    <section id="saptapadi" aria-labelledby="saptapadi-title" className="paper-vignette relative overflow-hidden px-6 pb-48 pt-24">
      <HangingVine className="w-[30vw] max-w-[160px]" />
      <HangingVine flip className="w-[30vw] max-w-[160px]" />
      <LeafClump />
      <LeafClump flip />

      <Stagger className="relative z-10 mx-auto flex max-w-[460px] flex-col items-center text-center">
        <SectionHeading id="saptapadi-title" label="The Seven Sacred Vows" title="Saptapadi" />
        <Item>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink/85">{s.intro}</p>
        </Item>
      </Stagger>

      <ol className="relative z-10 mx-auto mt-10 flex max-w-[460px] flex-col gap-5">
        {s.vows.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.04} y={16} className="flex items-start gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/60 bg-cream font-display text-[0.9rem] text-gold-deep shadow-[0_2px_8px_rgba(176,144,96,0.18)]">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-display text-[0.9rem] font-semibold tracking-[0.03em] text-ink">{v.title}</p>
              <p className="mt-0.5 text-[0.98rem] leading-snug text-ink/80">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="relative z-10 mx-auto mt-10 flex max-w-[420px] flex-col items-center text-center">
        <DotDivider />
        <p className="mt-4 font-serif text-[1.02rem] italic leading-relaxed text-olive">{s.closing}</p>
      </Reveal>
    </section>
  );
}
