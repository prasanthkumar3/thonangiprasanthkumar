import { Fragment } from "react";
import { projects } from "../data";
import AvishkaarSketch from "./AvishkaarSketch";
import TechnoSketch from "./TechnoSketch";
import CountUp from "./CountUp";
import "../styles/work.css";

// Let long addresses wrap at the dots instead of mid-word.
function breakable(label) {
  const parts = label.split(".");
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <>
          .<wbr />
        </>
      )}
    </Fragment>
  ));
}

function Details({ project, children }) {
  return (
    <div className="details">
      <p className="details__summary">{project.summary}</p>
      <ul className="details__built">
        {project.built.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <aside className="details__side">
        <dl className="facts">
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          {project.stack && (
            <div>
              <dt>Built with</dt>
              <dd>{project.stack}</dd>
            </div>
          )}
          <div>
            <dt>Live site</dt>
            <dd>
              <a className="textlink" href={project.url} target="_blank" rel="noreferrer">
                {breakable(project.urlLabel)}
              </a>
            </dd>
          </div>
        </dl>
        {children}
      </aside>
    </div>
  );
}

export default function Work() {
  const { avishkaar, techno } = projects;

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work__head">
          <h2 className="work__title display" id="work-title">
            Two sites for two real events.
          </h2>
          <p className="work__lead">
            I built both and stayed on to keep them running. Below are working sketches of what they
            do, so you can try the flow instead of reading about it.
          </p>
        </header>

        <article className="stage stage--one">
          <header className="stage__head">
            <div>
              <h3 className="stage__name display">
                <a href={avishkaar.url} target="_blank" rel="noreferrer">
                  {avishkaar.name}
                </a>
              </h3>
              <p className="stage__kind">{avishkaar.kind}</p>
            </div>
            <p className="stage__hint">Register a team, then open the organizer view and the API log.</p>
          </header>
          <div className="stage__backdrop">
            <AvishkaarSketch />
          </div>
          <Details project={avishkaar} />
        </article>

        <article className="stage stage--two">
          <header className="stage__head">
            <div>
              <h3 className="stage__name display">
                <a href={techno.url} target="_blank" rel="noreferrer">
                  {techno.name}
                </a>
              </h3>
              <p className="stage__kind">{techno.kind}</p>
            </div>
            <p className="stage__hint">Drag the slider to see the layout adapt from phone to laptop.</p>
          </header>
          <div className="stage__backdrop">
            <TechnoSketch />
          </div>
          <Details project={techno}>
            <ul className="figures">
              <li>
                <span className="figures__value display">
                  <CountUp to={290} suffix="+" />
                </span>
                <span className="figures__label">participants</span>
              </li>
              <li>
                <span className="figures__value display">
                  <CountUp to={90} suffix="+" />
                </span>
                <span className="figures__label">teams</span>
              </li>
            </ul>
          </Details>
        </article>
      </div>
    </section>
  );
}
