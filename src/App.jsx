import { useState } from 'react';
import TicketNav from './components/TicketNav';
import StickerHero from './components/StickerHero';
import WorkRail from './components/WorkRail';
import CaseDialog from './components/CaseDialog';
import { CASES, FEATURED, MORE } from './content/cases';
import { CASE_DETAILS } from './content/caseDetails';
import { useReveal } from './hooks/useReveal';

const featuredCases = FEATURED.map((slug) => CASES[slug]);
const moreCases = MORE.map((slug) => CASES[slug]);

function App() {
  // Reveal root: .reveal nodes added by later sections animate in once.
  const revealRef = useReveal();
  // Open case dialog: rail cards call onOpen(slug); null closes it.
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <div ref={revealRef}>
      <TicketNav />
      <main id="top" className="wrap">
        <StickerHero />
        <WorkRail
          id="rail1"
          name="featured"
          sectionId="featured"
          sectionLabel="Featured work rail"
          cases={featuredCases}
          goto={{ target: '#more', label: 'All work! →' }}
          onOpen={setOpenSlug}
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
          onOpen={setOpenSlug}
        />
        <CaseDialog
          detail={openSlug ? CASE_DETAILS[openSlug] : null}
          onClose={() => setOpenSlug(null)}
        />
        {/* Extension point — Tasks 4–5 mount after rails: band, resume,
            contact, footer. */}
      </main>
    </div>
  );
}

export default App;
