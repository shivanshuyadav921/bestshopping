"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            setStatus("error");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters");
            setStatus("error");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Password updated successfully! Redirecting to login...");
                setTimeout(() => { window.location.href = "/auth/login"; }, 3000);
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to reset password");
            }
        } catch {
            setStatus("error");
            setMessage("An unexpected error occurred");
        }
    };

    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0c0c0e] px-4">
                <div className="w-full max-w-md border border-white/10 bg-white/[0.02] p-8 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h1>
                    <p className="text-sm text-white/50 mb-4">This password reset link is invalid or missing required parameters.</p>
                    <a href="/auth/forgot-password" className="text-xs text-[#ef4444] hover:underline">Request a new reset link</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c0c0e] px-4">
            <div className="w-full max-w-md">
                <div className="border border-white/10 bg-white/[0.02] p-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
                    <p className="text-sm text-white/50 mb-6">Enter your new password below.</p>

                    {status === "success" ? (
                        <div className="border border-green-500/20 bg-green-500/5 p-4 mb-4">
                            <p className="text-sm text-green-400">{message}</p>
                        </div>
                    ) : status === "error" ? (
                        <div className="border border-red-500/20 bg-red-500/5 p-4 mb-4">
                            <p className="text-sm text-red-400">{message}</p>
                        </div>
                    ) : null}

                    {status !== "success" && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                                    placeholder="Min. 6 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                                    placeholder="Re-enter password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-[#ef4444] text-white py-3 text-sm font-semibold hover:bg-[#dc2626] disabled:opacity-50 transition-colors"
                            >
                                {status === "loading" ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0c0c0e] px-4">
                <div className="w-full max-w-md border border-white/10 bg-white/[0.02] p-8 text-center">
                    <p className="text-sm text-white/50">Loading...</p>
                </div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}