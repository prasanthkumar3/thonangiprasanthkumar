import { useEffect, useRef } from "react";
import { journey } from "../data";
import "../styles/journey.css";

export default function Journey() {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const nodes = Array.from(list.querySelectorAll("[data-node]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.55;
      const box = list.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (line - box.top) / box.height));
      list.style.setProperty("--p", p.toFixed(4));
      nodes.forEach((node) => {
        const r = node.getBoundingClientRect();
        node.classList.toggle("is-passed", r.top + 26 < line);
      });
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
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="wrap">
        <header className="journey__head">
          <h2 className="journey__title display" id="journey-title">
            The path so far
          </h2>
          <p className="journey__lead">From school in Andhra Pradesh to two live event platforms and a degree in computer science.</p>
        </header>

        <ol className="journey__list" ref={listRef}>
          <span className="journey__rail" aria-hidden="true" />
          <span className="journey__fill" aria-hidden="true" />
          {journey.map((step) => (
            <li className="step" data-node key={`${step.year}-${step.title}`}>
              <span className="step__year display">{step.year}</span>
              <span className="step__dot" aria-hidden="true" />
              <div className="step__body">
                <h3 className="step__title">{step.title}</h3>
                <p className="step__place">{step.place}</p>
                <p className="step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
