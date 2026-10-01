// A small browser-like frame around a recreated screen.
export default function Browser({ url, tone = "dark", overlay = null, children }) {
  return (
    <div className={`browser browser--${tone}`}>
      <div className="browser__bar">
        <span className="browser__nav" aria-hidden="true">
          &lsaquo; &rsaquo; &#8635;
        </span>
        <span className="browser__url">{url}</span>
      </div>
      <div className="browser__screen">
        <div className="browser__scroll">{children}</div>
        {overlay}
      </div>
    </div>
  );
}
