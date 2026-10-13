/**
 * validateContact — pure contact-form rules (no DOM, no fetch).
 *
 * Mirrors the reference validation set: required fields, a loose email regex,
 * and a 20+ character message. Returns a `{field: message}` map containing
 * only the invalid fields, so a valid submission yields `{}` (the form turns
 * missing keys into `""` for its per-field error slots).
 *
 * NOTE: api/contact.js (Vercel serverless) keeps its own inline copy of these
 * same rules — the browser bundle and the function deploy separately. If a
 * rule changes here, change it there too.
 *
 * @param {{name?: string, email?: string, message?: string}} fields
 * @returns {{name?: string, email?: string, message?: string}} field → error
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact({ name = '', email = '', message = '' }) {
  const errors = {};
  const n = String(name).trim();
  const e = String(email).trim();
  const m = String(message).trim();

  if (!n) errors.name = 'Required.';
  if (!e) errors.email = 'Required.';
  else if (!EMAIL_RE.test(e)) errors.email = 'Enter a valid email.';
  if (!m) errors.message = 'Required.';
  else if (m.length < 20) errors.message = 'Add 20+ characters.';

  return errors;
}

export default validateContact;
