import { useEffect, useRef, useState } from "react";
import { person } from "../data";
import "../styles/hero.css";

const LINES = [["Thonangi"], ["Prasanth", "Kumar"]];

// The name is split into letters that lift as the pointer passes near them.
// Letters use position: relative, so kerning between them is preserved.
function RippleName({ ready }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready) return undefined;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return undefined;

    const letters = Array.from(root.querySelectorAll("[data-ch]"));
    const vals = new Array(letters.length).fill(0);
    let centers = [];
    let target = null;
    let raf = 0;
    const RADIUS = 230;

    const measure = () => {
      letters.forEach((el) => {
        el.style.top = "0em";
      });
      centers = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 + window.scrollX, y: r.top + r.height / 2 + window.scrollY };
      });
    };

    const frame = () => {
      let moving = false;
      for (let i = 0; i < letters.length; i += 1) {
        let goal = 0;
        if (target) {
          const d = Math.hypot(target.x - centers[i].x, target.y - centers[i].y);
          const t = Math.max(0, 1 - d / RADIUS);
          goal = t * t * (3 - 2 * t);
        }
        vals[i] += (goal - vals[i]) * 0.16;
        if (Math.abs(goal - vals[i]) > 0.002) moving = true;
        else vals[i] = goal;
        letters[i].style.top = `${(-vals[i] * 0.07).toFixed(4)}em`;
      }
      raf = moving ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e) => {
      target = { x: e.pageX, y: e.pageY };
      kick();
    };
    const onLeave = () => {
      target = null;
      kick();
    };

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <h1 className="hero__name display" ref={rootRef} aria-label={person.name}>
      {LINES.map((words, li) => (
        <span className="hero__line" key={li} aria-hidden="true">
          <span className="hero__rise">
            {words.map((word, wi) => (
              <span className="hero__word" key={word}>
                {word.split("").map((ch, ci) => (
                  <span className="hero__ch" data-ch key={ci}>
                    {ch}
                  </span>
                ))}
                {wi < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}

function Collage() {
  return (
    <div className="collage" aria-hidden="true">
      <div className="frag frag--av">
        <p className="frag__eyebrow">TEAM OVERVIEW</p>
        <p className="frag__team">Team : NULL POINTERS</p>
        <span className="frag__pill">Team-ID: AVI-A3-40817</span>
        <div className="frag__member">
          <span className="frag__avatar">AM</span>
          <div>
            <b>Aarav Menon</b>
            <i>Team Lead</i>
          </div>
        </div>
        <div className="frag__btns">
          <span>Edit Details</span>
          <span className="is-green">Download ID Card</span>
        </div>
      </div>

      <div className="frag frag--phone">
        <div className="phone">
          <div className="phone__bar">TECHNO VISION</div>
          <div className="phone__hero" />
          <div className="phone__cta">Register</div>
          <div className="phone__row" />
          <div className="phone__row phone__row--short" />
          <div className="phone__row" />
        </div>
      </div>

      <div className="frag frag--ef">
        <div className="frag__brand">
          <span>E</span>ExamForge
        </div>
        <p className="frag__ef-title">Take an exam</p>
        <div className="frag__ef-input">PYTHON26X</div>
        <div className="frag__ef-btn">Continue &rarr;</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return undefined;
    let raf = 0;
    let next = null;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", next.x.toFixed(3));
      el.style.setProperty("--my", next.y.toFixed(3));
      el.style.setProperty("--gx", `${next.px}px`);
      el.style.setProperty("--gy", `${next.py}px`);
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      next = {
        x: Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)),
        y: Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)),
        px: Math.round(e.clientX - r.left),
        py: Math.round(e.clientY - r.top),
      };
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`hero${ready ? " is-ready" : ""}`} id="top" ref={heroRef}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__grid" />
        <span className="hero__grid hero__grid--lit" />
      </div>
      <div className="wrap">
        <p className="hero__status">
          <span className="hero__dot" aria-hidden="true" />
          Open to entry-level software roles
        </p>

        <RippleName ready={ready} />

        <div className="hero__lower">
          <div className="hero__intro">
            <p className="hero__lead">
              Full-stack developer, class of 2026. I build the websites behind college and national
              events: registration, team management, and the admin tools organizers rely on while the
              event is running.
            </p>
            <div className="hero__actions">
              <a className="button" href="#work">
                Try the work
              </a>
              <a className="textlink" href={person.resume} target="_blank" rel="noreferrer">
                Download resume (PDF)
              </a>
            </div>
          </div>
          <Collage />
        </div>
      </div>
    </section>
  );
}
