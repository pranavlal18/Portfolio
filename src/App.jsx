import { useState } from 'react';
import TicketNav from './components/TicketNav';
import StickerHero from './components/StickerHero';
import WorkRail from './components/WorkRail';
import CaseDialog from './components/CaseDialog';
import ArtisanBand from './components/ArtisanBand';
import ResumeSection from './components/ResumeSection';
import ContactSection from './components/ContactSection';
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
        <section id="about" aria-labelledby="aboutH">
          <ArtisanBand />
        </section>
        <section id="resume" aria-labelledby="resumeH">
          <ResumeSection />
        </section>
        <section id="contact" className="contact" aria-labelledby="contactH">
          <ContactSection />
        </section>
      </main>
      <footer>
        <div className="wrap foot">
          <span>{'Pranav © 2026 · Paper-collage build inspired by drag-portfolio energy.'}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: '14px' }}>
            <a href="#featured">Work</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
