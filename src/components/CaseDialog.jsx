import { useEffect, useRef } from 'react';
/* eslint-disable react/prop-types -- props are validated by src/dialog.test.js */

/**
 * CaseDialog — paper case dialog (port of the reference dialog, indexq.html
 * line 251 markup + lines 283–287 open/close script), with copy driven by
 * src/content/caseDetails.js instead of inline demo data.
 *
 * Open/close discipline (ported exactly):
 * - `detail | null` controls the dialog: a ref effect calls `showModal()`
 *   (guarded by `dlg.open`) and focuses the ✕ button on open; on close it
 *   calls the native `close()`.
 * - Esc is handled via the native `cancel` event (preventDefault + onClose),
 *   so React state stays the single source of truth.
 * - Backdrop clicks use the reference coordinate check: a click whose
 *   clientX/clientY fall outside `getBoundingClientRect()` is a backdrop hit.
 * - On close, focus returns to the opening card by querying its `data-slug`
 *   (recorded at open time, before `detail` is cleared).
 *
 * Footer: GitHub link (new tab + noopener noreferrer) when `detail.github`
 * exists; DudhWala has `github: null`, so it renders the private badge with
 * zero anchors.
 */
const PRIVATE_BADGE = 'Private repo · Live in production';

export default function CaseDialog({ detail, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastSlugRef = useRef(null); // opener card slug, for focus return

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (detail) {
      lastSlugRef.current = detail.slug;
      if (typeof dlg.showModal === 'function') {
        if (!dlg.open) dlg.showModal();
        closeBtnRef.current?.focus();
      }
    } else if (dlg.open) {
      // Native close() fires the `close` event → focus return below.
      dlg.close();
    }
  }, [detail]);

  // Esc: native cancel → close path above (never touches the DOM directly).
  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  // Native close event (from ✕/Esc/backdrop all funneling through onClose).
  const handleClose = () => {
    const slug = lastSlugRef.current;
    if (!slug) return;
    document.querySelector(`[data-slug="${slug}"]`)?.focus();
  };

  // Backdrop coordinate check, ported from the reference: content clicks land
  // inside the dialog rect; the modal backdrop targets the dialog itself with
  // coordinates outside it.
  const handleDialogClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="case-dlg-title" onCancel={handleCancel} onClose={handleClose} onClick={handleDialogClick}>
      <div className="dh">
        <div>
          <h3 id="case-dlg-title">{detail?.title ?? 'Case'}</h3>
          <p style={{ color: 'var(--mut)' }}>{detail?.sub ?? ''}</p>
        </div>
        <button ref={closeBtnRef} className="dx" type="button" aria-label="Close dialog" onClick={onClose}>
          ✕
        </button>
      </div>
      {detail && (
        <div className="db">
          <div className="mrow">
            {detail.metrics.map((m) => (
              <div className="m" key={m.label}>
                <b>{m.value}</b>
                <small>{m.label}</small>
              </div>
            ))}
          </div>
          <ul>
            {detail.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {detail.github ? (
            <p>
              <a href={detail.github} target="_blank" rel="noopener noreferrer">
                View source on GitHub ↗
              </a>
            </p>
          ) : (
            <p>
              <span className="chip">{PRIVATE_BADGE}</span>
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}
