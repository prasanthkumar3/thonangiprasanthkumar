import { Fragment } from "react";
import { projects } from "../data";
import AvishkaarSketch from "./AvishkaarSketch";
import ExamForgeSketch from "./ExamForgeSketch";
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

function Stage({ id, project, hint, children, extra }) {
  return (
    <article className={`stage stage--${id}`}>
      <header className="stage__head">
        <div>
          <h3 className="stage__name display">
            <a href={project.url} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          <p className="stage__kind">{project.kind}</p>
        </div>
        <p className="stage__hint">{hint}</p>
      </header>
      <div className="stage__backdrop">{children}</div>
      <Details project={project}>{extra}</Details>
    </article>
  );
}

export default function Work() {
  const { avishkaar, examforge, techno } = projects;

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work__head">
          <h2 className="work__title display" id="work-title">
            Three sites, built for real events and real exams.
          </h2>
          <p className="work__lead">
            Each one below is a working sketch of the real thing, so you can try the flow instead of reading about it.
          </p>
        </header>

        <Stage id="avishkaar" project={avishkaar} hint="Sign in, open the team overview, edit a member, download an ID card, then check the API log.">
          <AvishkaarSketch />
        </Stage>

        <Stage id="examforge" project={examforge} hint="Take the demo exam for an instant score, or publish your own as an examiner.">
          <ExamForgeSketch />
        </Stage>

        <Stage
          id="techno"
          project={techno}
          hint="Drag the slider to see the layout adapt from phone to laptop."
          extra={
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
          }
        >
          <TechnoSketch />
        </Stage>
      </div>
    </section>
  );
}
