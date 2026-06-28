import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const CommandCenterShell = dynamic(
  () => import('@/components/command-center').then((mod) => mod.CommandCenterShell),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8 animate-pulse">
        <div className="h-10 bg-neutral-800 rounded w-1/4"></div>
        <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="h-12 bg-neutral-800 rounded"></div>
            <div className="h-12 bg-neutral-800 rounded"></div>
            <div className="h-12 bg-neutral-800 rounded"></div>
          </div>
          <div className="lg:col-span-3 h-[600px] bg-neutral-800 rounded"></div>
        </div>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: 'Command Center — PREMA Engineering Works',
  description: 'Unified engineering reference workspace. Materials database, tolerance specifications, thread standards, bearing catalogs, and cross-referencing tools.',
};

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <CommandCenterShell />
      </main>
      <Footer />
    </div>
  );
}