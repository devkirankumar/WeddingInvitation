"use client";

import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import { HangingVine, Lotus } from "@/components/ornaments/Ornaments";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

const rand = (i: number, k: number) => {
  const n = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

/** Green leaves drifting down the edges, as in the reference countdown. */
function FallingLeaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Array.from({ length: 14 }, (_, i) => {
        const left = i % 2 === 0 ? rand(i, 0) * 20 : 80 + rand(i, 0) * 20;
        const size = 5 + rand(i, 3) * 10;
        return (
          <svg
            key={i}
            viewBox="0 0 40 60"
            className="petal"
            style={
              {
                left: `${left}%`,
                width: size,
                opacity: 0.8,
                "--d": `${6 + rand(i, 1) * 8}s`,
                "--delay": `${-rand(i, 2) * 10}s`,
                "--x1": `${rand(i, 4) * 60 - 30}px`,
                "--x2": `${rand(i, 5) * 60 - 30}px`,
                "--x3": `${rand(i, 6) * 40 - 20}px`,
                "--r0": "0deg",
                "--rot": "360deg",
              } as React.CSSProperties
            }
          >
            <path d="M20 5c20 15 15 40 0 50C5 45 0 20 20 5Z" fill="#404D29" />
            <path d="M20 5q-4 25 0 50" stroke="#2B351B" strokeWidth="0.8" fill="none" opacity="0.6" />
          </svg>
        );
      })}
    </div>
  );
}

export function CountdownSection() {
  const t = useCountdown(wedding.weddingDate);
  const units = [
    { key: "days", label: "Days", value: t?.days },
    { key: "hours", label: "Hours", value: t?.hours },
    { key: "minutes", label: "Min", value: t?.minutes },
    { key: "seconds", label: "Sec", value: t?.seconds },
  ];

  const art = wedding.art.countdown;
  const painted = hasArt(art);

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="paper relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden px-4 pt-[53svh] lg:justify-end lg:pt-0 lg:pb-16"
    >
      {painted && art ? (
        <SectionArt art={art} position="center top" />
      ) : (
        <>
          <HangingVine className="w-[34vw] max-w-[190px]" />
          <HangingVine flip className="w-[34vw] max-w-[190px]" />
          <Lotus className="pointer-events-none absolute bottom-6 left-1/2 w-[min(46vw,220px)] -translate-x-1/2 opacity-90" />
        </>
      )}
      <FallingLeaves />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-[500px] text-center lg:rounded-2xl lg:border lg:border-[#C09D5C]/45 lg:bg-[#FDFBF7]/90 lg:px-10 lg:py-8 lg:shadow-[0_14px_44px_rgba(70,50,25,0.15)] lg:backdrop-blur-md"
      >
        <h2 id="countdown-title" className="mb-3 sm:mb-4 lg:mb-6 flex justify-center" aria-label="Count down">
          {"COUNT DOWN".split("").map((ch, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="inline-block font-display text-[13px] sm:text-[16px] lg:text-[20px] font-semibold lg:font-bold uppercase tracking-[0.3em] lg:tracking-[0.32em] text-[#3E321E]"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </h2>

        {t?.done ? (
          <p className="font-script text-[2.2rem] text-[#3E321E]">Happily married!</p>
        ) : (
          <div className="flex items-center justify-center gap-0 lg:gap-3" role="timer" aria-live="off">
            {units.map((u, i) => (
              <div key={u.key} className="flex items-center">
                <div className="flex min-w-[52px] sm:min-w-[64px] lg:min-w-[84px] flex-col items-center">
                  <div className="font-display text-[24px] sm:text-[30px] lg:text-[48px] font-normal lg:font-bold leading-none text-[#2F3A22] lg:text-[#3E321E] tabular-nums lg:drop-shadow-sm">
                    {u.value === undefined ? "--" : u.key === "days" ? String(u.value) : String(u.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1.5 lg:mt-2 font-display text-[9px] sm:text-[10.5px] lg:text-[13px] font-bold uppercase tracking-[0.12em] lg:tracking-[0.24em] text-[#4A5A2E] lg:text-[#7A6840]">
                    {u.label}
                  </div>
                </div>
                {i < units.length - 1 && (
                  <span aria-hidden="true" className="mx-0.5 sm:mx-1.5 lg:mx-2.5 h-6 sm:h-8 lg:h-12 w-px lg:w-[1.5px] bg-[#B5473A]/45 lg:bg-[#C09D5C]/60" />
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
