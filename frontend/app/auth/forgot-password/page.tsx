"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            // Always show success to prevent email enumeration
            setStatus("sent");
        } catch {
            setStatus("sent"); // Still show success
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c0c0e] px-4">
            <div className="w-full max-w-md">
                <div className="border border-white/10 bg-white/[0.02] p-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-sm text-white/50 mb-6">
                        Enter your email address and{"we'll"} send you a link to reset your password.
                    </p>

                    {status === "sent" ? (
                        <div className="border border-green-500/20 bg-green-500/5 p-4 mb-4">
                            <p className="text-sm text-green-400">
                                If an account with that email exists, you{"'"}ll receive a password reset link shortly. Check your inbox and spam folder.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                                    placeholder="you@company.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-[#ef4444] text-white py-3 text-sm font-semibold hover:bg-[#dc2626] disabled:opacity-50 transition-colors"
                            >
                                {status === "loading" ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <a href="/auth/login" className="text-xs text-white/40 hover:text-white/60">
                            Back to Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}