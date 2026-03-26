import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";

import { ContactData, contactData as staticContactData } from "@/data/contact";
import { homeData } from "@/data/home";
import { getPageContent } from "@/lib/getPageContent";

export default async function ContactPage() {
  const contactData = await getPageContent<ContactData>("contact", staticContactData);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />

      <div className="relative z-10 w-full flex flex-col pt-16">
        <ContactHero {...contactData.hero} />

        <SectionBackgroundShell>
          <ContactFormSection
            info={contactData.info}
            form={contactData.form}
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