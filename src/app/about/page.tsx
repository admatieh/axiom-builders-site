import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import ContactCTA from "@/components/home/ContactCTA";
import StatsStrip from "@/components/home/StatsStrip";
import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import PhilosophySection from "@/components/about/PhilosophySection";
import CoreValues from "@/components/about/CoreValues";
import WhyChooseUs from "@/components/about/WhyChooseUs";

import { AboutData, aboutData as staticAboutData } from "@/data/about";
import { homeData } from "@/data/home";
import { getPageContent } from "@/lib/getPageContent";

export default async function AboutPage() {
  const aboutData = await getPageContent<AboutData>("about", staticAboutData);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />


      <div className="relative z-10 w-full flex flex-col">
        <SectionBackgroundShell>
          <AboutHero {...aboutData.hero} />
          <StorySection {...aboutData.story} />

          <PhilosophySection {...aboutData.philosophy} />

          <CoreValues {...aboutData.values} />

          <WhyChooseUs {...aboutData.whyUs} />

          <StatsStrip
            badge={aboutData.stats.badge}
            title={aboutData.stats.title}
            description={aboutData.stats.description}
            items={aboutData.stats.items.map(item => ({
              ...item,
              description: "Verified operational baseline establishing project delivery confidence."
            }))}
          />

          <ContactCTA
            badge={aboutData.cta.badge}
            title={aboutData.cta.title}
            description={aboutData.cta.description}
            sectors={aboutData.cta.sectors}
            buttonText={aboutData.cta.primaryButton.label}
          />
        </SectionBackgroundShell>
      </div>

      <Footer
        companyName={homeData.companyName}
        description={homeData.footer.description}
        metrics={homeData.footer.stats}
        links={homeData.footer.links}
        contact={homeData.footer.contact}
      />
    </main>
  );
}
