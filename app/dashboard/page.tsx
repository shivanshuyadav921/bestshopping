/* PREMA ENGINEERING WORKS — Unified Platform Dashboard */
/* Design: Industrial document center. Space Grotesk / Inter pairings, Charcoal base, */
/* Signal Red highlight states, CMM metrics grid, and detailed status audit trails.   */

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Package, ShieldCheck, Download, Plus, FileText, Send, User, Bell, LogOut, ArrowRight, Shield } from 'lucide-react';
import RFQConfigurator from '@/components/RFQConfigurator';
import TechnicalIcon from '@/components/TechnicalIcon';
import { ConsolePanel } from '@/components/engineering';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'rfq' | 'files' | 'notifications' | 'audit'>('overview');

  // Customer state
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [customerRfqs, setCustomerRfqs] = useState<any[]>([]);
  const [customerFiles, setCustomerFiles] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);

  // Admin/Engineer state
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

  // Status transition form helper
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [nextStatus, setNextStatus] = useState<string>('');
  const [updateNote, setUpdateNote] = useState<string>('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // File upload state for admin/engineer
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadFilename, setUploadFilename] = useState('');
  const [uploadFileType, setUploadFileType] = useState('PDF');
  const [uploadSize, setUploadSize] = useState('500000');
  const [uploadTargetOrderId, setUploadTargetOrderId] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch Customer Portal data
  const fetchCustomerData = async () => {
    setIsLoadingCustomer(true);
    setErrorMsg(null);
    try {
      const [ordersRes, rfqsRes, filesRes, notifRes] = await Promise.all([
        fetch('/api/customer/orders'),
        fetch('/api/customer/rfq'),
        fetch('/api/customer/files'),
        fetch('/api/notifications')
      ]);

      if (ordersRes.ok) setCustomerOrders(await ordersRes.json());
      if (rfqsRes.ok) setCustomerRfqs(await rfqsRes.json());
      if (filesRes.ok) setCustomerFiles(await filesRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to sync customer details from API.');
    } finally {
      setIsLoadingCustomer(false);
    }
  };

  // Fetch Admin Console data
  const fetchAdminData = async () => {
    setIsLoadingAdmin(true);
    setErrorMsg(null);
    try {
      const [ordersRes, analyticsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/admin/dashboard/analytics')
      ]);

      if (ordersRes.ok) setAllOrders(await ordersRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to sync administrative parameters.');
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === 'CUSTOMER') {
      fetchCustomerData();
    } else {
      fetchAdminData();
    }
  }, [user]);

  // Request a signed shareable URL for downloading files securely
  const handleDownloadFile = async (fileId: string, filename: string) => {
    try {
      const res = await fetch(`/api/files/${fileId}/share`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Could not authorize download token');
      const data = await res.json();
      
      // Navigate to download URL containing signed token
      window.open(data.downloadUrl, '_blank');
    } catch (err: any) {
      alert(err.message || 'Error creating secure signed download URL.');
    }
  };

  // Trigger mark all notifications as read
  const handleMarkNotificationsRead = async () => {
    try {
      const res = await fetch('/api/notifications', { method: 'PATCH' });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Transition Order status (Admin/Engineer roles)
  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatingOrderId || !nextStatus) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/orders/${updatingOrderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          notes: updateNote || `State transition to ${nextStatus}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update order status');
      }

      setUpdatingOrderId(null);
      setUpdateNote('');
      fetchAdminData();
    } catch (err: any) {
      alert(err.message || 'Error updating order');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Admin file upload registration
  const handleRegisterFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFilename) return;

    setIsUploadingFile(true);
    try {
      const res = await fetch('/api/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: uploadFilename,
          url: `https://prema-bucket.s3.amazonaws.com/orders/${Date.now()}-${uploadFilename}`,
          fileType: uploadFileType,
          size: parseInt(uploadSize) || 500000,
          orderId: uploadTargetOrderId || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to register file asset metadata');
      }

      setUploadFilename('');
      setUploadTargetOrderId('');
      alert('File registered and linked successfully.');
      fetchAdminData();
    } catch (err: any) {
      alert(err.message || 'Error registering file');
    } finally {
      setIsUploadingFile(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md w-full border border-white/10 bg-card p-8 text-center space-y-6">
          <Shield className="w-12 h-12 text-accent mx-auto" />
          <h2 className="text-xl font-bold tracking-tight text-white font-display">Session Required</h2>
          <p className="text-sm text-white/60">
            Authentication is required to view this manufacturing dashboard.
          </p>
          <a
            href="/auth/login"
            className="block py-3 bg-accent text-accent-foreground font-bold tracking-widest uppercase text-xs transition-transform duration-200 active:scale-95"
          >
            Access Login
          </a>
        </div>
      </div>
    );
  }

  const isCustomer = user.role === 'CUSTOMER';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-background border-b border-white/10 h-20 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            className="h-9 w-9"
          />
          <div>
            <h1 className="text-md font-bold text-white tracking-tight leading-none uppercase">PREMA Platform</h1>
            <span className="text-[9px] font-mono text-white/40 tracking-wider">CONSOLE // ROLE: {user.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-bold text-white">{user.name}</span>
            <span className="text-[10px] font-mono text-white/50">{user.email}</span>
          </div>
          <button
            onClick={logout}
            className="p-2 border border-white/10 hover:border-accent hover:text-accent transition-colors duration-200 text-white/60"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 container py-10 space-y-10">
        {errorMsg && (
          <div className="p-4 border border-accent/20 bg-accent/5 text-accent text-xs font-mono">
            {errorMsg}
          </div>
        )}

        {isCustomer ? (
          /* ========================================================================= */
          /* CUSTOMER PORTAL VIEW                                                      */
          /* ========================================================================= */
          <div className="space-y-8">
            {/* Header info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/15 p-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to the Client Portal</h2>
                <p className="text-xs text-white/60 font-light mt-1">Submit parts requests, review estimates, track order telemetry, and download material certificates.</p>
              </div>
              <button
                onClick={() => setActiveSubTab('rfq')}
                className="px-5 py-2.5 bg-accent text-accent-foreground font-bold tracking-widest text-xs uppercase transition-transform duration-200 active:scale-95"
              >
                Submit New RFQ
              </button>
            </div>

            {/* Sub navigation Tabs */}
            <div className="flex border-b border-white/10 gap-1 overflow-x-auto scrollbar-none">
              {(['overview', 'rfq', 'files', 'notifications'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-200 ${
                    activeSubTab === tab ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Sub Tab contents */}
            <AnimatePresence mode="wait">
              {activeSubTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Current Active Orders */}
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">Active Production Orders</h3>
                    {customerOrders.length === 0 ? (
                      <div className="p-8 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40">
                        No active manufacturing orders found.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {customerOrders.map((order) => (
                          <ConsolePanel key={order.id}>
                            <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-accent uppercase tracking-wider">ORDER #{order.id.substring(0, 8)}</span>
                                <h4 className="text-sm font-bold text-white">Status: {order.status}</h4>
                                <p className="text-xs text-white/60 font-light max-w-lg">{order.notes || 'No notes available.'}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-white/40 block font-mono">ESTIMATED PRICE</span>
                                <span className="text-sm font-mono text-white font-bold">${order.totalAmount || 'Pending'}</span>
                              </div>
                            </div>
                            
                            {/* Order Updates Timeline */}
                            {order.updates && order.updates.length > 0 && (
                              <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-3 bg-black/10">
                                <p className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Timeline Logs</p>
                                <div className="space-y-2">
                                  {order.updates.map((upd: any) => (
                                    <div key={upd.id} className="flex justify-between items-start text-[11px] font-mono">
                                      <span className="text-accent">{upd.status}</span>
                                      <span className="text-white/60 max-w-md text-right">{upd.note}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </ConsolePanel>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'rfq' && (
                <motion.div
                  key="rfq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <RFQConfigurator />

                  {/* Submitted RFQs */}
                  <div className="border-t border-white/15 pt-8">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">Your Submitted RFQs</h3>
                    {customerRfqs.length === 0 ? (
                      <p className="text-xs text-white/40 font-light">No RFQ history found.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {customerRfqs.map((rfq) => (
                          <div key={rfq.id} className="p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] font-mono text-accent tracking-widest uppercase">RFQ #{rfq.id.substring(0, 8)}</span>
                              <h4 className="text-xs font-bold text-white mt-1 mb-2">{rfq.status}</h4>
                              <p className="text-xs text-white/70 font-light leading-relaxed mb-4">{rfq.description}</p>
                            </div>
                            {rfq.notes && (
                              <p className="text-[10px] text-white/50 italic border-l border-white/10 pl-2">Notes: {rfq.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'files' && (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Your Technical Drawings & Certificates</h3>
                  {customerFiles.length === 0 ? (
                    <div className="p-8 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40">
                      No technical drawing or certificate files associated with your profile.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {customerFiles.map((file) => (
                        <div key={file.id} className="p-5 border border-white/10 bg-white/[0.02] space-y-4">
                          <div className="flex items-start gap-3">
                            <FileText className="w-8 h-8 text-accent shrink-0" />
                            <div>
                              <h4 className="text-xs font-bold text-white break-all">{file.filename}</h4>
                              <span className="text-[9px] font-mono text-white/40 uppercase">{file.fileType} // {Math.round(file.size / 1024)} KB</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadFile(file.id, file.filename)}
                            className="w-full py-2 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/5 text-[10px] font-bold tracking-wider uppercase text-white transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <Download className="w-3 h-3" /> Secure Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSubTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">System Alerts</h3>
                    {notifications.some(n => !n.isRead) && (
                      <button
                        onClick={handleMarkNotificationsRead}
                        className="text-[10px] font-bold text-accent hover:opacity-85 uppercase tracking-wider"
                      >
                        Mark All as Read
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-white/40">No alerts in inbox.</p>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border text-xs flex justify-between gap-4 items-start ${
                            n.isRead ? 'border-white/5 bg-white/[0.01] text-white/60' : 'border-accent/20 bg-accent/5 text-white'
                          }`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-bold flex items-center gap-1.5">
                              {!n.isRead && <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />}
                              {n.title}
                            </h4>
                            <p className="font-light">{n.message}</p>
                          </div>
                          <span className="text-[9px] font-mono text-white/30 shrink-0">{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* ========================================================================= */
          /* OWNER / ADMIN / ENGINEER WORKSPACE VIEW                                    */
          /* ========================================================================= */
          <div className="space-y-10">
            {/* Metrics cards */}
            {analytics?.metrics && (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Active Orders', val: analytics.metrics.activeOrders },
                  { label: 'Pending RFQs', val: analytics.metrics.pendingRfqs },
                  { label: 'Running Jobs', val: analytics.metrics.activeJobs },
                  { label: 'Total Customers', val: analytics.metrics.totalCustomers },
                  { label: 'QA Pass Rate', val: `${analytics.metrics.inspectionSuccessRate}%` },
                ].map((m, idx) => (
                  <div key={idx} className="p-4 border border-white/10 bg-white/[0.02]">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{m.label}</span>
                    <p className="text-xl font-bold text-white mt-1">{m.val}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-white/10 gap-1">
              {(['overview', 'files', 'audit'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-200 ${
                    activeSubTab === tab ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeSubTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Transition status form */}
                  {updatingOrderId && (
                    <div className="p-6 border border-accent bg-accent/5 space-y-4">
                      <h4 className="text-xs font-bold tracking-widest text-accent uppercase">Transition Order Status</h4>
                      <form onSubmit={handleUpdateOrderStatus} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-[9px] font-mono text-white/50 mb-1.5">TARGET STATE</label>
                          <select
                            value={nextStatus}
                            onChange={(e) => setNextStatus(e.target.value)}
                            className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent"
                          >
                            <option value="">Select state...</option>
                            <option value="RFQ_RECEIVED">RFQ Received</option>
                            <option value="QUOTED">Quoted</option>
                            <option value="APPROVED">Approved</option>
                            <option value="MATERIAL_PROCUREMENT">Material Procurement</option>
                            <option value="MANUFACTURING">Manufacturing</option>
                            <option value="INSPECTION">Inspection</option>
                            <option value="DISPATCH">Dispatch</option>
                            <option value="DELIVERED">Delivered</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/50 mb-1.5">TRANSITION NOTE</label>
                          <input
                            type="text"
                            value={updateNote}
                            onChange={(e) => setUpdateNote(e.target.value)}
                            placeholder="e.g. Dimensions verified by CMM"
                            className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isUpdatingStatus}
                            className="flex-1 py-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                          >
                            {isUpdatingStatus ? 'Saving...' : 'Confirm'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setUpdatingOrderId(null)}
                            className="px-4 py-2 border border-white/10 text-xs text-white hover:bg-white/5"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* List all active orders */}
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-4">Active Production Queue</h3>
                    {allOrders.length === 0 ? (
                      <p className="text-xs text-white/40 font-light">Queue is currently clear.</p>
                    ) : (
                      <div className="space-y-4">
                        {allOrders.map((order) => (
                          <div key={order.id} className="p-5 border border-white/10 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono text-white/40 uppercase">ORDER ID: #{order.id.substring(0, 8)}</span>
                              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                {order.status}
                                <span className="text-[10px] font-normal text-accent bg-accent/15 px-2 py-0.5 uppercase tracking-wide">
                                  {order.customer.companyName}
                                </span>
                              </h4>
                              <p className="text-xs text-white/60 font-light">{order.notes || 'No description notes.'}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setUpdatingOrderId(order.id);
                                  setNextStatus(order.status);
                                }}
                                className="px-3.5 py-2 border border-white/10 hover:border-accent hover:text-accent text-[10px] font-bold tracking-widest uppercase text-white transition-colors"
                              >
                                Change Status
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'files' && (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* File Register Form */}
                  <div className="lg:col-span-5 p-6 border border-white/10 bg-white/[0.01] space-y-4 h-fit">
                    <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-2">Register File Attachment</h4>
                    <form onSubmit={handleRegisterFile} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono text-white/50 mb-1">FILENAME</label>
                        <input
                          type="text"
                          required
                          value={uploadFilename}
                          onChange={(e) => setUploadFilename(e.target.value)}
                          placeholder="e.g. mirror_shaft_revision_2.dwg"
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono text-white/50 mb-1">FILE TYPE</label>
                          <select
                            value={uploadFileType}
                            onChange={(e) => setUploadFileType(e.target.value)}
                            className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent"
                          >
                            <option value="PDF">PDF</option>
                            <option value="STEP">STEP</option>
                            <option value="DWG">DWG</option>
                            <option value="DXF">DXF</option>
                            <option value="PNG">PNG</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-white/50 mb-1">ORDER ID (OPTIONAL)</label>
                          <input
                            type="text"
                            value={uploadTargetOrderId}
                            onChange={(e) => setUploadTargetOrderId(e.target.value)}
                            placeholder="UUID string"
                            className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isUploadingFile}
                        className="w-full py-2.5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                      >
                        {isUploadingFile ? 'Registering...' : 'Register File Asset'}
                      </button>
                    </form>
                  </div>

                  {/* Quick look drawings */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase">Shared Drawings in Production</h4>
                    <p className="text-xs text-white/60 font-light">Drawings registered via file system will be listed here. Engineers bypass signed checks to view raw storage buffers.</p>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'audit' && (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Recent System Operations Audit Trail</h3>
                  {analytics?.recentActivity && analytics.recentActivity.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.recentActivity.map((act: any) => (
                        <div key={act.id} className="p-4 border border-white/5 bg-white/[0.01] text-xs font-mono">
                          <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                            <span className="text-accent">ACTION: {act.action} // ENTITY: {act.entity}</span>
                            <span className="text-white/30">{new Date(act.timestamp).toLocaleString()}</span>
                          </div>
                          <div className="text-white/60">
                            <div>BY: <span className="text-white">{act.user} ({act.role})</span></div>
                            {act.reason && <div>REASON: <span className="text-white">{act.reason}</span></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-white/40 font-light">No audit events recorded.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
