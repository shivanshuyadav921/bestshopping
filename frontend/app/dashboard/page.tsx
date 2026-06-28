/* PREMA ENGINEERING WORKS — Unified Platform Dashboard */
/* Design: Industrial document center. Space Grotesk / Inter pairings, Charcoal base, */
/* Signal Red highlight states, CMM metrics grid, and detailed status audit trails.   */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { 
  Loader2, Package, ShieldCheck, Download, Plus, FileText, Send, 
  User, Bell, LogOut, ArrowRight, Shield, Search, Filter, MapPin, 
  Navigation, MessageSquare, PhoneCall, HeartHandshake, History, 
  BarChart3, Users, Building, Laptop, Compass, CheckCircle2, 
  AlertTriangle, ExternalLink, RefreshCw, MessageSquareCode,
  Settings, Award, Eye, TrendingUp, Globe, Map, Database, Trash2, Cpu
} from 'lucide-react';

const RFQConfigurator = dynamic(() => import('@/components/RFQConfigurator'), {
  ssr: false,
  loading: () => (
    <div className="p-8 border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center space-y-4 animate-pulse">
      <Loader2 className="w-8 h-8 text-accent animate-spin" />
      <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Loading Configuration Engine...</span>
    </div>
  ),
});

import TechnicalIcon from '@/components/TechnicalIcon';
import { ConsolePanel } from '@/components/engineering';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');

  // Customer state
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [customerRfqs, setCustomerRfqs] = useState<any[]>([]);
  const [customerFiles, setCustomerFiles] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [customerProfile, setCustomerProfile] = useState<any | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);

  // File Download Center and Preview States
  const [fileCategoryFilter, setFileCategoryFilter] = useState<'all' | 'drawings' | 'quotations' | 'reports' | 'certificates'>('all');
  const [fileSearchQuery, setFileSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  // Notification center alerts state filter
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread'>('all');

  // Customer settings preferences (loaded from localStorage on client side)
  const [emailOrderUpdates, setEmailOrderUpdates] = useState(true);
  const [emailQuoteReady, setEmailQuoteReady] = useState(true);
  const [emailCertificates, setEmailCertificates] = useState(true);
  const [dispatchPreference, setDispatchPreference] = useState<'EMAIL' | 'WHATSAPP' | 'BOTH'>('EMAIL');
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState<string | null>(null);

  // Inquiry form in Customer dashboard
  const [inquiryType, setInquiryType] = useState<'CONTACT' | 'CALLBACK' | 'SUPPORT'>('CONTACT');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccessMsg, setInquirySuccessMsg] = useState<string | null>(null);

  // Customer Profile form
  const [profileForm, setProfileForm] = useState({
    name: '',
    companyName: '',
    contactPhone: '',
    industry: '',
    country: '',
    state: '',
    city: '',
    address: '',
    gstNumber: '',
    website: '',
    linkedIn: '',
    pinCode: '',
    notes: '',
    latitude: '',
    longitude: '',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsStatusText, setGpsStatusText] = useState('Sync GPS Coordinates');
  
  // Admin customer coordinates edit override states
  const [editingCoordsId, setEditingCoordsId] = useState<string | null>(null);
  const [manualLat, setManualLat] = useState<string>('');
  const [manualLon, setManualLon] = useState<string>('');

  // Certificate states
  const [customerCertificates, setCustomerCertificates] = useState<any[]>([]);
  const [allCertificates, setAllCertificates] = useState<any | null>(null);
  const [newCertOrderId, setNewCertOrderId] = useState('');
  const [newCertType, setNewCertType] = useState<'Material' | 'HeatTreatment' | 'Inspection'>('Material');
  const [newCertFileId, setNewCertFileId] = useState('');
  const [isIssuingCert, setIsIssuingCert] = useState(false);
  const [certIssueError, setCertIssueError] = useState<string | null>(null);
  const [certIssueSuccess, setCertIssueSuccess] = useState<string | null>(null);
  const [certSearchQuery, setCertSearchQuery] = useState('');

  // Observability & Health stats states
  const [observabilityMetrics, setObservabilityMetrics] = useState<any | null>(null);
  const [isLoadingObservability, setIsLoadingObservability] = useState(false);
  const [isRetryingJobId, setIsRetryingJobId] = useState<string | null>(null);

  // Admin/Engineer state
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

  // Search & Filter criteria for Admin tabs
  const [leadsSearch, setLeadsSearch] = useState('');
  const [leadsFilter, setLeadsFilter] = useState('ALL'); // ALL, NEW, CONTACTED
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryFilter, setDirectoryFilter] = useState('ALL'); // ALL, Industry filters
  const [inquiriesSearch, setInquiriesSearch] = useState('');
  const [inquiriesFilter, setInquiriesFilter] = useState('ALL'); // ALL, CONTACT, CALLBACK, SUPPORT

  // Admin notes state
  const [editingCustomerNotesId, setEditingCustomerNotesId] = useState<string | null>(null);

  const [thirtyDaysAgo, setThirtyDaysAgo] = useState<number>(0);
  useEffect(() => {
    Promise.resolve().then(() => {
      setThirtyDaysAgo(Date.now() - 30 * 24 * 60 * 60 * 1000);
    });
  }, []);
  const [editingCustomerNotesText, setEditingCustomerNotesText] = useState('');
  const [editingCustomerTags, setEditingCustomerTags] = useState<string[]>([]);
  const [editingCustomerLeadScore, setEditingCustomerLeadScore] = useState<string>('LOW');
  const [isSavingCustomerNotes, setIsSavingCustomerNotes] = useState(false);

  const [editingInquiryNotesId, setEditingInquiryNotesId] = useState<string | null>(null);
  const [editingInquiryNotesText, setEditingInquiryNotesText] = useState('');
  const [editingInquiryStatus, setEditingInquiryStatus] = useState('PENDING');
  const [isSavingInquiryNotes, setIsSavingInquiryNotes] = useState(false);

  // Map widget focus and projection state (Admin)
  const [mapFocusId, setMapFocusId] = useState<string | null>(null);
  const [mapProjection, setMapProjection] = useState<'india' | 'world'>('india');

  // Dynamic memo statistics for Growth, RFQ Trends, Conversions, and Leaderboards
  const customerStats = useMemo(() => {
    if (!analytics?.customers) return { total: 0, growth: 0 };
    const total = analytics.customers.length;
    if (thirtyDaysAgo === 0) return { total, growth: 0 };
    const last30 = analytics.customers.filter((c: any) => new Date(c.createdAt).getTime() > thirtyDaysAgo).length;
    const prevCount = total - last30;
    const growth = prevCount > 0 ? Math.round((last30 / prevCount) * 100) : (last30 > 0 ? 100 : 0);
    return { total, growth };
  }, [analytics, thirtyDaysAgo]);

  const rfqStats = useMemo(() => {
    if (!analytics?.charts?.rfqTrends) return { total: 0, growth: 0 };
    const trends = analytics.charts.rfqTrends;
    if (trends.length < 2) return { total: trends[0]?.count || 0, growth: 0 };
    const currentMonth = trends[trends.length - 1].count;
    const prevMonth = trends[trends.length - 2].count;
    const growth = prevMonth > 0 ? Math.round(((currentMonth - prevMonth) / prevMonth) * 100) : (currentMonth > 0 ? 100 : 0);
    const total = trends.reduce((acc: number, curr: any) => acc + curr.count, 0);
    return { total, currentMonth, growth };
  }, [analytics]);

  const leadStats = useMemo(() => {
    if (!analytics?.leads) return { total: 0, converted: 0, rate: 0 };
    const total = analytics.leads.length;
    const converted = analytics.leads.filter((l: any) => l.status === 'CONVERTED').length;
    const rate = total > 0 ? Math.round((converted / total) * 100) : 0;
    return { total, converted, rate };
  }, [analytics]);

  const jobStats = useMemo(() => {
    if (!analytics?.metrics) return { successRate: 100, active: 0 };
    return {
      successRate: analytics.metrics.inspectionSuccessRate ?? 100,
      active: analytics.metrics.activeJobs ?? 0,
    };
  }, [analytics]);

  const topCustomers = useMemo(() => {
    if (!analytics?.customers) return [];
    return [...analytics.customers]
      .map((c: any) => {
        let score = c.activities?.length || 0;
        if (c.leadScore === 'HIGH') score += 30;
        if (c.leadScore === 'MEDIUM') score += 15;
        return { ...c, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [analytics]);

  // Status transition form helper (Admin)
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
      const [ordersRes, rfqsRes, filesRes, notifRes, profileRes, certsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/orders`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/rfq`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/files`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/notifications`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/profile`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/certificates`),
      ]);

      if (ordersRes.ok) setCustomerOrders(await ordersRes.json());
      if (rfqsRes.ok) setCustomerRfqs(await rfqsRes.json());
      if (filesRes.ok) setCustomerFiles(await filesRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
      if (certsRes.ok) setCustomerCertificates(await certsRes.json());
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setCustomerProfile(profile);
        setProfileForm({
          name: profile.name || '',
          companyName: profile.companyName || '',
          contactPhone: profile.contactPhone || '',
          industry: profile.industry || '',
          country: profile.country || '',
          state: profile.state || '',
          city: profile.city || '',
          address: profile.address || '',
          gstNumber: profile.gstNumber || '',
          website: profile.website || '',
          linkedIn: profile.linkedIn || '',
          pinCode: profile.pinCode || '',
          notes: profile.notes || '',
          latitude: profile.location?.latitude !== null && profile.location?.latitude !== undefined ? String(profile.location.latitude) : '',
          longitude: profile.location?.longitude !== null && profile.location?.longitude !== undefined ? String(profile.location.longitude) : '',
        });
      }
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
      const [ordersRes, analyticsRes, certsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/orders`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/dashboard/analytics`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/certificates`)
      ]);

      if (ordersRes.ok) setAllOrders(await ordersRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (certsRes.ok) setAllCertificates(await certsRes.json());
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to sync administrative parameters.');
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  const fetchObservabilityData = async () => {
    setIsLoadingObservability(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`);
      if (res.ok) {
        setObservabilityMetrics(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch observability metrics:", err);
    } finally {
      setIsLoadingObservability(false);
    }
  };

  const handleRetryJob = async (jobId: string) => {
    setIsRetryingJobId(jobId);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'retry', jobId }),
      });
      if (res.ok) {
        alert('Job scheduled for retry.');
        fetchObservabilityData();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to retry job');
      }
    } catch (err) {
      console.error("Failed to retry job:", err);
    } finally {
      setIsRetryingJobId(null);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', jobId }),
      });
      if (res.ok) {
        alert('Job deleted.');
        fetchObservabilityData();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete job');
      }
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  useEffect(() => {
    if (user && user.role !== 'CUSTOMER' && activeSubTab === 'observability') {
      Promise.resolve().then(() => {
        fetchObservabilityData();
      });
    }
  }, [activeSubTab, user]);

  useEffect(() => {
    if (!user) return;
    if (user.role === 'CUSTOMER') {
      Promise.resolve().then(() => {
        fetchCustomerData();
      });
    } else {
      Promise.resolve().then(() => {
        fetchAdminData();
      });
    }
  }, [user]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewFile(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Request a signed shareable URL for downloading files securely
  const handleDownloadFile = async (fileId: string, filename: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/files/${fileId}/share`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Could not authorize download token');
      const data = await res.json();
      
      // Navigate to download URL containing signed token
      window.open(data.downloadUrl, '_blank');
      
      // Re-trigger CustomerData to log certificate download in timeline
      if (user?.role === 'CUSTOMER') {
        setTimeout(fetchCustomerData, 1000);
      }
    } catch (err: any) {
      alert(err.message || 'Error creating secure signed download URL.');
    }
  };

  // Trigger mark all notifications as read
  const handleMarkNotificationsRead = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/notifications`, { method: 'PATCH' });
      if (res.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrderUpdates = localStorage.getItem('prema_pref_order_updates');
      const storedQuoteReady = localStorage.getItem('prema_pref_quote_ready');
      const storedCerts = localStorage.getItem('prema_pref_certs');
      const storedDispatch = localStorage.getItem('prema_pref_dispatch');

      Promise.resolve().then(() => {
        if (storedOrderUpdates !== null) setEmailOrderUpdates(storedOrderUpdates === 'true');
        if (storedQuoteReady !== null) setEmailQuoteReady(storedQuoteReady === 'true');
        if (storedCerts !== null) setEmailCertificates(storedCerts === 'true');
        if (storedDispatch !== null) setDispatchPreference(storedDispatch as any);
      });
    }
  }, []);

  // Save settings preferences
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('prema_pref_order_updates', String(emailOrderUpdates));
      localStorage.setItem('prema_pref_quote_ready', String(emailQuoteReady));
      localStorage.setItem('prema_pref_certs', String(emailCertificates));
      localStorage.setItem('prema_pref_dispatch', dispatchPreference);
      setSettingsSuccessMsg('Preferences updated.');
      setTimeout(() => setSettingsSuccessMsg(null), 3000);
      
      // Emit dummy event or log activity timeline
      if (user?.role === 'CUSTOMER') {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/profile`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notes: customerProfile?.notes || `Communication preferences modified.`
          }),
        }).then(() => {
          fetchCustomerData();
        });
      }
    }
  };

  // Dynamic file classification helper
  const classifyFile = (file: any) => {
    const name = (file.filename || '').toLowerCase();
    
    if (name.includes('cert') || name.includes('mtc') || name.includes('compliance') || name.includes('mill') || name.includes('coate') || name.includes('heat') || name.includes('test')) {
      return 'certificates';
    }
    if (name.includes('inspection') || name.includes('report') || name.includes('cmm') || name.includes('qc') || name.includes('qa') || name.includes('measure') || name.includes('dimensional') || name.includes('verif')) {
      return 'reports';
    }
    if (name.includes('quote') || name.includes('quotation') || name.includes('est') || name.includes('estimate') || name.includes('price') || name.includes('pricing') || name.includes('invoice') || name.includes('cost')) {
      return 'quotations';
    }
    return 'drawings'; // Default category
  };

  // File Preview Handler
  const handlePreviewFile = async (file: any) => {
    setPreviewFile(file);
    setIsPreviewLoading(true);
    setPreviewUrl(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/files/${file.id}/share`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Could not authorize preview token');
      const data = await res.json();
      
      const fileRes = await fetch(data.downloadUrl);
      if (!fileRes.ok) throw new Error('Failed to fetch preview file');
      const fileData = await fileRes.json();
      
      setPreviewUrl(fileData.url);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error generating preview authorization.');
      setPreviewFile(null);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Transition Order status (Admin/Engineer roles)
  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatingOrderId || !nextStatus) return;

    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/orders/${updatingOrderId}`, {
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

  // Issue Verifiable Quality Certificate (Admin/Engineer roles)
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertFileId) {
      setCertIssueError('Please select a file asset.');
      return;
    }

    setIsIssuingCert(true);
    setCertIssueError(null);
    setCertIssueSuccess(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: newCertOrderId || null,
          type: newCertType,
          fileId: newCertFileId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to issue quality certificate');
      }

      setCertIssueSuccess(`Verifiable Certificate successfully issued! ID: ${data.id}`);
      setNewCertOrderId('');
      setNewCertFileId('');
      setNewCertType('Material');
      fetchAdminData();
      
      // Auto-dismiss success alert
      setTimeout(() => setCertIssueSuccess(null), 5000);
    } catch (err: any) {
      setCertIssueError(err.message || 'Error issuing quality certificate.');
    } finally {
      setIsIssuingCert(false);
    }
  };

  // Admin file upload registration
  const handleRegisterFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFilename) return;

    setIsUploadingFile(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/files`, {
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

  // Customer Profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSuccessMsg(null);
    try {
      const { latitude, longitude, ...restForm } = profileForm;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...restForm,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          locationSource: 'MANUAL',
          address: profileForm.address || null,
          gstNumber: profileForm.gstNumber || null,
          website: profileForm.website || null,
          linkedIn: profileForm.linkedIn || null,
          pinCode: profileForm.pinCode || null,
          notes: profileForm.notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update profile settings');
      }

      setProfileSuccessMsg('Profile updated and recorded in timeline.');
      fetchCustomerData();
    } catch (err: any) {
      alert(err.message || 'Profile save failed.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Customer browser geolocation lookup
  const handleProfileGPSGet = () => {
    if (!navigator.geolocation) {
      setGpsStatusText('GPS Unsupported by browser');
      return;
    }

    setGpsLoading(true);
    setGpsStatusText('Requesting permission...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsStatusText(`GPS Locked: ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`);
        
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/customer/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              latitude,
              longitude,
              locationSource: 'GEOLOCATION',
            }),
          });
          if (res.ok) {
            setProfileSuccessMsg('GPS Coordinates locked and synced.');
            fetchCustomerData();
          } else {
            throw new Error('Database write failure');
          }
        } catch (err) {
          console.error(err);
          setGpsStatusText('Failed to save coordinates.');
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setGpsStatusText('GPS Access Denied.');
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Customer support inquiry submission
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) return;

    setIsSubmittingInquiry(true);
    setInquirySuccessMsg(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customerProfile?.name || user?.name || 'Customer',
          email: customerProfile?.email || user?.email || '',
          companyName: customerProfile?.companyName || null,
          phone: customerProfile?.contactPhone || null,
          type: inquiryType,
          message: inquiryMessage,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setInquirySuccessMsg(`Your ${inquiryType.toLowerCase()} inquiry was received. Admin has been notified.`);
      setInquiryMessage('');
      fetchCustomerData();
    } catch (err) {
      alert('Failed to register inquiry.');
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // Admin save Customer Directory internal notes
  const handleSaveCustomerNotes = async (customerId: string) => {
    setIsSavingCustomerNotes(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminNotes: editingCustomerNotesText || null,
          tags: editingCustomerTags,
          leadScore: editingCustomerLeadScore,
          latitude: manualLat ? parseFloat(manualLat) : null,
          longitude: manualLon ? parseFloat(manualLon) : null,
        }),
      });
      if (res.ok) {
        setEditingCustomerNotesId(null);
        fetchAdminData();
      } else {
        alert('Failed to save customer CRM details.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCustomerNotes(false);
    }
  };

  // Admin update Inquiry status and notes
  const handleSaveInquiryNotes = async (inquiryId: string) => {
    setIsSavingInquiryNotes(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/inquiries/${inquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editingInquiryStatus,
          adminNotes: editingInquiryNotesText || null,
        }),
      });
      if (res.ok) {
        setEditingInquiryNotesId(null);
        fetchAdminData();
      } else {
        alert('Failed to save inquiry details.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingInquiryNotes(false);
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
          <Image
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/logo-prema-engineering-ayPpa7XkJuSRb6D4x9AaNz.webp"
            alt="PREMA"
            width={36}
            height={36}
            className="h-9 w-9"
            priority
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
                <h2 className="text-2xl font-bold text-white tracking-tight">Welcome, {customerProfile?.companyName || user.name}</h2>
                <p className="text-xs text-white/60 font-light mt-1">Submit RFQs, communicate with engineers, track telemetry, and download material compliance certificates.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveSubTab('profile')}
                  className="px-4 py-2.5 border border-white/10 hover:border-accent hover:text-accent text-[10px] font-bold tracking-widest uppercase text-white transition-colors"
                >
                  Manage Profile
                </button>
                <button
                  onClick={() => setActiveSubTab('rfq')}
                  className="px-5 py-2.5 bg-accent text-accent-foreground font-bold tracking-widest text-xs uppercase transition-transform duration-200 active:scale-95"
                >
                  Submit New RFQ
                </button>
              </div>
            </div>

            {/* Sub navigation Tabs */}
            <div className="flex border-b border-white/10 gap-1 overflow-x-auto scrollbar-none" role="tablist" aria-label="Customer Portal navigation">
              {[
                { id: 'overview', label: 'Overview', icon: Laptop },
                { id: 'rfq', label: 'RFQ Configurator', icon: Plus },
                { id: 'files', label: 'Documents & Certificates', icon: FileText },
                { id: 'certificates', label: 'Verifiable Certificates', icon: Award },
                { id: 'inquire', label: 'Support & Inquiry', icon: PhoneCall },
                { id: 'timeline', label: 'Activity Timeline', icon: History },
                { id: 'profile', label: 'Profile Settings', icon: User },
                { id: 'settings', label: 'Settings', icon: Settings },
                { id: 'notifications', label: 'Alerts', icon: Bell },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeSubTab === tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-200 focus:outline-none flex items-center gap-2 shrink-0 ${
                      activeSubTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sub Tab contents */}
            <AnimatePresence mode="wait">
              {activeSubTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Active Production Orders */}
                  <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Active Production Orders</h3>
                    {customerOrders.length === 0 ? (
                      <div className="p-8 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40">
                        No active manufacturing orders found.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {customerOrders.map((order) => (
                          <ContextMenu key={order.id}>
                            <ContextMenuTrigger asChild>
                              <div className="cursor-context-menu hover-elastic animate-fadeIn">
                                <ConsolePanel>
                                  <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="space-y-1">
                                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider">ORDER #{order.id.substring(0, 8)}</span>
                                      <h4 className="text-sm font-bold text-white">Status: {order.status}</h4>
                                      <p className="text-xs text-white/60 font-light max-w-lg">{order.notes || 'No notes available.'}</p>
                                    </div>
                                    <div className="text-right shrink-0">
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
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-popover border border-border text-popover-foreground rounded shadow-xl min-w-[160px] p-1 font-sans">
                              <ContextMenuItem 
                                onClick={() => { 
                                  navigator.clipboard.writeText(order.id); 
                                  toast.success("Order ID copied to clipboard!"); 
                                }}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Copy Order ID
                              </ContextMenuItem>
                              <ContextMenuItem 
                                onClick={() => router.push("/timeline")}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Track Order Timeline
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Recent Activity Feed (Customer Timeline summary) */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Recent Activity</span>
                        <button
                          onClick={() => setActiveSubTab('timeline')}
                          className="text-[9px] font-mono text-accent hover:underline uppercase"
                        >
                          View Full Timeline
                        </button>
                      </div>

                      {!customerProfile?.activities || customerProfile.activities.length === 0 ? (
                        <p className="text-xs text-white/40 font-light italic">No prior activity logs found.</p>
                      ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                          {customerProfile.activities.slice(0, 5).map((act: any) => (
                            <div key={act.id} className="p-3 border border-white/5 bg-black/20 space-y-1">
                              <div className="flex justify-between items-center gap-2">
                                <span className="text-[8px] font-mono text-accent border border-accent/20 bg-accent/5 px-1 py-0.5 uppercase tracking-wide">
                                  {act.activityType}
                                </span>
                                <span className="text-[9px] font-mono text-white/30">{new Date(act.timestamp).toLocaleDateString()}</span>
                              </div>
                              <p className="text-[11px] text-white/80 leading-relaxed font-light">{act.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                          <ContextMenu key={rfq.id}>
                            <ContextMenuTrigger asChild>
                              <div className="p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between cursor-context-menu hover-elastic animate-fadeIn">
                                <div>
                                  <span className="text-[9px] font-mono text-accent tracking-widest uppercase">RFQ #{rfq.id.substring(0, 8)}</span>
                                  <h4 className="text-xs font-bold text-white mt-1 mb-2">{rfq.status}</h4>
                                  <p className="text-xs text-white/70 font-light leading-relaxed mb-4">{rfq.description}</p>
                                </div>
                                {rfq.notes && (
                                  <p className="text-[10px] text-white/50 italic border-l border-white/10 pl-2">Notes: {rfq.notes}</p>
                                )}
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-popover border border-border text-popover-foreground rounded shadow-xl min-w-[160px] p-1 font-sans">
                              <ContextMenuItem 
                                onClick={() => { 
                                  navigator.clipboard.writeText(rfq.id); 
                                  toast.success("RFQ ID copied to clipboard!"); 
                                }}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Copy RFQ ID
                              </ContextMenuItem>
                              <ContextMenuItem 
                                onClick={() => toast.info(`RFQ Status: ${rfq.status}`)}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Quick View Status
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
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
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Manufacturing Download Center</h3>
                      <p className="text-[11px] text-white/50 mt-1">Access securely-signed drawings, inspector reports, estimator quotations, and compliance certificates.</p>
                    </div>
                    
                    {/* Search & Filter Controls */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-60">
                        <input
                          type="text"
                          value={fileSearchQuery}
                          onChange={(e) => setFileSearchQuery(e.target.value)}
                          placeholder="Search files..."
                          className="w-full bg-background border border-white/10 text-xs pl-8 pr-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Classification Filter Tabs */}
                  <div className="flex gap-1 border-b border-white/5 pb-2 overflow-x-auto scrollbar-none">
                    {[
                      { id: 'all', label: 'All Files', count: customerFiles.length },
                      { id: 'drawings', label: 'Drawings', count: customerFiles.filter(f => classifyFile(f) === 'drawings').length },
                      { id: 'quotations', label: 'Quotations', count: customerFiles.filter(f => classifyFile(f) === 'quotations').length },
                      { id: 'reports', label: 'Inspection Reports', count: customerFiles.filter(f => classifyFile(f) === 'reports').length },
                      { id: 'certificates', label: 'Certificates', count: customerFiles.filter(f => classifyFile(f) === 'certificates').length },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFileCategoryFilter(cat.id as any)}
                        className={`px-4 py-2 text-[10px] font-mono font-bold uppercase border tracking-wider transition-colors shrink-0 ${
                          fileCategoryFilter === cat.id
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                        }`}
                      >
                        {cat.label} ({cat.count})
                      </button>
                    ))}
                  </div>

                  {/* Grid layout */}
                  {customerFiles.length === 0 ? (
                    <div className="p-12 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40">
                      No technical drawing or certificate files associated with your profile.
                    </div>
                  ) : customerFiles.filter(f => {
                    const matchesCategory = fileCategoryFilter === 'all' || classifyFile(f) === fileCategoryFilter;
                    const matchesSearch = f.filename.toLowerCase().includes(fileSearchQuery.toLowerCase());
                    return matchesCategory && matchesSearch;
                  }).length === 0 ? (
                    <div className="p-12 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40 font-mono">
                      No files found matching filter criteria.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {customerFiles
                        .filter(f => {
                          const matchesCategory = fileCategoryFilter === 'all' || classifyFile(f) === fileCategoryFilter;
                          const matchesSearch = f.filename.toLowerCase().includes(fileSearchQuery.toLowerCase());
                          return matchesCategory && matchesSearch;
                        })
                        .map((file) => {
                          const category = classifyFile(file);
                          
                          // Determine matching icon
                          let Icon = FileText;
                          if (category === 'drawings') Icon = Compass;
                          if (category === 'quotations') Icon = BarChart3;
                          if (category === 'reports') Icon = ShieldCheck;
                          if (category === 'certificates') Icon = Award;

                          return (
                            <div key={file.id} className="p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between gap-4">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-start gap-3">
                                    <Icon className="w-7 h-7 text-accent shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="text-xs font-bold text-white break-all line-clamp-2" title={file.filename}>{file.filename}</h4>
                                      <span className="text-[9px] font-mono text-white/40 uppercase block mt-1">{file.fileType}{" // "}{Math.round(file.size / 1024)} KB</span>
                                    </div>
                                  </div>
                                  <span className="text-[8px] font-mono border border-white/10 bg-white/5 px-2 py-0.5 rounded-sm uppercase text-white/50 shrink-0">
                                    {category === 'reports' ? 'REPORT' : category.slice(0, -1).toUpperCase()}
                                  </span>
                                </div>
                                <div className="text-[10px] text-white/40 font-mono">
                                  Uploaded: {new Date(file.createdAt).toLocaleDateString()}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => handlePreviewFile(file)}
                                  className="py-2 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/5 text-[10px] font-bold tracking-wider uppercase text-white transition-colors duration-200 flex items-center justify-center gap-1.5"
                                >
                                  <Eye className="w-3 h-3" /> Preview
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(file.id, file.filename)}
                                  className="py-2 bg-accent text-accent-foreground text-[10px] font-bold tracking-wider uppercase transition-transform duration-200 active:scale-95 flex items-center justify-center gap-1.5"
                                >
                                  <Download className="w-3 h-3" /> Download
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSubTab === 'inquire' && (
                <motion.div
                  key="inquire"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Form */}
                  <div className="lg:col-span-5 p-6 border border-white/10 bg-white/[0.01] space-y-4 h-fit">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest">COMMUNICATION CENTER</span>
                      <h4 className="text-sm font-bold text-white uppercase">Submit Portal Request</h4>
                    </div>

                    {inquirySuccessMsg && (
                      <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono">
                        {inquirySuccessMsg}
                      </div>
                    )}

                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono text-white/50 mb-1.5">REQUEST TYPE</label>
                        <select
                          value={inquiryType}
                          onChange={(e: any) => setInquiryType(e.target.value)}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2.5 text-white focus:outline-none focus:border-accent font-mono appearance-none"
                        >
                          <option value="CONTACT">General Contact / Inquiry</option>
                          <option value="CALLBACK">Callback Request</option>
                          <option value="SUPPORT">Urgent Engineering Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-white/50 mb-1.5">MESSAGE DETAILS</label>
                        <textarea
                          required
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          placeholder="Provide details of your inquiry or specific engineering requirements..."
                          rows={6}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2.5 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingInquiry}
                        className="w-full py-3 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest disabled:opacity-50"
                      >
                        {isSubmittingInquiry ? 'Sending Inquiry...' : 'Submit Request'}
                      </button>
                    </form>
                  </div>

                  {/* Right side info */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="p-5 border border-white/10 bg-white/[0.02] space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase">Ready for future integrations</h4>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-green-500/10 border border-green-500/20 text-green-400">
                          <MessageSquareCode className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">WhatsApp Integration Readiness</p>
                          <p className="text-[11px] text-white/60 font-light mt-0.5">Callback requests will automatically push SMS/WhatsApp pings to on-duty sales engineers once enabled.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 border border-white/5 bg-white/[0.01]">
                      <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">Live Escalation Desk</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        For critical breakdowns, utilize the Support ticket type. System events automatically push high-priority SMS pings directly to the operations head.
                      </p>
                    </div>

                    {/* Past Inquiries & Conversation History */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase">Conversation History</h4>
                      
                      {!customerProfile?.inquiries || customerProfile.inquiries.length === 0 ? (
                        <p className="text-xs text-white/40 font-light italic">No prior conversation records detected.</p>
                      ) : (
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                          {customerProfile.inquiries.map((inq: any) => (
                            <div key={inq.id} className="p-4 border border-white/5 bg-black/20 space-y-3">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <span className={`text-[8.5px] font-mono border px-1.5 py-0.5 uppercase tracking-wide rounded-sm ${
                                    inq.type === 'SUPPORT' ? 'border-red-500/30 bg-red-500/15 text-red-400' :
                                    inq.type === 'CALLBACK' ? 'border-yellow-500/30 bg-yellow-500/15 text-yellow-400' :
                                    'border-blue-500/30 bg-blue-500/15 text-blue-400'
                                  }`}>
                                    {inq.type}
                                  </span>
                                  <div className="text-[10px] text-white/30 font-mono">{new Date(inq.createdAt).toLocaleString()}</div>
                                </div>
                                <span className={`text-[8.5px] font-mono border px-1.5 py-0.5 uppercase tracking-wide rounded-sm ${
                                  inq.status === 'RESOLVED' ? 'border-green-500/30 bg-green-500/15 text-green-400' : 'border-yellow-500/30 bg-yellow-500/15 text-yellow-400'
                                }`}>
                                  {inq.status}
                                </span>
                              </div>

                              <p className="text-xs text-white/80 leading-relaxed font-light whitespace-pre-wrap">&quot;{inq.message}&quot;</p>

                              {inq.adminNotes && (
                                <div className="border-t border-white/5 pt-2.5 mt-2 space-y-1">
                                  <span className="text-[9px] font-mono text-accent uppercase block">Admin Response</span>
                                  <p className="text-[11px] text-white/60 italic leading-relaxed">{inq.adminNotes}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'timeline' && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Your Activity Timeline</h3>
                  {!customerProfile?.activities || customerProfile.activities.length === 0 ? (
                    <p className="text-xs text-white/40 font-light">No lifecycle events recorded yet.</p>
                  ) : (
                    <div className="relative border-l border-white/10 pl-6 ml-3 space-y-6 py-2">
                      {customerProfile.activities.map((act: any) => (
                        <div key={act.id} className="relative">
                          <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-accent border border-background shadow-[0_0_0_4px_rgba(239,68,68,0.15)]" />
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 uppercase tracking-wide">
                                {act.activityType}
                              </span>
                              <span className="text-[10px] font-mono text-white/30">{new Date(act.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-white/80 font-light leading-relaxed">{act.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSubTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Form */}
                  <form onSubmit={handleProfileSubmit} className="lg:col-span-8 space-y-6 border border-white/10 bg-white/[0.01] p-6 h-fit">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Update Customer Profile</h3>

                    {profileSuccessMsg && (
                      <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono">
                        {profileSuccessMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Contact Name *</label>
                        <input
                          type="text"
                          required
                          value={profileForm.name}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={profileForm.contactPhone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, contactPhone: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={profileForm.companyName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, companyName: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Industry *</label>
                        <select
                          value={profileForm.industry}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, industry: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono appearance-none"
                        >
                          <option value="General Engineering">General Engineering</option>
                          <option value="Aerospace">Aerospace</option>
                          <option value="Automotive">Automotive</option>
                          <option value="Medical Devices">Medical Devices</option>
                          <option value="Defense">Defense</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Oil & Gas">Oil & Gas</option>
                        </select>
                      </div>

                      {/* Country */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Country *</label>
                        <input
                          type="text"
                          required
                          value={profileForm.country}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* State */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">State *</label>
                        <input
                          type="text"
                          required
                          value={profileForm.state}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">City *</label>
                        <input
                          type="text"
                          required
                          value={profileForm.city}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* Website */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Corporate Website</label>
                        <input
                          type="url"
                          value={profileForm.website}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* LinkedIn */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">LinkedIn URL</label>
                        <input
                          type="url"
                          value={profileForm.linkedIn}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, linkedIn: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* GST Number */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">GST Number</label>
                        <input
                          type="text"
                          value={profileForm.gstNumber}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, gstNumber: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      {/* Address */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-[9px] font-mono text-white/50 uppercase">Mailing Address (Optional)</label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="py-3 px-6 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest"
                    >
                      {isSavingProfile ? 'Saving...' : 'Save Profile Details'}
                    </button>
                  </form>

                  {/* Right side Location Intelligence */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Location Intelligence</span>
                      
                      <div className="space-y-2 font-mono text-[11px]">
                        <div>Source: <span className="text-accent">{customerProfile?.location?.source || 'MANUAL'}</span></div>
                        <div>Latitude: <span className="text-white">{customerProfile?.location?.latitude || 'N/A'}</span></div>
                        <div>Longitude: <span className="text-white">{customerProfile?.location?.longitude || 'N/A'}</span></div>
                        <div>Locked Location: <span className="text-white">{customerProfile?.location ? `${customerProfile.location.city}, ${customerProfile.location.state}` : 'N/A'}</span></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleProfileGPSGet}
                        disabled={gpsLoading}
                        className="w-full py-2 bg-white/5 border border-white/10 hover:border-accent hover:text-accent text-[10px] font-bold tracking-wider uppercase text-white transition-colors duration-200 flex items-center justify-center gap-1.5"
                      >
                        {gpsLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Navigation className="w-3.5 h-3.5" />
                        )}
                        {gpsStatusText}
                      </button>

                      {/* Manual coordinate override */}
                      <div className="pt-4 border-t border-white/5 space-y-3">
                        <span className="text-[9px] font-mono text-white/40 uppercase block">Manual Coordinate Override</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8.5px] font-mono text-white/40 mb-1">LATITUDE</label>
                            <input
                              type="text"
                              value={profileForm.latitude}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, latitude: e.target.value }))}
                              placeholder="e.g. 12.9716"
                              className="w-full bg-background border border-white/10 text-xs px-2 py-1 text-white focus:outline-none focus:border-accent font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[8.5px] font-mono text-white/40 mb-1">LONGITUDE</label>
                            <input
                              type="text"
                              value={profileForm.longitude}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, longitude: e.target.value }))}
                              placeholder="e.g. 77.5946"
                              className="w-full bg-background border border-white/10 text-xs px-2 py-1 text-white focus:outline-none focus:border-accent font-mono"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleProfileSubmit}
                          disabled={isSavingProfile}
                          className="w-full py-2 bg-accent/10 border border-accent/20 hover:border-accent hover:text-accent-foreground hover:bg-accent text-[10px] font-bold tracking-wider uppercase text-accent transition-all duration-200"
                        >
                          {isSavingProfile ? 'Saving Coords...' : 'Save Manual Coordinates'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  <form onSubmit={handleSaveSettings} className="lg:col-span-8 space-y-6 border border-white/10 bg-white/[0.01] p-6 h-fit">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest block">Notification Engine Preferences</span>
                      <h3 className="text-sm font-bold text-white uppercase font-display">Communication & Dispatch Preferences</h3>
                    </div>

                    {settingsSuccessMsg && (
                      <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono">
                        {settingsSuccessMsg}
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Email Notifications */}
                      <div className="p-4 border border-white/5 bg-black/10 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider font-display">Email Subscription Toggles</h4>
                        
                        <div className="space-y-2">
                          <label className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={emailOrderUpdates}
                              onChange={(e) => setEmailOrderUpdates(e.target.checked)}
                              className="accent-accent w-4 h-4 mt-0.5"
                            />
                            <div>
                              <p className="font-bold">Order Progress Updates</p>
                              <p className="text-[10px] text-white/50">Receive real-time email alerts as parts transition through procurement, milling, and inspection.</p>
                            </div>
                          </label>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <label className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={emailQuoteReady}
                              onChange={(e) => setEmailQuoteReady(e.target.checked)}
                              className="accent-accent w-4 h-4 mt-0.5"
                            />
                            <div>
                              <p className="font-bold">Quotation Ready Alerts</p>
                              <p className="text-[10px] text-white/50">Get notified the instant estimators complete pricing profiles and upload CAD RFQ quote sheets.</p>
                            </div>
                          </label>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-white/5">
                          <label className="flex items-start gap-3 text-xs text-white/80 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={emailCertificates}
                              onChange={(e) => setEmailCertificates(e.target.checked)}
                              className="accent-accent w-4 h-4 mt-0.5"
                            />
                            <div>
                              <p className="font-bold">Certificate Issuance Alerts</p>
                              <p className="text-[10px] text-white/50">Receive notifications immediately when material compliance certificates and inspection reports are ready.</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Dispatch Mode */}
                      <div className="p-4 border border-white/5 bg-black/10 space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider font-display">Preferred Dispatch Mode</h4>
                        <div>
                          <label className="block text-[9px] font-mono text-white/50 mb-1.5 uppercase">Dispatch Channel</label>
                          <select
                            value={dispatchPreference}
                            onChange={(e: any) => setDispatchPreference(e.target.value)}
                            className="w-full bg-background border border-white/10 text-xs px-3 py-2.5 text-white focus:outline-none focus:border-accent font-mono appearance-none"
                          >
                            <option value="EMAIL">Email notifications only</option>
                            <option value="WHATSAPP">WhatsApp mobile notifications only</option>
                            <option value="BOTH">Dual notifications (Email & WhatsApp)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
                    >
                      Save Preferences
                    </button>
                  </form>

                  {/* Settings Help sidebar */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase">Real-Time Core Engine</h4>
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        PREMA Platform interfaces directly with the central Node.js Event Bus. All preference toggles modify notification queues instantly.
                      </p>
                    </div>
                  </div>
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">System Alerts</h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full sm:w-auto justify-between sm:justify-end">
                      {/* Notification Filters */}
                      <div className="flex gap-1 border-b border-white/5 pb-2">
                        {[
                          { id: 'all', label: 'All Alerts', count: notifications.length },
                          { id: 'unread', label: 'Unread Alerts', count: notifications.filter(n => !n.isRead).length },
                        ].map((filt) => (
                          <button
                            key={filt.id}
                            onClick={() => setNotificationFilter(filt.id as any)}
                            className={`px-3 py-1.5 text-[9px] font-mono font-bold uppercase border tracking-wider transition-colors ${
                              notificationFilter === filt.id
                                ? 'border-accent bg-accent/5 text-accent'
                                : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
                            }`}
                          >
                            {filt.label} ({filt.count})
                          </button>
                        ))}
                      </div>

                      {notifications.some(n => !n.isRead) && (
                        <button
                          onClick={handleMarkNotificationsRead}
                          className="text-[10px] font-bold text-accent hover:opacity-85 uppercase tracking-wider whitespace-nowrap self-end sm:self-auto"
                        >
                          Mark All as Read
                        </button>
                      )}
                    </div>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-white/40">No alerts in inbox.</p>
                  ) : notifications.filter(n => notificationFilter === 'all' || !n.isRead).length === 0 ? (
                    <p className="text-xs text-white/40 font-mono">No notifications matching criteria.</p>
                  ) : (
                    <div className="space-y-3">
                      {notifications
                        .filter(n => notificationFilter === 'all' || !n.isRead)
                        .map((n) => (
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

              {activeSubTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Quality Traceability Ledgers</h3>
                      <p className="text-[11px] text-white/50 mt-1">Verifiable quality records, material test certificates (MTC), and CMM inspection sheets.</p>
                    </div>
                    
                    <div className="relative w-full sm:w-60">
                      <input
                        type="text"
                        value={certSearchQuery}
                        onChange={(e) => setCertSearchQuery(e.target.value)}
                        placeholder="Search certificates..."
                        className="w-full bg-background border border-white/10 text-xs pl-8 pr-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                      />
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    </div>
                  </div>

                  {customerCertificates.length === 0 ? (
                    <div className="p-12 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40">
                      No quality compliance certificates registered for your orders.
                    </div>
                  ) : customerCertificates.filter(c => 
                    c.id.toLowerCase().includes(certSearchQuery.toLowerCase()) || 
                    c.type.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                    (c.orderId && c.orderId.toLowerCase().includes(certSearchQuery.toLowerCase()))
                  ).length === 0 ? (
                    <div className="p-12 border border-white/5 bg-white/[0.01] text-center text-xs text-white/40 font-mono">
                      No certificates match search parameters.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {customerCertificates
                        .filter(c => 
                          c.id.toLowerCase().includes(certSearchQuery.toLowerCase()) || 
                          c.type.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                          (c.orderId && c.orderId.toLowerCase().includes(certSearchQuery.toLowerCase()))
                        )
                        .map((cert) => (
                          <ContextMenu key={cert.id}>
                            <ContextMenuTrigger asChild>
                              <div className="p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between gap-4 cursor-context-menu hover-elastic animate-fadeIn">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[8px] font-mono border border-accent/20 bg-accent/5 px-2 py-0.5 text-accent uppercase font-bold">
                                      {cert.type}
                                    </span>
                                    <span className="text-[9px] font-mono text-white/40">
                                      Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs font-bold text-white break-all">ID: {cert.id}</h4>
                                    <p className="text-[10px] font-mono text-white/50 mt-1">
                                      File: <span className="text-white/70">{cert.file.filename}</span>
                                    </p>
                                  </div>

                                  {cert.orderId && (
                                    <div className="text-[10px] font-mono text-white/40 border-t border-white/5 pt-2">
                                      Order Ref: PRM-ORD-{cert.orderId.substring(0, 8).toUpperCase()}
                                    </div>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                                  <button
                                    onClick={() => window.open(`/verify/${cert.id}`, '_blank')}
                                    className="py-2 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/5 text-[9px] font-bold tracking-wider uppercase text-white transition-colors duration-200 text-center flex items-center justify-center gap-1"
                                  >
                                    <ShieldCheck className="w-3 h-3 text-red-500" /> Verify
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(cert.fileId, cert.file.filename)}
                                    className="py-2 bg-accent text-accent-foreground text-[9px] font-bold tracking-wider uppercase transition-transform duration-200 active:scale-95 flex items-center justify-center gap-1"
                                  >
                                    <Download className="w-3 h-3" /> Download
                                  </button>
                                </div>
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="bg-popover border border-border text-popover-foreground rounded shadow-xl min-w-[160px] p-1 font-sans">
                              <ContextMenuItem 
                                onClick={() => { 
                                  navigator.clipboard.writeText(cert.id); 
                                  toast.success("Certificate ID copied!"); 
                                }}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Copy Certificate ID
                              </ContextMenuItem>
                              <ContextMenuItem 
                                onClick={() => window.open(`/verify/${cert.id}`, '_blank')}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Open Verification Ledger
                              </ContextMenuItem>
                              <ContextMenuItem 
                                onClick={() => handleDownloadFile(cert.fileId, cert.file.filename)}
                                className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                              >
                                Download Document File
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
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
            <div className="flex border-b border-white/10 gap-1 overflow-x-auto scrollbar-none" role="tablist" aria-label="Admin Console navigation">
              {[
                { id: 'overview', label: 'Active Orders', icon: Package },
                { id: 'inbox', label: 'Admin Inbox', icon: Bell },
                { id: 'leads', label: 'Leads Queue', icon: ArrowRight },
                { id: 'directory', label: 'Customer Directory', icon: Users },
                { id: 'communication', label: 'Inquiries Center', icon: MessageSquare },
                { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
                { id: 'certificates', label: 'Quality Certificates', icon: Award },
                { id: 'files', label: 'Technical Specifications', icon: FileText },
                { id: 'audit', label: 'Operations Audit Log', icon: Shield },
                { id: 'observability', label: 'Observability & Health', icon: Laptop },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeSubTab === tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-all duration-200 focus:outline-none flex items-center gap-2 shrink-0 ${
                      activeSubTab === tab.id ? 'border-accent text-accent' : 'border-transparent text-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
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
                                  {order.customer?.companyName || 'Unknown Company'}
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

              {activeSubTab === 'inbox' && (
                <motion.div
                  key="inbox"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Unified Activity Feed (Admin Inbox)</h3>
                    <button
                      onClick={fetchAdminData}
                      className="p-1 border border-white/10 hover:border-accent transition-colors"
                      title="Sync Feed"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  {!analytics?.activitiesTimeline || analytics.activitiesTimeline.length === 0 ? (
                    <p className="text-xs text-white/40 font-mono">No recent portal activities detected.</p>
                  ) : (
                    <div className="space-y-4">
                      {analytics.activitiesTimeline.map((item: any) => (
                        <div key={item.id} className="p-4 border border-white/5 bg-white/[0.01] text-xs font-mono grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                          <div className="md:col-span-3 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[9px] font-mono bg-accent/15 text-accent border border-accent/20 px-2 py-0.5 uppercase tracking-wide">
                                {item.activityType}
                              </span>
                              <span className="text-white font-bold">{item.customerName}</span>
                              <span className="text-white/40">({item.companyName}{" // "}{item.industry})</span>
                            </div>
                            <div className="text-white/70 font-light">{item.description}</div>
                            <div className="text-[10px] text-white/30 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-white/40" /> {item.location}
                            </div>
                          </div>
                          <div className="text-left md:text-right space-y-2">
                            <div className="text-[9.5px] text-white/30">{new Date(item.timestamp).toLocaleString()}</div>
                            <div className="flex justify-start md:justify-end gap-1.5">
                              <a
                                href={`mailto:${item.customerEmail || 'info@prema-engineering.com'}`}
                                className="px-2 py-1 border border-white/10 hover:border-accent hover:text-accent text-[9px] text-white font-bold uppercase transition-colors"
                              >
                                Email
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSubTab === 'leads' && (
                <motion.div
                  key="leads"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Recent Registration Leads</h3>
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <input
                          type="text"
                          value={leadsSearch}
                          onChange={(e) => setLeadsSearch(e.target.value)}
                          placeholder="Search leads..."
                          className="w-full bg-background border border-white/10 text-xs pl-8 pr-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      </div>
                      <select
                        value={leadsFilter}
                        onChange={(e) => setLeadsFilter(e.target.value)}
                        className="bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                      </select>
                    </div>
                  </div>

                  {/* Leads Queue Table */}
                  <div className="overflow-x-auto border border-white/15">
                    <table className="w-full text-left border-collapse text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/15 bg-white/[0.02] text-white/50 uppercase text-[9px] tracking-wider">
                          <th className="p-4">Lead Name</th>
                          <th className="p-4">Company</th>
                          <th className="p-4">Industry</th>
                          <th className="p-4">Location</th>
                          <th className="p-4">Phone / Email</th>
                          <th className="p-4">Score</th>
                          <th className="p-4">Reg Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!analytics?.leads || analytics.leads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-white/40 font-light">No registrations registered as leads.</td>
                          </tr>
                        ) : (
                          analytics.leads
                            .filter((lead: any) => {
                              const searchStr = `${lead.name} ${lead.companyName} ${lead.industry} ${lead.email}`.toLowerCase();
                              if (leadsSearch && !searchStr.includes(leadsSearch.toLowerCase())) return false;
                              if (leadsFilter !== 'ALL' && lead.status !== leadsFilter) return false;
                              return true;
                            })
                            .map((lead: any) => (
                              <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.01] text-white/80">
                                <td className="p-4 font-bold text-white">{lead.name}</td>
                                <td className="p-4">{lead.companyName}</td>
                                <td className="p-4 text-accent">{lead.industry}</td>
                                <td className="p-4">{lead.city}, {lead.state}, {lead.country}</td>
                                <td className="p-4 space-y-1">
                                  <div>{lead.phone}</div>
                                  <div className="text-white/40 text-[10px]">{lead.email}</div>
                                </td>
                                <td className="p-4">
                                  <span className={`text-[8.5px] font-mono border px-1.5 py-0.5 uppercase tracking-wide rounded-sm ${
                                    lead.leadScore === 'HIGH' ? 'border-red-500/30 bg-red-500/15 text-red-400' :
                                    lead.leadScore === 'MEDIUM' ? 'border-yellow-500/30 bg-yellow-500/15 text-yellow-400' :
                                    'border-blue-500/30 bg-blue-500/15 text-blue-400'
                                  }`}>
                                    {lead.leadScore || 'LOW'}
                                  </span>
                                </td>
                                <td className="p-4 text-white/30 text-[10px]">{new Date(lead.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'directory' && (
                <motion.div
                  key="directory"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Searchable Customer Directory</h3>
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <input
                          type="text"
                          value={directorySearch}
                          onChange={(e) => setDirectorySearch(e.target.value)}
                          placeholder="Search directory..."
                          className="w-full bg-background border border-white/10 text-xs pl-8 pr-3 py-2 text-white focus:outline-none focus:border-accent font-mono"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Directory Grid */}
                  {!analytics?.customers || analytics.customers.length === 0 ? (
                    <p className="text-xs text-white/40 font-mono">No customers found.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analytics.customers
                        .filter((c: any) => {
                          const searchStr = `${c.name} ${c.companyName} ${c.industry} ${c.city} ${c.state} ${c.phone} ${c.email} ${c.address || ''} ${(c.tags || []).join(' ')}`.toLowerCase();
                          return !directorySearch || searchStr.includes(directorySearch.toLowerCase());
                        })
                        .map((c: any) => (
                          <div key={c.id} className="p-5 border border-white/10 bg-white/[0.01] flex flex-col justify-between gap-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    {c.name}
                                    <span className={`text-[8.5px] font-mono border px-1.5 py-0.5 uppercase tracking-wide rounded-sm ${
                                      c.leadScore === 'HIGH' ? 'border-red-500/30 bg-red-500/15 text-red-400' :
                                      c.leadScore === 'MEDIUM' ? 'border-yellow-500/30 bg-yellow-500/15 text-yellow-400' :
                                      'border-blue-500/30 bg-blue-500/15 text-blue-400'
                                    }`}>
                                      {c.leadScore || 'LOW'}
                                    </span>
                                  </h4>
                                  <p className="text-xs text-accent font-mono mt-0.5">{c.companyName}{" // "}{c.industry}</p>
                                </div>
                                <span className="text-[9px] font-mono text-white/30 uppercase">Dir Reference</span>
                              </div>

                              {c.tags && c.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {c.tags.map((t: string) => (
                                    <span key={t} className="text-[8.5px] font-mono bg-white/5 border border-white/10 text-white/60 px-1.5 py-0.5 uppercase rounded-sm">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono text-white/60">
                                <div>Email: <span className="text-white">{c.email}</span></div>
                                <div>Phone: <span className="text-white">{c.phone}</span></div>
                                <div className="col-span-2">Location: <span className="text-white">{c.city}, {c.state}, {c.country}</span></div>
                                {c.address && <div className="col-span-2">Address: <span className="text-white">{c.address}</span></div>}
                                {c.website && <div className="col-span-2">Website: <a href={c.website} target="_blank" className="text-accent underline inline-flex items-center gap-1">{c.website} <ExternalLink className="w-2.5 h-2.5" /></a></div>}
                                {c.gstNumber && <div>GST: <span className="text-white">{c.gstNumber}</span></div>}
                                {c.pinCode && <div>PIN: <span className="text-white">{c.pinCode}</span></div>}
                              </div>

                              {/* Geolocation metadata */}
                              {c.location && (
                                <div className="p-2.5 bg-black/20 border border-white/5 rounded font-mono text-[9.5px] text-white/40 flex items-center justify-between">
                                  <div>GPS Locked: {c.location.latitude?.toFixed(4) || 'N/A'}, {c.location.longitude?.toFixed(4) || 'N/A'} (Source: {c.location.source})</div>
                                  <MapPin className="w-3.5 h-3.5 text-accent" />
                                </div>
                              )}
                            </div>

                            {/* Internal Admin notes & CRM editing */}
                            <div className="border-t border-white/5 pt-3 space-y-2">
                              <span className="text-[9px] font-mono text-white/40 uppercase block">Internal Admin Notes & CRM</span>
                              
                              {editingCustomerNotesId === c.id ? (
                                <div className="space-y-3 bg-black/20 p-3 border border-white/5">
                                  <div>
                                    <label className="block text-[9px] font-mono text-white/30 uppercase mb-1">Internal Admin Notes</label>
                                    <textarea
                                      value={editingCustomerNotesText}
                                      onChange={(e) => setEditingCustomerNotesText(e.target.value)}
                                      placeholder="Enter internal details..."
                                      rows={3}
                                      className="w-full bg-background border border-white/10 text-xs px-2.5 py-1.5 text-white focus:outline-none focus:border-accent font-mono"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-[9px] font-mono text-white/30 uppercase mb-1">Lead Scoring</label>
                                      <select
                                        value={editingCustomerLeadScore}
                                        onChange={(e) => setEditingCustomerLeadScore(e.target.value)}
                                        className="w-full bg-background border border-white/10 text-xs px-2.5 py-1.5 text-white focus:outline-none focus:border-accent font-mono"
                                      >
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                      </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-[9px] font-mono text-white/30 uppercase mb-1">Lat</label>
                                        <input
                                          type="text"
                                          value={manualLat}
                                          onChange={(e) => setManualLat(e.target.value)}
                                          placeholder="e.g. 12.97"
                                          className="w-full bg-background border border-white/10 text-xs px-2 py-1 text-white focus:outline-none focus:border-accent font-mono"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[9px] font-mono text-white/30 uppercase mb-1">Lon</label>
                                        <input
                                          type="text"
                                          value={manualLon}
                                          onChange={(e) => setManualLon(e.target.value)}
                                          placeholder="e.g. 77.59"
                                          className="w-full bg-background border border-white/10 text-xs px-2 py-1 text-white focus:outline-none focus:border-accent font-mono"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[9px] font-mono text-white/30 uppercase mb-1">Customer Tags</label>
                                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono text-white/70">
                                      {['Automotive', 'Packaging', 'Oil & Gas', 'Medical', 'Repeat Customer', 'Priority Customer'].map((tag) => {
                                        const isChecked = editingCustomerTags.includes(tag);
                                        return (
                                          <label key={tag} className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  setEditingCustomerTags([...editingCustomerTags, tag]);
                                                } else {
                                                  setEditingCustomerTags(editingCustomerTags.filter(t => t !== tag));
                                                }
                                              }}
                                              className="accent-accent"
                                            />
                                            {tag}
                                          </label>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  <div className="flex gap-2 pt-1">
                                    <button
                                      onClick={() => handleSaveCustomerNotes(c.id)}
                                      disabled={isSavingCustomerNotes}
                                      className="px-3 py-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase disabled:opacity-50"
                                    >
                                      {isSavingCustomerNotes ? 'Saving...' : 'Save CRM Details'}
                                    </button>
                                    <button
                                      onClick={() => setEditingCustomerNotesId(null)}
                                      className="px-3 py-1.5 border border-white/10 text-[10px] text-white hover:bg-white/5"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start gap-4 bg-black/10 p-2.5 border border-white/5">
                                    <p className="text-[11px] text-white/70 italic whitespace-pre-wrap">{c.adminNotes || 'No internal admin notes set.'}</p>
                                    <button
                                      onClick={() => {
                                        setEditingCustomerNotesId(c.id);
                                        setEditingCustomerNotesText(c.adminNotes || '');
                                        setEditingCustomerTags(c.tags || []);
                                        setEditingCustomerLeadScore(c.leadScore || 'LOW');
                                        setManualLat(c.location?.latitude !== null && c.location?.latitude !== undefined ? String(c.location.latitude) : '');
                                        setManualLon(c.location?.longitude !== null && c.location?.longitude !== undefined ? String(c.location.longitude) : '');
                                      }}
                                      className="text-[9.5px] font-bold text-accent hover:underline uppercase shrink-0"
                                    >
                                      Edit CRM
                                    </button>
                                  </div>
                                  {c.notes && (
                                    <div className="text-[10px] text-white/40 font-mono italic">
                                      Customer Notes: &quot;{c.notes}&quot;
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeSubTab === 'communication' && (
                <motion.div
                  key="communication"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left inquiries log list */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Callback & Inquiry Records</h3>
                      <div className="flex gap-2 w-full md:w-auto">
                        <select
                          value={inquiriesFilter}
                          onChange={(e) => setInquiriesFilter(e.target.value)}
                          className="bg-background border border-white/10 text-xs px-2.5 py-1.5 text-white focus:outline-none focus:border-accent font-mono"
                        >
                          <option value="ALL">All Types</option>
                          <option value="CONTACT">General Contact</option>
                          <option value="CALLBACK">Callback Request</option>
                          <option value="SUPPORT">Urgent Support</option>
                        </select>
                      </div>
                    </div>

                    {!analytics?.inquiries || analytics.inquiries.length === 0 ? (
                      <p className="text-xs text-white/40 font-mono">No communication records.</p>
                    ) : (
                      <div className="space-y-4">
                        {analytics.inquiries
                          .filter((inq: any) => {
                            if (inquiriesFilter !== 'ALL' && inq.type !== inquiriesFilter) return false;
                            return true;
                          })
                          .map((inq: any) => (
                            <div key={inq.id} className="p-4 border border-white/10 bg-white/[0.01] space-y-3 font-mono text-xs">
                              <div className="flex justify-between items-start flex-wrap gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`text-[9px] border px-2 py-0.5 uppercase tracking-wide font-bold ${
                                      inq.type === 'SUPPORT' ? 'border-accent/40 bg-accent/15 text-accent animate-pulse' : 'border-white/20 bg-white/5 text-white'
                                    }`}>
                                      {inq.type}
                                    </span>
                                    <span className="text-white font-bold">{inq.name}</span>
                                    {inq.companyName && <span className="text-white/40">({inq.companyName})</span>}
                                  </div>
                                  <div className="text-[10px] text-white/30">{new Date(inq.createdAt).toLocaleString()}</div>
                                </div>
                                <span className={`text-[9px] border px-2 py-0.5 tracking-widest ${
                                  inq.status === 'RESOLVED' ? 'border-green-500/20 bg-green-500/10 text-green-400' : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                                }`}>
                                  {inq.status}
                                </span>
                              </div>

                              <div className="p-3 border border-white/5 bg-black/20 text-white/70 leading-relaxed italic whitespace-pre-wrap">
                                &quot;{inq.message}&quot;
                              </div>

                              <div className="text-[10.5px] text-white/50 space-y-1">
                                <div>Email: <span className="text-white">{inq.email}</span></div>
                                <div>Phone: <span className="text-white">{inq.phone || 'N/A'}</span></div>
                              </div>

                              {/* Admin notes & resolution */}
                              <div className="border-t border-white/5 pt-3 space-y-2">
                                <span className="text-[9px] text-white/40 uppercase block">Admin Resolution Details</span>
                                {editingInquiryNotesId === inq.id ? (
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="block text-[9px] text-white/30 mb-1">STATUS</label>
                                        <select
                                          value={editingInquiryStatus}
                                          onChange={(e) => setEditingInquiryStatus(e.target.value)}
                                          className="w-full bg-background border border-white/10 text-xs px-2.5 py-1.5 text-white focus:outline-none"
                                        >
                                          <option value="PENDING">PENDING</option>
                                          <option value="RESOLVED">RESOLVED</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-[9px] text-white/30 mb-1">INTERNAL RESOLUTION NOTES</label>
                                      <textarea
                                        value={editingInquiryNotesText}
                                        onChange={(e) => setEditingInquiryNotesText(e.target.value)}
                                        placeholder="E.g. Called client, resolved drawings conflict..."
                                        rows={3}
                                        className="w-full bg-background border border-white/10 text-xs px-2.5 py-1.5 text-white focus:outline-none font-mono"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleSaveInquiryNotes(inq.id)}
                                        disabled={isSavingInquiryNotes}
                                        className="px-3 py-1.5 bg-accent text-accent-foreground text-[10px] font-bold uppercase disabled:opacity-50"
                                      >
                                        {isSavingInquiryNotes ? 'Saving...' : 'Save Notes'}
                                      </button>
                                      <button
                                        onClick={() => setEditingInquiryNotesId(null)}
                                        className="px-3 py-1.5 border border-white/10 text-[10px] text-white hover:bg-white/5"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex justify-between items-start gap-4 bg-black/10 p-2.5 border border-white/5">
                                    <div className="space-y-1">
                                      <p className="text-[11px] text-white/70 italic">{inq.adminNotes || 'No resolution log recorded.'}</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setEditingInquiryNotesId(inq.id);
                                        setEditingInquiryNotesText(inq.adminNotes || '');
                                        setEditingInquiryStatus(inq.status);
                                      }}
                                      className="text-[9.5px] font-bold text-accent hover:underline uppercase shrink-0"
                                    >
                                      Edit Notes / Resolve
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Right side WhatsApp setup panel */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-6 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-accent uppercase tracking-widest block">WhatsApp Escalation Engine</span>
                      <h4 className="text-sm font-bold text-white uppercase font-display leading-tight">Escalation Center</h4>
                      
                      <p className="text-xs text-white/70 leading-relaxed font-light">
                        Callback and breakdown requests are structured for immediate dispatcher routing. Configure numbers below to prepare for the WhatsApp webhook integration.
                      </p>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-[9px] font-mono text-white/40 mb-1.5 uppercase">DISPATCHER WHATSAPP NUMBER</label>
                          <input
                            type="text"
                            disabled
                            value="+91 99999 99999 (Mock Setup)"
                            className="w-full bg-black/40 border border-white/5 text-xs px-3 py-2 text-white/50 cursor-not-allowed font-mono"
                          />
                        </div>

                        <div className="p-4 border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-mono flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <div>
                            <strong>WhatsApp Hook Ready</strong>
                            <p className="text-[10px] text-white/60 mt-0.5 font-sans font-light">JSON payload structures matches API standard schemas. Trigger event dispatches automatically hook into the gateway.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 animate-in fade-in duration-300"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase">Business Intelligence Workspace</h3>
                      <p className="text-xs text-white/60 font-light mt-1">Unified analytics telemetry, geographic tracking, demographics, and metrics.</p>
                    </div>
                    <span className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 tracking-wider uppercase">ADMIN INTELLIGENCE MODE</span>
                  </div>

                  {/* Growth Metrics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border border-white/10 bg-white/[0.01] space-y-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Customer Growth</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-white">{customerStats.total}</span>
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" /> +{customerStats.growth}%
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50">Total registered profiles</p>
                    </div>
                    
                    <div className="p-4 border border-white/10 bg-white/[0.01] space-y-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">RFQ Intake Trends</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-white">{rfqStats.total}</span>
                        <span className="text-xs text-emerald-400 font-mono flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" /> +{rfqStats.growth}%
                        </span>
                      </div>
                      <p className="text-[10px] text-white/50">Cumulative submissions</p>
                    </div>

                    <div className="p-4 border border-white/10 bg-white/[0.01] space-y-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Leads Conversion</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-white">{leadStats.rate}%</span>
                        <span className="text-[10px] font-mono text-white/30">converted</span>
                      </div>
                      <p className="text-[10px] text-white/50">{leadStats.converted} / {leadStats.total} leads resolved</p>
                    </div>

                    <div className="p-4 border border-white/10 bg-white/[0.01] space-y-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">QA Pass Integrity</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold font-mono text-white">{jobStats.successRate}%</span>
                        <span className="text-[10px] font-mono text-white/30">inspections</span>
                      </div>
                      <p className="text-[10px] text-white/50">{jobStats.active} manufacturing jobs running</p>
                    </div>
                  </div>

                  {/* Customer Heatmap Visual Coordinate Widget */}
                  <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-white/40 uppercase block">Customer Heatmap & Location Intelligence</span>
                        <span className="text-[10.5px] text-white/60 font-light">Interactive coordinate telemetry locks. Hover for customer profile.</span>
                      </div>

                      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
                        <div className="flex gap-1 p-0.5 bg-black/40 border border-white/10 rounded-sm">
                          <button
                            type="button"
                            onClick={() => {
                              setMapProjection('india');
                              setMapFocusId(null);
                            }}
                            className={`px-3 py-1 text-[9.5px] font-bold uppercase transition-colors ${mapProjection === 'india' ? 'bg-accent text-accent-foreground' : 'text-white/60 hover:text-white'}`}
                          >
                            India Grid
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setMapProjection('world');
                              setMapFocusId(null);
                            }}
                            className={`px-3 py-1 text-[9.5px] font-bold uppercase transition-colors ${mapProjection === 'world' ? 'bg-accent text-accent-foreground' : 'text-white/60 hover:text-white'}`}
                          >
                            World Grid
                          </button>
                        </div>

                        <select
                          value={mapFocusId || ''}
                          onChange={(e) => setMapFocusId(e.target.value || null)}
                          className="bg-background border border-white/10 text-xs px-2 py-1 text-white focus:outline-none focus:border-accent w-full sm:w-48 font-mono"
                        >
                          <option value="">No Active Focus (Lock Free)</option>
                          {analytics.customers
                            ?.filter((c: any) => c.location?.latitude && c.location?.longitude)
                            ?.map((c: any) => (
                              <option key={c.id} value={c.id}>{c.companyName} ({c.city})</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>

                    <div className="relative h-80 bg-black/40 border border-white/10 overflow-hidden font-mono select-none rounded-sm">
                      {/* Background coordinate grid parallels/meridians */}
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div key={i} className="border border-solid border-white" />
                        ))}
                      </div>

                      {/* Map labels */}
                      <div className="absolute top-3 left-3 text-[9px] text-white/30 uppercase tracking-widest">
                        Telemetry Coordinate Grid ({mapProjection === 'india' ? 'INDIA PROJECTION 8°N-36°N / 68°E-98°E' : 'WORLD PROJECTION 60°S-80°N / 150°W-150°E'})
                      </div>

                      {/* City References */}
                      {mapProjection === 'india' ? (
                        <>
                          {[
                            { name: 'DELHI', lat: 28.61, lon: 77.20 },
                            { name: 'MUMBAI', lat: 19.07, lon: 72.87 },
                            { name: 'BENGALURU', lat: 12.97, lon: 77.59 },
                            { name: 'CHENNAI', lat: 13.08, lon: 80.27 },
                            { name: 'KOLKATA', lat: 22.57, lon: 88.36 },
                          ].map((city) => {
                            // Map Lon 68 to 98, Lat 8 to 36
                            const x = ((city.lon - 68.0) / (98.0 - 68.0)) * 100;
                            const y = 100 - ((city.lat - 8.0) / (36.0 - 8.0)) * 100;
                            return (
                              <div key={city.name} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="text-[7.5px] text-white/20 mt-1 scale-90">{city.name}</span>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {[
                            { name: 'NEW YORK', lat: 40.71, lon: -74.00 },
                            { name: 'LONDON', lat: 51.50, lon: -0.12 },
                            { name: 'TOKYO', lat: 35.67, lon: 139.65 },
                            { name: 'SINGAPORE', lat: 1.35, lon: 103.81 },
                            { name: 'BENGALURU', lat: 12.97, lon: 77.59 },
                          ].map((city) => {
                            // Map Lon -150 to 150, Lat -60 to 80
                            const x = ((city.lon - (-150.0)) / (150.0 - (-150.0))) * 100;
                            const y = 100 - ((city.lat - (-60.0)) / (80.0 - (-60.0))) * 100;
                            return (
                              <div key={city.name} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none" style={{ left: `${x}%`, top: `${y}%` }}>
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="text-[7.5px] text-white/20 mt-1 scale-90">{city.name}</span>
                              </div>
                            );
                          })}
                        </>
                      )}

                      {/* Customer heatmap dots */}
                      {analytics.customers
                        ?.filter((c: any) => c.location?.latitude && c.location?.longitude)
                        ?.map((c: any) => {
                          let x = 0, y = 0;
                          if (mapProjection === 'india') {
                            x = ((c.location.longitude - 68.0) / (98.0 - 68.0)) * 100;
                            y = 100 - ((c.location.latitude - 8.0) / (36.0 - 8.0)) * 100;
                          } else {
                            x = ((c.location.longitude - (-150.0)) / (150.0 - (-150.0))) * 100;
                            y = 100 - ((c.location.latitude - (-60.0)) / (80.0 - (-60.0))) * 100;
                          }
                          const isFocused = mapFocusId === c.id;
                          return (
                            <div
                              key={c.id}
                              onClick={() => setMapFocusId(c.id)}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform ${isFocused ? 'scale-125' : 'hover:scale-110'}`}
                              style={{ left: `${x}%`, top: `${y}%` }}
                            >
                              <span className="relative flex h-4 w-4 items-center justify-center">
                                {isFocused && (
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                                )}
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${isFocused ? 'bg-accent border border-white' : 'bg-accent/80 group-hover:bg-accent'}`} />
                              </span>

                              {/* Tooltip on hover */}
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black border border-white/10 p-3 rounded shadow-xl min-w-[200px] z-50 text-[10px] leading-relaxed text-white space-y-1.5">
                                <div className="flex justify-between items-center border-b border-white/10 pb-1">
                                  <strong className="text-accent font-sans">{c.companyName}</strong>
                                  <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest">{c.location.source}</span>
                                </div>
                                <div>City: <span className="opacity-80">{c.city}, {c.state}</span></div>
                                <div>Country: <span className="opacity-80">{c.country}</span></div>
                                <div>GPS Lock: <span className="opacity-80 font-mono">{c.location.latitude?.toFixed(4)}°, {c.location.longitude?.toFixed(4)}°</span></div>
                                <div>Lead Score: <span className="opacity-80 font-mono">{c.leadScore || 'LOW'}</span></div>
                              </div>
                            </div>
                          );
                        })
                      }

                      {/* Locked targets popover */}
                      {mapFocusId && (() => {
                        const focusCust = analytics.customers?.find((c: any) => c.id === mapFocusId);
                        if (!focusCust || !focusCust.location?.latitude) return null;
                        return (
                          <div className="absolute right-3 bottom-3 p-3 bg-black/95 border border-accent/30 text-[9.5px] max-w-[280px] text-white/80 pointer-events-auto rounded shadow-lg animate-in slide-in-from-bottom duration-200">
                            <div className="flex justify-between font-bold text-accent mb-2">
                              <span className="flex items-center gap-1">🎯 TELEMETRY LOCK</span>
                              <button onClick={(e) => { e.stopPropagation(); setMapFocusId(null); }} className="hover:text-white text-[8px] tracking-widest font-mono uppercase bg-white/10 px-1.5 py-0.5 rounded-sm">UNLOCK</button>
                            </div>
                            <div>Company: <span className="text-white font-semibold font-sans">{focusCust.companyName}</span></div>
                            <div>Region: <span className="text-white font-semibold">{focusCust.city}, {focusCust.state}, {focusCust.country}</span></div>
                            <div>Coordinates: <span className="text-white font-mono">{focusCust.location.latitude?.toFixed(4)}°N, {focusCust.location.longitude?.toFixed(4)}°E</span></div>
                            <div className="text-[8.5px] opacity-60 mt-1.5 border-t border-white/5 pt-1.5 italic">Lock state active. System tracking via {focusCust.location.source}.</div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Customers Leaderboard */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Top Customers Leaderboard</span>
                      
                      {topCustomers.length === 0 ? (
                        <p className="text-xs text-white/40 font-light">No customers registered.</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs font-mono">
                            <thead>
                              <tr className="border-b border-white/10 text-white/40 text-[9px] uppercase tracking-wider">
                                <th className="pb-2">Rank</th>
                                <th className="pb-2">Company</th>
                                <th className="pb-2">Industry</th>
                                <th className="pb-2 text-right">Score</th>
                                <th className="pb-2 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                              {topCustomers.map((cust: any, idx: number) => {
                                const hasLoc = cust.location?.latitude && cust.location?.longitude;
                                return (
                                  <tr key={cust.id} className="hover:bg-white/[0.02]">
                                    <td className="py-2.5">
                                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold ${
                                        idx === 0 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                                        idx === 1 ? 'bg-slate-400/20 text-slate-300 border border-slate-400/40' :
                                        idx === 2 ? 'bg-amber-700/20 text-amber-500 border border-amber-700/40' :
                                        'bg-white/5 text-white/60 border border-white/10'
                                      }`}>
                                        {idx + 1}
                                      </span>
                                    </td>
                                    <td className="py-2.5">
                                      <span className="font-bold text-white block font-sans">{cust.companyName}</span>
                                      <span className="text-[9.5px] opacity-50">{cust.name}</span>
                                    </td>
                                    <td className="py-2.5 text-[11px] opacity-75">{cust.industry}</td>
                                    <td className="py-2.5 text-right font-bold text-accent">{cust.score} pts</td>
                                    <td className="py-2.5 text-center">
                                      {hasLoc ? (
                                        <button
                                          onClick={() => {
                                            setMapFocusId(cust.id);
                                            setMapProjection(cust.location.country === 'India' ? 'india' : 'world');
                                          }}
                                          className="px-2 py-0.5 border border-accent/20 hover:border-accent hover:bg-accent/10 text-[9px] uppercase font-bold tracking-wider rounded-sm text-accent transition-colors"
                                        >
                                          Track
                                        </button>
                                      ) : (
                                        <span className="text-[9px] opacity-25">No Coords</span>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Regional Country Distribution */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Country Demographics</span>
                      
                      {!analytics?.charts?.country || analytics.charts.country.length === 0 ? (
                        <p className="text-xs text-white/40 font-light">No geographic country metrics.</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.charts.country.map((cnt: any, idx: number) => {
                            const total = analytics.charts.country.reduce((acc: number, curr: any) => acc + curr.value, 0);
                            const percent = Math.round((cnt.value / (total || 1)) * 100);
                            return (
                              <div key={idx} className="space-y-1.5 font-mono text-xs">
                                <div className="flex justify-between items-center text-white/70">
                                  <span>{cnt.name || 'Unknown'}</span>
                                  <span>{cnt.value} ({percent}%)</span>
                                </div>
                                <div className="h-2 bg-white/5 border border-white/10 w-full overflow-hidden">
                                  <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Industry Distribution */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">Industry Demographics</span>
                      
                      {!analytics?.charts?.industry || analytics.charts.industry.length === 0 ? (
                        <p className="text-xs text-white/40 font-light">No industry metrics.</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.charts.industry.map((ind: any, idx: number) => {
                            const total = analytics.charts.industry.reduce((acc: number, curr: any) => acc + curr.value, 0);
                            const percent = Math.round((ind.value / (total || 1)) * 100);
                            return (
                              <div key={idx} className="space-y-1.5 font-mono text-xs">
                                <div className="flex justify-between items-center text-white/70">
                                  <span>{ind.name}</span>
                                  <span>{ind.value} ({percent}%)</span>
                                </div>
                                <div className="h-2 bg-white/5 border border-white/10 w-full overflow-hidden">
                                  <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Regional State Distribution */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">State Demographics</span>
                      
                      {!analytics?.charts?.state || analytics.charts.state.length === 0 ? (
                        <p className="text-xs text-white/40 font-light">No geographic state metrics.</p>
                      ) : (
                        <div className="space-y-3">
                          {analytics.charts.state.map((st: any, idx: number) => {
                            const total = analytics.charts.state.reduce((acc: number, curr: any) => acc + curr.value, 0);
                            const percent = Math.round((st.value / (total || 1)) * 100);
                            return (
                              <div key={idx} className="space-y-1.5 font-mono text-xs">
                                <div className="flex justify-between items-center text-white/70">
                                  <span>{st.name}</span>
                                  <span>{st.value} ({percent}%)</span>
                                </div>
                                <div className="h-2 bg-white/5 border border-white/10 w-full overflow-hidden">
                                  <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* RFQ trends */}
                    <div className="p-5 border border-white/10 bg-white/[0.01] space-y-4 lg:col-span-2">
                      <span className="text-[9px] font-mono text-white/40 uppercase block">RFQ Volume Trends (Monthly)</span>
                      
                      {!analytics?.charts?.rfqTrends || analytics.charts.rfqTrends.length === 0 ? (
                        <p className="text-xs text-white/40 font-light">No historical RFQ trend metrics.</p>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex h-36 items-end gap-3 pt-6 border-b border-l border-white/10 px-4 relative">
                            {analytics.charts.rfqTrends.map((trend: any, idx: number) => {
                              const maxVal = Math.max(...analytics.charts.rfqTrends.map((t: any) => t.count), 1);
                              const heightPercent = Math.round((trend.count / maxVal) * 80) + 10;
                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                  <div className="text-[9.5px] font-mono text-white/50 absolute bottom-full mb-1 group-hover:text-accent font-bold">
                                    {trend.count} RFQs
                                  </div>
                                  <div className="w-full bg-accent/20 border-t border-x border-accent hover:bg-accent/40 transition-colors" style={{ height: `${heightPercent}%` }} />
                                  <span className="text-[9.5px] font-mono text-white/30 mt-2 block">{trend.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSubTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column: Certificates Ledger */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-3">
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase">Traceability Certificates Ledger</h4>
                        <p className="text-[10px] text-white/50 mt-0.5">Global list of verified certificates issued by PREMA.</p>
                      </div>
                      
                      <div className="relative w-full sm:w-56">
                        <input
                          type="text"
                          value={certSearchQuery}
                          onChange={(e) => setCertSearchQuery(e.target.value)}
                          placeholder="Search certificates..."
                          className="w-full bg-background border border-white/10 text-[11px] pl-8 pr-3 py-1.5 text-white focus:outline-none focus:border-accent font-mono"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
                      </div>
                    </div>

                    {!allCertificates?.certificates || allCertificates.certificates.length === 0 ? (
                      <p className="text-xs text-white/40 font-light">No compliance certificates currently issued in system.</p>
                    ) : allCertificates.certificates.filter((c: any) => 
                      c.id.toLowerCase().includes(certSearchQuery.toLowerCase()) || 
                      c.type.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                      (c.orderId && c.orderId.toLowerCase().includes(certSearchQuery.toLowerCase())) ||
                      (c.order?.customer?.companyName && c.order.customer.companyName.toLowerCase().includes(certSearchQuery.toLowerCase()))
                    ).length === 0 ? (
                      <p className="text-xs text-white/40 font-mono">No certificates matching query.</p>
                    ) : (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                        {allCertificates.certificates
                          .filter((c: any) => 
                            c.id.toLowerCase().includes(certSearchQuery.toLowerCase()) || 
                            c.type.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                            (c.orderId && c.orderId.toLowerCase().includes(certSearchQuery.toLowerCase())) ||
                            (c.order?.customer?.companyName && c.order.customer.companyName.toLowerCase().includes(certSearchQuery.toLowerCase()))
                          )
                          .map((cert: any) => (
                            <div key={cert.id} className="p-4 border border-white/10 bg-white/[0.01] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
                              <div className="space-y-1.5 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 bg-accent/20 text-accent text-[8px] font-bold uppercase border border-accent/20">
                                    {cert.type}
                                  </span>
                                  <span className="text-[10px] text-white/40">
                                    Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="text-white font-bold select-all break-all">ID: {cert.id}</div>
                                <div className="text-[10px] text-white/50">
                                  File: <span className="text-white">{cert.file.filename}</span>
                                </div>
                                {cert.order && (
                                  <div className="text-[10px] text-white/40">
                                    Client: <span className="text-white/60">{cert.order.customer?.companyName || "N/A"}</span>
                                    {" // "}
                                    Order: <span className="text-white/60">PRM-ORD-{cert.order.id.substring(0, 8).toUpperCase()}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                                <button
                                  onClick={() => window.open(`/verify/${cert.id}`, '_blank')}
                                  className="flex-1 py-1.5 px-3 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/5 text-[9px] font-bold uppercase transition-colors text-center"
                                >
                                  Public Verify Link
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(cert.fileId, cert.file.filename)}
                                  className="flex-1 py-1.5 px-3 bg-accent text-accent-foreground text-[9px] font-bold uppercase transition-transform active:scale-95 text-center"
                                >
                                  Download Secure
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Issue Certificate Form */}
                  <div className="lg:col-span-5 p-5 border border-white/10 bg-white/[0.01] space-y-4 h-fit">
                    <h4 className="text-xs font-bold tracking-widest text-white/40 uppercase border-b border-white/5 pb-2">Issue New Quality Certificate</h4>
                    
                    {certIssueSuccess && (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        {certIssueSuccess}
                      </div>
                    )}

                    {certIssueError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                        {certIssueError}
                      </div>
                    )}

                    <form onSubmit={handleIssueCertificate} className="space-y-4 text-xs font-mono">
                      <div>
                        <label className="block text-[9px] text-white/50 uppercase mb-1">1. Select Order Reference (Optional)</label>
                        <select
                          value={newCertOrderId}
                          onChange={(e) => {
                            setNewCertOrderId(e.target.value);
                            setNewCertFileId(''); // reset selected file
                          }}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono appearance-none rounded-none"
                        >
                          <option value="">-- Direct Issuance (No Order Link) --</option>
                          {(allCertificates?.orders || []).map((order: any) => (
                            <option key={order.id} value={order.id}>
                              PRM-ORD-{order.id.substring(0, 8).toUpperCase()} ({order.customer?.companyName || "Unknown Customer"})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-white/50 uppercase mb-1">2. Select Certificate Type</label>
                        <select
                          value={newCertType}
                          onChange={(e: any) => setNewCertType(e.target.value)}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono appearance-none rounded-none"
                        >
                          <option value="Material">Material Test Certificate (MTC)</option>
                          <option value="HeatTreatment">Heat Treatment Certificate</option>
                          <option value="Inspection">Inspection Report</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] text-white/50 uppercase mb-1">3. Select Uploaded PDF File Asset</label>
                        <select
                          value={newCertFileId}
                          required
                          onChange={(e) => setNewCertFileId(e.target.value)}
                          className="w-full bg-background border border-white/10 text-xs px-3 py-2 text-white focus:outline-none focus:border-accent font-mono appearance-none rounded-none"
                        >
                          <option value="" disabled>-- Select Verifiable File --</option>
                          {(allCertificates?.files || [])
                            .filter((f: any) => f.fileType === 'PDF')
                            .filter((f: any) => !newCertOrderId || f.orderId === newCertOrderId)
                            .map((file: any) => (
                              <option key={file.id} value={file.id}>
                                {file.filename} ({Math.round(file.size / 1024)} KB)
                              </option>
                            ))}
                        </select>
                        {((allCertificates?.files || [])
                          .filter((f: any) => f.fileType === 'PDF')
                          .filter((f: any) => !newCertOrderId || f.orderId === newCertOrderId).length === 0) && (
                          <p className="text-[10px] text-red-400 mt-1 italic">
                            No PDF files registered {newCertOrderId ? 'for this order' : 'in system'}. Please upload a file under &quot;Technical Specifications&quot; tab first.
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isIssuingCert}
                        className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest transition-colors font-mono rounded-none"
                      >
                        {isIssuingCert ? 'Issuing Certificate...' : 'Generate Verifiable Certificate'}
                      </button>
                    </form>
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
                            <span className="text-accent">{"ACTION: "}{act.action}{" // ENTITY: "}{act.entity}</span>
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

              {activeSubTab === 'observability' && (
                <motion.div
                  key="observability"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Observability Header */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight uppercase font-mono">System Observability & Health Center</h3>
                      <p className="text-xs text-white/50 mt-1">Real-time telemetries, slow queries index, and dead letter queue (DLQ) task recovery.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          if (!confirm("Trigger database backup?")) return;
                          try {
                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/admin/observability/metrics`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ action: "backup" }),
                            });
                            const data = await res.json();
                            if (res.ok) {
                              alert(`Backup completed successfully: ${data.message}`);
                              fetchObservabilityData();
                            } else {
                              alert(`Backup failed: ${data.error}`);
                            }
                          } catch (err) {
                            alert("Failed to run backup script.");
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 border border-white/10 hover:border-accent hover:text-accent bg-white/[0.02] text-[10px] font-mono font-bold uppercase text-white transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Trigger DB Backup
                      </button>
                      <button
                        onClick={fetchObservabilityData}
                        disabled={isLoadingObservability}
                        className="flex items-center gap-1.5 px-3 py-2 bg-accent hover:bg-accent/90 disabled:opacity-50 text-accent-foreground text-xs font-bold uppercase transition-colors"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingObservability ? 'animate-spin' : ''}`} />
                        Refresh Metrics
                      </button>
                    </div>
                  </div>

                  {isLoadingObservability && !observabilityMetrics ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    </div>
                  ) : observabilityMetrics ? (
                    <div className="space-y-8">
                      {/* Telemetry Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-4 border border-white/10 bg-white/[0.02]">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">DATABASE STATUS</span>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${observabilityMetrics.database.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-sm font-bold text-white uppercase">{observabilityMetrics.database.status}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/50 block mt-1">Latency: {observabilityMetrics.database.latencyMs}ms</span>
                        </div>

                        <div className="p-4 border border-white/10 bg-white/[0.02]">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">CACHE LAYER STATE</span>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${observabilityMetrics.cache.status === 'healthy' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                            <span className="text-sm font-bold text-white uppercase">{observabilityMetrics.cache.status}</span>
                          </div>
                          <span className="text-[10px] font-mono text-white/50 block mt-1">Engine: {observabilityMetrics.cache.type}</span>
                        </div>

                        <div className="p-4 border border-white/10 bg-white/[0.02]">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">SYSTEM MEMORY LOAD</span>
                          <div className="text-lg font-bold text-white mt-1">{observabilityMetrics.system.systemMemoryLoadPercent}%</div>
                          <div className="w-full bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${observabilityMetrics.system.systemMemoryLoadPercent > 80 ? 'bg-red-500' : 'bg-accent'}`}
                              style={{ width: `${observabilityMetrics.system.systemMemoryLoadPercent}%` }}
                            />
                          </div>
                        </div>

                        <div className="p-4 border border-white/10 bg-white/[0.02]">
                          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">SYSTEM UPTIME</span>
                          <div className="text-sm font-mono font-bold text-white mt-2">
                            {Math.floor(observabilityMetrics.system.uptimeSeconds / 3600)}h{' '}
                            {Math.floor((observabilityMetrics.system.uptimeSeconds % 3600) / 60)}m{' '}
                            {observabilityMetrics.system.uptimeSeconds % 60}s
                          </div>
                          <span className="text-[10px] font-mono text-white/50 block mt-1">Node: {observabilityMetrics.system.nodeVersion}</span>
                        </div>
                      </div>

                      {/* Queue Stats Detail */}
                      <div className="p-6 border border-white/10 bg-white/[0.02] space-y-4">
                        <div className="flex items-center gap-2 text-white border-b border-white/5 pb-2">
                          <Cpu className="w-4 h-4 text-accent" />
                          <h4 className="text-xs font-bold font-mono tracking-wider uppercase">Background Job Queue Controller</h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center font-mono">
                          <div className="p-3 bg-black/20 border border-white/5">
                            <span className="text-[9px] text-white/40 block">PENDING JOBS</span>
                            <span className="text-lg font-bold text-white">{observabilityMetrics.queue.metrics.pending}</span>
                          </div>
                          <div className="p-3 bg-black/20 border border-white/5">
                            <span className="text-[9px] text-white/40 block">PROCESSING JOBS</span>
                            <span className="text-lg font-bold text-amber-400">{observabilityMetrics.queue.metrics.processing}</span>
                          </div>
                          <div className="p-3 bg-black/20 border border-white/5">
                            <span className="text-[9px] text-white/40 block">COMPLETED SUCCESS</span>
                            <span className="text-lg font-bold text-emerald-400">{observabilityMetrics.queue.metrics.completed}</span>
                          </div>
                          <div className="p-3 bg-black/20 border border-white/5">
                            <span className="text-[9px] text-white/40 block">DEAD LETTER (DLQ)</span>
                            <span className={`text-lg font-bold ${observabilityMetrics.queue.metrics.failed > 0 ? 'text-red-500 animate-pulse' : 'text-white/40'}`}>{observabilityMetrics.queue.metrics.failed}</span>
                          </div>
                        </div>

                        {/* DLQ jobs list */}
                        {observabilityMetrics.queue.dlq.length > 0 ? (
                          <div className="space-y-3 pt-2">
                            <h5 className="text-[10px] font-bold font-mono text-red-500/80 uppercase tracking-widest">⚠️ Failed Jobs Queue (DLQ)</h5>
                            <div className="border border-white/10 bg-black/20 overflow-hidden">
                              <table className="w-full text-left font-mono text-[11px] border-collapse">
                                <thead>
                                  <tr className="bg-white/[0.02] border-b border-white/10 text-[9px] text-white/40">
                                    <th className="p-3">TASK</th>
                                    <th className="p-3">ATTEMPTS</th>
                                    <th className="p-3">LAST ERROR</th>
                                    <th className="p-3">FAILED TIME</th>
                                    <th className="p-3 text-right">ACTIONS</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {observabilityMetrics.queue.dlq.map((job: any) => (
                                    <ContextMenu key={job.id}>
                                      <ContextMenuTrigger asChild>
                                        <tr className="hover:bg-white/[0.01] cursor-context-menu animate-fadeIn">
                                          <td className="p-3 text-white font-bold">{job.taskName}</td>
                                          <td className="p-3 text-white/60">{job.attempts}/{job.maxAttempts}</td>
                                          <td className="p-3 text-red-400/80 max-w-xs truncate" title={job.lastError}>{job.lastError}</td>
                                          <td className="p-3 text-white/40">{new Date(job.updatedAt).toLocaleString()}</td>
                                          <td className="p-3 text-right space-x-2">
                                            <button
                                              onClick={() => handleRetryJob(job.id)}
                                              disabled={isRetryingJobId === job.id}
                                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wider text-[9px] uppercase transition-colors disabled:opacity-50"
                                            >
                                              {isRetryingJobId === job.id ? 'Retrying...' : 'Retry'}
                                            </button>
                                            <button
                                              onClick={() => handleDeleteJob(job.id)}
                                              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wider text-[9px] uppercase transition-colors"
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      </ContextMenuTrigger>
                                      <ContextMenuContent className="bg-popover border border-border text-popover-foreground rounded shadow-xl min-w-[160px] p-1 font-sans">
                                        <ContextMenuItem 
                                          onClick={() => { 
                                            navigator.clipboard.writeText(job.id); 
                                            toast.success("Job ID copied!"); 
                                          }}
                                          className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                                        >
                                          Copy Job ID
                                        </ContextMenuItem>
                                        <ContextMenuItem 
                                          onClick={() => handleRetryJob(job.id)}
                                          className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                                        >
                                          Re-run Task
                                        </ContextMenuItem>
                                        <ContextMenuItem 
                                          onClick={() => handleDeleteJob(job.id)}
                                          className="text-xs px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer transition-colors"
                                        >
                                          Purge Job Record
                                        </ContextMenuItem>
                                      </ContextMenuContent>
                                    </ContextMenu>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 bg-black/10 border border-white/5 text-[10px] font-mono text-white/40">
                            ✅ DEAD LETTER QUEUE IS CLEAN. NO FAILURE LOGS RECORDED.
                          </div>
                        )}
                      </div>

                      {/* Slow Queries & Query Latency List */}
                      <div className="p-6 border border-white/10 bg-white/[0.02] space-y-4">
                        <div className="flex items-center gap-2 text-white border-b border-white/5 pb-2">
                          <Database className="w-4 h-4 text-accent" />
                          <h4 className="text-xs font-bold font-mono tracking-wider uppercase">Database Slow Queries Monitor (&gt;200ms)</h4>
                        </div>

                        {observabilityMetrics.slowQueries.length > 0 ? (
                          <div className="border border-white/10 bg-black/20 overflow-hidden">
                            <table className="w-full text-left font-mono text-[11px] border-collapse">
                              <thead>
                                  <tr className="bg-white/[0.02] border-b border-white/10 text-[9px] text-white/40">
                                    <th className="p-3">MODEL</th>
                                    <th className="p-3">ACTION</th>
                                    <th className="p-3">LATENCY</th>
                                    <th className="p-3 text-right">TIMESTAMP</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                  {observabilityMetrics.slowQueries.map((q: any, i: number) => (
                                    <tr key={i} className="hover:bg-white/[0.01]">
                                      <td className="p-3 text-white font-bold">{q.model || 'Direct'}</td>
                                      <td className="p-3 text-white/60">{q.action}</td>
                                      <td className="p-3 text-amber-500 font-bold">{q.durationMs.toFixed(2)}ms</td>
                                      <td className="p-3 text-white/40 text-right">{new Date(q.timestamp).toLocaleTimeString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-4 bg-black/10 border border-white/5 text-[10px] font-mono text-white/40">
                            ✅ NO SLOW QUERIES DETECTED IN THIS CYCLE. PINGS ARE FAST.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-white/10 bg-white/[0.02] text-white/40">
                      Failed to load observability metrics.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* File Preview Modal */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-6"
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="w-full max-w-4xl border border-white/15 bg-background shadow-2xl flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-accent uppercase tracking-widest">TECHNICAL FILE PREVIEW</span>
                  <h3 className="text-sm font-bold text-white break-all">{previewFile.filename}</h3>
                </div>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="p-2 border border-white/10 hover:border-accent hover:text-accent transition-colors duration-200 text-white/60 text-xs font-mono font-bold uppercase tracking-wider"
                >
                  Close [ESC]
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6 flex flex-col justify-center items-center min-h-[400px]">
                {isPreviewLoading ? (
                  <div className="flex flex-col items-center gap-3 text-white/50">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    <span className="text-xs font-mono uppercase tracking-widest">Authorizing Signed Buffer Token...</span>
                  </div>
                ) : previewUrl ? (
                  <>
                    {/* Render Image Previews */}
                    {(previewFile.fileType === 'PNG' || previewFile.fileType === 'JPEG' || previewFile.fileType === 'JPG' || previewFile.filename.toLowerCase().endsWith('.png') || previewFile.filename.toLowerCase().endsWith('.jpg') || previewFile.filename.toLowerCase().endsWith('.jpeg')) ? (
                      <div className="relative w-full h-full flex justify-center items-center">
                        <img
                          src={previewUrl}
                          alt={previewFile.filename}
                          className="max-w-full max-h-[55vh] object-contain border border-white/10 shadow-lg"
                        />
                      </div>
                    ) : (previewFile.fileType === 'PDF' || previewFile.filename.toLowerCase().endsWith('.pdf')) ? (
                      /* Render PDF Previews */
                      <iframe
                        src={`${previewUrl}#toolbar=0&navpanes=0`}
                        title={previewFile.filename}
                        className="w-full h-[55vh] border border-white/10 bg-white"
                      />
                    ) : (
                      /* Render CAD / Other Fallback Previews */
                      <div className="w-full max-w-md border border-white/10 bg-white/[0.01] p-8 text-center space-y-6">
                        <div className="w-16 h-16 mx-auto border border-accent bg-accent/5 flex items-center justify-center">
                          <Compass className="w-8 h-8 text-accent" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">CAD Drawing Workspace Fallback</h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">
                            Direct browser rendering for binary CAD models (`{previewFile.fileType}`) is restricted. Download the secure manufacturing-ready package below to verify layout parameters in native CAD viewers.
                          </p>
                        </div>
                        <div className="p-4 border border-white/5 bg-black/20 text-left space-y-1 text-xs font-mono text-white/50">
                          <div>FILE CONTEXT: <span className="text-white">{previewFile.filename}</span></div>
                          <div>SIZE BUFFER: <span className="text-white">{Math.round(previewFile.size / 1024)} KB</span></div>
                          <div>STANDARD ENCODING: <span className="text-white">{previewFile.fileType} BINARY</span></div>
                        </div>
                        <button
                          onClick={() => {
                            handleDownloadFile(previewFile.id, previewFile.filename);
                            setPreviewFile(null);
                          }}
                          className="px-6 py-3 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform inline-flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" /> Download CAD Source
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <p className="text-xs text-white/40 font-mono">Error rendering preview stream.</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-white/10 bg-white/[0.01] flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-white/40">
                <div>CLASSIFICATION: {classifyFile(previewFile).toUpperCase()}</div>
                <div>CREATED STATE: {new Date(previewFile.createdAt).toLocaleString()}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
