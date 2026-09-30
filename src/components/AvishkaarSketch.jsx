import { useState } from "react";

const TRACKS = ["AI", "Web3", "IoT", "Robotics"];
const MODES = ["Physical", "Virtual"];
const TABS = [
  { id: "register", label: "Register" },
  { id: "organizer", label: "Organizer view" },
  { id: "api", label: "API log" },
];

const SEED = [
  { id: 5, name: "Null Pointers", track: "Robotics", mode: "Physical", members: 4, status: "Confirmed" },
  { id: 4, name: "Circuit Breakers", track: "IoT", mode: "Physical", members: 3, status: "Pending" },
  { id: 3, name: "Deep Ocean Crew", track: "Web3", mode: "Virtual", members: 4, status: "Confirmed" },
  { id: 2, name: "Byte Bandits", track: "AI", mode: "Virtual", members: 2, status: "Confirmed" },
  { id: 1, name: "Loopback", track: "AI", mode: "Physical", members: 3, status: "Pending" },
];

const EMPTY_FORM = { name: "", track: "AI", mode: "Physical", members: 3 };

export default function AvishkaarSketch() {
  const [tab, setTab] = useState("register");
  const [teams, setTeams] = useState(SEED);
  const [log, setLog] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState(null); // { kind: "ok" | "error", text }
  const [filter, setFilter] = useState("All");
  const [nextId, setNextId] = useState(6);

  const record = (entry) => setLog((prev) => [{ ...entry, at: prev.length + 1 }, ...prev].slice(0, 12));

  function submit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const body = { name, track: form.track, mode: form.mode, members: form.members };

    if (name.length < 2) {
      const text = "Enter a team name with at least 2 characters.";
      setMessage({ kind: "error", text });
      record({ method: "POST", path: "/api/teams", status: 422, request: body, response: { error: text } });
      return;
    }
    if (teams.some((t) => t.name.toLowerCase() === name.toLowerCase())) {
      const text = "That team name is already registered.";
      setMessage({ kind: "error", text });
      record({ method: "POST", path: "/api/teams", status: 409, request: body, response: { error: text } });
      return;
    }

    const created = { id: nextId, ...body, status: "Pending" };
    setTeams((prev) => [created, ...prev]);
    setNextId((n) => n + 1);
    setForm(EMPTY_FORM);
    setMessage({ kind: "ok", text: `${name} is registered. Open the organizer view to see it.` });
    record({ method: "POST", path: "/api/teams", status: 201, request: body, response: created });
  }

  function toggleStatus(team) {
    const status = team.status === "Confirmed" ? "Pending" : "Confirmed";
    const updated = { ...team, status };
    setTeams((prev) => prev.map((t) => (t.id === team.id ? updated : t)));
    record({ method: "PATCH", path: `/api/teams/${team.id}`, status: 200, request: { status }, response: updated });
  }

  function reset() {
    setTeams(SEED);
    setLog([]);
    setForm(EMPTY_FORM);
    setMessage(null);
    setFilter("All");
    setNextId(6);
  }

  function onTabKey(e) {
    const i = TABS.findIndex((t) => t.id === tab);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    else return;
    e.preventDefault();
    setTab(TABS[next].id);
    document.getElementById(`av-tab-${TABS[next].id}`)?.focus();
  }

  const shown = filter === "All" ? teams : teams.filter((t) => t.track === filter);
  const confirmed = teams.filter((t) => t.status === "Confirmed").length;
  const latest = log[0];

  return (
    <div className="sketch">
      <div className="sketch__bar">
        <span className="sketch__url">Sketch of the registration flow, demo data</span>
        <button type="button" className="sketch__reset" onClick={reset}>
          Reset demo
        </button>
      </div>

      <div className="tabs" role="tablist" aria-label="Sketch views" onKeyDown={onTabKey}>
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`av-tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`av-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className="tabs__tab"
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === "api" && log.length > 0 && <span className="tabs__count">{log.length}</span>}
          </button>
        ))}
      </div>

      {tab === "register" && (
        <div role="tabpanel" id="av-panel-register" aria-labelledby="av-tab-register" className="panel">
          <form className="reg" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="av-name">Team name</label>
              <input
                id="av-name"
                type="text"
                autoComplete="off"
                placeholder="e.g. Kernel Panic"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <fieldset className="field">
              <legend>Track</legend>
              <div className="seg">
                {TRACKS.map((t) => (
                  <label key={t} className={form.track === t ? "is-on" : ""}>
                    <input
                      type="radio"
                      name="av-track"
                      value={t}
                      checked={form.track === t}
                      onChange={() => setForm({ ...form, track: t })}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="reg__row">
              <fieldset className="field">
                <legend>Mode</legend>
                <div className="seg">
                  {MODES.map((m) => (
                    <label key={m} className={form.mode === m ? "is-on" : ""}>
                      <input
                        type="radio"
                        name="av-mode"
                        value={m}
                        checked={form.mode === m}
                        onChange={() => setForm({ ...form, mode: m })}
                      />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="field">
                <span className="field__label" id="av-members-label">
                  Members
                </span>
                <div className="stepper" role="group" aria-labelledby="av-members-label">
                  <button
                    type="button"
                    aria-label="Fewer members"
                    onClick={() => setForm({ ...form, members: Math.max(1, form.members - 1) })}
                  >
                    &minus;
                  </button>
                  <output aria-live="polite">{form.members}</output>
                  <button
                    type="button"
                    aria-label="More members"
                    onClick={() => setForm({ ...form, members: Math.min(5, form.members + 1) })}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="reg__submit">
              <button type="submit" className="button">
                Register team
              </button>
              {message && (
                <p className={`note note--${message.kind}`} role="status">
                  {message.text}
                </p>
              )}
            </div>
          </form>
        </div>
      )}

      {tab === "organizer" && (
        <div role="tabpanel" id="av-panel-organizer" aria-labelledby="av-tab-organizer" className="panel">
          <div className="stats">
            <div>
              <strong>{teams.length}</strong>
              <span>teams</span>
            </div>
            <div>
              <strong>{confirmed}</strong>
              <span>confirmed</span>
            </div>
            <div>
              <strong>{teams.length - confirmed}</strong>
              <span>pending</span>
            </div>
          </div>

          <div className="chips" role="group" aria-label="Filter by track">
            {["All", ...TRACKS].map((t) => (
              <button
                key={t}
                type="button"
                className={filter === t ? "is-on" : ""}
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="table" role="table" aria-label="Registered teams">
            <div className="table__head" role="row">
              <span role="columnheader">Team</span>
              <span role="columnheader">Track</span>
              <span role="columnheader" className="hide-sm">
                Mode
              </span>
              <span role="columnheader" className="hide-sm">
                Members
              </span>
              <span role="columnheader">Status</span>
            </div>
            {shown.length === 0 && <p className="table__empty">No teams in this track yet.</p>}
            {shown.map((t) => (
              <div className="table__row" role="row" key={t.id}>
                <span role="cell" className="table__name">
                  {t.name}
                </span>
                <span role="cell">{t.track}</span>
                <span role="cell" className="hide-sm">
                  {t.mode}
                </span>
                <span role="cell" className="hide-sm">
                  {t.members}
                </span>
                <span role="cell">
                  <button
                    type="button"
                    className={`status${t.status === "Confirmed" ? " is-on" : ""}`}
                    onClick={() => toggleStatus(t)}
                    aria-label={`${t.name} is ${t.status}. Change status`}
                  >
                    {t.status}
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "api" && (
        <div role="tabpanel" id="av-panel-api" aria-labelledby="av-tab-api" className="panel">
          {!latest && (
            <p className="api__empty">
              Nothing has been sent yet. Register a team or change a status and the request shows up
              here.
            </p>
          )}
          {latest && (
            <>
              <p className="api__line">
                <span className="api__method">{latest.method}</span>
                <span>{latest.path}</span>
                <span className={`api__status${latest.status >= 400 ? " is-bad" : ""}`}>{latest.status}</span>
              </p>
              <div className="api__grid">
                <div>
                  <p className="api__label">Request body</p>
                  <pre>{JSON.stringify(latest.request, null, 2)}</pre>
                </div>
                <div>
                  <p className="api__label">Response</p>
                  <pre>{JSON.stringify(latest.response, null, 2)}</pre>
                </div>
              </div>
              {log.length > 1 && (
                <ul className="api__history" aria-label="Earlier requests">
                  {log.slice(1).map((entry) => (
                    <li key={entry.at}>
                      <span className="api__method">{entry.method}</span>
                      <span>{entry.path}</span>
                      <span className={`api__status${entry.status >= 400 ? " is-bad" : ""}`}>{entry.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
