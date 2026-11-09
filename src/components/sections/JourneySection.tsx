import { wedding } from "@/config/wedding";
import { KolamBand, LotusDivider } from "@/components/ornaments/Ornaments";
import { Item, Reveal, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Our Wedding Journey" — the Telugu rituals, as listed on the printed card. */
export function JourneySection() {
  const j = wedding.journey;
  return (
    <section id="journey" aria-labelledby="journey-title" className="paper relative overflow-hidden px-6 py-24">
      <KolamBand className="absolute inset-x-0 top-3 opacity-60" />
      <KolamBand className="absolute inset-x-0 bottom-3 opacity-60" />

      <Stagger className="relative z-10 mx-auto flex max-w-[520px] flex-col items-center text-center">
        <SectionHeading id="journey-title" label="Our Wedding Journey" title="Sacred Traditions" />
        <Item>
          <p className="mt-3 font-serif text-[1rem] italic text-olive">{j.subtitle}</p>
        </Item>
      </Stagger>

      <div className="relative z-10 mx-auto mt-12 grid max-w-[1040px] gap-12 md:grid-cols-2 md:gap-x-16">
        {j.groups.map((g, gi) => (
          <Reveal key={g.title} className={gi === 0 ? "md:row-span-2" : ""}>
            <h3 className="text-center font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-ink md:text-left">{g.title}</h3>
            <LotusDivider className="mb-5 mt-2 md:justify-start" />
            <ul className="flex flex-col gap-4">
              {g.rituals.map((r) => (
                <li key={r.name} className="grid grid-cols-[auto_1fr] gap-x-3">
                  <span aria-hidden="true" className="mt-[0.3rem] text-[0.7rem] leading-none text-gold-deep">
                    ❁
                  </span>
                  <div>
                    <p className="font-display text-[0.86rem] font-semibold tracking-[0.04em] text-olive">{r.name}</p>
                    <p className="mt-0.5 text-[0.98rem] leading-snug text-ink/85">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
