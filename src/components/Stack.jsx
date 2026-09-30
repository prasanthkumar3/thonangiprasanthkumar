import { useState } from "react";
import { stackGroups, stackItems } from "../data";
import "../styles/stack.css";

export default function Stack() {
  const [group, setGroup] = useState("All");
  const [active, setActive] = useState("React");

  const current = stackItems.find((s) => s.name === active) ?? stackItems[0];

  function pickGroup(g) {
    setGroup(g);
    if (g !== "All") {
      const first = stackItems.find((s) => s.group === g);
      if (first && current.group !== g) setActive(first.name);
    }
  }

  return (
    <section className="stack on-dark" id="stack" aria-labelledby="stack-title">
      <div className="wrap">
        <header className="stack__head">
          <h2 className="stack__title display" id="stack-title">
            The stack
          </h2>
          <p className="stack__lead">Pick a skill to see where it shows up in my work.</p>
        </header>

        <div className="stack__filters" role="group" aria-label="Filter skills by group">
          {stackGroups.map((g) => (
            <button
              key={g}
              type="button"
              className={group === g ? "is-on" : ""}
              aria-pressed={group === g}
              onClick={() => pickGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="stack__body">
          <ul className="stack__list">
            {stackItems.map((item) => {
              const dim = group !== "All" && item.group !== group;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    className={`skill${active === item.name ? " is-active" : ""}${dim ? " is-dim" : ""}`}
                    aria-pressed={active === item.name}
                    onClick={() => setActive(item.name)}
                    onMouseEnter={() => !dim && setActive(item.name)}
                    onFocus={() => setActive(item.name)}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="stack__panel" aria-live="polite">
            <p className="stack__group">{current.group}</p>
            <p className="stack__name display">{current.name}</p>
            <p className="stack__note">{current.note}</p>
            {current.link && (
              <a className="textlink" href={current.link.href}>
                {current.link.label}
              </a>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
