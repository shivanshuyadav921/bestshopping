import Header from "@/components/Header";
import CinematicHero from "@/components/CinematicHero";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const ScrollAssembly = dynamic(() => import("@/components/ScrollAssembly"));
const ProductShowcase = dynamic(() => import("@/components/ProductShowcase"));
const Industries = dynamic(() => import("@/components/Industries"));
const EngineeringIntelligence = dynamic(() => import("@/components/EngineeringIntelligence"));
const QualityVerification = dynamic(() => import("@/components/QualityVerification"));
const TechnicalResourceLibrary = dynamic(() => import("@/components/TechnicalResourceLibrary"));
const CaseStudies = dynamic(() => import("@/components/CaseStudies"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const EngineeringHistory = dynamic(() => import("@/components/EngineeringHistory"));
const EmergencyBreakdownCenter = dynamic(() => import("@/components/EmergencyBreakdownCenter"));
const RFQConfigurator = dynamic(() => import("@/components/RFQConfigurator"));

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
