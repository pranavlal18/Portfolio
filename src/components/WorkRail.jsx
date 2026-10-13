import { useRef } from 'react';
/* eslint-disable react/prop-types -- props are validated by src/rails.test.js */

/**
 * WorkRail — draggable paper work rail (port of the reference rail markup +
 * drag/buttons/keyboard script, indexq.html lines 197–226 and 258–269).
 *
 * Drag semantics ported exactly: pointerdown records start + captures the
 * pointer, pointermove scrolls, pointerup/cancel/leave ends the drag, and
 * pointer travel > 6px counts as a drag (never opens a card).
 *
 * Activation (controller fix round): `setPointerCapture` retargets pointerup
 * and the trailing click to the rail in Chromium, so per-card onClick handlers
 * never fire there. Instead pointerdown records the `.wcard[data-slug]` /
 * `.allcard` under the pointer, and pointerup activates that recorded element
 * directly when travel ≤ 6px — `onOpen(slug)` / goto scroll. The trailing
 * pointer click is consumed (never double-activates); keyboard clicks
 * (Enter/Space, no pointer involved) are delegated at the rail via
 * `onClick`, so focus + activation on cards keeps working. Non-primary
 * buttons (right/middle click) are ignored entirely — they neither drag
 * nor arm an activation, matching base/reference click semantics.
 *
 * Cards render `data-slug` and call `onOpen(slug)` (default no-op) — Task 3
 * wires the case dialog through App.jsx state without touching this file.
 * The trailing goto card smooth-scrolls to its target, null-guarded so a
 * section that mounts in a later task is safe to target.
 */
export default function WorkRail({
  id,
  name,
  sectionId,
  sectionLabel,
  title,
  sub,
  cases,
  goto,
  onOpen = () => {},
}) {
  const railRef = useRef(null);
  const drag = useRef({ down: false, sx: 0, sl: 0 });
  const dragged = useRef(false); // travel > 6px during this gesture
  const downCard = useRef(null); // .wcard[data-slug] under pointerdown
  const downGoto = useRef(null); // .allcard under pointerdown
  const handledClick = useRef(false); // trailing pointer click already handled

  const handlePointerDown = (e) => {
    const rail = railRef.current;
    if (!rail) return;
    // Only the primary button (left touch) starts a gesture. Right/middle
    // click must never drag or arm an activation (base/reference activate via
    // primary click only), and leaving handledClick untouched keeps a later
    // keyboard Enter/Space activation working.
    if (e.button !== 0) return;
    drag.current = { down: true, sx: e.clientX, sl: rail.scrollLeft };
    dragged.current = false;
    // Chromium retargets the trailing click to the rail (pointer capture), so
    // record what was pressed now and activate it on pointerup instead.
    downCard.current = e.target.closest?.('.wcard[data-slug]') ?? null;
    downGoto.current = e.target.closest?.('.allcard') ?? null;
    handledClick.current = false;
    rail.classList.add('dragging');
    rail.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const rail = railRef.current;
    if (!rail || !drag.current.down) return;
    if (Math.abs(e.clientX - drag.current.sx) > 6) dragged.current = true;
    rail.scrollLeft = drag.current.sl - (e.clientX - drag.current.sx);
  };

  // Also used by pointercancel/pointerleave: ends the drag and forgets the
  // recorded press targets without activating (gesture interrupted).
  const endDrag = () => {
    const rail = railRef.current;
    drag.current.down = false;
    dragged.current = false;
    downCard.current = null;
    downGoto.current = null;
    rail?.classList.remove('dragging');
  };

  const handlePointerUp = (e) => {
    const wasDown = drag.current.down;
    const card = downCard.current;
    const gotoEl = downGoto.current;
    const isDrag = dragged.current || Math.abs(e.clientX - drag.current.sx) > 6;
    endDrag();
    if (!wasDown) return; // stray pointerup — not our gesture
    if (isDrag) {
      handledClick.current = true; // swallow the trailing click of a drag
      return;
    }
    // Travel ≤ 6px: a plain click. pointerup (and the trailing click) land on
    // the rail under capture, so activate the recorded element directly.
    handledClick.current = true; // our click — consume the trailing click
    if (card) onOpen(card.dataset.slug);
    else if (gotoEl) activateGoto();
  };

  const handleRailClick = (e) => {
    // The pointer gesture already resolved on pointerup (opened or swallowed);
    // ignore its trailing click so nothing fires twice.
    if (handledClick.current) {
      handledClick.current = false;
      return;
    }
    // Keyboard activation (Enter/Space fires a click with no pointer events):
    // delegate from the event target so cards still open when focused.
    const card = e.target.closest?.('.wcard[data-slug]');
    if (card) {
      onOpen(card.dataset.slug);
      return;
    }
    if (e.target.closest?.('.allcard')) activateGoto();
  };

  const handleKeyDown = (e) => {
    const rail = railRef.current;
    if (!rail) return;
    if (e.key === 'ArrowRight') rail.scrollBy({ left: 320 });
    if (e.key === 'ArrowLeft') rail.scrollBy({ left: -320 });
  };

  const activateGoto = () => {
    const target = document.querySelector(goto.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollBy = (left) => () => railRef.current?.scrollBy({ left, behavior: 'smooth' });

  return (
    <section id={sectionId} aria-label={sectionLabel}>
      {title && (
        <div className="reveal">
          <h2 className="sec-title">{title}</h2>
          <p className="sec-sub">{sub}</p>
        </div>
      )}
      <div className={title ? 'rail-shell' : 'rail-shell reveal'}>
        <div
          ref={railRef}
          className="rail"
          id={id}
          aria-label={`Draggable ${name} work`}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={handleKeyDown}
          onClick={handleRailClick}
        >
          {cases.map((c, i) => (
            <button
              key={c.slug}
              className="wcard"
              type="button"
              data-slug={c.slug}
            >
              <span className={`wvis w${(i % 5) + 1}`}>{c.visual}</span>
              <span className="wbody">
                <span className="chips">
                  {c.chips.map((chip) => (
                    <span className="chip" key={chip}>{chip}</span>
                  ))}
                </span>
                <span>
                  <h3>{c.title}</h3>
                </span>
                <span>
                  <p className="od-clamp-2">{c.blurb}</p>
                </span>
              </span>
            </button>
          ))}
          <button className="wcard allcard" type="button">
            {goto.label}
          </button>
        </div>
        <div className="rail-btns">
          <button className="rbtn" type="button" aria-label={`Scroll ${name} left`} onClick={scrollBy(-440)}>
            ←
          </button>
          <button className="rbtn" type="button" aria-label={`Scroll ${name} right`} onClick={scrollBy(440)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
