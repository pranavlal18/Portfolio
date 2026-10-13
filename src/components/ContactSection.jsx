import { useRef, useState } from 'react';
import { CONTACT } from '../constants/index.js';
import { buildMailto } from '../lib/mailto.js';
import { validateContact } from '../lib/validateContact.js';

// Pinned copy (brief). The marquee chunk repeats twice inside the aria-hidden
// band so the -50% keyframe loops seamlessly.
const MQ_CHUNK = "Let's build something together ★ Email me ★ ";

/**
 * ContactSection — contact block (port of the reference contact + form,
 * indexq.html lines 235–247 and 289–292): aria-hidden marquee, an email card
 * with real CONTACT links, and a validating form that first tries the
 * /api/contact Resend endpoint and, on any network/HTTP failure, hands off to
 * the visitor's mail app via buildMailto (nothing is stored).
 *
 * Validation (shared pure rules in src/lib/validateContact.js) mirrors the
 * reference: blur always validates, input revalidates a field only once it is
 * already marked invalid, and submit focuses the first invalid field. On
 * completion the role="status" note is shown — success copy when the endpoint
 * accepted the message, the honest mailto copy otherwise — and focused so
 * keyboard/SR users hear the confirmation instead of being stranded on the
 * submit button.
 *
 * The `#contact` section wrapper lives in App.jsx (aria-labelledby → #contactH).
 */
export default function ContactSection() {
  const okRef = useRef(null);
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [note, setNote] = useState(null); // {title, sub} for the status box
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const validateOne = (name, value) =>
    validateContact({ ...values, [name]: value })[name] || '';

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Reference behavior: revalidate on input only when already invalid.
    setErrors((prev) =>
      prev[name] ? { ...prev, [name]: validateOne(name, value) } : prev,
    );
  };

  const handleBlur = (name) => () => {
    setErrors((prev) => ({
      ...prev,
      [name]: validateOne(name, values[name]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'message'];
    const found = validateContact(values);
    const next = {
      name: found.name || '',
      email: found.email || '',
      message: found.message || '',
    };
    setErrors(next);
    const firstInvalid = fields.find((f) => next[f]);
    if (firstInvalid) {
      e.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNote({
          title: "Sent — thank you. I'll reply within 2 days.",
          sub: 'Delivered straight to my inbox — nothing stored here.',
        });
        // Move focus to the now-visible status box (same timing as before).
        okRef.current?.focus();
        return;
      }
      throw new Error(`contact endpoint returned ${res.status}`);
    } catch {
      // Endpoint unreachable (static host, offline, 4xx/5xx) → honest fallback.
      window.location.href = buildMailto(payload);
      setNote({
        title: 'Opening your email app — thank you.',
        sub: 'Nothing was stored.',
      });
      okRef.current?.focus();
    }
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
          <a className="btn btn-paper" href="/resume.pdf" download="Pranav-Lal-Resume.pdf">Download PDF</a>
        </div>
        <form className="c-card" noValidate onSubmit={handleSubmit}>
          <div ref={okRef} className={note ? 'ok show' : 'ok'} role="status" tabIndex={-1}>
            <b>{note ? note.title : ''}</b>
            <div>{note ? note.sub : ''}</div>
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
