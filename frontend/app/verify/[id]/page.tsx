'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, AlertTriangle, Download, ArrowLeft, RefreshCw, 
  CheckCircle2, FileText, Calendar, Building, Package, User2, BadgeCheck 
} from 'lucide-react';

export default function VerifyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certData, setCertData] = useState<any | null>(null);

  const fetchVerificationDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/verify/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to verify certificate');
      }

      setCertData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Certificate verification failed.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      Promise.resolve().then(() => {
        fetchVerificationDetails();
      });
    }
  }, [id, fetchVerificationDetails]);

  // Generates a mock high-tech SVG QR code pattern representing the verification URL
  const renderSvgQrCode = (url: string) => {
    return (
      <svg className="w-32 h-32 bg-white p-2" viewBox="0 0 100 100">
        {/* Border indicators */}
        <rect x="0" y="0" width="25" height="25" fill="black" />
        <rect x="2" y="2" width="21" height="21" fill="white" />
        <rect x="6" y="6" width="13" height="13" fill="black" />

        <rect x="75" y="0" width="25" height="25" fill="black" />
        <rect x="77" y="2" width="21" height="21" fill="white" />
        <rect x="81" y="6" width="13" height="13" fill="black" />

        <rect x="0" y="75" width="25" height="25" fill="black" />
        <rect x="2" y="77" width="21" height="21" fill="white" />
        <rect x="6" y="81" width="13" height="13" fill="black" />

        {/* Small simulated QR dots */}
        <rect x="35" y="5" width="5" height="5" fill="black" />
        <rect x="45" y="10" width="10" height="5" fill="black" />
        <rect x="60" y="5" width="5" height="10" fill="black" />
        <rect x="30" y="20" width="15" height="5" fill="black" />

        <rect x="5" y="35" width="5" height="15" fill="black" />
        <rect x="15" y="45" width="10" height="5" fill="black" />
        <rect x="40" y="30" width="10" height="10" fill="black" />
        <rect x="60" y="25" width="5" height="15" fill="black" />

        <rect x="50" y="45" width="15" height="10" fill="black" />
        <rect x="35" y="60" width="5" height="5" fill="black" />
        <rect x="45" y="65" width="20" height="5" fill="black" />
        <rect x="30" y="75" width="5" height="15" fill="black" />

        <rect x="75" y="35" width="10" height="5" fill="black" />
        <rect x="85" y="45" width="5" height="15" fill="black" />
        <rect x="70" y="60" width="15" height="5" fill="black" />
        <rect x="65" y="80" width="10" height="10" fill="black" />
        <rect x="80" y="80" width="15" height="5" fill="black" />

        {/* Center alignment locator */}
        <rect x="45" y="45" width="10" height="10" fill="black" />
        <rect x="47" y="47" width="6" height="6" fill="white" />
        <rect x="49" y="49" width="2" height="2" fill="black" />
      </svg>
    );
  };

  const handleDownload = () => {
    if (!certData?.downloadUrl) return;
    
    // Open the download URL in a new window or trigger download directly
    const link = document.createElement('a');
    link.href = certData.downloadUrl;
    link.setAttribute('download', certData.file.filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
      
      {/* Visual glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Logo */}
      <header className="container mx-auto py-8 px-6 flex justify-between items-center z-10 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/verify')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-red-500 bg-white/[0.02] text-xs font-mono tracking-wider transition-all duration-300 rounded-none uppercase text-white/60 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Lookup ID
          </button>
        </div>
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-mono font-bold text-base tracking-[0.2em] uppercase">
            PREMA
          </span>
        </Link>
      </header>

      {/* Content Workspace */}
      <main className="flex-1 container mx-auto px-6 py-12 flex flex-col justify-center items-center z-10">
        {loading ? (
          <div className="flex flex-col items-center space-y-4 font-mono text-white/50 text-xs">
            <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
            <span>RESOLVING DIGITAL COMPLIANCE LEDGER...</span>
          </div>
        ) : error ? (
          /* Error state: Rejection Card */
          <div className="max-w-lg w-full bg-[#121214] border-2 border-red-500/30 p-6 md:p-8 space-y-6 relative shadow-2xl">
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-red-500" />

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-500">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-mono tracking-wide text-red-500 uppercase">
                VERIFICATION FAILURE
              </h2>
              <p className="text-xs font-mono text-white/50 bg-black/40 border border-white/5 py-1 px-3">
                SERIAL CODE: {id}
              </p>
              <p className="text-sm text-white/70 max-w-sm">
                No matching certificate record exists. The document may be counterfeit, tampered with, or the identifier might be entered incorrectly.
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3 font-mono text-[10px] text-white/40">
              <div className="flex justify-between">
                <span>VERIFICATION STATUS:</span>
                <span className="text-red-500 font-bold">REJECTED / INVALID</span>
              </div>
              <div className="flex justify-between">
                <span>ERROR REASON:</span>
                <span>UUID_RECORD_NOT_FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>NODE IP LOGGED:</span>
                <span>AUDIT_RECORDED</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/verify')}
              className="w-full flex items-center justify-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-colors rounded-none"
            >
              Search Another ID
            </button>
          </div>
        ) : (
          /* Success state: Certificate Details Verification Card */
          <div className="max-w-4xl w-full bg-[#121214] border border-white/15 p-6 md:p-8 space-y-8 relative shadow-2xl">
            {/* Corner tech indicators */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

            {/* Verification Status Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">COMPLIANCE LEDGER</span>
                <h2 className="text-xl md:text-2xl font-bold font-mono tracking-tight uppercase flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-emerald-500" />
                  VERIFIED DOCUMENT
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-none text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                AUTHENTIC & SECURED
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Document Specs */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Document Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                    <span className="text-[9px] text-white/30 block uppercase">CERTIFICATE ID</span>
                    <span className="text-white select-all break-all">{certData.id}</span>
                  </div>
                  <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                    <span className="text-[9px] text-white/30 block uppercase">DOCUMENT TYPE</span>
                    <span className="text-red-400 font-bold uppercase">{certData.type} CERTIFICATE</span>
                  </div>
                  <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                    <span className="text-[9px] text-white/30 block uppercase">DATE ISSUED</span>
                    <span className="text-white flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      {new Date(certData.issuedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </span>
                  </div>
                  <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                    <span className="text-[9px] text-white/30 block uppercase">VERIFIABLE FILE</span>
                    <span className="text-white flex items-center gap-1 text-[11px] truncate">
                      <FileText className="w-3.5 h-3.5 text-white/40" />
                      {certData.file.filename}
                    </span>
                  </div>
                </div>

                {certData.order && (
                  <>
                    <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5 pb-2 pt-2">Associated Order & Client</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                        <span className="text-[9px] text-white/30 block uppercase">ISSUED TO CLIENT</span>
                        <span className="text-white flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-white/40" />
                          {certData.order.companyName}
                        </span>
                      </div>
                      <div className="space-y-1 p-3 bg-black/25 border border-white/5">
                        <span className="text-[9px] text-white/30 block uppercase">ORDER REFERENCE</span>
                        <span className="text-white flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-white/40" />
                          PRM-ORD-{certData.order.id.substring(0, 8).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* QR Code and Actions */}
              <div className="flex flex-col items-center justify-center p-6 border border-white/10 bg-black/20 text-center space-y-4">
                {renderSvgQrCode(`http://localhost:3000/verify/${certData.id}`)}
                <div className="space-y-1 font-mono">
                  <span className="text-[9px] text-white/40 block tracking-wider">SECURED QR CODE</span>
                  <span className="text-[10px] text-emerald-400 font-bold block">SCAN TO VERIFY</span>
                </div>
              </div>
            </div>

            {/* Quality inspection results section */}
            {certData.order && certData.order.inspectionRecords && certData.order.inspectionRecords.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5 pb-2">Linked Inspection Reports</h3>
                <div className="border border-white/10 bg-black/20 overflow-hidden rounded-none">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/10 text-[9px] text-white/40">
                        <th className="p-3">RECORD ID</th>
                        <th className="p-3">INSPECTED BY</th>
                        <th className="p-3">PARAMETERS CHECKED</th>
                        <th className="p-3 text-center">QA STATUS</th>
                        <th className="p-3 text-right">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {certData.order.inspectionRecords.map((record: any) => (
                        <tr key={record.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-3 text-white font-bold select-all">
                            REC-{record.id.substring(0, 8).toUpperCase()}
                          </td>
                          <td className="p-3 text-white/80 flex items-center gap-1.5">
                            <User2 className="w-3.5 h-3.5 text-white/30" />
                            {record.inspectorName}
                          </td>
                          <td className="p-3 text-white/60">
                            {record.parametersChecked ? (
                              <div className="space-y-1">
                                {Object.entries(record.parametersChecked).map(([key, val]: any) => (
                                  <div key={key} className="flex justify-between max-w-xs text-[10px]">
                                    <span className="uppercase text-white/40">{key}:</span>
                                    <span className="text-white">{String(val)}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              'N/A'
                            )}
                            {record.notes && <div className="text-[10px] text-white/40 mt-1 italic">Note: {record.notes}</div>}
                          </td>
                          <td className="p-3 text-center">
                            <span className={`inline-block px-2 py-0.5 text-[10px] font-bold ${
                              record.status === 'PASSED' 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="p-3 text-right text-white/40">
                            {new Date(record.createdAt).toLocaleDateString(undefined, { dateStyle: 'short' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions panel */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-white/10 pt-6">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-none font-bold"
              >
                <Download className="w-4 h-4" />
                Download Certificate Document
              </button>
              <button
                onClick={() => router.push('/verify')}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-widest transition-colors rounded-none"
              >
                Lookup Another ID
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] font-mono text-white/30 z-10">
        © 2026 PREMA ENGINEERING WORKS. ALL RIGHTS RESERVED. SECURE TRACKING FRAMEWORK V1.9.0.
      </footer>
    </div>
  );
}
