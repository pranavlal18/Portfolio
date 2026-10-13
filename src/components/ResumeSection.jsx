/**
 * ResumeSection — resume timeline card (port of the reference resume,
 * indexq.html lines 228–233): `.resume` card, dashed `.tl` timeline with ★
 * markers, print + contact buttons.
 *
 * Timeline copy is pinned verbatim by the redesign brief and mirrors the
 * frozen src/constants/index.js facts (EXPERIENCE / EDUCATION / CERTIFICATIONS).
 * The `#resume` section wrapper lives in App.jsx (aria-labelledby → #resumeH).
 * The print button calls window.print(); the index.css print block hides
 * everything inside main except #resume, so printing yields the resume only.
 */
const TIMELINE = [
  {
    when: 'Nov 2025 — Mar 2026',
    who: 'Software Engineer Trainee · Digicyfr',
    context: 'Odoo ERP, Next.js',
    body: 'Customized ERP modules and business workflows; Next.js features, debugging, testing, API integration.',
  },
  {
    when: 'Jun 2025 — Sep 2025',
    who: 'Fullstack Developer Intern · Odin Tech',
    context: 'FastAPI · PostgreSQL',
    body: 'Backend services and REST integrations; Next.js components; database optimization.',
  },
  {
    when: 'Education',
    who: 'MCA · Vidya Academy',
    context: '2023 — 2025',
    body: 'BCA · Christ College (Autonomous), 2020 — 2023.',
  },
  {
    when: 'Certifications',
    who: 'AWS · ASAP · YIP',
    context: 'Credentials',
    body: 'AWS Cloud Practitioner Essentials; AI/ML Developer (ASAP Kerala); District winner, Young Innovators Programme.',
  },
];

export default function ResumeSection() {
  return (
    <div className="resume reveal">
      <h2 className="sec-title" id="resumeH">Resume — at a glance.</h2>
      <ol className="tl">
        {TIMELINE.map((item) => (
          <li key={item.who}>
            <span className="w">{item.when}</span>
            <b>{item.who}</b>
            <small>{item.context}</small>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
        <button className="btn btn-ink" type="button" onClick={() => window.print()}>
          Print / save PDF
        </button>
        <a className="btn btn-paper" href="#contact">Get in touch</a>
      </div>
    </div>
  );
}
