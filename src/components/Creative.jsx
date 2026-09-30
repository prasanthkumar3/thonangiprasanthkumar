import { useEffect, useRef, useState } from "react";
import { community, person, swatches } from "../data";
import { usePrefersReducedMotion } from "../hooks";
import "../styles/creative.css";

function Clapper() {
  const reduced = usePrefersReducedMotion();
  const [take, setTake] = useState(1);
  const [clapping, setClapping] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function clap() {
    setTake((n) => n + 1);
    if (reduced) return;
    setClapping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setClapping(false), 420);
  }

  return (
    <div className="clapper">
      <div className={`clapper__board${clapping ? " is-clapping" : ""}`}>
        <div className="clapper__stick" aria-hidden="true" />
        <div className="clapper__body">
          <dl>
            <div>
              <dt>Production</dt>
              <dd>Short music cover</dd>
            </div>
            <div>
              <dt>Director</dt>
              <dd>{person.name}</dd>
            </div>
            <div className="clapper__split">
              <div>
                <dt>Screening</dt>
                <dd>Annual Day</dd>
              </div>
              <div>
                <dt>Take</dt>
                <dd className="clapper__take" aria-live="polite">
                  {take}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <button type="button" className="button clapper__btn" onClick={clap}>
        Clap
      </button>
    </div>
  );
}

function Swatch({ swatch }) {
  const [state, setState] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let next = "done";
    try {
      await navigator.clipboard.writeText(swatch.hex);
    } catch {
      next = "failed";
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button
      type="button"
      className={`swatch${swatch.light ? " swatch--light" : ""}`}
      style={{ "--c": swatch.hex }}
      onClick={copy}
      aria-label={`${swatch.name}, ${swatch.hex}. Copy color code`}
    >
      <span className="swatch__name">{swatch.name}</span>
      <span className="swatch__hex">
        {state === "done" ? "Copied" : state === "failed" ? "Copy failed" : swatch.hex}
      </span>
    </button>
  );
}

export default function Creative() {
  return (
    <section className="creative" id="creative" aria-labelledby="creative-title">
      <div className="wrap">
        <header className="creative__head">
          <h2 className="creative__title display" id="creative-title">
            The <em>creative</em> side
          </h2>
          <p className="creative__lead">
            Design and direction sit right next to the code for me. I plan how a page should look and
            move, and I've also stood behind and in front of a camera.
          </p>
        </header>

        <div className="creative__grid">
          <article className="card card--direct">
            <h3 className="card__title display">Direction</h3>
            <p className="card__text">
              I directed and acted in a short music cover that was screened on the college's Annual
              Day. Give the board a clap.
            </p>
            <Clapper />
          </article>

          <article className="card card--design">
            <h3 className="card__title display">Design</h3>
            <p className="card__text">
              I use Figma to lay out interfaces before I build them. This page runs on three colors and
              two typefaces.
            </p>
            <div className="swatches">
              {swatches.map((s) => (
                <Swatch key={s.name} swatch={s} />
              ))}
            </div>
            <div className="type">
              <div>
                <span className="type__aa type__aa--serif" aria-hidden="true">
                  Aa
                </span>
                <span className="type__name">Bodoni Moda</span>
              </div>
              <div>
                <span className="type__aa type__aa--sans" aria-hidden="true">
                  Aa
                </span>
                <span className="type__name">Schibsted Grotesk</span>
              </div>
            </div>
          </article>
        </div>

        <ul className="community">
          {community.map((item) => (
            <li key={item.title}>
              <strong className="display">{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
