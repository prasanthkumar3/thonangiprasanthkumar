import { useEffect, useRef } from "react";
import { nav, person } from "../data";
import "../styles/header.css";

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.setProperty("--progress", progress.toFixed(4));
      el.classList.toggle("is-stuck", window.scrollY > 12);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="header" ref={ref}>
      <div className="wrap header__inner">
        <a className="header__mark" href="#top" aria-label="Back to top">
          Prasanth Kumar
        </a>
        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
          <a className="header__resume" href={person.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </div>
      <div className="header__progress" aria-hidden="true" />
    </header>
  );
}
