import type { ArtSlot } from "@/types/wedding";

/** Full-bleed painted background for a section: portrait art on phones, landscape on desktop. */
export function SectionArt({ art, position = "center", eager = false }: { art: ArtSlot; position?: string; eager?: boolean }) {
  return (
    <picture aria-hidden="true">
      {art.desktop && <source media="(min-width: 1024px)" srcSet={art.desktop} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={art.mobile || art.desktop}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
        style={{ objectPosition: position }}
      />
    </picture>
  );
}

export const hasArt = (a?: ArtSlot): a is ArtSlot => Boolean(a && (a.mobile || a.desktop));
