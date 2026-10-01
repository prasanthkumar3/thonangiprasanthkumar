// Shared shell for the interactive sketches: tabs, a reset button, and a footnote.
export default function SketchFrame({ prefix, tone, tabs, tab, onTab, onReset, note, children }) {
  function onKeyDown(e) {
    const i = tabs.findIndex((t) => t.id === tab);
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else return;
    e.preventDefault();
    onTab(tabs[next].id);
    document.getElementById(`${prefix}-tab-${tabs[next].id}`)?.focus();
  }

  return (
    <div className={`sketch sketch--${tone}`}>
      <div className="sketch__bar">
        <div className="tabs" role="tablist" aria-label="Sketch views" onKeyDown={onKeyDown}>
          {tabs.map((t) => (
            <button
              key={t.id}
              id={`${prefix}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`${prefix}-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              className="tabs__tab"
              onClick={() => onTab(t.id)}
            >
              {t.label}
              {t.count > 0 && <span className="tabs__count">{t.count}</span>}
            </button>
          ))}
        </div>
        {onReset && (
          <button type="button" className="sketch__reset" onClick={onReset}>
            Reset demo
          </button>
        )}
      </div>

      <div className="sketch__body">{children}</div>

      <p className="sketch__note">{note}</p>
    </div>
  );
}
