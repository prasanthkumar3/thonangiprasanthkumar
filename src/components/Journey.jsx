import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/journey.css";

/* ------------------------------------------------------------------
   EDIT HERE
   Each clip is one thing on the timeline.
   - track:  "study" | "intern" | "build"
   - lane:   0 or 1. Clips on the same track that overlap need different lanes
             (the "build" track has two lanes, the others have one).
   - start / end: decimal years. Month = year + (monthNumber - 1) / 12
                  e.g. Dec 2024 = 2024 + 11 / 12, end of Feb 2025 = 2025 + 2 / 12
   - approx: true draws a hatched bar (use it when you only know the year).
   - short:  the label printed on the bar.
   - outside: true puts the label beside the bar (for very short bars).
   - labelLeft: true puts that outside label on the left of the bar instead.
------------------------------------------------------------------- */
const CLIPS = [
  {
    id: "ssc",
    track: "study",
    lane: 0,
    short: "SSC",
    title: "SSC",
    when: "2020",
    place: "Board of Secondary Education, Andhra Pradesh",
    text: "CGPA 10.0",
    start: 2020,
    end: 2020.4,
    approx: true,
  },
  {
    id: "inter",
    track: "study",
    lane: 0,
    short: "Intermediate",
    title: "Intermediate (MPC)",
    when: "Completed in 2022",
    place: "Sri Chaitanya Junior College",
    text: "87.3%",
    start: 2020.4,
    end: 2022.4,
    approx: true,
  },
  {
    id: "btech",
    track: "study",
    lane: 0,
    short: "B.Tech, Computer Science",
    title: "B.Tech, Computer Science & Engineering",
    when: "Class of 2026",
    place: "Aditya Institute of Technology & Management, Tekkali",
    text: "CGPA 8.1. Looking for a first full-time role in software development.",
    start: 2022.5,
    end: 2026.4,
    approx: true,
  },
  {
    id: "community",
    track: "intern",
    lane: 0,
    short: "Workshops",
    title: "Community internship, social media awareness",
    when: "May 2024",
    place: "Tekkali, Srikakulam, Andhra Pradesh",
    text: "Ran workshops on digital literacy, online privacy and misinformation for rural communities, and used surveys and discussions to promote responsible social media use.",
    start: 2024 + 4 / 12,
    end: 2024 + 5 / 12,
    outside: true,
    labelLeft: true,
  },
  {
    id: "servicenow",
    track: "intern",
    lane: 0,
    short: "ServiceNow",
    title: "Virtual internship, ServiceNow platform",
    when: "2025",
    place: "ServiceNow University with SmartBridge",
    text: "Platform fundamentals and administration, Flows, the Automated Test Framework, reports and configuration. Covered the Certified System Administrator exam modules.",
    start: 2025,
    end: 2026,
    approx: true,
  },
  {
    id: "avishkaar",
    track: "build",
    lane: 0,
    short: "AVISHKAAR",
    title: "AVISHKAAR, national hackathon",
    when: "2025",
    place: "AITAM",
    text: "Designed and built the full-stack platform: registrations, participant management, event listings and organizer dashboards.",
    start: 2025,
    end: 2026,
    approx: true,
  },
  {
    id: "examforge",
    track: "build",
    lane: 0,
    short: "ExamForge",
    title: "ExamForge, online exam platform",
    when: "2026",
    place: "Personal project",
    text: "A role-based exam platform: examiners build and publish exams, students take them with a room code, and scores are calculated the moment an attempt is submitted. FastAPI and PostgreSQL behind a React frontend.",
    start: 2026,
    end: 2027,
    approx: true,
  },
  {
    id: "techno",
    track: "build",
    lane: 1,
    short: "Techno Vision",
    title: "Techno Vision, event website",
    when: "Dec 2024 to Feb 2025",
    place: "CSE Department, AITAM",
    text: "Developed and managed the official website for a two-day technical event. It supported 290+ participants from 90+ teams.",
    start: 2024 + 11 / 12,
    end: 2025 + 2 / 12,
    outside: true,
  },
];

const TRACKS = [
  { id: "study", label: "Study", lanes: 1, tag: "Study" },
  { id: "intern", label: "Internships", lanes: 1, tag: "Internship" },
  { id: "build", label: "Builds", lanes: 2, tag: "Build" },
];

// The visible range of the ruler, and where the playhead starts.
const START = 2020;
const END = 2027;
const INITIAL = 2025.15;
/* ---------------------------- end of editable part ---------------- */

const SPAN = END - START;
const YEARS = Array.from({ length: SPAN }, (_, i) => START + i);
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PLAY_SPEED = 0.5; // years per second

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const pct = (t) => ((t - START) / SPAN) * 100;

function label(t) {
  const year = Math.floor(t + 1e-6);
  const month = clamp(Math.floor((t - year) * 12 + 1e-6), 0, 11);
  return `${MONTHS[month]} ${year}`;
}

function PlayIcon({ playing }) {
  return playing ? (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="6" y="5" width="4.2" height="14" rx="1" fill="currentColor" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l11-6.8a1 1 0 0 0 0-1.72l-11-6.8A1 1 0 0 0 8 5.2z" fill="currentColor" />
    </svg>
  );
}

export default function Journey() {
  const [t, setT] = useState(INITIAL);
  const [playing, setPlaying] = useState(false);
  const fieldRef = useRef(null);
  const scrollRef = useRef(null);
  const dragging = useRef(false);

  const active = useMemo(() => CLIPS.filter((c) => t >= c.start && t < c.end), [t]);

  const now = new Date();
  const todayT = now.getFullYear() + now.getMonth() / 12 + (now.getDate() - 1) / 365;
  const showToday = todayT >= START && todayT < END;

  const seek = useCallback((clientX) => {
    const rect = fieldRef.current.getBoundingClientRect();
    const x = clamp((clientX - rect.left) / rect.width, 0, 0.9999);
    setT(START + x * SPAN);
  }, []);

  // Play: sweep the playhead from wherever it is to the end.
  useEffect(() => {
    if (!playing) return undefined;
    let raf = 0;
    let last;
    const tick = (time) => {
      if (last === undefined) last = time;
      const dt = (time - last) / 1000;
      last = time;
      let done = false;
      setT((prev) => {
        const next = prev + dt * PLAY_SPEED;
        if (next >= END - 0.001) {
          done = true;
          return END - 0.001;
        }
        return next;
      });
      const scroller = scrollRef.current;
      const field = fieldRef.current;
      if (scroller && field && scroller.scrollWidth > scroller.clientWidth) {
        // keep the playhead in view on narrow screens
        const x = ((fieldRef.current.dataset.t ? Number(fieldRef.current.dataset.t) : INITIAL) - START) / SPAN;
        scroller.scrollLeft = x * field.offsetWidth - scroller.clientWidth / 2;
      }
      if (done) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (t >= END - 0.05) setT(START);
    setPlaying(true);
  }

  function onPointerDown(e) {
    const onHandle = e.target.closest?.(".tl__handle");
    if (e.button !== 0) return;
    // Touch scrolls the timeline; only the handle drags it.
    if (e.pointerType !== "mouse" && !onHandle) return;
    setPlaying(false);
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seek(e.clientX);
  }

  function onPointerMove(e) {
    if (dragging.current) seek(e.clientX);
  }

  function onPointerUp(e) {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  function onClick(e) {
    // Taps on touch screens arrive as clicks.
    if (e.detail === 0) return;
    setPlaying(false);
    seek(e.clientX);
  }

  function onKeyDown(e) {
    const month = 1 / 12;
    let next = t;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = t + month;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = t - month;
    else if (e.key === "PageUp") next = t + 1;
    else if (e.key === "PageDown") next = t - 1;
    else if (e.key === "Home") next = START;
    else if (e.key === "End") next = END - 0.001;
    else return;
    e.preventDefault();
    setPlaying(false);
    setT(clamp(next, START, END - 0.001));
  }

  const readingAtEnd = active.length === 0;
  const gradT = CLIPS.find((c) => c.id === "btech").end;

  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="wrap">
        <header className="journey__head">
          <h2 className="journey__title display" id="journey-title">
            The path so far
          </h2>
          <p className="journey__lead">
            Drag the playhead, or press play, to see what I was working on at any point from 2020 to now.
          </p>
        </header>

        <div className="tl" data-playing={playing}>
          <div className="tl__labels">
            <div className="tl__cell tl__cell--play">
              <button
                type="button"
                className="tl__play"
                onClick={togglePlay}
                aria-label={playing ? "Pause the timeline" : "Play the timeline"}
              >
                <PlayIcon playing={playing} />
              </button>
            </div>
            {TRACKS.map((track) => (
              <div className="tl__cell" key={track.id} style={{ "--lanes": track.lanes }}>
                {track.label}
              </div>
            ))}
          </div>

          <div className="tl__scroll" ref={scrollRef}>
            <div className="tl__plane">
              <div
                className="tl__field"
                ref={fieldRef}
                data-t={t}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onClick={onClick}
              >
                <div className="tl__ruler" aria-hidden="true">
                  {YEARS.map((year) => (
                    <span className="tl__year" key={year} style={{ left: `${pct(year)}%` }}>
                      {year}
                    </span>
                  ))}
                  <span className="tl__ticks" />
                </div>

                {TRACKS.map((track) => (
                  <div className="tl__track" key={track.id}>
                    {Array.from({ length: track.lanes }, (_, lane) => (
                      <div className="tl__lane" key={lane}>
                        {CLIPS.filter((c) => c.track === track.id && c.lane === lane).map((clip) => (
                          <div
                            key={clip.id}
                            aria-hidden="true"
                            className={[
                              "clip",
                              `clip--${clip.track}`,
                              clip.approx ? "is-approx" : "",
                              clip.outside ? "clip--outside" : "",
                              clip.labelLeft ? "clip--left" : "",
                              active.includes(clip) ? "is-active" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            style={{ left: `${pct(clip.start)}%`, width: `${pct(clip.end) - pct(clip.start)}%` }}
                          >
                            <span className="clip__label">{clip.short}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}

                {showToday && (
                  <div className="tl__today" style={{ left: `${pct(todayT)}%` }} aria-hidden="true">
                    <span>Today</span>
                  </div>
                )}

                <div className="tl__head" style={{ left: `${pct(t)}%` }}>
                  <span className="tl__line" aria-hidden="true" />
                  <div
                    className="tl__handle"
                    role="slider"
                    tabIndex={0}
                    aria-label="Timeline position"
                    aria-orientation="horizontal"
                    aria-valuemin={START}
                    aria-valuemax={END - 1}
                    aria-valuenow={Number(t.toFixed(2))}
                    aria-valuetext={`${label(t)}. ${
                      active.length ? active.map((c) => c.title).join(", ") : "Nothing in progress"
                    }`}
                    onKeyDown={onKeyDown}
                  >
                    <span className="tl__chip">{label(t)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="tl__legend">
          Solid bars use months from my resume. Hatched bars mean I only have the year, or the start is
          approximate.
        </p>

        <div className="mon" aria-live="off">
          <div className="mon__top">
            <p className="mon__time display">{label(t)}</p>
            <p className="mon__count">
              {active.length === 0
                ? "Between chapters"
                : active.length === 1
                  ? "1 thing in progress"
                  : `${active.length} things at once`}
            </p>
          </div>

          {t >= gradT && (
            <p className="mon__next">
              Degree done. Looking for the first full-time role in software development.{" "}
              <a className="textlink" href="#contact">
                Say hello
              </a>
            </p>
          )}

          {readingAtEnd ? (
            <div className="mon__empty">
              <p className="display">Degree done. Looking for the first full-time role.</p>
              <a className="textlink" href="#contact">
                Say hello
              </a>
            </div>
          ) : (
            <div className="mon__grid">
              {active.map((clip) => (
                <article className={`mon__card mon__card--${clip.track}`} key={clip.id}>
                  <p className="mon__tag">{TRACKS.find((tr) => tr.id === clip.track).tag}</p>
                  <h3 className="mon__title display">{clip.title}</h3>
                  <p className="mon__when">{clip.when}</p>
                  <p className="mon__place">{clip.place}</p>
                  <p className="mon__text">{clip.text}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <ol className="sr-only">
          {CLIPS.map((clip) => (
            <li key={clip.id}>
              {clip.title}, {clip.when}. {clip.place}. {clip.text}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
