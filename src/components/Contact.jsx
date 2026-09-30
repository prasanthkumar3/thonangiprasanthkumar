import { useEffect, useRef, useState } from "react";
import { person } from "../data";
import "../styles/contact.css";

function CopyEmail({ email }) {
  const [state, setState] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let next = "done";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  const label =
    state === "done" ? "Copied" : state === "failed" ? "Copy failed, select the address" : "Copy email";

  return (
    <>
      <button type="button" className="copy" onClick={copy} data-state={state}>
        {label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "done" ? "Email address copied" : ""}
      </span>
    </>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function compose(e) {
    e.preventDefault();
    const who = name.trim();
    const subject = who ? `Hello from ${who}` : "Hello Prasanth";
    const body = `${message.trim()}${who ? `\n\n${who}` : ""}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <footer className="contact on-dark" id="contact">
      <div className="wrap">
        <div className="contact__top">
          <div>
            <h2 className="contact__title display">
              I'm looking for my first full-time role in software development.
            </h2>
            <p className="contact__lead">
              If you're hiring, or you're organizing an event that needs a website, write to me.
            </p>
            <div className="contact__mail">
              <a href={`mailto:${person.email}`}>{person.email}</a>
              <CopyEmail email={person.email} />
            </div>
          </div>

          <form className="composer" onSubmit={compose}>
            <p className="composer__title display">Write it here</p>
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="c-msg">Message</label>
            <textarea
              id="c-msg"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A role, an event, or just hello."
            />
            <button type="submit" className="button button--light">
              Open in my email app
            </button>
            <p className="composer__note">This opens your email app with the message filled in. Nothing is sent from this page.</p>
          </form>
        </div>

        <ul className="contact__links">
          <li>
            <span>Phone</span>
            <a href={person.phoneHref}>{person.phone}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={person.linkedin} target="_blank" rel="noreferrer">
              {person.linkedinLabel}
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={person.github} target="_blank" rel="noreferrer">
              {person.githubLabel}
            </a>
          </li>
          <li>
            <span>Resume</span>
            <a href={person.resume} target="_blank" rel="noreferrer">
              Download as PDF
            </a>
          </li>
        </ul>

        <div className="contact__base">
          <p>&copy; {new Date().getFullYear()} {person.name}</p>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
