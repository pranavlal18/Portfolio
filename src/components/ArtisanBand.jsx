/**
 * ArtisanBand — paper-collage about band (port of the reference about section,
 * indexq.html lines 209–216): reveal header + dark `.band` panel holding the
 * steps, the awards stats grid and two proof cards in place of the quotes.
 *
 * Copy is pinned by the redesign brief; reference persona copy is never reused.
 * The `#about` section wrapper lives in App.jsx (aria-labelledby → #aboutH).
 */
export default function ArtisanBand() {
  return (
    <>
      <div className="reveal">
        <h2 className="sec-title" id="aboutH">Build, reason, ship.</h2>
        <p className="sec-sub">Like an artisan: start from messy real-world data, give it a reasoning pipeline, ship the production thing. I build LLM apps with engineers — not demos over the wall.</p>
      </div>
      <div className="band reveal">
        <div>
          <h2>AI artisan for hire.</h2>
          <p>Python dev for LLM apps, RAG and agents. Retrieval → reasoning → FastAPI. Strict on evals, fluent in constraints.</p>
          <div className="steps">
            <div className="step"><b>01 · Ingest</b><small>Repos, docs, ocean data, sales leads — pipelines that eat the messy real world.</small></div>
            <div className="step"><b>02 · Reason</b><small>RAG, reranking and LangGraph agents that decide: rank, draft, review, act.</small></div>
            <div className="step"><b>03 · Ship</b><small>FastAPI, Postgres, Docker — production apps with tracing, not notebooks.</small></div>
          </div>
        </div>
        <div>
          <div className="awards">
            <div className="aw"><b>30+</b><small>GitHub repos</small></div>
            <div className="aw"><b>6</b><small>Featured builds</small></div>
            <div className="aw"><b>2</b><small>Internships</small></div>
            <div className="aw"><b>8.3</b><small>MCA CGPA</small></div>
          </div>
          <div className="quotes">
            <div className="q">
              <p>Production counts.</p>
              <b>DudhWala runs daily dairy deliveries — shops, drivers, GPS tags, payments.</b>
              <small>Live app · private repo</small>
            </div>
            <div className="q">
              <p>Built for the real world.</p>
              <b>Fisherman Safety Agent fuses live ocean data into GO / CAUTION / NO-GO calls.</b>
              <small>9-node LangGraph · EN/ML voice</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
