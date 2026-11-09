import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/utils";
import { KolamBand, LotusDivider, MangoToran } from "@/components/ornaments/Ornaments";
import { Item, Stagger } from "@/components/ui/Reveal";

export function FooterSection() {
  const { groom, bride } = wedding.couple;
  return (
    <footer className="paper relative overflow-hidden pb-[max(3rem,env(safe-area-inset-bottom))] text-center">
      <MangoToran className="pointer-events-none mx-auto w-full max-w-[900px]" />
      <Stagger className="relative z-10 mx-auto flex max-w-[440px] flex-col items-center px-6 pb-12 pt-10">
        <Item>
          <p className="text-[1.02rem] italic text-olive">{wedding.closing.message}</p>
        </Item>
        <Item className="my-5">
          <LotusDivider />
        </Item>
        <Item>
          <p className="font-script text-[clamp(2.2rem,1.6rem+3vw,3.2rem)] leading-tight text-ink">
            {groom.short} &amp; {bride.short}
          </p>
        </Item>
        <Item>
          <p className="mt-2 font-display text-[0.8rem] uppercase tracking-[0.22em] text-olive">{formatLongDate(wedding.weddingDate)}</p>
        </Item>
        <Item className="mt-10">
          <p className="font-serif text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">With best compliments from</p>
          <p className="mt-1 font-display text-[1.05rem] tracking-[0.08em] text-ink">{wedding.closing.complimentsFrom}</p>
        </Item>
      </Stagger>
      <KolamBand className="opacity-60" />
    </footer>
  );
}
