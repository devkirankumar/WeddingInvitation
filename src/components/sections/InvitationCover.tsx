"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

export function InvitationCover({ onOpened, onStartMusic }: { onOpened: () => void; onStartMusic: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleOpen = () => {
    // If already playing, a second tap skips to the invitation
    if (isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onOpened();
      return;
    }

    onStartMusic();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return onOpened();
    }

    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          // Fallback timeout in case video onEnded doesn't fire
          timerRef.current = setTimeout(() => {
            onOpened();
          }, 5200);
        })
        .catch(() => {
          // If video playback fails, transition directly
          onOpened();
        });
    } else {
      onOpened();
    }
  };

  const handleVideoEnded = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onOpened();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${wedding.couple.groom.short} and ${wedding.couple.bride.short}`}
      className="fixed inset-0 z-50 cursor-pointer select-none overflow-hidden bg-[#F5EFE6]"
      onClick={handleOpen}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Desktop backdrop: painted hero art framing the centred envelope column */}
      {wedding.art.hero?.desktop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-cover bg-top md:block"
          style={{ backgroundImage: `url(${wedding.art.hero?.desktop})` }}
        />
      )}

      {/* Envelope stage: full screen on mobile, a centred column on desktop */}
      <div className="absolute inset-0 overflow-hidden md:inset-y-0 md:left-1/2 md:right-auto md:w-[min(100vw,90dvh)] md:-translate-x-1/2 md:shadow-[0_0_40px_rgba(60,30,20,0.18)]">
        {/* Background Video (plays opening animation on tap) */}
        <video
          ref={videoRef}
          src="/images/taptoopenvideo.mp4"
          playsInline
          muted
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onEnded={handleVideoEnded}
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />

        {/* "TAP TO OPEN" prompt overlay (visible until tapped) */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-[18%] sm:top-[20%] flex flex-col items-center px-6 text-center transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"
            }`}
        >
          <div className="flex flex-col items-center gap-1.5 pulse-soft">
            <span
              className="font-caps text-[14px] sm:text-[16px] font-semibold uppercase tracking-[0.34em] text-ink"
              style={{ textShadow: "0 0 12px rgba(240, 220, 180, 0.9)" }}
            >
              Tap to Open
            </span>
            <span aria-hidden="true" className="flex items-center gap-2 text-ink/75">
              <span className="h-[0.75px] w-7 bg-ink/75" />
              <span className="text-[7px]">✦</span>
              <span className="h-[0.75px] w-7 bg-ink/75" />
            </span>
          </div>
        </div>

        {/* Gentle golden sparkles over the wax seal before opening */}
        {!isPlaying &&
          Array.from({ length: 6 }, (_, t) => (
            <motion.span
              key={t}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[48%] sm:top-[49%] text-[10px] text-gold drop-shadow-[0_0_8px_rgba(176,144,96,0.85)]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.85, 0],
                scale: [0.4, 1.2, 0.4],
                y: [0, -14 - t * 4, -26],
                x: [(t % 2 === 0 ? 1 : -1) * (10 + t * 8)],
              }}
              transition={{
                duration: 2.4 + t * 0.4,
                repeat: Infinity,
                delay: t * 0.4,
                ease: "easeInOut",
              }}
            >
              ✦
            </motion.span>
          ))}
      </div>
    </motion.div>
  );
}
