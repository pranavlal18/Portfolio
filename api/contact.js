/**
 * api/contact.js — Vercel serverless function: forwards the portfolio contact
 * form to Resend. Plain (req, res) handler, no framework, JSON only.
 *
 * Environment variables (set in Vercel → Settings → Environment Variables.
 * NONE are committed — no key exists in this repo):
 *   RESEND_API_KEY   required — Resend API key (re_…).
 *   CONTACT_TO_EMAIL required — where inquiries are delivered; the function
 *                    answers 500 when unset.
 *   CONTACT_FROM     optional — sender identity; falls back to Resend's
 *                    onboarding@resend.dev sandbox address (production should
 *                    swap in a verified domain sender).
 *
 * Contract: POST JSON {name, email, message}
 *   400 {error, fields} validation failure (required, email regex, 20+ chars)
 *   200 {ok: true}      email handed to Resend
 *   500 {error}         missing env / send failure
 *   405                 non-POST
 *
 * NOTE: the validation rules below duplicate src/lib/validateContact.js — the
 * browser bundle and this function deploy separately, so keep them in sync.
 */
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Vercel parses application/json into an object already; guard string
  // bodies (and anything else) so we never read properties off a surprise.
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body.' });
    }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Missing JSON body.' });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  const fields = {};
  if (!name) fields.name = 'Required.';
  if (!email) fields.email = 'Required.';
  else if (!EMAIL_RE.test(email)) fields.email = 'Enter a valid email.';
  if (!message) fields.message = 'Required.';
  else if (message.length < 20) fields.message = 'Add 20+ characters.';
  if (Object.keys(fields).length > 0) {
    return res.status(400).json({ error: 'Validation failed.', fields });
  }

  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    return res.status(500).json({ error: 'CONTACT_TO_EMAIL is not configured.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'onboarding@resend.dev',
      to,
      subject: `Portfolio inquiry from ${name}`,
      reply_to: email,
      text: `${message}\n\n— ${name} (replies go to ${email})`,
    });
    if (error) {
      return res.status(500).json({ error: error.message || 'Failed to send.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: (err && err.message) || 'Failed to send.' });
  }
}
