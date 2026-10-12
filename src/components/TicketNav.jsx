import { useState } from 'react';

/**
 * TicketNav — sticky paper ticket bar (port of the reference nav structure).
 * Brand star + wordmark link to #top, four nav anchors, Hire me CTA.
 * Mobile: menu button toggles `.nav.open`, closes on any link click.
 */
export default function TicketNav() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="topbar">
      <div className="bar">
        <a className="brand" href="#top" aria-label="Pranav Lal home" onClick={closeMenu}>
          <span className="brand-star" aria-hidden="true">★</span>
          <span>Pranav Lal · Portfolio</span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} id="nav" aria-label="Primary">
          <a href="#work" onClick={closeMenu}>Index</a>
          <a href="#featured" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="btn btn-tang" href="#contact" style={{ marginLeft: '10px' }}>
          Hire me
        </a>
        <button
          className="mbtn"
          type="button"
          aria-expanded={open}
          aria-controls="nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>
      </div>
    </div>
  );
}
