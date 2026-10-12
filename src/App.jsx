import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Tech from './components/Technologies'
import Project from './components/Project';
import Contract from './components/Contact';

function App() {
  return (
    // overflow-x-clip (R1): keeps horizontal clipping without creating a scroll
    // container, so the sticky nav keeps working (overflow-x-hidden broke it).
    <div className="overflow-x-clip text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      {/* Background gradient spanning full page */}
      <div className="fixed inset-0 -z-10 h-screen w-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      {/* Anchors (R3): #about → About, #skills → Tech, #projects → Project */}
      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Project />
        {/* Task 5: Experience mounts here */}
        <Contract />

      </div>
    </div>
  );
}

export default App;
