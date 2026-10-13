import { useEffect, useState } from 'react';

// Scrollspy targets (reference lines 273–275): one observer per section, all
// sharing the -40%/-55% rootMargin band so the active link flips as a section
// crosses the middle of the viewport.
const SPY_IDS = ['work', 'featured', 'about', 'contact'];

/**
 * TicketNav — sticky paper ticket bar (port of the reference nav structure).
 * Brand star + wordmark link to #top, four nav anchors, Hire me CTA.
 * Mobile: menu button toggles `.nav.open`, closes on any link click.
 * Scrollspy sets aria-current on the anchor whose section is in view.
 */
export default function TicketNav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observers = SPY_IDS.map((id) => {
      const section = document.getElementById(id);
      if (!section) return null;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setCurrent(id);
          });
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      io.observe(section);
      return io;
    });
    return () => observers.forEach((io) => io?.disconnect());
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div className="topbar">
      <div className="bar">
        <a className="brand" href="#top" aria-label="Pranav Lal home" onClick={closeMenu}>
          <span className="brand-star" aria-hidden="true">★</span>
          <span>Pranav Lal · Portfolio</span>
        </a>
        <nav className={open ? 'nav open' : 'nav'} id="nav" aria-label="Primary">
          <a href="#work" aria-current={current === 'work' ? 'true' : undefined} onClick={closeMenu}>Index</a>
          <a href="#featured" aria-current={current === 'featured' ? 'true' : undefined} onClick={closeMenu}>Work</a>
          <a href="#about" aria-current={current === 'about' ? 'true' : undefined} onClick={closeMenu}>About</a>
          <a href="#contact" aria-current={current === 'contact' ? 'true' : undefined} onClick={closeMenu}>Contact</a>
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
