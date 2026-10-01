export default function RequestLog({ log, emptyText }) {
  const latest = log[0];

  if (!latest) {
    return <p className="api__empty">{emptyText}</p>;
  }

  return (
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
            <li key={entry.id}>
              <span className="api__method">{entry.method}</span>
              <span>{entry.path}</span>
              <span className={`api__status${entry.status >= 400 ? " is-bad" : ""}`}>{entry.status}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
