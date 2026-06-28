'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShieldCheck, Cpu, FileText, ArrowRight, Lock, Award } from 'lucide-react';

export default function VerifyLandingPage() {
  const [certId, setCertId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanId = certId.trim();
    if (!cleanId) {
      setError('Please enter a Certificate ID.');
      return;
    }

    // Verify format (UUID format or check length)
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(cleanId)) {
      setError('Invalid Certificate ID format. Please check the serial code on your document.');
      return;
    }

    router.push(`/verify/${cleanId}`);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Tech Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
      
      {/* Subtle background red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Outer Border Frame (Bauhaus Industrial Vibe) */}
      <div className="hidden lg:block absolute inset-6 border border-white/5 pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500" />
      </div>

      {/* Top Header Logo */}
      <header className="container mx-auto py-8 px-6 flex justify-between items-center z-10 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            width={36}
            height={36}
            className="h-9 w-9 transition-transform duration-300 group-hover:rotate-45"
            priority
          />
          <span className="font-mono font-bold text-lg tracking-[0.2em] uppercase">
            PREMA
          </span>
        </Link>
        <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 tracking-wider">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          LEDGER NODE: MAINNET_01
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 flex flex-col justify-center items-center z-10 py-12">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 rounded-full text-xs font-mono text-red-500/80 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            SECURE COMPLIANCE LEDGER
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase font-mono">
            Quality Verification <br />
            <span className="text-white/50">& Traceability System</span>
          </h1>
          
          <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
            Verify the authenticity of PREMA issued Material Test Certificates (MTC), Heat Treatment Logs, and QA Inspection Reports. Enter the serial ID on your report below.
          </p>

          {/* Form lookup */}
          <div className="bg-[#121214] border border-white/15 p-6 md:p-8 rounded-none relative shadow-2xl mt-8">
            {/* Tech Corner Brackets */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label htmlFor="cert-id-input" className="block text-left text-[9px] font-mono text-white/40 uppercase tracking-widest mb-2">
                  Enter Certificate ID (UUID format)
                </label>
                <div className="relative">
                  <input
                    id="cert-id-input"
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                    className="w-full bg-black/40 border border-white/10 focus:border-red-500 focus:outline-none py-3 pl-4 pr-12 rounded-none font-mono text-sm tracking-wide text-white placeholder-white/20 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-red-500 transition-colors"
                    aria-label="Search ID"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-left text-xs font-mono text-red-500 bg-red-500/10 border border-red-500/20 p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 group rounded-none"
              >
                Authenticate Record
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Quick info grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12 text-left max-w-2xl mx-auto">
            <div className="p-4 border border-white/5 bg-white/[0.01] space-y-2">
              <div className="flex items-center gap-2 text-white/80 font-mono text-xs uppercase">
                <FileText className="w-3.5 h-3.5 text-red-500" />
                Raw Traceability
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Check material heat numbers and chemical testing certificates linked back to primary supplier MTCs.
              </p>
            </div>

            <div className="p-4 border border-white/5 bg-white/[0.01] space-y-2">
              <div className="flex items-center gap-2 text-white/80 font-mono text-xs uppercase">
                <Cpu className="w-3.5 h-3.5 text-red-500" />
                CMM Metrology
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Audit precise coordinate measuring machine logs, dimensional fits, and absolute inspection tolerances.
              </p>
            </div>

            <div className="p-4 border border-white/5 bg-white/[0.01] space-y-2">
              <div className="flex items-center gap-2 text-white/80 font-mono text-xs uppercase">
                <Lock className="w-3.5 h-3.5 text-red-500" />
                Secured Audit
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Verification requests log to audit ledgers. Document downloads utilize signed time-locked tokens.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] font-mono text-white/30 z-10">
        © 2026 PREMA ENGINEERING WORKS. ALL RIGHTS RESERVED. SECURE TRACKING FRAMEWORK V1.9.0.
      </footer>
    </div>
  );
}
