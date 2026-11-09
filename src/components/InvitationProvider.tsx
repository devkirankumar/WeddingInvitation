"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { wedding } from "@/config/wedding";
import { WaltzSynth } from "@/lib/waltz-synth";

interface InvitationState {
  opened: boolean;
  openInvitation: () => void;
  music: {
    playing: boolean;
    toggle: () => void;
    play: () => void;
  };
}

const Ctx = createContext<InvitationState | null>(null);

export function useInvitation() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useInvitation must be used inside <InvitationProvider>");
  return ctx;
}

type Player = { play: () => Promise<void>; pause: () => Promise<void> | void; dispose: () => void };

function createPlayer(): Player {
    const rawSrc = wedding.music.src?.trim();
    if (rawSrc) {
      const src = encodeURI(rawSrc);
      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "none";
      audio.volume = 0.55;
      return {
        play: () => audio.play(),
        pause: () => audio.pause(),
        dispose: () => {
          audio.pause();
          audio.src = "";
        },
      };
    }
    const synth = new WaltzSynth();
    return { play: () => synth.play(), pause: () => synth.pause(), dispose: () => synth.dispose() };
  }

  export function InvitationProvider({ children }: { children: React.ReactNode }) {
    const [opened, setOpened] = useState(false);
    const [playing, setPlaying] = useState(false);
    const player = useRef<Player | null>(null);

    const getPlayer = () => (player.current ??= createPlayer());

    const play = useCallback(() => {
      getPlayer()
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false)); // autoplay refused or decode error — leave control visible
    }, []);

    const pause = useCallback(() => {
      void player.current?.pause();
      setPlaying(false);
    }, []);

    const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

    // Pause when the tab is hidden; resume when it returns (only if it was playing).
    const resumeOnReturn = useRef(false);
    useEffect(() => {
      const onVisibility = () => {
        if (document.hidden && playing) {
          resumeOnReturn.current = true;
          pause();
        } else if (!document.hidden && resumeOnReturn.current) {
          resumeOnReturn.current = false;
          play();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [playing, pause, play]);

    useEffect(
      () => () => {
        player.current?.dispose();
        player.current = null;
      },
      [],
    );

    const openInvitation = useCallback(() => setOpened(true), []);

    const value = useMemo<InvitationState>(
      () => ({ opened, openInvitation, music: { playing, toggle, play } }),
      [opened, openInvitation, playing, toggle, play],
    );

    return (
      <MotionConfig reducedMotion="user">
        <Ctx.Provider value={value}>{children}</Ctx.Provider>
      </MotionConfig>
    );
  }
