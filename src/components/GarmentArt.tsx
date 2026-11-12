import { useId } from "react";
import type { Silhouette, Tone } from "@/data/types";

/**
 * Sample fashion illustration shown until a real photograph is added.
 * Draws a suit on a dress form inside a mehrab (arch) frame.
 */

type Palette = {
  bg: [string, string];
  fabric: string;
  bottom: string;
  accent: string;
  dupatta: string;
};

const palettes: Record<Tone, Palette> = {
  blush: { bg: ["#f7e9e3", "#ebd0c7"], fabric: "#e1b3a6", bottom: "#cf978a", accent: "#a9854a", dupatta: "#f4dcd4" },
  ivory: { bg: ["#fbf6ee", "#eee3d0"], fabric: "#f4ebda", bottom: "#e0d0b4", accent: "#b08d57", dupatta: "#fffaf2" },
  burgundy: { bg: ["#f3e3de", "#e2c3bd"], fabric: "#7a2235", bottom: "#561524", accent: "#d9c08e", dupatta: "#a13f52" },
  mustard: { bg: ["#f8eed9", "#ebd6a9"], fabric: "#d4a347", bottom: "#b4475b", accent: "#7a2235", dupatta: "#c9566a" },
  sage: { bg: ["#f0f2e8", "#dbe1cc"], fabric: "#b6c2a0", bottom: "#f1e9d6", accent: "#8a6a3c", dupatta: "#e8ecda" },
  rani: { bg: ["#f7e5e8", "#eac5cc"], fabric: "#b63b63", bottom: "#8b2547", accent: "#dcc391", dupatta: "#e8a5b8" },
  indigo: { bg: ["#eceef4", "#d5dbe8"], fabric: "#3e507d", bottom: "#f2ecdf", accent: "#d6bd8c", dupatta: "#cbd2e3" },
  sand: { bg: ["#f6efe4", "#e6d7bf"], fabric: "#cbae87", bottom: "#a5845d", accent: "#6e1e2f", dupatta: "#efe3cf" },
  emerald: { bg: ["#e8f0ea", "#cde0d3"], fabric: "#2f6a53", bottom: "#c9a352", accent: "#e4ca91", dupatta: "#93c0a8" },
  heritage: { bg: ["#f4e9d7", "#e3cfad"], fabric: "#efe3cb", bottom: "#efe3cb", accent: "#9b2f3a", dupatta: "#cc7a34" },
};

/** Kameez outline for a given hem height and flare. */
function kameezPath(hemY: number, hemX: number, flare = false) {
  const right = 300 - hemX;
  const hem = flare
    ? `L120 150 Q${hemX + 4} ${hemY - 60} ${hemX} ${hemY} Q150 ${hemY + 10} ${right} ${hemY} Q${right - 4} ${hemY - 60} 180 150`
    : `L120 160 L${hemX} ${hemY} L${right} ${hemY} L180 160`;
  return `M132 64 L112 72 L92 138 L108 143 L118 104 ${hem} L182 104 L192 143 L208 138 L188 72 L168 64 Q150 78 132 64 Z`;
}

function bottomPath(s: Silhouette) {
  switch (s) {
    case "patiala":
      return "M116 200 C80 262 86 340 114 368 L146 368 L150 292 L154 368 L186 368 C214 340 220 262 184 200 Z";
    case "palazzo":
      return "M116 200 L98 372 L147 372 L150 292 L153 372 L202 372 L184 200 Z";
    case "sharara":
      return "M118 200 L117 286 L74 372 L148 372 L150 300 L152 372 L226 372 L183 286 L182 200 Z";
    case "gharara":
      return "M118 200 L118 300 L84 372 L148 372 L150 306 L152 372 L216 372 L182 300 L182 200 Z";
    case "lehenga":
      return "M116 140 Q72 270 50 372 L250 372 Q228 270 184 140 Z";
    case "straight":
    case "anarkali":
      return "M127 200 L129 372 L147 372 L150 300 L153 372 L171 372 L173 200 Z";
    case "salwar":
    default:
      return "M118 200 C96 262 96 330 118 366 L146 366 L150 300 L154 366 L182 366 C204 330 204 262 182 200 Z";
  }
}

function kameezFor(s: Silhouette) {
  switch (s) {
    case "patiala":
    case "sharara":
    case "gharara":
      return { d: kameezPath(228, 112), hem: 228 };
    case "anarkali":
      return { d: kameezPath(318, 72, true), hem: 318 };
    case "lehenga":
      return { d: kameezPath(140, 118), hem: 140 };
    case "palazzo":
      return { d: kameezPath(282, 106), hem: 282 };
    default:
      return { d: kameezPath(268, 108), hem: 268 };
  }
}

export function GarmentArt({
  silhouette,
  tone,
  className = "",
  showDupatta = true,
}: {
  silhouette: Silhouette;
  tone: Tone;
  className?: string;
  showDupatta?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const p = palettes[tone];
  const k = kameezFor(silhouette);
  const bottom = bottomPath(silhouette);

  return (
    <svg
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Sample illustration — replace with design photograph"
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.bg[0]} />
          <stop offset="1" stopColor={p.bg[1]} />
        </linearGradient>
        <pattern id={`motif${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
          <path
            d="M13 9 Q15 13 13 17 Q11 13 13 9 M9 13 Q13 15 17 13 Q13 11 9 13"
            fill={p.accent}
            opacity="0.16"
          />
        </pattern>
        <pattern id={`buti${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="7" r="1.1" fill={p.accent} opacity="0.55" />
        </pattern>
        <clipPath id={`kclip${uid}`}>
          <path d={k.d} />
        </clipPath>
        <clipPath id={`bclip${uid}`}>
          <path d={bottom} />
        </clipPath>
      </defs>

      <rect width="300" height="400" fill={`url(#bg${uid})`} />
      <rect width="300" height="400" fill={`url(#motif${uid})`} />

      {/* Mehrab frame */}
      <path
        d="M36 400 V158 Q36 70 150 34 Q264 70 264 158 V400"
        fill="none"
        stroke={p.accent}
        strokeOpacity="0.35"
        strokeWidth="1.2"
      />
      <path
        d="M46 400 V162 Q46 80 150 46 Q254 80 254 162 V400"
        fill="none"
        stroke={p.accent}
        strokeOpacity="0.2"
        strokeWidth="0.8"
      />

      {/* Floor shadow */}
      <ellipse cx="150" cy="378" rx="96" ry="7" fill="#000" opacity="0.06" />

      {/* Dress form neck */}
      <path d="M140 40 L140 64 Q150 70 160 64 L160 40 Z" fill="#d9c9b3" />
      <ellipse cx="150" cy="40" rx="12" ry="4" fill="#cdb99c" />

      {/* Bottom */}
      <path d={bottom} fill={p.bottom} stroke="#000" strokeOpacity="0.08" />
      {silhouette === "patiala" &&
        [128, 136, 164, 172].map((x) => (
          <path
            key={x}
            d={`M${x} 240 Q${x + (x < 150 ? -6 : 6)} 300 ${x + (x < 150 ? 2 : -2)} 360`}
            stroke="#000"
            strokeOpacity="0.1"
            fill="none"
          />
        ))}
      {silhouette === "gharara" && (
        <path d="M118 300 H148 M152 300 H182" stroke={p.accent} strokeWidth="5" strokeOpacity="0.85" />
      )}
      {silhouette === "lehenga" && (
        <>
          <path d="M58 350 Q150 360 242 350" stroke={p.accent} strokeWidth="9" fill="none" opacity="0.8" />
          <path d="M66 330 Q150 340 234 330" stroke={p.accent} strokeWidth="1.5" fill="none" opacity="0.7" />
          <rect x="60" y="150" width="180" height="200" fill={`url(#buti${uid})`} clipPath={`url(#bclip${uid})`} />
        </>
      )}
      {(silhouette === "salwar" || silhouette === "patiala") && (
        <path d="M118 358 H146 M154 358 H182" stroke={p.accent} strokeWidth="3" strokeOpacity="0.7" />
      )}

      {/* Kameez */}
      <path d={k.d} fill={p.fabric} stroke="#000" strokeOpacity="0.1" />
      <g clipPath={`url(#kclip${uid})`}>
        <rect width="300" height="400" fill={`url(#buti${uid})`} />
        <rect x="0" y={k.hem - 12} width="300" height="12" fill={p.accent} opacity="0.55" />
        <rect x="0" y={k.hem - 16} width="300" height="1.5" fill={p.accent} opacity="0.6" />
        <rect x="80" y="134" width="40" height="12" fill={p.accent} opacity="0.5" transform="rotate(14 100 140)" />
        <rect x="180" y="134" width="40" height="12" fill={p.accent} opacity="0.5" transform="rotate(-14 200 140)" />
      </g>

      {/* Neckline embroidery */}
      <path d="M134 66 Q150 96 166 66" fill="none" stroke={p.accent} strokeWidth="2.2" />
      <path d="M137 66 Q150 90 163 66" fill="none" stroke={p.accent} strokeWidth="0.8" strokeDasharray="1.5 2.5" />
      <path d="M150 88 V118" stroke={p.accent} strokeWidth="0.9" strokeDasharray="2 3" />

      {/* Dupatta */}
      {showDupatta && silhouette !== "lehenga" && (
        <g opacity="0.88">
          <path
            d="M114 70 C94 120 72 210 66 330 L88 334 C94 230 108 140 128 78 Z"
            fill={p.dupatta}
            stroke={p.accent}
            strokeOpacity="0.5"
          />
          <path d="M66 330 L88 334" stroke={p.accent} strokeWidth="4" />
          {Array.from({ length: 7 }, (_, i) => (
            <circle key={i} cx={68 + i * 3.2} cy={338 + (i % 2) * 2} r="1.4" fill={p.accent} />
          ))}
        </g>
      )}
      {silhouette === "lehenga" && (
        <path
          d="M188 72 C230 120 246 230 238 340 L216 338 C222 240 210 140 176 80 Z"
          fill={p.dupatta}
          opacity="0.75"
          stroke={p.accent}
          strokeOpacity="0.6"
        />
      )}
    </svg>
  );
}
