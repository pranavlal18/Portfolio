import TicketNav from './components/TicketNav';
import StickerHero from './components/StickerHero';
import WorkRail from './components/WorkRail';
import { CASES, FEATURED, MORE } from './content/cases';
import { useReveal } from './hooks/useReveal';

const featuredCases = FEATURED.map((slug) => CASES[slug]);
const moreCases = MORE.map((slug) => CASES[slug]);

function App() {
  // Reveal root: .reveal nodes added by later sections animate in once.
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <TicketNav />
      <main id="top" className="wrap">
        <StickerHero />
        {/* Task 3 replaces this no-op with the case dialog opener — WorkRail
            already forwards each card's data-slug. */}
        <WorkRail
          id="rail1"
          name="featured"
          sectionId="featured"
          sectionLabel="Featured work rail"
          cases={featuredCases}
          goto={{ target: '#more', label: 'All work! →' }}
        />
        <WorkRail
          id="rail2"
          name="more"
          sectionId="more"
          sectionLabel="More work rail"
          title="Handpicked highlights."
          sub="Spanning the last few years. Click the sides or drag — open any card for the case."
          cases={moreCases}
          goto={{ target: '#resume', label: 'Resume ↓' }}
        />
        {/* Extension point — Tasks 3–5 mount after rails: dialog, band,
            resume, contact, footer. */}
      </main>
    </div>
  );
}

export default App;
