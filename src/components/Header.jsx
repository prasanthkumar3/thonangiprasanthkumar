import { useEffect, useState } from "react";
import { nav, person } from "../data";

export default function Header() {
  const [stuck, setStuck] = useState(() => typeof window !== "undefined" && window.scrollY > 12);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${stuck ? " is-stuck" : ""}`}>
      <div className="wrap header__inner">
        <a className="header__mark" href="#top" aria-label="Back to top">
          Prasanth Kumar
        </a>
        <nav className="header__nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="header__resume" href={person.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
