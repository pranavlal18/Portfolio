import { useRef, useState } from 'react';
import { CONTACT } from '../constants/index.js';
import { buildMailto } from '../lib/mailto.js';

// Pinned copy (brief). The marquee chunk repeats twice inside the aria-hidden
// band so the -50% keyframe loops seamlessly.
const MQ_CHUNK = "Let's build something together ★ Email me ★ ";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * validateField — mirrors the reference validation rules (required, email
 * regex, 20+ char message) and returns an error string ("" when valid).
 */
function validateField({ name, value }) {
  const v = value.trim();
  if (!v) return 'Required.';
  if (name === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email.';
  if (name === 'message' && v.length < 20) return 'Add 20+ characters.';
  return '';
}

/**
 * ContactSection — contact block (port of the reference contact + form,
 * indexq.html lines 235–247 and 289–292): aria-hidden marquee, an email card
 * with real CONTACT links + print, and a validating form that hands off to the
 * visitor's mail app via buildMailto (nothing is stored or POSTed).
 *
 * Validation mirrors the reference: blur always validates, input revalidates a
 * field only once it is already marked invalid, and submit focuses the first
 * invalid field. On success `window.location.href` is set to the mailto URI
 * and the role="status" note is shown.
 *
 * The `#contact` section wrapper lives in App.jsx (aria-labelledby → #contactH).
 */
export default function ContactSection() {
  const okRef = useRef(null);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Reference behavior: revalidate on input only when already invalid.
    setErrors((prev) =>
      prev[name] ? { ...prev, [name]: validateField({ name, value }) } : prev,
    );
  };

  const handleBlur = (name) => () => {
    setErrors((prev) => ({
      ...prev,
      [name]: validateField({ name, value: values[name] }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'message'];
    const next = {
      name: validateField({ name: 'name', value: values.name }),
      email: validateField({ name: 'email', value: values.email }),
      message: validateField({ name: 'message', value: values.message }),
    };
    setErrors(next);
    const firstInvalid = fields.find((f) => next[f]);
    if (firstInvalid) {
      e.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    window.location.href = buildMailto({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });
    setSent(true);
    // Move focus to the now-visible status box so keyboard/SR users hear the
    // confirmation instead of being stranded on the submit button.
    okRef.current?.focus();
  };

  const fieldClass = (name) => (errors[name] ? 'field invalid' : 'field');

  return (
    <>
      <div className="mq" aria-hidden="true">
        <div>{MQ_CHUNK + MQ_CHUNK}</div>
      </div>
      <h2 className="sec-title" id="contactH" style={{ marginTop: '18px' }}>
        {"Let's make the hire."}
      </h2>
      <div className="c-grid">
        <div className="c-card">
          <h3>{"Prefer email? I'm fast."}</h3>
          <p style={{ color: 'var(--mut)' }}>
            {"Share team, problem, timeline — I'll reply with relevant work + availability within 2 days."}
          </p>
          <p>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            <a href={`tel:${CONTACT.phoneNo.replace(/\s+/g, '')}`}>{CONTACT.phoneNo}</a>
            {' · '}
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            {' · '}
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
          <button className="btn btn-tang" type="button" onClick={() => window.print()}>
            Print resume
          </button>
          <a className="btn btn-paper" href="/resume.pdf" download="Pranav-Lal-Resume.pdf">Download PDF</a>
        </div>
        <form className="c-card" noValidate onSubmit={handleSubmit}>
          <div ref={okRef} className={sent ? 'ok show' : 'ok'} role="status" tabIndex={-1}>
            <b>Opening your email app — thank you.</b>
            <div>Nothing was stored.</div>
          </div>
          <div className={fieldClass('name')}>
            <label htmlFor="c-name">Name *</label>
            <input
              id="c-name"
              name="name"
              autoComplete="name"
              placeholder="Jordan Lee"
              required
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            <span className="err">{errors.name}</span>
          </div>
          <div className={fieldClass('email')}>
            <label htmlFor="c-email">Work email *</label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <span className="err">{errors.email}</span>
          </div>
          <div className={fieldClass('message')}>
            <label htmlFor="c-message">About the role *</label>
            <textarea
              id="c-message"
              name="message"
              rows={5}
              placeholder="Team, goals, timeline…"
              required
              value={values.message}
              onChange={handleChange('message')}
              onBlur={handleBlur('message')}
            />
            <span className="err">{errors.message}</span>
          </div>
          <button className="btn btn-ink" type="submit">Send message</button>
        </form>
      </div>
    </>
  );
}
