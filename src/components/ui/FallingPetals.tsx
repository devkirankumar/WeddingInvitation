"use client";

/** Deterministic pseudo-random so server and client markup match. */
const rand = (i: number, k: number) => {
  const n = Math.sin(i * 9.301 + k * 7.583) * 43758.5453;
  return n - Math.floor(n);
};

  /**
   * Realistic watercolor rose petals drifting down the edges of a section (CSS-only animation).
   * Uses the authentic painted rose petal asset (/images/rosePetal.webp).
   */
  export function FallingPetals({ count = 16 }: { count?: number }) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {Array.from({ length: count }, (_, i) => {
          const leftSide = i % 2 === 0;
          const left = leftSide ? rand(i, 0) * 22 : 78 + rand(i, 0) * 22;
          const dir = leftSide ? 1 : -1;
          const amp = 10 + rand(i, 4) * 35;
          const size = 15 + Math.round(rand(i, 3) * 15);
          return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
            key={i}
              src="/images/rosePetal.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="petal"
              style={
                {
                  left: `${left}%`,
                  width: `${size}px`,
                  height: "auto",
                  opacity: 0.65 + rand(i, 10) * 0.35,
                  "--d": `${8 + rand(i, 1) * 10}s`,
                  "--delay": `${-rand(i, 2) * 16}s`,
                  "--x1": `${dir * amp}px`,
                  "--x2": `${dir * amp * 0.65}px`,
                  "--x3": `${dir * amp * 0.35}px`,
                  "--r0": `${rand(i, 7) * 360}deg`,
                  "--rot": `${(1.2 + rand(i, 8)) * (rand(i, 9) > 0.5 ? 360 : -360)}deg`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    );
  }
