import { skills } from "../data";

export default function Skills() {
  return (
    <section className="section section--wash" id="skills" aria-labelledby="skills-title">
      <div className="wrap section__grid">
        <h2 className="section__title" id="skills-title">
          Skills
        </h2>
        <div className="section__body">
          <dl className="skills">
            {skills.map((row) => (
              <div className="skills__row" key={row.group}>
                <dt>{row.group}</dt>
                <dd>{row.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
