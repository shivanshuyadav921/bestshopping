'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EngineeringCommandCenter from "@/components/EngineeringCommandCenter";

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <EngineeringCommandCenter />
      </main>
      <Footer />
    </div>
  );
}
