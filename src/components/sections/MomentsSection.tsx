"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { wedding } from "@/config/wedding";
import type { Moment } from "@/types/wedding";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger } from "@/components/ui/Reveal";
import { SectionArt, hasArt } from "@/components/ui/SectionArt";

const TILT = [-5, 4, -3];

function Card({ m, i, y, opacity, scale }: { m: Moment; i: number; y?: MotionValue<string>; opacity?: MotionValue<number>; scale?: MotionValue<number> }) {
  return (
    <motion.figure
      style={{ y, opacity, scale, rotate: TILT[i % 3], zIndex: i + 1 }}
      className="absolute flex aspect-[3/4] w-[82%] max-w-[340px] flex-col rounded-[3px] border border-gold-deep/25 bg-[#FFFDF9] p-3 pb-6 shadow-[0_16px_36px_rgba(70,50,25,0.16)] sm:max-w-[360px] sm:p-4 sm:pb-7"
    >
        <span aria-hidden="true" className="pointer-events-none absolute inset-2 z-10 border border-gold-deep/40 rounded-[2px]" />
        <div className="relative w-full flex-1 overflow-hidden rounded-[2px] border border-gold-deep/10 bg-[#f8f8f8]">
          <Image src={m.image.src} alt={m.image.alt} fill sizes="(max-width: 640px) 82vw, 360px" className="object-cover" unoptimized={m.image.src.endsWith(".svg")} />
        </div>
        <figcaption className="z-20 mt-3 px-2 text-center font-serif text-[0.8rem] italic leading-relaxed text-[#2B3B25] sm:text-sm">“{m.quote}”</figcaption>
    </motion.figure>
  );
}

/** "Our Moments" — three polaroids that stack as you scroll (sticky, like the reference). */
export function MomentsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = wedding.moments.items.slice(0, 3);
  const spring = { stiffness: 90, damping: 24, mass: 0.25 };

  const { scrollYProgress: inner } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const p = useSpring(inner, spring);
  const e = useSpring(enter, spring);

  const y0 = useTransform(e, [0.2, 1], ["60vh", "0vh"]);
  const o0 = useTransform(e, [0.2, 0.85], [0, 1]);
  const s0 = useTransform(p, [0.35, 0.65], [1, 0.93]);
  const y1 = useTransform(p, [0.05, 0.35], ["100vh", "0vh"]);
  const o1 = useTransform(p, [0.05, 0.2], [0, 1]);
  const s1 = useTransform(p, [0.4, 0.7], [1, 0.95]);
  const y2 = useTransform(p, [0.38, 0.68], ["100vh", "0vh"]);
  const o2 = useTransform(p, [0.38, 0.53], [0, 1]);
  const motionProps = [
    { y: y0, opacity: o0, scale: s0 },
    { y: y1, opacity: o1, scale: s1 },
    { y: y2, opacity: o2 },
  ];

  const art = wedding.art.moments;

  if (!wedding.moments.enabled || items.length === 0) return null;

  return (
    <section id="moments" aria-labelledby="moments-title" ref={ref} className="relative" style={{ height: reduce ? "auto" : "270vh" }}>
      <div className={`paper-vignette w-full overflow-hidden ${reduce ? "py-24" : "sticky top-0 h-[100svh]"} flex flex-col items-center justify-center`}>
        {hasArt(art) && <SectionArt art={art} position="center top" />}
        <Stagger className="absolute top-[8%] z-10 flex flex-col items-center px-6 text-center">
          <SectionHeading id="moments-title" label="Celebrating the Moments" title="Our Moments" />
        </Stagger>
        <div className={`relative z-10 flex w-full max-w-[460px] items-center justify-center px-4 ${reduce ? "mt-40 h-[350px]" : "mt-16 h-[350px]"}`}>
          {items.map((m, i) => (
            <Card key={m.image.src} m={m} i={i} {...(reduce ? {} : motionProps[i])} />
          ))}
        </div>
      </div>
    </section>
  );
}
