"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useInvitation } from "@/components/InvitationProvider";

/** Floating mute/unmute control, styled like the reference (ink bubble, cream icon). */
export function MusicPlayer() {
  const { opened, music } = useInvitation();
  if (!opened) return null;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      onClick={music.toggle}
      aria-pressed={music.playing}
      aria-label={music.playing ? `Pause music: ${wedding.music.title}` : `Play music: ${wedding.music.title}`}
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 grid size-12 place-items-center rounded-full border border-cream/30 bg-ink/80 text-cream shadow-[0_4px_15px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
    >
      {music.playing ? <Volume2 className="size-5" strokeWidth={1.8} /> : <VolumeX className="size-5" strokeWidth={1.8} />}
    </motion.button>
  );
}
