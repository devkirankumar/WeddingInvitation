"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import type { WeddingEvent } from "@/types/wedding";
import { formatShortDate } from "@/lib/utils";
import { HangingVine } from "@/components/ornaments/Ornaments";
import { Stagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

const ICONS: Record<WeddingEvent["icon"], React.ReactNode> = {
  tilak: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16c0 4.4-3.6 8-8 8s-8-3.6-8-8z" />
      <path d="M12 12V4M9 5l3-1 3 1" />
      <path d="M5 14h14" />
    </svg>
  ),
  reception: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15c0-4 3.5-7 7-7s7 3 7 7" />
      <path d="M12 8V6M10 6h4" />
      <path d="M3 15h18M4 17h16" />
    </svg>
  ),
  wedding: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="M9 7l1-2 1 2" />
    </svg>
  ),
};

/** "Wedding Schedule" — vertical timeline, alternating sides on desktop (reference 'traditional' theme). */
export function EventsSection() {
  const art = wedding.art.schedule;

  return (
    <section id="events" aria-labelledby="events-title" className="paper-vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28">
      {hasArt(art) ? (
        <SectionArt art={art} position="center top" />
      ) : (
        <>
          <HangingVine className="w-[30vw] max-w-[160px]" />
          <HangingVine flip className="w-[30vw] max-w-[160px]" />
        </>
      )}

      <Stagger className="z-10 mb-16 flex flex-col items-center text-center">
        <SectionHeading id="events-title" label="Celebrating the Moments" title="Wedding Schedule" />
      </Stagger>

      <ol className="relative z-10 mx-auto flex w-full max-w-[800px] flex-col gap-12 md:gap-16">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[24px] top-2 w-[1.5px] -translate-x-[0.75px] opacity-20 md:left-1/2"
          style={{ backgroundImage: "linear-gradient(to bottom, transparent, #C09D5C 15%, #C09D5C 85%, transparent)" }}
        />
        {wedding.events.map((ev, i) => {
          const right = i % 2 === 0;
          return (
            <motion.li
              key={ev.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex w-full flex-col items-start md:flex-row md:items-center ${right ? "md:flex-row-reverse" : ""}`}
            >
              <div className={`flex w-full pl-[56px] md:w-[45%] md:pl-0 ${right ? "md:justify-start md:pl-10" : "md:justify-end md:pr-10"}`}>
                <article
                  className="flex w-full max-w-[290px] items-center gap-3.5 md:max-w-[320px] rounded-2xl border border-sand/25 bg-linen p-4 text-left shadow-[0_6px_25px_rgba(61,82,54,0.04)] transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ borderBottom: "3px solid #C09D5C" }}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-sand shadow-sm">{ICONS[ev.icon]}</span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-forest px-2.5 py-0.5 font-sans text-[8.5px] font-bold uppercase tracking-[0.16em] text-white">
                        {ev.timeLabel}
                      </span>
                      <span className="font-sans text-[8.5px] font-bold uppercase tracking-[0.16em] text-sand">{formatShortDate(ev.start)}</span>
                    </div>
                    <h3 className="font-sans text-[0.75rem] font-semibold leading-tight tracking-[0.02em] text-forest md:text-[0.95rem]">{ev.name}</h3>
                  </div>
                </article>
              </div>
              <span
                aria-hidden="true"
                className="absolute left-[24px] top-6 z-20 grid size-6 -translate-x-1/2 place-items-center rounded-full border-2 border-sand bg-cream shadow-sm md:left-1/2 md:top-auto"
              >
                <span className="size-2 rounded-full bg-sand" />
              </span>
              <div className="hidden w-[45%] md:block" />
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
