import { Fragment } from "react";
import { projects } from "../data";

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

function Project({ project }) {
  const { name, kind, year, role, url, urlLabel, summary, built, stack, figures, image } = project;

  return (
    <article className="project">
      <header className="project__head">
        <h3 className="project__name">
          <a href={url} target="_blank" rel="noreferrer">
            {name}
          </a>
        </h3>
        <p className="project__kind">{kind}</p>
      </header>

      {image && (
        <figure className="project__shot">
          <img src={image} alt={`Screenshot of the ${name} website`} loading="lazy" />
        </figure>
      )}

      <div className="project__grid">
        <div className="project__main">
          <p className="project__summary">{summary}</p>
          <ul className="project__built">
            {built.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <aside className="project__side">
          <dl className="facts">
            <div>
              <dt>Year</dt>
              <dd>{year}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
            {stack && (
              <div>
                <dt>Built with</dt>
                <dd>{stack}</dd>
              </div>
            )}
            <div>
              <dt>Live site</dt>
              <dd>
                <a className="textlink" href={url} target="_blank" rel="noreferrer">
                  {breakable(urlLabel)}
                </a>
              </dd>
            </div>
          </dl>

          <ul className="figures">
            {figures.map((figure) => (
              <li key={figure.label}>
                <span className="figures__value">{figure.value}</span>
                <span className="figures__label">{figure.label}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap section__grid">
        <h2 className="section__title" id="work-title">
          Selected work
        </h2>
        <div className="section__body">
          <p className="statement">
            Both sites went live for real events with real dates. I built them, and I stayed on to
            keep them running.
          </p>
          <div className="projects">
            {projects.map((project) => (
              <Project key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
