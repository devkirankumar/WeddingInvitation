/**
 * Original SVG artwork for the invitation: marigold garlands, banana leaves,
 * lotus, hanging vines, a mango-leaf toran, a brass lamp and kolam patterns
 * taken from the printed card. All decorative — hidden from assistive tech.
 */
import { useId } from "react";

type SvgProps = { className?: string; style?: React.CSSProperties };

/* ---------- Small dividers (match the reference's ornaments) ---------- */

/** Lotus-bud drop that sits above "Save the Date". */
export function LotusDrop({ color = "#B09060", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 32 36" width={size} height={size * 1.12} fill="none" aria-hidden="true">
      <line x1="16" y1="28" x2="16" y2="34" stroke={color} strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <path
        d="M16 2C10 8 8 14 8 18c0 5 3.5 8 8 8s8-3 8-8c0-4-2-10-8-16Z"
        stroke={color}
        strokeWidth="1.1"
        fill={color}
        fillOpacity="0.1"
        opacity="0.8"
      />
      <path d="M11 18q5-8 10 0" stroke={color} strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
      <circle cx="16" cy="2" r="1.8" fill={color} opacity="0.75" />
      <circle cx="16" cy="34" r="1.6" fill={color} opacity="0.6" />
    </svg>
  );
}

/** Line — dot — line. */
export function DotDivider({ color = "#7A6840", width = 110 }: { color?: string; width?: number }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-[7px]" style={{ width }}>
      <span className="h-[0.75px] flex-1 rounded-full opacity-60" style={{ background: color }} />
      <span className="size-[5px] shrink-0 rounded-full opacity-75" style={{ background: color }} />
      <span className="h-[0.75px] flex-1 rounded-full opacity-60" style={{ background: color }} />
    </div>
  );
}

/** Line — lotus — line, used under every section label. */
export function LotusDivider({ color = "#B09060", className }: { color?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-[7px] ${className ?? ""}`}>
      <span className="h-[0.7px] w-[26px] opacity-55" style={{ background: color }} />
      <svg viewBox="0 0 32 18" width="32" height="18" fill="none">
        <path d="M16 16S8 9 5 4c3 2 7 4 11 4s8-2 11-4c-3 5-11 12-11 12Z" fill={color} opacity="0.65" />
        <path d="M16 16s-5-6-6-10c2.5 2 4.5 3 6 3s3.5-1 6-3c-1 4-6 10-6 10Z" fill={color} opacity="0.4" />
        <circle cx="16" cy="6" r="1.8" fill={color} opacity="0.55" />
      </svg>
      <span className="h-[0.7px] w-[26px] opacity-55" style={{ background: color }} />
    </div>
  );
}

/* ---------- Kolam (from the printed card) ---------- */

/** Diamond sikku-style kolam: dots ringed by interlocking loops. */
export function Kolam({ size = 5, className, style, color = "#8A5A5F" }: SvgProps & { size?: number; color?: string }) {
  const step = 12;
  const pts: [number, number][] = [];
  for (let i = -size; i <= size; i++)
    for (let j = -size; j <= size; j++) if (Math.abs(i) + Math.abs(j) <= size && (i + j) % 2 === 0) pts.push([i, j]);
  const half = size * step + 10;
  return (
    <svg viewBox={`${-half} ${-half} ${half * 2} ${half * 2}`} className={className} style={style} fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1.1" opacity="0.75">
        {pts.map(([i, j]) => (
          <rect
            key={`r${i},${j}`}
            x={i * step - 7}
            y={j * step - 7}
            width="14"
            height="14"
            rx="6"
            transform={`rotate(45 ${i * step} ${j * step})`}
          />
        ))}
      </g>
      <g fill={color} opacity="0.85">
        {pts.map(([i, j]) => (
          <circle key={`d${i},${j}`} cx={i * step} cy={j * step} r="1.5" />
        ))}
      </g>
    </svg>
  );
}

/** Running kolam border strip, as printed along the card's edge. */
export function KolamBand({ className, color = "#8A5A5F" }: { className?: string; color?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className={`h-[22px] ${className ?? ""}`}>
      <svg height="22" width="100%" className="block">
        <defs>
          <pattern id={`kb${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <rect x="4" y="4" width="14" height="14" rx="6" transform="rotate(45 11 11)" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
            <circle cx="11" cy="11" r="1.4" fill={color} opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="22" fill={`url(#kb${id})`} />
      </svg>
    </div>
  );
}

/* ---------- Florals ---------- */

function Marigold({ x, y, r = 11, gid }: { x: number; y: number; r?: number; gid: string }) {
  const outer = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
  const inner = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2 + 0.3);
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={`url(#mo${gid})`} />
      {outer.map((a, i) => (
        <circle key={`o${i}`} cx={Math.cos(a) * r * 0.72} cy={Math.sin(a) * r * 0.72} r={r * 0.32} fill="#F09A1A" opacity="0.9" />
      ))}
      {inner.map((a, i) => (
        <circle key={`i${i}`} cx={Math.cos(a) * r * 0.4} cy={Math.sin(a) * r * 0.4} r={r * 0.27} fill="#F7B12E" />
      ))}
      <circle r={r * 0.24} fill="#FFC94D" />
      <circle r={r} fill="none" stroke="#C0640A" strokeWidth="0.6" opacity="0.35" />
    </g>
  );
}

function Jasmine({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="2.6" ry="3.8" fill="#FFFDF5" stroke="#D9D0B4" strokeWidth="0.6" />
      <ellipse cx="0" cy="-1" rx="1" ry="1.4" fill="#F1ECD8" />
    </g>
  );
}

/** A vertical string of marigolds and jasmine that sways gently. */
export function MarigoldGarland({ count = 7, className, style }: SvgProps & { count?: number }) {
  const gid = useId().replace(/:/g, "");
  const gap = 40;
  const h = 18 + count * gap;
  return (
    <svg viewBox={`0 0 30 ${h}`} className={`sway ${className ?? ""}`} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`mo${gid}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFC24A" />
          <stop offset="1" stopColor="#D9700A" />
        </radialGradient>
      </defs>
      <line x1="15" y1="0" x2="15" y2={h} stroke="#9C7A3A" strokeWidth="0.8" opacity="0.6" />
      <path d="M15 4c-6-2-10 1-11 5 4 0 8-1 11-5Zm0 0c6-2 10 1 11 5-4 0-8-1-11-5Z" fill="#5E8A34" />
      {Array.from({ length: count }, (_, i) => {
        const y = 22 + i * gap;
        return (
          <g key={i}>
            <Marigold x={15} y={y} gid={gid} />
            <Jasmine x={15} y={y + 16} />
            <Jasmine x={15} y={y + 24} />
            <Jasmine x={15} y={y + 32} />
          </g>
        );
      })}
    </svg>
  );
}

/** Mango-leaf toran with marigolds — hangs across the top of a section. */
export function MangoToran({ className, count = 9 }: { className?: string; count?: number }) {
  const gid = useId().replace(/:/g, "");
  const w = count * 40;
  return (
    <svg viewBox={`0 0 ${w} 74`} preserveAspectRatio="xMidYMin meet" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`mo${gid}`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFC24A" />
          <stop offset="1" stopColor="#D9700A" />
        </radialGradient>
        <linearGradient id={`ml${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4F7A2B" />
          <stop offset="1" stopColor="#7FA545" />
        </linearGradient>
      </defs>
      <path d={`M0 8 Q ${w / 2} 20 ${w} 8`} stroke="#9C7A3A" strokeWidth="1.2" fill="none" opacity="0.7" />
      {Array.from({ length: count }, (_, i) => {
        const x = 20 + i * 40;
        const sag = 8 + 12 * (1 - Math.pow((x - w / 2) / (w / 2), 2));
        return (
          <g key={i} transform={`translate(${x} ${sag})`}>
            <g className="sway" style={{ ["--sway" as string]: `${5 + (i % 3)}s` }}>
              <path d="M0 0C-9 14-8 36 0 50 8 36 9 14 0 0Z" fill={`url(#ml${gid})`} />
              <path d="M0 2V48" stroke="#3E6020" strokeWidth="0.8" opacity="0.7" />
            </g>
            <Marigold x={20} y={4} r={7} gid={gid} />
          </g>
        );
      })}
    </svg>
  );
}

/** One banana leaf; combine several with rotate/scale for a clump. */
export function BananaLeaf({ className, style }: SvgProps) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 300" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`bl${gid}`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#7FA545" />
          <stop offset="0.55" stopColor="#5C8A33" />
          <stop offset="1" stopColor="#3F6B26" />
        </linearGradient>
        <clipPath id={`bc${gid}`}>
          <path d="M50 298C14 230 2 130 48 4 98 126 88 228 50 298Z" />
        </clipPath>
      </defs>
      <path d="M50 298C14 230 2 130 48 4 98 126 88 228 50 298Z" fill={`url(#bl${gid})`} />
      <path d="M50 298C48 200 48 100 48 6" stroke="#D9E3A8" strokeWidth="2" fill="none" opacity="0.7" />
      <g stroke="#2F5420" strokeWidth="0.7" opacity="0.35" clipPath={`url(#bc${gid})`}>
        {Array.from({ length: 16 }, (_, i) => {
          const y = 40 + i * 15;
          return (
            <g key={i}>
              <path d={`M49 ${y}Q30 ${y - 10} 16 ${y - 22}`} fill="none" />
              <path d={`M49 ${y}Q68 ${y - 10} 82 ${y - 22}`} fill="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Pink lotus in bloom. */
export function Lotus({ className, style }: SvgProps) {
  const gid = useId().replace(/:/g, "");
  const back = [-62, -32, 0, 32, 62];
  const front = [-42, -14, 14, 42];
  return (
    <svg viewBox="-60 -60 120 70" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`lp${gid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FBE3E6" />
          <stop offset="1" stopColor="#E27D93" />
        </linearGradient>
        <linearGradient id={`lf${gid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFF1F2" />
          <stop offset="1" stopColor="#EC97A8" />
        </linearGradient>
      </defs>
      {back.map((a) => (
        <path key={a} d="M0 0C-10-12-11-34 0-50 11-34 10-12 0 0Z" fill={`url(#lp${gid})`} stroke="#C9637A" strokeWidth="0.5" transform={`rotate(${a})`} />
      ))}
      {front.map((a) => (
        <path key={a} d="M0 0C-9-10-10-28 0-40 10-28 9-10 0 0Z" fill={`url(#lf${gid})`} stroke="#D27389" strokeWidth="0.5" transform={`rotate(${a})`} />
      ))}
      <ellipse cx="0" cy="-2" rx="9" ry="4" fill="#F2C14E" opacity="0.9" />
    </svg>
  );
}

/** Banana leaves + lotus clump for bottom corners. Mirror with `flip`. */
export function LeafClump({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute bottom-0 ${flip ? "right-0 -scale-x-100" : "left-0"} ${className ?? ""}`}>
      <div className="relative h-[clamp(170px,30svh,300px)] w-[clamp(120px,34vw,240px)]">
        <BananaLeaf className="absolute bottom-[-6%] left-[-14%] h-[105%] origin-bottom -rotate-[24deg]" />
        <BananaLeaf className="absolute bottom-[-6%] left-[6%] h-[88%] origin-bottom rotate-[8deg]" />
        <BananaLeaf className="absolute bottom-[-8%] left-[26%] h-[62%] origin-bottom rotate-[38deg] opacity-90" />
        <Lotus className="absolute bottom-[2%] left-[18%] w-[58%]" />
      </div>
    </div>
  );
}

/** Trailing vine with leaves and small pink blooms, for top corners. */
export function HangingVine({ className, flip = false }: { className?: string; flip?: boolean }) {
  const leaves = [16, 34, 52, 70, 90, 110, 132];
  return (
    <svg
      viewBox="0 0 120 170"
      className={`pointer-events-none absolute top-0 ${flip ? "right-0 -scale-x-100" : "left-0"} ${className ?? ""}`}
      aria-hidden="true"
    >
      <g className="sway" style={{ ["--sway" as string]: "8s" }}>
        <path d="M0 4C30 10 46 40 40 80 36 110 44 140 50 166" stroke="#6E8C45" strokeWidth="1.3" fill="none" />
        <path d="M0 18C14 30 18 52 14 82" stroke="#6E8C45" strokeWidth="1" fill="none" />
        {leaves.map((y, i) => (
          <ellipse
            key={y}
            cx={i % 2 ? 48 : 34}
            cy={y}
            rx="5"
            ry="10"
            fill={i % 3 ? "#7FA545" : "#5C8A33"}
            opacity="0.85"
            transform={`rotate(${i % 2 ? 40 : -40} ${i % 2 ? 48 : 34} ${y})`}
          />
        ))}
        {[
          [22, 14],
          [44, 48],
          [16, 64],
          [46, 100],
          [42, 146],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 3} cy={Math.sin((a * Math.PI) / 180) * 3} r="2.6" fill="#EFA3B1" />
            ))}
            <circle r="1.6" fill="#F6D27A" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Brass kuthuvilakku lamp with flickering flames. */
export function BrassLamp({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const g = `url(#br${gid})`;
  return (
    <svg viewBox="0 0 120 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`br${gid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A6224" />
          <stop offset="0.35" stopColor="#E9C46A" />
          <stop offset="0.6" stopColor="#C9973A" />
          <stop offset="1" stopColor="#7A5420" />
        </linearGradient>
        <radialGradient id={`fl${gid}`} cx="50%" cy="80%" r="70%">
          <stop offset="0" stopColor="#FFF4C2" />
          <stop offset="0.5" stopColor="#FFC93C" />
          <stop offset="1" stopColor="#F07B12" />
        </radialGradient>
        <radialGradient id={`gl${gid}`}>
          <stop offset="0" stopColor="#FFD97A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFD97A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="92" r="48" fill={`url(#gl${gid})`} />
      {/* finial */}
      <path d="M60 18c-6 6-6 12 0 16 6-4 6-10 0-16Z" fill={g} />
      <rect x="57" y="34" width="6" height="40" rx="2" fill={g} />
      {/* oil bowl with wicks */}
      <path d="M18 98h84c-4 14-22 22-42 22S22 112 18 98Z" fill={g} />
      <ellipse cx="60" cy="98" rx="42" ry="6" fill="#A97A2C" />
      {[24, 42, 60, 78, 96].map((x) => (
        <path key={x} className="flame" d={`M${x} 96c-5-6-4-14 0-20 4 6 5 14 0 20Z`} fill={`url(#fl${gid})`} style={{ animationDelay: `${(x % 5) * 0.2}s` }} />
      ))}
      {/* stem */}
      <path d="M54 120h12l-2 20h-8Z" fill={g} />
      <ellipse cx="60" cy="146" rx="14" ry="7" fill={g} />
      <rect x="55" y="150" width="10" height="70" rx="3" fill={g} />
      <ellipse cx="60" cy="186" rx="10" ry="5" fill={g} />
      <ellipse cx="60" cy="222" rx="16" ry="7" fill={g} />
      {/* base */}
      <path d="M44 228h32l8 30H36Z" fill={g} />
      <ellipse cx="60" cy="262" rx="40" ry="10" fill={g} />
      <ellipse cx="60" cy="259" rx="34" ry="5" fill="#E9C46A" opacity="0.4" />
    </svg>
  );
}

/** Rose petal used by the falling-petal layer. */
export function RosePetal({ className, style }: SvgProps) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 30 34" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`rp${gid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F07C8E" />
          <stop offset="0.6" stopColor="#D2384F" />
          <stop offset="1" stopColor="#9E1F34" />
        </radialGradient>
      </defs>
      <path d="M15 33C4 26 0 16 3 8 6 1 13 0 15 5c2-5 9-4 12 3 3 8-1 18-12 25Z" fill={`url(#rp${gid})`} />
      <path d="M15 31C11 22 11 13 14 6" stroke="#8A1A2C" strokeWidth="0.6" fill="none" opacity="0.4" />
    </svg>
  );
}

/** Map pin glyph. */
export function PinIcon({ size = 14, color = "#7A6840" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
