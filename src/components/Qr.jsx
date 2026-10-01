// A decorative QR-style pattern generated from a string. It is not scannable.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const N = 21;
const FINDERS = [
  [0, 0],
  [N - 7, 0],
  [0, N - 7],
];

function inFinder(x, y) {
  return FINDERS.some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
}

export default function Qr({ value, size = 96, className = "" }) {
  const rand = rng(hash(value));
  const cells = [];
  for (let y = 0; y < N; y += 1) {
    for (let x = 0; x < N; x += 1) {
      if (inFinder(x, y)) continue;
      if (rand() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
    }
  }
  return (
    <svg
      className={className}
      viewBox={`-1 -1 ${N + 2} ${N + 2}`}
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {cells}
      {FINDERS.map(([fx, fy]) => (
        <g key={`${fx}-${fy}`}>
          <rect x={fx + 0.5} y={fy + 0.5} width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x={fx + 2} y={fy + 2} width="3" height="3" />
        </g>
      ))}
    </svg>
  );
}
