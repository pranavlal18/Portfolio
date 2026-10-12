import { useRef } from 'react';
/* eslint-disable react/prop-types -- props are validated by src/rails.test.js */

/**
 * WorkRail — draggable paper work rail (port of the reference rail markup +
 * drag/buttons/keyboard script, indexq.html lines 197–226 and 258–269).
 *
 * Drag semantics ported exactly: pointerdown records start + captures the
 * pointer, pointermove scrolls, pointerup/cancel/leave ends the drag. Added
 * per the controller ruling: pointer travel > 6px swallows the trailing click
 * via a capture-phase listener (so a drag never opens a card), reset after.
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
  const swallowClick = useRef(false);

  const handlePointerDown = (e) => {
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { down: true, sx: e.clientX, sl: rail.scrollLeft };
    swallowClick.current = false;
    rail.classList.add('dragging');
    rail.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const rail = railRef.current;
    if (!rail || !drag.current.down) return;
    if (Math.abs(e.clientX - drag.current.sx) > 6) swallowClick.current = true;
    rail.scrollLeft = drag.current.sl - (e.clientX - drag.current.sx);
  };

  const endDrag = () => {
    const rail = railRef.current;
    drag.current.down = false;
    rail?.classList.remove('dragging');
  };

  // Capture phase runs before the card's onClick: a real drag (>6px travel)
  // swallows its trailing click once, then resets so the next click opens.
  const handleRailClickCapture = (e) => {
    if (!swallowClick.current) return;
    e.preventDefault();
    e.stopPropagation();
    swallowClick.current = false;
  };

  const handleKeyDown = (e) => {
    const rail = railRef.current;
    if (!rail) return;
    if (e.key === 'ArrowRight') rail.scrollBy({ left: 320 });
    if (e.key === 'ArrowLeft') rail.scrollBy({ left: -320 });
  };

  const handleGoto = (e) => {
    e.stopPropagation();
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
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={handleKeyDown}
          onClickCapture={handleRailClickCapture}
        >
          {cases.map((c, i) => (
            <button
              key={c.slug}
              className="wcard"
              type="button"
              data-slug={c.slug}
              onClick={() => onOpen(c.slug)}
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
          <button className="wcard allcard" type="button" onClick={handleGoto}>
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
