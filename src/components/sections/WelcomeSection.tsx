import { wedding } from "@/config/wedding";
import { BananaLeaf, BrassLamp, HangingVine, LotusDivider, MarigoldGarland } from "@/components/ornaments/Ornaments";
import { Item, Stagger } from "@/components/ui/Reveal";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

/** "Welcome — Dear Friends & Family," with the hosts, set beside a temple lamp. */
export function WelcomeSection() {
  const w = wedding.welcome;
  const art = wedding.art.welcome;
  const painted = hasArt(art);
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="paper relative flex min-h-[100svh] items-center overflow-hidden">
      {painted ? (
        <SectionArt art={art} />
      ) : (
        <>
          <HangingVine className="w-[34vw] max-w-[180px]" />
          {/* Right-hand shrine: jasmine-and-marigold strands, banana leaves, brass lamp */ }
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[30%] max-w-[260px]">
            <MarigoldGarland count={5} className="absolute right-[24%] top-0 hidden h-[34svh] sm:block" style={{ ["--sway" as string]: "7s" }} />
            <MarigoldGarland count={7} className="absolute right-[4%] top-0 h-[46svh]" />
            <BananaLeaf className="absolute bottom-[4%] right-[-30%] h-[48svh] origin-bottom -rotate-[18deg] opacity-95" />
            <BananaLeaf className="absolute bottom-[4%] right-[-8%] h-[36svh] origin-bottom rotate-[12deg]" />
            <BrassLamp className="absolute bottom-[3%] right-[8%] h-[32svh] drop-shadow-[0_8px_10px_rgba(74,62,32,0.25)]" />
          </div>
          <BananaLeaf className="pointer-events-none absolute -bottom-[6%] -left-[10%] h-[30svh] origin-bottom rotate-[52deg] opacity-90" />
        </>
      )
}

  <Stagger
    className={`relative z-10 flex flex-col items-start py-[12svh] text-left ${painted
        ? "ml-[6%] w-[58%] max-w-[360px] sm:ml-[8%] sm:w-[54%] md:mx-auto md:w-[min(60%,640px)] md:items-center md:text-center"
        : "ml-[6%] w-[66%] max-w-[440px] md:mx-auto md:w-[min(60%,640px)] md:items-center md:text-center"
      }`}
  >
    <Item>
      <p className="script-label mb-1.5">Welcome</p>
    </Item>
    <Item>
      <h2 id="welcome-title" className="display-title">
        {w.headingLine1}
        <br />
        {w.headingLine2}
      </h2>
    </Item>
    <Item>
      <span aria-hidden="true" className="my-3 block h-[0.75px] w-11 bg-gold opacity-55" />
    </Item>
    <Item>
      <p className="text-[clamp(0.95rem,0.85rem+0.5vw,1.2rem)] font-semibold leading-[1.5] text-ink/90">{w.message}</p>
    </Item>
    <Item className="mt-6">
      <p className="font-serif text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">Hosted with love by</p>
      <p className="mt-1.5 font-display text-[clamp(0.9rem,0.8rem+0.5vw,1.1rem)] leading-snug tracking-[0.04em] text-olive">
        {w.hostedBy[0]}
        <span className="block font-script text-[1.3rem] normal-case leading-tight text-ink">&amp;</span>
        {w.hostedBy[1]}
      </p>
    </Item>
    <Item className="mt-4 self-start md:self-center">
      <LotusDivider />
    </Item>
  </Stagger>
</section>
  );
}
