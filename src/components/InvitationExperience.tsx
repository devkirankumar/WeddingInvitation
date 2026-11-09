"use client";

import { AnimatePresence } from "framer-motion";
import { useInvitation } from "@/components/InvitationProvider";
import { InvitationCover } from "@/components/sections/InvitationCover";
import { MusicPlayer } from "@/components/MusicPlayer";

/** Client shell: the gate-fold cover sits above the (server-rendered) invitation until opened. */
export function InvitationExperience({ children }: { children: React.ReactNode }) {
  const { opened, openInvitation, music } = useInvitation();

  return (
    <>
      <AnimatePresence>
        {!opened && <InvitationCover key="cover" onOpened={openInvitation} onStartMusic={music.play} />}
      </AnimatePresence>
      <main id="main" aria-hidden={!opened} inert={!opened}>
        {children}
      </main>
      <MusicPlayer />
    </>
  );
}
