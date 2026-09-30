import { useEffect, useRef, useState } from "react";

const MIN = 280;
const MAX = 960;

function deviceFor(w) {
  if (w < 480) return "Phone";
  if (w < 768) return "Tablet";
  return "Laptop";
}

export default function TechnoSketch() {
  const stageRef = useRef(null);
  const [width, setWidth] = useState(560);
  const [limit, setLimit] = useState(MAX);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const measure = () => {
      const available = Math.floor(el.clientWidth);
      setLimit(Math.max(MIN + 40, Math.min(MAX, available)));
    };
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const w = Math.min(width, limit);

  return (
    <div className="sketch">
      <div className="sketch__bar">
        <span className="sketch__url">Sketch of the responsive layout, drag to resize</span>
      </div>

      <div className="resp__control">
        <label htmlFor="tv-width">Screen width</label>
        <input
          id="tv-width"
          type="range"
          min={MIN}
          max={limit}
          step={10}
          value={w}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <output htmlFor="tv-width">
          {w}px, {deviceFor(w)}
        </output>
      </div>

      <div className="resp__stage" ref={stageRef}>
        <div className="resp__frame" style={{ width: w }}>
          <div className="mock">
            <div className="mock__nav">
              <strong>TECHNO VISION</strong>
              <div className="mock__links">
                <span>Schedule</span>
                <span>Teams</span>
                <span className="mock__join">Register</span>
              </div>
              <div className="mock__menu" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="mock__hero">
              <div>
                <p className="mock__kicker">Two-day technical event</p>
                <p className="mock__title">Techno Vision</p>
                <p className="mock__sub">Organized by the CSE Department.</p>
                <span className="mock__cta">Register your team</span>
              </div>
              <div className="mock__art" />
            </div>

            <div className="mock__days">
              <div>
                <p>Day 1</p>
                <span />
                <span className="short" />
              </div>
              <div>
                <p>Day 2</p>
                <span />
                <span className="short" />
              </div>
            </div>

            <div className="mock__stats">
              <div>
                <strong>290+</strong>
                <span>participants</span>
              </div>
              <div>
                <strong>90+</strong>
                <span>teams</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
