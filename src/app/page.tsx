// New Local Sequence Component
import HeroSequence from "@/components/home/HeroSequence";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TrustedBy from "@/components/home/TrustedBy";
import AboutPreview from "@/components/home/AboutPreview";
import ArchitecturalBoard from "@/components/home/ArchitecturalBoard";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import StatsStrip from "@/components/home/StatsStrip";
import Process from "@/components/home/Process";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <main className="relative w-full text-white bg-[#050505] selection:bg-[#00e5ff] selection:text-black">
      <Navbar />

      {/* Hero owns the sequence completely now. It's 400vh tall, then it hands off. */}
      <HeroSequence frameCount={192} />

      {/* Post-Hero Structural Foundation — Pure dark architectural design system */}
      <div className="relative z-10 w-full flex flex-col pt-24 bg-[#050505]">
        <TrustedBy />
        <AboutPreview />
        
        {/* The new interconnected blueprint board section */}
        <ArchitecturalBoard />
        
        <ProjectsPreview />
        <StatsStrip />
        <Process />
        <ContactCTA />
      </div>

      <Footer />
    </main>
  );
}
