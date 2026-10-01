import { useEffect, useState } from "react";
import Browser from "./Browser";
import Qr from "./Qr";
import RequestLog from "./RequestLog";
import SketchFrame from "./SketchFrame";
import { useRequestLog } from "../hooks";
import "../styles/av.css";

// Everything below is sample data. No real teams or people.
const TEAM = { id: "AVI-A3-40817", name: "Null Pointers", track: "Robotics", mode: "Physical" };
const SEED = [
  { id: 1, name: "Aarav Menon", role: "Team Lead", email: "aarav@example.com", phone: "+91 90000 00001", gender: "Male" },
  { id: 2, name: "Diya Rao", role: "Team Member", email: "diya@example.com", phone: "+91 90000 00002", gender: "Female" },
  { id: 3, name: "Kabir Nair", role: "Team Member", email: "kabir@example.com", phone: "+91 90000 00003", gender: "Male" },
];
const MAX_MEMBERS = 5;

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function SessionClock() {
  const [left, setLeft] = useState(59 * 60 + 43);
  useEffect(() => {
    const id = setInterval(() => setLeft((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(left / 3600);
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return (
    <div className="av-clock">
      <span>Session Left:</span>
      <b>
        {h} h {m} m {s} s
      </b>
    </div>
  );
}

function Mascot() {
  return (
    <svg className="av-mascot" viewBox="0 0 220 250" aria-hidden="true">
      <defs>
        <radialGradient id="av-glass" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#67e8f9" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0e7490" stopOpacity="0.12" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="226" rx="92" ry="17" fill="none" stroke="#22d3ee" strokeWidth="3" opacity="0.9" />
      <ellipse cx="110" cy="226" rx="70" ry="11" fill="rgba(34,211,238,0.18)" stroke="#67e8f9" strokeWidth="1.5" />
      <ellipse cx="110" cy="176" rx="46" ry="38" fill="#f8fafc" stroke="#0e7490" strokeWidth="4" />
      <rect x="92" y="170" width="36" height="20" rx="5" fill="#0e7490" />
      <circle cx="101" cy="180" r="3.2" fill="#67e8f9" />
      <circle cx="115" cy="180" r="3.2" fill="#67e8f9" />
      <ellipse cx="70" cy="180" rx="15" ry="27" fill="#0f172a" stroke="#0e7490" strokeWidth="3" transform="rotate(18 70 180)" />
      <ellipse cx="150" cy="176" rx="15" ry="27" fill="#0f172a" stroke="#0e7490" strokeWidth="3" transform="rotate(-24 150 176)" />
      <circle cx="110" cy="92" r="74" fill="url(#av-glass)" stroke="#22d3ee" strokeWidth="6" />
      <circle cx="68" cy="48" r="19" fill="#0f172a" />
      <circle cx="152" cy="48" r="19" fill="#0f172a" />
      <circle cx="110" cy="96" r="54" fill="#f8fafc" />
      <ellipse cx="88" cy="94" rx="13" ry="17" fill="#0f172a" transform="rotate(-18 88 94)" />
      <ellipse cx="132" cy="94" rx="13" ry="17" fill="#0f172a" transform="rotate(18 132 94)" />
      <circle cx="90" cy="92" r="6" fill="#fff" />
      <circle cx="130" cy="92" r="6" fill="#fff" />
      <circle cx="91" cy="93" r="3" fill="#0f172a" />
      <circle cx="129" cy="93" r="3" fill="#0f172a" />
      <ellipse cx="110" cy="112" rx="8" ry="5.5" fill="#0f172a" />
      <path d="M100 120 Q110 133 120 120" fill="#fb7185" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function Login({ onSignIn }) {
  const [email, setEmail] = useState("aarav@example.com");
  const [password, setPassword] = useState("demo-password");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const body = { email: email.trim(), password: password ? "********" : "" };
    if (!email.includes("@") || !password) {
      const text = "Enter the email and password provided to your team.";
      setError(text);
      onSignIn(false, body, { detail: text });
      return;
    }
    setError("");
    onSignIn(true, body, { access_token: "eyJhbGciOiJIUzI1NiJ9...", token_type: "bearer", team: TEAM });
  }

  return (
    <div className="av-login">
      <div className="av-login__art">
        <Mascot />
      </div>
      <form className="av-card av-login__card" onSubmit={submit} noValidate>
        <p className="av-login__kicker">SIGN IN</p>
        <p className="av-login__welcome">Welcome to Avishkaar! Log in to spark innovation.</p>

        <label htmlFor="av-email">Email</label>
        <input id="av-email" type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="av-pass">Password</label>
        <div className="av-pass">
          <input id="av-pass" type={show ? "text" : "password"} autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
          <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"}>
            <Icon>
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </Icon>
          </button>
        </div>
        <p className="av-login__forgot">Forgot password?</p>

        <button type="submit" className="av-signin">
          Sign In
        </button>
        {error && (
          <p className="av-error" role="alert">
            {error}
          </p>
        )}
        <p className="av-login__hint">Login with the credentials provided to your team. In this demo they are already filled in.</p>
      </form>
    </div>
  );
}

function Team({ record, onPreview }) {
  const [members, setMembers] = useState(SEED);
  const [nextId, setNextId] = useState(4);
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({ name: "", phone: "" });
  const [adding, setAdding] = useState(false);
  const [addDraft, setAddDraft] = useState({ name: "", email: "" });
  const [addError, setAddError] = useState("");
  const [requested, setRequested] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function startEdit(m) {
    setEditing(m.id);
    setDraft({ name: m.name, phone: m.phone });
  }

  function saveEdit(m) {
    const name = draft.name.trim();
    if (name.length < 2) return;
    const updated = { ...m, name, phone: draft.phone.trim() || m.phone };
    setMembers((prev) => prev.map((x) => (x.id === m.id ? updated : x)));
    setEditing(null);
    record("PATCH", `/api/team/members/${m.id}`, 200, { name: updated.name, phone: updated.phone }, updated);
  }

  function addMember(e) {
    e.preventDefault();
    const name = addDraft.name.trim();
    const email = addDraft.email.trim();
    const body = { name, email, role: "Team Member" };
    if (name.length < 2 || !email.includes("@")) {
      const text = "Add a name and a valid email.";
      setAddError(text);
      record("POST", "/api/team/members", 422, body, { detail: text });
      return;
    }
    const created = { id: nextId, name, role: "Team Member", email, phone: "Not added yet", gender: "Not set" };
    setMembers((prev) => [...prev, created]);
    setNextId((n) => n + 1);
    setAdding(false);
    setAddDraft({ name: "", email: "" });
    setAddError("");
    record("POST", "/api/team/members", 201, body, created);
  }

  function requestAccommodation() {
    setRequested(true);
    record("POST", "/api/team/accommodation", 201, { team_id: TEAM.id }, { team_id: TEAM.id, status: "requested" });
  }

  function openPreview(m) {
    onPreview(m);
    record("GET", `/api/team/members/${m.id}/id-card`, 200, {}, { member_id: m.id, format: "png", qr: `AVI:${TEAM.id}:${m.id}` });
  }

  return (
    <>
      <div className="av-app">
        <aside className="av-side" aria-hidden="true">
          <span className="av-side__logo">
            <Icon>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </Icon>
          </span>
          <span className="av-side__item is-on">
            <Icon>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </Icon>
          </span>
          {[0, 1].map((i) => (
            <span className="av-side__item" key={i}>
              <Icon>
                <path d="M22 12h-6l-2 3h-4l-2-3H2" />
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
              </Icon>
            </span>
          ))}
          <span className="av-side__item av-side__exit">
            <Icon>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="M16 17l5-5-5-5" />
              <path d="M21 12H9" />
            </Icon>
          </span>
        </aside>

        <div className="av-main">
          <SessionClock />
          <h4 className="av-title">TEAM OVERVIEW</h4>

          <div className="av-top">
            <section className="av-card av-team">
              <div className="av-team__row">
                <div>
                  <p className="av-team__name">
                    Team : <span>{TEAM.name.toUpperCase()}</span>
                  </p>
                  <span className="av-pill">Team-ID: {TEAM.id}</span>
                </div>
                <div className="av-qrbox">
                  <Qr value={TEAM.id} size={72} />
                  <span>{TEAM.id}</span>
                </div>
              </div>
              <button type="button" className="av-more" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
                SHOW MORE DETAILS {expanded ? "\u25B2" : "\u25BC"}
              </button>
              {expanded && (
                <dl className="av-details">
                  <div>
                    <dt>Track</dt>
                    <dd>{TEAM.track}</dd>
                  </div>
                  <div>
                    <dt>Mode</dt>
                    <dd>{TEAM.mode}</dd>
                  </div>
                  <div>
                    <dt>Members</dt>
                    <dd>
                      {members.length} of {MAX_MEMBERS}
                    </dd>
                  </div>
                </dl>
              )}
            </section>

            <section className="av-notices">
              <p className="av-notices__lead">Please complete your team member details to ensure everything is correct.</p>
              <button type="button" className="av-btn av-btn--wide" onClick={requestAccommodation} disabled={requested}>
                {requested ? "Accommodation requested" : "Request Accommodation"}
              </button>
              <div className="av-alert av-alert--amber">
                <p className="av-alert__title">CRITICAL: CHECK CERTIFICATE DETAILS</p>
                <p>Make sure every name is 100% correct. Certificates are issued exactly as entered here and cannot be changed later.</p>
              </div>
              <div className="av-alert av-alert--red">
                <p className="av-alert__title">MANDATORY: UPLOAD VALID PHOTOS</p>
                <p>Every member needs a proper individual photo. Participants without a valid ID card from this portal are not allowed on campus.</p>
              </div>
            </section>
          </div>

          <h4 className="av-sub">Team Members</h4>
          <div className="av-members">
            {members.map((m) => (
              <article className="av-card av-member" key={m.id}>
                <header>
                  <span className="av-avatar" aria-hidden="true">
                    {initials(m.name)}
                  </span>
                  <div>
                    <h5>{m.name}</h5>
                    <p>{m.role}</p>
                  </div>
                </header>

                {editing === m.id ? (
                  <form
                    className="av-edit"
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEdit(m);
                    }}
                  >
                    <label htmlFor={`av-en-${m.id}`}>Name</label>
                    <input id={`av-en-${m.id}`} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                    <label htmlFor={`av-ep-${m.id}`}>Phone</label>
                    <input id={`av-ep-${m.id}`} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
                    <div className="av-actions">
                      <button type="submit" className="av-btn">
                        Save
                      </button>
                      <button type="button" className="av-btn av-btn--ghost" onClick={() => setEditing(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <dl className="av-facts">
                      <div>
                        <dt>Email:</dt>
                        <dd>{m.email}</dd>
                      </div>
                      <div>
                        <dt>Phone:</dt>
                        <dd>{m.phone}</dd>
                      </div>
                      <div>
                        <dt>Gender:</dt>
                        <dd>{m.gender}</dd>
                      </div>
                    </dl>
                    <div className="av-member__foot">
                      <span className="av-qrbox av-qrbox--small">
                        <Qr value={m.email} size={56} />
                      </span>
                      <div className="av-actions av-actions--stack">
                        <button type="button" className="av-btn" onClick={() => startEdit(m)}>
                          Edit Details
                        </button>
                        <button type="button" className="av-btn av-btn--green" onClick={() => openPreview(m)}>
                          Download ID Card
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </article>
            ))}

            <div className="av-add">
              {adding ? (
                <form className="av-edit" onSubmit={addMember}>
                  <label htmlFor="av-an">Name</label>
                  <input id="av-an" value={addDraft.name} onChange={(e) => setAddDraft({ ...addDraft, name: e.target.value })} />
                  <label htmlFor="av-ae">Email</label>
                  <input id="av-ae" type="email" value={addDraft.email} onChange={(e) => setAddDraft({ ...addDraft, email: e.target.value })} />
                  {addError && (
                    <p className="av-error" role="alert">
                      {addError}
                    </p>
                  )}
                  <div className="av-actions">
                    <button type="submit" className="av-btn">
                      Add
                    </button>
                    <button type="button" className="av-btn av-btn--ghost" onClick={() => setAdding(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : members.length >= MAX_MEMBERS ? (
                <p className="av-add__full">Team is full ({MAX_MEMBERS} of {MAX_MEMBERS})</p>
              ) : (
                <>
                  <p className="av-add__title">Add Member Details</p>
                  <button type="button" className="av-btn" onClick={() => setAdding(true)}>
                    Add Member
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

function IdCard({ member, onClose }) {
  return (
    <div className="av-modal" role="dialog" aria-modal="true" aria-label="ID card preview">
      <div className="av-idcard">
        <p className="av-idcard__event">AVISHKAAR</p>
        <div className="av-idcard__photo" aria-hidden="true">
          {initials(member.name)}
        </div>
        <p className="av-idcard__name">{member.name}</p>
        <p className="av-idcard__role">{member.role}</p>
        <p className="av-idcard__team">
          {TEAM.name} &middot; {TEAM.id}
        </p>
        <Qr value={`${TEAM.id}-${member.id}`} size={84} />
        <p className="av-idcard__note">Preview only. The real portal downloads the card.</p>
        <button type="button" className="av-btn" onClick={onClose} autoFocus>
          Close
        </button>
      </div>
    </div>
  );
}

const TABS = [
  { id: "login", label: "Sign in" },
  { id: "team", label: "Team overview" },
  { id: "api", label: "API log" },
];

export default function AvishkaarSketch() {
  const [tab, setTab] = useState("login");
  const [resetKey, setResetKey] = useState(0);
  const [preview, setPreview] = useState(null);
  const { log, record, clear } = useRequestLog();

  function reset() {
    clear();
    setTab("login");
    setPreview(null);
    setResetKey((k) => k + 1);
  }

  function onSignIn(ok, request, response) {
    record("POST", "/api/auth/login", ok ? 200 : 401, request, response);
    if (ok) setTab("team");
  }

  const tabs = TABS.map((t) => (t.id === "api" ? { ...t, count: log.length } : t));

  return (
    <SketchFrame
      prefix="av"
      tone="dark"
      tabs={tabs}
      tab={tab}
      onTab={setTab}
      onReset={reset}
      note="Recreated from the live portal with sample data. These are not real teams or people, and nothing here is sent anywhere."
    >
      <div role="tabpanel" id="av-panel-login" aria-labelledby="av-tab-login" hidden={tab !== "login"}>
        <Browser url="avishkaar.co/login" tone="dark">
          <Login key={`l${resetKey}`} onSignIn={onSignIn} />
        </Browser>
      </div>

      <div role="tabpanel" id="av-panel-team" aria-labelledby="av-tab-team" hidden={tab !== "team"}>
        <Browser
          url="avishkaar.co/users"
          tone="dark"
          overlay={preview ? <IdCard member={preview} onClose={() => setPreview(null)} /> : null}
        >
          <Team key={`t${resetKey}`} record={record} onPreview={setPreview} />
        </Browser>
      </div>

      <div role="tabpanel" id="av-panel-api" aria-labelledby="av-tab-api" className="panel" hidden={tab !== "api"}>
        <RequestLog log={log} emptyText="Nothing has been sent yet. Sign in, edit a member or add one, and the request shows up here." />
      </div>
    </SketchFrame>
  );
}
