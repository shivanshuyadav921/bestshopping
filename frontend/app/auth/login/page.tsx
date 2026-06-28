/* PREMA ENGINEERING WORKS — Sign In Page */

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Loader2, KeyRound, Mail, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg('Invalid email address or security password.');
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (roleEmail: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await signIn('credentials', {
        email: roleEmail,
        password: 'password123',
        redirect: false,
      });
      if (res?.error) {
        setErrorMsg('Failed quick login. Ensure database seeding is run.');
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Quick login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
      <div className="grid-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10 border border-white/10 bg-card p-8 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            className="h-12 w-12 mx-auto"
          />
          <h2 className="text-2xl font-bold tracking-tight text-white font-display uppercase">
            Platform Sign In
          </h2>
          <p className="text-xs text-white/50 tracking-wider font-mono">
            PREMA MANUFACTURING OPERATING SYSTEM
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 border border-accent/20 bg-accent/5 text-accent text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                autoComplete="username email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@prema.com"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-none placeholder-white/20 focus:outline-none focus:border-accent text-sm font-mono"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-white/50">
              Access Code
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-none placeholder-white/20 focus:outline-none focus:border-accent text-sm font-mono"
              />
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-accent text-accent-foreground font-bold tracking-widest uppercase text-xs transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : (
              'Establish Session'
            )}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-white/40">
            <input type="checkbox" className="w-3 h-3 accent-[#ef4444]" />
            Remember me
          </label>
          <a href="/auth/forgot-password" className="text-xs text-[#ef4444] hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign Up Link */}
        <div className="border-t border-white/10 pt-4 text-center">
          <p className="text-xs text-white/40">
            Don{"'"}t have an account?{" "}
            <a href="/auth/register" className="text-[#ef4444] hover:underline font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
