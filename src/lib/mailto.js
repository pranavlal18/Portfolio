/**
 * buildMailto — pure, dependency-free mailto: URI builder for the contact form.
 *
 * Composes a subject greeting from the sender's name and a body carrying the
 * role message plus a signature line (name + reply address), so the composer
 * that opens is fully self-addressed. Everything user-supplied is passed
 * through encodeURIComponent so ampersands, newlines, and non-ASCII (★) can
 * never break the query string or inject extra params.
 *
 * @param {{name: string, email: string, message: string}} fields
 * @returns {string} a `mailto:` URI ready for `window.location.href`.
 */
export function buildMailto({ name, email, message }) {
  const enc = encodeURIComponent;
  return (
    `mailto:pranavlal18@gmail.com?subject=${enc(`Portfolio inquiry from ${name}`)}` +
    `&body=${enc(`${message}\n\n— ${name} (${email})`)}`
  );
}

export default buildMailto;
