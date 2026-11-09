import { wedding } from "@/config/wedding";
import { mapsSearchUrl } from "@/lib/utils";
import { Kolam, MangoToran, PinIcon } from "@/components/ornaments/Ornaments";
import { Item, Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

export function VenueSection() {
  const v = wedding.venue;
  const art = wedding.art.venue;
  const url = mapsSearchUrl(v.mapsQuery);
  const qr = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200&color=4A3E20&bgcolor=FDFBF7&qzone=2&format=png`;

  return (
    <section id="venue" aria-labelledby="venue-title" className="paper relative flex min-h-[100svh] flex-col items-center overflow-hidden">
      {hasArt(art) ? (
        <SectionArt art={art} position="center top" />
      ) : (
        <>
          <MangoToran className="pointer-events-none relative z-10 w-full max-w-[900px]" />
          <Kolam size={4} className="pointer-events-none absolute -bottom-20 left-1/2 w-[min(70vw,300px)] -translate-x-1/2 opacity-25" />
        </>
      )}

        <Stagger className="relative z-10 flex w-full max-w-[420px] flex-col items-center px-6 pb-6 pt-[9svh] sm:pt-[11svh] text-center">
          <SectionHeading id="venue-title" label="Our Venue" title={v.name} />
          <Item className="mb-5 mt-2.5 flex flex-col items-center gap-0.5">
            {v.lines.map((l) => (
              <p key={l} className="text-[clamp(0.9rem,0.85rem+0.3vw,1.05rem)] font-semibold leading-[1.45] text-ink/90">
                {l}
              </p>
            ))}
          </Item>
          <Item className="mb-6 flex flex-col items-center gap-2">
            <div className="size-[100px] rounded border-[0.75px] border-gold/35 bg-cream p-1.5 shadow-[0_2px_12px_rgba(63,73,48,0.07)] sm:size-[112px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qr} alt="QR code for the venue location" width={200} height={200} loading="lazy" className="block size-full rounded-sm" />
            </div>
            <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.2em] text-gold opacity-85">Scan for Location</p>
          </Item>
          <Item>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-outline" aria-label={`Open ${v.name} in Google Maps`}>
              <PinIcon size={14} color="#4A3E20" />
              Open Location
            </a>
          </Item>
        </Stagger>
    </section>
  );
}
