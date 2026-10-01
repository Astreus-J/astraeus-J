import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { WorkSection } from "@/components/WorkSection";
import { CompanySection } from "@/components/CompanySection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { RailNav } from "@/components/RailNav";
import { Footer } from "@/components/Footer";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RailNav />
      <main id="main">
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <ExpertiseSection />
        <ProcessSection />
        <CompanySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
