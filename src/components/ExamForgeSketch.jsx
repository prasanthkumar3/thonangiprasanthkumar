import { useEffect, useMemo, useRef, useState } from "react";
import Browser from "./Browser";
import RequestLog from "./RequestLog";
import SketchFrame from "./SketchFrame";
import { useRequestLog } from "../hooks";
import "../styles/ef.css";

// Sample questions and exams for the demo.
const QUESTIONS_SEED = [
  { id: 1, prompt: "Which keyword defines a function in Python?", options: ["func", "def", "function", "lambda"], answer: 1 },
  { id: 2, prompt: "What does len([4, 8, 15]) return?", options: ["2", "3", "4", "15"], answer: 1 },
  { id: 3, prompt: "Which of these is immutable?", options: ["list", "dict", "tuple", "set"], answer: 2 },
  { id: 4, prompt: "What is the value of 7 // 2?", options: ["3.5", "4", "3", "2"], answer: 2 },
];
const EXAMS_SEED = [{ code: "PYTHON26X", title: "Python basics", minutes: 5, questionIds: [1, 2, 3, 4], attempts: [] }];

const TABS = [
  { id: "student", label: "Student" },
  { id: "examiner", label: "Examiner" },
  { id: "api", label: "API log" },
];

const LETTERS = ["A", "B", "C", "D"];

function makeCode(title, taken) {
  const base = (title.toUpperCase().replace(/[^A-Z0-9]/g, "") || "EXAM").slice(0, 6);
  let n = 0;
  let code = `${base}26${String.fromCharCode(65 + n)}`;
  while (taken.includes(code)) {
    n += 1;
    code = `${base}26${String.fromCharCode(65 + (n % 26))}${n > 25 ? n : ""}`;
  }
  return code;
}

const pad = (n) => String(n).padStart(2, "0");

/* ---------------------------- Student: landing --------------------------- */
function Landing({ code, setCode, error, onContinue }) {
  return (
    <div className="ef-home">
      <nav className="ef-nav" aria-hidden="true">
        <div className="ef-brand">
          <span className="ef-logo">E</span>
          ExamForge
        </div>
        <div className="ef-nav__right">
          <span className="ef-chip">Create student account</span>
          <span className="ef-chip ef-chip--solid">Sign in</span>
        </div>
      </nav>

      <div className="ef-hero">
        <div className="ef-hero__copy">
          <h4 className="ef-h">Online exams, from question bank to result.</h4>
          <p className="ef-lead">
            Examiners build and publish exams, students take them in a focused workspace, and scores are calculated the
            moment an attempt is submitted.
          </p>
          <p className="ef-small">
            Have an account? Sign in and ExamForge opens the workspace for your role: student, examiner or admin.
          </p>
        </div>

        <form
          className="ef-panel"
          onSubmit={(e) => {
            e.preventDefault();
            onContinue();
          }}
          noValidate
        >
          <h5 className="ef-panel__title">Take an exam</h5>
          <p className="ef-panel__text">Enter the room code from your examiner. No account needed for common exams.</p>
          <label htmlFor="ef-code">Room code</label>
          <input
            id="ef-code"
            className="ef-code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="E.G. PYTHON26X"
            autoComplete="off"
            spellCheck="false"
          />
          {error && (
            <p className="ef-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="ef-btn ef-btn--block">
            Continue <span aria-hidden="true">&rarr;</span>
          </button>
          <p className="ef-try">
            Demo room:{" "}
            <button type="button" onClick={() => setCode("PYTHON26X")}>
              PYTHON26X
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------- Student: workspace ------------------------- */
function Workspace({ exam, questions, onSubmit }) {
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(exam.minutes * 60);
  const submitted = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    const id = setInterval(() => setLeft((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  function finish() {
    if (submitted.current) return;
    submitted.current = true;
    onSubmit(answersRef.current);
  }

  useEffect(() => {
    if (left === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const q = questions[index];
  const answered = Object.keys(answers).length;

  return (
    <div className="ef-work">
      <header className="ef-work__bar">
        <div>
          <p className="ef-work__kicker">Room {exam.code}</p>
          <h4 className="ef-work__title">{exam.title}</h4>
        </div>
        <p className={`ef-timer${left <= 30 ? " is-low" : ""}`} aria-label="Time left">
          {pad(Math.floor(left / 60))}:{pad(left % 60)}
        </p>
      </header>

      <div className="ef-work__body">
        <nav className="ef-qnav" aria-label="Questions">
          {questions.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`${i === index ? "is-current" : ""}${answers[item.id] !== undefined ? " is-done" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Question ${i + 1}${answers[item.id] !== undefined ? ", answered" : ""}`}
              aria-current={i === index ? "step" : undefined}
            >
              {i + 1}
            </button>
          ))}
        </nav>

        <section className="ef-q">
          <p className="ef-q__count">
            Question {index + 1} of {questions.length}
          </p>
          <h5 className="ef-q__prompt">{q.prompt}</h5>
          <div className="ef-opts" role="radiogroup" aria-label="Answer options">
            {q.options.map((opt, i) => (
              <label key={opt} className={answers[q.id] === i ? "is-on" : ""}>
                <input type="radio" name={`ef-q-${q.id}`} checked={answers[q.id] === i} onChange={() => setAnswers({ ...answers, [q.id]: i })} />
                <span className="ef-opts__letter">{LETTERS[i]}</span>
                {opt}
              </label>
            ))}
          </div>

          <div className="ef-q__foot">
            <button type="button" className="ef-btn ef-btn--ghost" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
              Previous
            </button>
            {index < questions.length - 1 ? (
              <button type="button" className="ef-btn" onClick={() => setIndex((i) => i + 1)}>
                Next
              </button>
            ) : (
              <button type="button" className="ef-btn" onClick={finish}>
                Submit attempt
              </button>
            )}
            <span className="ef-q__saved">
              {answered} of {questions.length} answered
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------------------- Student: result ---------------------------- */
function Result({ result, questions, onAgain }) {
  return (
    <div className="ef-result">
      <p className="ef-work__kicker">Attempt submitted</p>
      <p className="ef-result__score">
        {result.score}
        <span> / {result.total}</span>
      </p>
      <p className="ef-result__pct">{result.percent}% correct. Scored the moment you submitted.</p>

      <ul className="ef-review">
        {questions.map((q, i) => {
          const picked = result.answers[q.id];
          const right = picked === q.answer;
          return (
            <li key={q.id} className={right ? "is-right" : "is-wrong"}>
              <span className="ef-review__mark" aria-hidden="true">
                {right ? "\u2713" : "\u2717"}
              </span>
              <div>
                <p className="ef-review__q">
                  {i + 1}. {q.prompt}
                </p>
                <p className="ef-review__a">
                  {right ? `Correct: ${q.options[q.answer]}` : `You chose ${picked === undefined ? "nothing" : q.options[picked]}. Correct: ${q.options[q.answer]}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <button type="button" className="ef-btn" onClick={onAgain}>
        Back to start
      </button>
    </div>
  );
}

/* ---------------------------- Examiner ----------------------------------- */
function Examiner({ questions, exams, record, onAddQuestion, onPublish, onUseCode }) {
  const [selected, setSelected] = useState(() => new Set(QUESTIONS_SEED.map((q) => q.id)));
  const [title, setTitle] = useState("Python basics 2");
  const [minutes, setMinutes] = useState(5);
  const [published, setPublished] = useState(null);
  const [error, setError] = useState("");
  const [nq, setNq] = useState({ prompt: "", options: ["", "", "", ""], answer: 0 });
  const [qError, setQError] = useState("");

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addQuestion(e) {
    e.preventDefault();
    const body = { prompt: nq.prompt.trim(), options: nq.options.map((o) => o.trim()), answer: nq.answer };
    if (body.prompt.length < 5 || body.options.some((o) => !o)) {
      const text = "Add a question and all four options.";
      setQError(text);
      record("POST", "/api/questions", 422, body, { detail: text });
      return;
    }
    const created = onAddQuestion(body);
    setSelected((prev) => new Set(prev).add(created.id));
    setNq({ prompt: "", options: ["", "", "", ""], answer: 0 });
    setQError("");
  }

  function publish(e) {
    e.preventDefault();
    const ids = questions.filter((q) => selected.has(q.id)).map((q) => q.id);
    if (title.trim().length < 3 || ids.length === 0) {
      const text = ids.length === 0 ? "Pick at least one question." : "Give the exam a title.";
      setError(text);
      record("POST", "/api/exams", 422, { title: title.trim(), question_ids: ids }, { detail: text });
      return;
    }
    setError("");
    const exam = onPublish({ title: title.trim(), minutes, questionIds: ids });
    setPublished(exam.code);
  }

  const attempts = exams.flatMap((ex) => ex.attempts.map((a) => ({ ...a, code: ex.code, title: ex.title })));

  return (
    <div className="ef-examiner">
      <header className="ef-ex__head">
        <div className="ef-brand">
          <span className="ef-logo">E</span>
          Examiner workspace
        </div>
      </header>

      <div className="ef-ex__grid">
        <section className="ef-panel">
          <h5 className="ef-panel__title">Question bank</h5>
          <ul className="ef-bank">
            {questions.map((q) => (
              <li key={q.id}>
                <label>
                  <input type="checkbox" checked={selected.has(q.id)} onChange={() => toggle(q.id)} />
                  <span>{q.prompt}</span>
                </label>
              </li>
            ))}
          </ul>

          <details className="ef-new">
            <summary>Add a question</summary>
            <form onSubmit={addQuestion} noValidate>
              <label htmlFor="ef-nq">Question</label>
              <input id="ef-nq" value={nq.prompt} onChange={(e) => setNq({ ...nq, prompt: e.target.value })} />
              {nq.options.map((opt, i) => (
                <div className="ef-opt-row" key={i}>
                  <input
                    type="radio"
                    name="ef-correct"
                    checked={nq.answer === i}
                    onChange={() => setNq({ ...nq, answer: i })}
                    aria-label={`Option ${LETTERS[i]} is correct`}
                  />
                  <input
                    value={opt}
                    onChange={(e) => setNq({ ...nq, options: nq.options.map((o, j) => (j === i ? e.target.value : o)) })}
                    placeholder={`Option ${LETTERS[i]}`}
                    aria-label={`Option ${LETTERS[i]}`}
                  />
                </div>
              ))}
              {qError && (
                <p className="ef-error" role="alert">
                  {qError}
                </p>
              )}
              <button type="submit" className="ef-btn ef-btn--ghost">
                Add to bank
              </button>
            </form>
          </details>
        </section>

        <section className="ef-panel">
          <h5 className="ef-panel__title">Publish an exam</h5>
          <form onSubmit={publish} noValidate>
            <label htmlFor="ef-title">Exam title</label>
            <input id="ef-title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="ef-min">Time limit</label>
            <select id="ef-min" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
              {[2, 5, 10].map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
            <p className="ef-ex__count">{selected.size} questions selected</p>
            {error && (
              <p className="ef-error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" className="ef-btn ef-btn--block">
              Publish exam
            </button>
          </form>
          {published && (
            <div className="ef-published" role="status">
              <p>Published. Room code</p>
              <strong>{published}</strong>
              <button type="button" className="ef-btn ef-btn--ghost" onClick={() => onUseCode(published)}>
                Take it as a student
              </button>
            </div>
          )}
        </section>

        <section className="ef-panel ef-panel--wide">
          <h5 className="ef-panel__title">Results</h5>
          {attempts.length === 0 ? (
            <p className="ef-muted">No attempts yet. Take an exam as a student and the score appears here.</p>
          ) : (
            <table className="ef-table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Room</th>
                  <th>Student</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a) => (
                  <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.code}</td>
                    <td>{a.student}</td>
                    <td>
                      {a.score} / {a.total} ({a.percent}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}

/* ---------------------------- The sketch --------------------------------- */
export default function ExamForgeSketch() {
  const [tab, setTab] = useState("student");
  const [questions, setQuestions] = useState(QUESTIONS_SEED);
  const [exams, setExams] = useState(EXAMS_SEED);
  const [stage, setStage] = useState("home"); // home | exam | result
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [active, setActive] = useState(null);
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [nextQ, setNextQ] = useState(5);
  const [nextAttempt, setNextAttempt] = useState(1);
  const { log, record, clear } = useRequestLog();

  const examQuestions = useMemo(
    () => (active ? active.questionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) : []),
    [active, questions],
  );

  function reset() {
    clear();
    setTab("student");
    setQuestions(QUESTIONS_SEED);
    setExams(EXAMS_SEED);
    setStage("home");
    setCode("");
    setCodeError("");
    setActive(null);
    setResult(null);
    setNextQ(5);
    setNextAttempt(1);
    setResetKey((k) => k + 1);
  }

  function enterRoom() {
    const wanted = code.trim().toUpperCase();
    const exam = exams.find((e) => e.code === wanted);
    if (!exam) {
      const text = wanted ? "No exam found for that room code." : "Enter the room code from your examiner.";
      setCodeError(text);
      record("GET", `/api/rooms/${wanted || "-"}`, 404, {}, { detail: text });
      return;
    }
    setCodeError("");
    setActive(exam);
    setStage("exam");
    record("GET", `/api/rooms/${wanted}`, 200, {}, { room_code: exam.code, title: exam.title, minutes: exam.minutes, questions: exam.questionIds.length });
  }

  function submitAttempt(answers) {
    const total = examQuestions.length;
    const score = examQuestions.filter((q) => answers[q.id] === q.answer).length;
    const percent = Math.round((score / total) * 100);
    const attempt = { id: nextAttempt, student: "Guest", score, total, percent };
    setNextAttempt((n) => n + 1);
    setExams((prev) => prev.map((e) => (e.code === active.code ? { ...e, attempts: [...e.attempts, attempt] } : e)));
    setResult({ score, total, percent, answers });
    setStage("result");
    record("POST", "/api/attempts", 201, { room_code: active.code, answers }, { attempt_id: attempt.id, score, total, percent });
  }

  function addQuestion(body) {
    const created = { id: nextQ, ...body };
    setQuestions((prev) => [...prev, created]);
    setNextQ((n) => n + 1);
    record("POST", "/api/questions", 201, body, created);
    return created;
  }

  function publishExam({ title, minutes, questionIds }) {
    const exam = { code: makeCode(title, exams.map((e) => e.code)), title, minutes, questionIds, attempts: [] };
    setExams((prev) => [...prev, exam]);
    record("POST", "/api/exams", 201, { title, minutes, question_ids: questionIds }, { room_code: exam.code, status: "published" });
    return exam;
  }

  function useCode(c) {
    setCode(c);
    setCodeError("");
    setStage("home");
    setTab("student");
  }

  function backToStart() {
    setStage("home");
    setResult(null);
    setActive(null);
    setCode("");
  }

  const tabs = TABS.map((t) => (t.id === "api" ? { ...t, count: log.length } : t));

  return (
    <SketchFrame
      prefix="ef"
      tone="light"
      tabs={tabs}
      tab={tab}
      onTab={setTab}
      onReset={reset}
      note={`Recreated from the live site with sample questions. Publish an exam as an examiner, take it as a student, and the score lands in the results table.`}
    >
      <div role="tabpanel" id="ef-panel-student" aria-labelledby="ef-tab-student" hidden={tab !== "student"}>
        <Browser url="examforge-frountend.vercel.app" tone="light">
          {stage === "home" && <Landing code={code} setCode={setCode} error={codeError} onContinue={enterRoom} />}
          {stage === "exam" && active && <Workspace key={`${active.code}-${resetKey}-${nextAttempt}`} exam={active} questions={examQuestions} onSubmit={submitAttempt} />}
          {stage === "result" && result && <Result result={result} questions={examQuestions} onAgain={backToStart} />}
        </Browser>
      </div>

      <div role="tabpanel" id="ef-panel-examiner" aria-labelledby="ef-tab-examiner" hidden={tab !== "examiner"}>
        <Browser url="examforge-frountend.vercel.app" tone="light">
          <Examiner key={resetKey} questions={questions} exams={exams} record={record} onAddQuestion={addQuestion} onPublish={publishExam} onUseCode={useCode} />
        </Browser>
      </div>

      <div role="tabpanel" id="ef-panel-api" aria-labelledby="ef-tab-api" className="panel" hidden={tab !== "api"}>
        <RequestLog log={log} emptyText="Nothing has been sent yet. Enter a room code, publish an exam or add a question and the request shows up here." />
      </div>
    </SketchFrame>
  );
}
