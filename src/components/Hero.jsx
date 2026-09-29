import { glance, person } from "../data";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <p className="hero__status">
          <span className="hero__dot" aria-hidden="true" />
          Open to entry-level software roles
        </p>

        <h1 className="hero__name">
          <span className="hero__line">
            <span>Thonangi</span>
          </span>
          <span className="hero__line">
            <span>Prasanth Kumar</span>
          </span>
        </h1>

        <div className="hero__lower">
          <div className="hero__intro">
            <p className="hero__lead">
              Full-stack developer, class of 2026. I build the websites behind college and
              national events: registration, team management, and the admin tools organizers
              rely on while the event is running.
            </p>
            <div className="hero__actions">
              <a className="button" href="#work">
                See selected work
              </a>
              <a className="textlink" href={person.resume} target="_blank" rel="noreferrer">
                Download resume (PDF)
              </a>
            </div>
          </div>

          <ul className="glance">
            {glance.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
