import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

// True once the element has scrolled into view (and stays true).
export function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// A tiny request log used by the project sketches to show the API calls behind each action.
export function useRequestLog() {
  const [log, setLog] = useState([]);
  const counter = useRef(0);

  const record = useCallback((method, path, status, request, response) => {
    counter.current += 1;
    const id = counter.current;
    setLog((prev) => [{ id, method, path, status, request, response }, ...prev].slice(0, 12));
  }, []);

  const clear = useCallback(() => setLog([]), []);
  return { log, record, clear };
}
