"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import ContactCTA from "@/components/home/ContactCTA";

import ServicesHero from "@/components/services/ServicesHero";
import ServicesIntro from "@/components/services/ServicesIntro";
import ServiceShowcase from "@/components/services/ServiceShowcase";
import ServiceValues from "@/components/services/ServiceValues";
import SectorsSection from "@/components/services/SectorsSection";
import ProcessIntegration from "@/components/services/ProcessIntegration";

import { homeData } from "@/data/home";
import { servicesData } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />


      <div className="relative z-10 w-full flex flex-col">
        <SectionBackgroundShell>
          <ServicesHero {...servicesData.hero} />
          <ServicesIntro {...servicesData.intro} />

          {/* Main Service Presentation */}
          <ServiceShowcase services={servicesData.mainServices} />

          <ServiceValues {...servicesData.values} />

          <SectorsSection {...servicesData.sectors} />

          <ProcessIntegration {...servicesData.processConnection} />

          <ContactCTA
            badge={servicesData.cta.badge}
            title={servicesData.cta.title}
            description={servicesData.cta.description}
            sectors={homeData.cta.sectors}
            buttonText={servicesData.cta.primaryButton.label}
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
