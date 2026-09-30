import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks";

export default function CountUp({ to, suffix = "", duration = 1400 }) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView(0.6);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setN(to);
      return undefined;
    }
    let raf = 0;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
    </span>
  );
}
