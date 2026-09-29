import { education, experience } from "../data";

function Timeline({ heading, items }) {
  return (
    <div className="timeline">
      <h3 className="timeline__heading">{heading}</h3>
      <ol>
        {items.map((item) => (
          <li key={item.title}>
            <span className="timeline__when">{item.when}</span>
            <div className="timeline__what">
              <strong>{item.title}</strong>
              <span className="timeline__place">{item.place}</span>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Background() {
  return (
    <section className="section" id="background" aria-labelledby="background-title">
      <div className="wrap section__grid">
        <h2 className="section__title" id="background-title">
          Background
        </h2>
        <div className="section__body background">
          <Timeline heading="Experience" items={experience} />
          <Timeline heading="Education" items={education} />
        </div>
      </div>
    </section>
  );
}
