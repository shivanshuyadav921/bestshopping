'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EngineeringHistory from "@/components/EngineeringHistory";

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <EngineeringHistory />
      </main>
      <Footer />
    </div>
  );
}
