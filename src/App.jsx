import TicketNav from './components/TicketNav';
import StickerHero from './components/StickerHero';
import { useReveal } from './hooks/useReveal';

function App() {
  // Reveal root: .reveal nodes added by later sections animate in once.
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <TicketNav />
      <main id="top" className="wrap">
        <StickerHero />
        {/* Extension point — Tasks 2–5 mount after hero: rails, dialog, band,
            resume, contact, footer. */}
      </main>
    </div>
  );
}

export default App;
