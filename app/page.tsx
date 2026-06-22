'use client';

import Header from "@/components/Header";
import CinematicHero from "@/components/CinematicHero";
import ScrollAssembly from "@/components/ScrollAssembly";
import ProductShowcase from "@/components/ProductShowcase";
import Capabilities from "@/components/Capabilities";
import Industries from "@/components/Industries";
import EngineeringIntelligence from "@/components/EngineeringIntelligence";
import Process from "@/components/Process";
import QualityVerification from "@/components/QualityVerification";
import TechnicalResourceLibrary from "@/components/TechnicalResourceLibrary";
import CaseStudies from "@/components/CaseStudies";
import EngineeringHistory from "@/components/EngineeringHistory";
import EmergencyBreakdownCenter from "@/components/EmergencyBreakdownCenter";
import RFQConfigurator from "@/components/RFQConfigurator";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        <EngineeringHistory />
        <EmergencyBreakdownCenter />
        <RFQConfigurator />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
