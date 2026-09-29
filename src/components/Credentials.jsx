import { beyond, certifications } from "../data";

export default function Credentials() {
  return (
    <section className="section section--wash" id="credentials" aria-labelledby="credentials-title">
      <div className="wrap section__grid">
        <h2 className="section__title" id="credentials-title">
          Certifications
        </h2>
        <div className="section__body credentials">
          <ul className="certs">
            {certifications.map((cert) => (
              <li key={cert.title}>
                <span className="certs__title">{cert.title}</span>
                <span className="certs__issuer">{cert.issuer}</span>
              </li>
            ))}
          </ul>

          <div className="beyond">
            <h3 className="beyond__heading">Outside the code</h3>
            {beyond.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
