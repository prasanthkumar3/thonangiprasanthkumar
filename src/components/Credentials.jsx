import { certifications } from "../data";
import "../styles/credentials.css";

function Ticket({ cert }) {
  return (
    <li className={`ticket${cert.big ? " ticket--big" : ""}`}>
      <span className="ticket__seal" aria-hidden="true" />
      <span className="ticket__issuer">{cert.issuer}</span>
      <span className="ticket__title display">{cert.title}</span>
    </li>
  );
}

export default function Credentials() {
  return (
    <section className="creds" id="credentials" aria-labelledby="creds-title">
      <div className="wrap creds__head">
        <h2 className="creds__title display" id="creds-title">
          Certifications
        </h2>
        <p className="creds__lead">Seven certificates and courses, across cloud, C, machine learning and security.</p>
      </div>

      <div className="creds__track" tabIndex={0} aria-label="Certifications, scrolls automatically">
        <ul className="creds__row">
          {certifications.map((cert) => (
            <Ticket key={cert.title} cert={cert} />
          ))}
        </ul>
        <ul className="creds__row creds__row--copy" aria-hidden="true">
          {certifications.map((cert) => (
            <Ticket key={cert.title} cert={cert} />
          ))}
        </ul>
      </div>
    </section>
  );
}
