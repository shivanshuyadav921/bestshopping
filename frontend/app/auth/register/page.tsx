/* PREMA ENGINEERING WORKS — Client Registration Page */

'use client';

import { useState } from 'react';
import { Loader2, User, Building2, Phone, Mail, Globe, MapPin, KeyRound, ShieldAlert, CheckCircle, Navigation } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    contactPhone: '',
    industry: 'General Engineering',
    country: '',
    state: '',
    city: '',
    password: '',
    
    // Optional details
    address: '',
    gstNumber: '',
    website: '',
    linkedIn: '',
    pinCode: '',
    notes: '',
  });

  const [locationState, setLocationState] = useState<{
    latitude: number | null;
    longitude: number | null;
    source: 'MANUAL' | 'GEOLOCATION' | 'IP';
    loading: boolean;
    statusText: string;
  }>({
    latitude: null,
    longitude: null,
    source: 'MANUAL',
    loading: false,
    statusText: 'Click to share browser location (Optional)',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      setLocationState((prev) => ({
        ...prev,
        statusText: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    setLocationState((prev) => ({ ...prev, loading: true, statusText: 'Requesting permission...' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationState({
          latitude,
          longitude,
          source: 'GEOLOCATION',
          loading: false,
          statusText: `GPS Locked: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`,
        });
      },
      (error) => {
        console.error(error);
        setLocationState({
          latitude: null,
          longitude: null,
          source: 'MANUAL',
          loading: false,
          statusText: 'GPS Permission Denied. Fallback to manual/IP.',
        });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const payload = {
      ...formData,
      latitude: locationState.latitude,
      longitude: locationState.longitude,
      locationSource: locationState.source,
      // map empty strings to null for backend schema
      address: formData.address || null,
      gstNumber: formData.gstNumber || null,
      website: formData.website || null,
      linkedIn: formData.linkedIn || null,
      pinCode: formData.pinCode || null,
      notes: formData.notes || null,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccessMsg('Account registered successfully. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2500);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
      <div className="grid-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="w-full max-w-2xl space-y-8 relative z-10 border border-border bg-card p-8 md:p-10 shadow-2xl my-8 text-foreground">
        {/* Header */}
        <div className="text-center space-y-3">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            className="h-12 w-12 mx-auto"
          />
          <h2 className="text-2xl font-bold tracking-tight text-foreground font-display uppercase">
            Client Portal Registration
          </h2>
          <p className="text-xs text-muted-foreground tracking-wider font-mono">
            PREMA MANUFACTURING OPERATING SYSTEM
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 border border-accent/20 bg-accent/5 text-accent text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {successMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Contact Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  name="email"
                  autoComplete="username email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Company Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Acme Corporation"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  name="contactPhone"
                  autoComplete="tel"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 019-2834"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Industry *
              </label>
              <div className="relative">
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground focus:outline-none focus:border-accent text-sm font-mono appearance-none"
                >
                  <option value="General Engineering" className="bg-card text-foreground">General Engineering</option>
                  <option value="Aerospace" className="bg-card text-foreground">Aerospace</option>
                  <option value="Automotive" className="bg-card text-foreground">Automotive</option>
                  <option value="Medical Devices" className="bg-card text-foreground">Medical Devices</option>
                  <option value="Defense" className="bg-card text-foreground">Defense</option>
                  <option value="Robotics" className="bg-card text-foreground">Robotics</option>
                  <option value="Electronics" className="bg-card text-foreground">Electronics</option>
                  <option value="Oil & Gas" className="bg-card text-foreground">Oil & Gas</option>
                </select>
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Country *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="India"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                State *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Karnataka"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                City *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Bengaluru"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                Access Code (Password) *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                />
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              </div>
            </div>
          </div>

          {/* Browser Location Section */}
          <div className="border border-border bg-secondary/30 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Location Intelligence</span>
              <p className="text-[11px] text-foreground/80">{locationState.statusText}</p>
            </div>
            <button
              type="button"
              onClick={handleShareLocation}
              disabled={locationState.loading}
              className="py-2 px-4 border border-border hover:border-accent hover:text-accent hover:bg-accent/5 text-[10px] font-bold tracking-wider uppercase text-foreground transition-colors duration-200 flex items-center gap-1.5 shrink-0"
            >
              {locationState.loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Navigation className="w-3.5 h-3.5" />
              )}
              Share Geolocation
            </button>
          </div>

          {/* Toggle Optional Fields */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowOptional(!showOptional)}
              className="text-[11px] text-accent hover:underline font-mono uppercase tracking-wider"
            >
              {showOptional ? '[-] Hide Optional Profile Parameters' : '[+] Specify Optional Profile Parameters (Address, GST, etc.)'}
            </button>

            {showOptional && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-border bg-secondary/30 transition-all">
                {/* Address */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Mailing Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Manufacturing Way, Tech City"
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>

                {/* GST Number */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    placeholder="29AAAAA0000A1Z5"
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Corporate Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://company.com"
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/company/abc"
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>

                {/* PIN Code */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    PIN / ZIP Code
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="560001"
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                    Additional Notes / Engineering Preferences
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="E.g. Prefers CNC machining tolerances in metric Ra 0.8"
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border border-border text-foreground placeholder-muted-foreground/45 focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-accent text-accent-foreground font-bold tracking-widest uppercase text-xs transition-all duration-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering Account...
              </>
            ) : (
              'Create Client Account'
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            Already have an account?{' '}
            <a href="/auth/login" className="text-accent hover:underline font-bold uppercase tracking-wider ml-1">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
