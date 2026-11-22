// Tombol melayang: gulir otomatis dan musik
export default function Music({ playing, onToggle, auto, onAuto }) {
  return (
    <div className="fabs">
      <button className={`music scroll-btn ${auto ? "aktif" : ""}`} onClick={onAuto} aria-pressed={auto} aria-label={auto ? "Matikan gulir otomatis" : "Nyalakan gulir otomatis"}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </button>
      <button className={`music ${playing ? "on" : ""}`} onClick={onToggle} aria-label={playing ? "Jeda musik" : "Putar musik"}>
        {playing ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        )}
      </button>
    </div>
  );
}
