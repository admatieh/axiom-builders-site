import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBackgroundShell from "@/components/layout/SectionBackgroundShell";
import ComingSoon from "@/components/ui/ComingSoon";

import { homeData } from "@/data/home";
import { ComingSoonData, projectsComingSoon as staticProjectsData } from "@/data/placeholders";
import { getPageContent } from "@/lib/getPageContent";

export default async function ProjectsComingSoonPage() {
  const projectsComingSoon = await getPageContent<ComingSoonData>("projects", staticProjectsData);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-white selection:bg-[#00e5ff] selection:text-black">
      <Navbar
        companyName={homeData.companyName}
        navItems={homeData.navItems}
      />

      <SectionBackgroundShell>
        <ComingSoon {...projectsComingSoon} />
      </SectionBackgroundShell>

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
