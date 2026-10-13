/**
 * StickerHero — paper-collage hero (port of the reference hero structure).
 * Copy is pinned by the redesign brief; reference persona copy is never reused.
 * Anchors: #work (hero root), #featured (CTA). Download-only CTA (print is
 * left to the browser via Ctrl+P); the floating tech stickers are decorative.
 */
export default function StickerHero() {
  return (
    <div className="hero" id="work">
      <span className="kicker"><i aria-hidden="true"></i> Open to jobs & freelance gigs</span>
      <div className="hero-grid">
        <div>
          <h1 aria-label="Pranav — AI Developer">
            <span>PRANAV</span>
            <span className="out">AI</span>
            <span className="tang">DEVELOPER!</span>
          </h1>
          <p className="lede">
            {"I'm Pranav, a Python developer who ships AI into production — retrieval systems, LangGraph agents, and backends that hold up. My work already guides fishermen at sea and runs daily deliveries across Kerala shops."}
          </p>
          <div className="hero-cta">
            <a className="btn btn-ink" href="#featured">Drag the work ↓</a>
            <a className="btn btn-paper" href="/resume.pdf" download="Pranav-Lal-Resume.pdf">Download PDF</a>
          </div>
          <p style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Tip! Drag sideways to navigate ↓
          </p>
        </div>
        <div className="sticker-wrap">
          <div className="badge-new">New · Fresh folio</div>
          <div className="sticker-tag st-tag-rag" aria-hidden="true">RAG</div>
          <div className="sticker-tag st-tag-lang" aria-hidden="true">LangGraph</div>
          <div
            className="avatar-star"
            role="img"
            aria-label="Star avatar with initials P L"
          >
            <span>
              PL
              <small>★ PYTHON ★ AI</small>
            </span>
          </div>
          <svg className="stamp" viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path id="cir" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#17150F" />
            <circle cx="60" cy="60" r="34" fill="none" stroke="#F6F1E5" strokeWidth="2" strokeDasharray="4 4" />
            <text fill="#F6F1E5" fontSize="12.5" fontWeight="800" letterSpacing="2.5">
              <textPath href="#cir">OPEN TO WORK • HIRE PRANAV • OPEN TO WORK •</textPath>
            </text>
            <text x="60" y="68" textAnchor="middle" fill="#FFC93C" fontSize="28">★</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
