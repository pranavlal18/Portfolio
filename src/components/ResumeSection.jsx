/**
 * ResumeSection — resume timeline card (port of the reference resume,
 * indexq.html lines 228–233): `.resume` card, dashed `.tl` timeline with ★
 * markers, download + contact buttons.
 *
 * Timeline copy is pinned verbatim by the redesign brief and mirrors the
 * frozen src/constants/index.js facts (EXPERIENCE / EDUCATION / CERTIFICATIONS).
 * The `#resume` section wrapper lives in App.jsx (aria-labelledby → #resumeH).
 * Download only — printing is left to the browser (Ctrl+P); the index.css
 * print block still scopes output to #resume alone.
 *
 * Timeline items may omit context/body (e.g. the BCA line) — both render
 * conditionally so no empty <small>/<p> ever hits the DOM.
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
    when: '2023 — 2025',
    who: 'MCA · Vidya Academy',
    context: '',
    body: 'Focused on software engineering and applied AI.',
  },
  {
    when: '2020 — 2023',
    who: 'BCA · Christ College (Autonomous)',
    context: '',
    body: '',
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
      <h2 className="sec-title" id="resumeH">Track record.</h2>
      <ol className="tl">
        {TIMELINE.map((item) => (
          <li key={item.who}>
            <span className="w">{item.when}</span>
            <b>{item.who}</b>
            {item.context ? <small>{item.context}</small> : null}
            {item.body ? <p>{item.body}</p> : null}
          </li>
        ))}
      </ol>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
        <a className="btn btn-paper" href="/resume.pdf" download="Pranav-Lal-Resume.pdf">Download PDF</a>
        <a className="btn btn-paper" href="#contact">Get in touch</a>
      </div>
    </div>
  );
}
