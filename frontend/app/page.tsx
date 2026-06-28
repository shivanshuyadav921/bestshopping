import dynamic from "next/dynamic";
import Header from "@/components/Header";
import CinematicHero from "@/components/CinematicHero";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy-load client-heavy interactive components below the fold
const ScrollAssembly = dynamic(() => import("@/components/ScrollAssembly"), {
  ssr: true,
});
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"), {
  ssr: true,
});
const Industries = dynamic(() => import("@/components/Industries"), {
  ssr: true,
});
const EngineeringIntelligence = dynamic(() => import("@/components/EngineeringIntelligence"), {
  ssr: true,
});
const QualityVerification = dynamic(() => import("@/components/QualityVerification"), {
  ssr: true,
});
const TechnicalResourceLibrary = dynamic(() => import("@/components/TechnicalResourceLibrary"), {
  ssr: true,
});
const CaseStudies = dynamic(() => import("@/components/CaseStudies"), {
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: true,
});
const EngineeringHistory = dynamic(() => import("@/components/EngineeringHistory"), {
  ssr: true,
});
const EmergencyBreakdownCenter = dynamic(() => import("@/components/EmergencyBreakdownCenter"), {
  ssr: true,
});
const RFQConfigurator = dynamic(() => import("@/components/RFQConfigurator"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <CinematicHero />
        <ScrollAssembly />
        <ProductShowcase />
        <Capabilities />
        <Industries />
        <EngineeringIntelligence />
        <Process />
        <QualityVerification />
        <TechnicalResourceLibrary />
        <CaseStudies />
        <Testimonials />
        <EngineeringHistory />
        <EmergencyBreakdownCenter />
        <RFQConfigurator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
