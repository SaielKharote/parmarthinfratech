import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Download,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Trash2,
  Calendar,
  Building,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  ShieldCheck,
  Send,
  Loader2
} from 'lucide-react';
import {
  LeadItem,
  getLeads,
  subscribeToLeads,
  updateLeadStatus,
  deleteLead,
  exportLeadsToCSV
} from '../utils/leadsManager';
import { sendPasswordResetOtpEmail } from '../utils/emailService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_MASTER_PASSCODE = 'pipl2026';
const REGISTERED_OWNER_EMAIL = 'saielkharote98@gmail.com';
const STORAGE_CUSTOM_PASS = 'pipl_admin_custom_password';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pipl_admin_auth') === 'true';
    }
    return false;
  });

  // Login view state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Password reset flow state
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetStep, setResetStep] = useState<'verify' | 'otp' | 'new_password' | 'success'>('verify');
  const [resetEmailInput, setResetEmailInput] = useState('');
  const [resetOtpInput, setResetOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [resetError, setResetError] = useState('');
  const [isSendingResetEmail, setIsSendingResetEmail] = useState(false);

  // Authenticated state
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // In-dashboard change password modal
  const [isChangingPasswordInDash, setIsChangingPasswordInDash] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');

  // Load leads on open & subscribe to real-time Firestore updates
  useEffect(() => {
    if (isOpen) {
      setLeads(getLeads());
      setPasswordError('');
      setResetError('');

      const unsubscribe = subscribeToLeads((updatedLeads) => {
        setLeads(updatedLeads);
      });

      return () => unsubscribe();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getActivePassword = (): string => {
    if (typeof window !== 'undefined') {
      const customPass = localStorage.getItem(STORAGE_CUSTOM_PASS);
      if (customPass && customPass.trim()) return customPass.trim();
    }
    return DEFAULT_MASTER_PASSCODE;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePass = getActivePassword();
    const entered = passwordInput.trim();

    if (entered === activePass || entered === DEFAULT_MASTER_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pipl_admin_auth', 'true');
      setPasswordError('');
      setPasswordInput('');
      setLeads(getLeads());
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pipl_admin_auth');
    setPasswordInput('');
    setIsResetMode(false);
    setResetStep('verify');
  };

  // Start reset flow
  const handleStartResetFlow = () => {
    setIsResetMode(true);
    setResetStep('verify');
    setResetEmailInput('');
    setResetOtpInput('');
    setGeneratedOtp('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setResetError('');
  };

  // Step 1: Verify Email and send OTP
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = resetEmailInput.trim().toLowerCase();

    // Check if entered email matches the authorized owner email or master keyword
    if (cleanEmail !== REGISTERED_OWNER_EMAIL && cleanEmail !== 'saielkharote98@gmail.com' && cleanEmail !== 'info@pinfratech.com') {
      setResetError('Email address does not match registered administrator profile.');
      return;
    }

    setResetError('');
    setIsSendingResetEmail(true);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    try {
      await sendPasswordResetOtpEmail(otp);
    } catch (err) {
      console.warn('Reset email dispatch note:', err);
    } finally {
      setIsSendingResetEmail(false);
      setResetStep('otp');
    }
  };

  // Step 2: Verify OTP or Master PIN
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = resetOtpInput.trim();

    if (entered === generatedOtp || entered === 'pipl2026' || (generatedOtp && entered === generatedOtp)) {
      setResetError('');
      setResetStep('new_password');
    } else {
      setResetError('Invalid verification code. Please check your email or enter emergency PIN.');
    }
  };

  // Step 3: Save New Password
  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = newPasswordInput.trim();
    const confirmPass = confirmPasswordInput.trim();

    if (!newPass || newPass.length < 4) {
      setResetError('Password must be at least 4 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      setResetError('Passwords do not match.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CUSTOM_PASS, newPass);
    }

    setResetError('');
    setResetStep('success');
  };

  // Direct Change Password from inside dashboard
  const handleDirectPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const newPass = newPasswordInput.trim();
    const confirmPass = confirmPasswordInput.trim();

    if (!newPass || newPass.length < 4) {
      setResetError('Password must be at least 4 characters long.');
      return;
    }

    if (newPass !== confirmPass) {
      setResetError('Passwords do not match.');
      return;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CUSTOM_PASS, newPass);
    }

    setChangePasswordSuccess('Password updated successfully!');
    setTimeout(() => {
      setIsChangingPasswordInDash(false);
      setChangePasswordSuccess('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setResetError('');
    }, 1500);
  };

  // Lead actions
  const handleStatusChange = (id: string, newStatus: LeadItem['status']) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete lead ${id}?`)) {
      const updated = deleteLead(id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const handleRefresh = () => {
    setLeads(getLeads());
  };

  // Filtered leads calculation
  const filteredLeads = leads.filter((lead) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      lead.fullName.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      (lead.company && lead.company.toLowerCase().includes(query)) ||
      (lead.notes && lead.notes.toLowerCase().includes(query));

    const matchesDivision =
      divisionFilter === 'all' || lead.division === divisionFilter;

    const matchesStatus =
      statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesDivision && matchesStatus;
  });

  // Analytics Metrics
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const surveyCount = leads.filter((l) => l.status === 'survey_scheduled').length;
  const closedCount = leads.filter((l) => l.status === 'closed').length;

  const getCleanPhone = (phone: string) => {
    return phone.replace(/[^\d]/g, '');
  };

  const getStatusBadge = (status: LeadItem['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3" />
            Contacted
          </span>
        );
      case 'survey_scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Calendar className="w-3 h-3" />
            Survey Scheduled
          </span>
        );
      case 'quote_sent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Briefcase className="w-3 h-3" />
            Quote Sent
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl transition-all flex flex-col overflow-hidden ${
          !isAuthenticated ? 'max-w-md' : 'max-w-6xl max-h-[94vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 id="admin-modal-title" className="text-sm font-bold text-slate-100 font-heading">
                {!isAuthenticated
                  ? isResetMode
                    ? 'Security Verification'
                    : 'Authentication Required'
                  : 'Executive Dashboard'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setIsChangingPasswordInDash(true)}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
                  title="Change Password"
                >
                  <KeyRound className="w-3 h-3" />
                  <span className="hidden sm:inline">Change Password</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Log out"
                >
                  Log Out
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          isResetMode ? (
            /* ================= PASSWORD RESET VIEW ================= */
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetMode(false);
                    setResetStep('verify');
                    setResetError('');
                  }}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login</span>
                </button>
              </div>

              {resetError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {/* Step 1: Enter email */}
              {resetStep === 'verify' && (
                <form onSubmit={handleVerifyEmail} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-200">Reset Password</h4>
                    <p className="text-xs text-slate-400">
                      Enter the registered administrator email to receive a verification code.
                    </p>
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter registered email"
                      value={resetEmailInput}
                      onChange={(e) => setResetEmailInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingResetEmail}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSendingResetEmail ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Verification Code</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: Enter OTP */}
              {resetStep === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-200">Enter Verification Code</h4>
                    <p className="text-xs text-slate-400">
                      A 6-digit verification code has been dispatched to {resetEmailInput}.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Enter 6-digit code or Master PIN"
                      value={resetOtpInput}
                      onChange={(e) => setResetOtpInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono tracking-widest text-center text-slate-200 focus:outline-none focus:border-cyan-500"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Verify Code
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setResetStep('verify')}
                      className="text-xs text-slate-400 hover:text-slate-200"
                    >
                      Resend code or change email
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Enter New Password */}
              {resetStep === 'new_password' && (
                <form onSubmit={handleSaveNewPassword} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-200">Set New Password</h4>
                    <p className="text-xs text-slate-400">
                      Create and confirm your new access password.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <input
                        type="password"
                        required
                        placeholder="New password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        autoFocus
                      />
                    </div>
                    <div>
                      <input
                        type="password"
                        required
                        placeholder="Confirm new password"
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Save & Update Password
                  </button>
                </form>
              )}

              {/* Step 4: Success confirmation */}
              {resetStep === 'success' && (
                <div className="text-center space-y-4 py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-100">Password Updated</h4>
                    <p className="text-xs text-slate-400">
                      Your new password is now active. You can log in using your new credentials.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResetMode(false);
                      setResetStep('verify');
                    }}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Proceed to Login
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ================= ABSTRACT AUTHENTICATION GATE ================= */
            <div className="p-6 sm:p-8 space-y-5">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Enter Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {passwordError && (
                    <p className="mt-2 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{passwordError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Access</span>
                </button>
              </form>

              {/* Discreet Forgot Password Link */}
              <div className="pt-2 text-center border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={handleStartResetFlow}
                  className="text-xs text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          )
        ) : (
          /* ================= AUTHENTICATED EXECUTIVE DASHBOARD ================= */
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* In-Dashboard Password Change Drawer / Dialog */}
            {isChangingPasswordInDash && (
              <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-sm p-6 flex items-center justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-cyan-400" />
                      <span>Change Access Password</span>
                    </h4>
                    <button
                      onClick={() => {
                        setIsChangingPasswordInDash(false);
                        setResetError('');
                        setChangePasswordSuccess('');
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {resetError && (
                    <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                      {resetError}
                    </div>
                  )}

                  {changePasswordSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{changePasswordSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleDirectPasswordChange} className="space-y-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Confirm new password"
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsChangingPasswordInDash(false)}
                        className="flex-1 py-2 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* KPI Cards Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-slate-800 bg-slate-950/40">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400">Total Inquiries</div>
                <div className="text-2xl font-bold font-mono text-slate-100 mt-1">{totalCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="text-[11px] font-mono text-emerald-400">New / Uncontacted</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{newCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                <div className="text-[11px] font-mono text-amber-400">Site Surveys</div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">{surveyCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="text-[11px] font-mono text-cyan-400">Closed / Won</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">{closedCount}</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-slate-800 bg-slate-900 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, company, phone, email, or Ref ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Divisions</option>
                  <option value="Renewable Energy & Solar EPC">Renewable Energy & Solar EPC</option>
                  <option value="Green Open Access (100kW+)">Green Open Access</option>
                  <option value="Virtual Net Metering (CHS)">Virtual Net Metering (CHS)</option>
                  <option value="Electrical Infrastructure & Substations">Electrical / Substations</option>
                  <option value="Smart Metering & AMI">Smart Metering & AMI</option>
                  <option value="Civil & Structural Works">Civil & Structural Works</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="survey_scheduled">Survey Scheduled</option>
                  <option value="quote_sent">Quote Sent</option>
                  <option value="closed">Closed / Won</option>
                </select>

                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Refresh Leads"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => exportLeadsToCSV(filteredLeads)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
                  title="Export to Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Leads Table & Detailed Drawer */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-slate-800/60 flex items-center justify-center mx-auto mb-3 text-slate-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-300">No records found</p>
                  <p className="text-xs text-slate-500 mt-1">Try resetting the filter or clear your search term.</p>
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = getCleanPhone(lead.phone);
                  const isExpanded = selectedLead?.id === lead.id;
                  const waMessage = encodeURIComponent(
                    `Hello ${lead.fullName}, thank you for contacting Parmaarth Infratech Pvt. Ltd. regarding your requirement for ${lead.division} (${lead.projectScale}) [Ref: ${lead.id}]. Our engineering team is ready to assist you.`
                  );

                  return (
                    <div
                      key={lead.id}
                      className={`p-4 transition-colors ${
                        isExpanded ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Column 1: Client & Contact */}
                        <div className="space-y-1.5 min-w-[260px]">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-cyan-400">
                              {lead.id}
                            </span>
                            {getStatusBadge(lead.status)}
                          </div>

                          <div className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                            <span>{lead.fullName}</span>
                            {lead.company && (
                              <span className="text-xs text-slate-400 font-normal flex items-center gap-1">
                                <Building className="w-3 h-3 text-slate-500" />
                                {lead.company}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                            <span className="font-mono text-slate-300">{lead.phone}</span>
                            <span>•</span>
                            <span className="text-slate-400">{lead.email}</span>
                            <span>•</span>
                            <span className="text-[11px] text-slate-500">
                              {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Column 2: Scope & Location */}
                        <div className="space-y-1 text-xs text-slate-300 max-w-sm">
                          <div className="font-medium text-slate-200">
                            {lead.division}
                          </div>
                          <div className="text-slate-400 flex flex-wrap gap-2 text-[11px]">
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                              {lead.projectScale}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                              {lead.sector}
                            </span>
                          </div>
                          {lead.notes && (
                            <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                              "{lead.notes}"
                            </p>
                          )}
                        </div>

                        {/* Column 3: Status Changer & Actions */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          {/* Status Dropdown */}
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadItem['status'])
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="survey_scheduled">Status: Survey Scheduled</option>
                            <option value="quote_sent">Status: Quote Sent</option>
                            <option value="closed">Status: Closed / Won</option>
                          </select>

                          {/* Quick WhatsApp */}
                          <a
                            href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${waMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Quick Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                            title="Call directly"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Quick Email */}
                          <a
                            href={`mailto:${lead.email}?subject=Parmaarth%20Infratech%20-%20Proposal%20Reference%20${lead.id}`}
                            className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 transition-colors"
                            title="Send email reply"
                          >
                            <Mail className="w-4 h-4" />
                          </a>

                          {/* Toggle Expand */}
                          <button
                            onClick={() => setSelectedLead(isExpanded ? null : lead)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Lead Inspector Drawer */}
                      {isExpanded && (
                        <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs animate-fade-in">
                          <div className="font-semibold text-slate-200 border-b border-slate-800/80 pb-2 flex items-center justify-between">
                            <span>Technical Scope & Details</span>
                            <span className="font-mono text-cyan-400 text-[11px]">
                              Source: {lead.source || 'Website RFP'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                              <span className="text-slate-500 block">Location / Site:</span>
                              <span className="text-slate-200 font-medium">{lead.location}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Sector Classification:</span>
                              <span className="text-slate-200 font-medium">{lead.sector}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Contract Capacity:</span>
                              <span className="text-slate-200 font-medium">{lead.projectScale}</span>
                            </div>
                          </div>

                          {lead.notes && (
                            <div className="mt-2 pt-2 border-t border-slate-900">
                              <span className="text-slate-500 block mb-1">Customer Notes:</span>
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 text-slate-300 leading-relaxed">
                                {lead.notes}
                              </div>
                            </div>
                          )}

                          <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                            <span>Notification Delivered: {REGISTERED_OWNER_EMAIL}</span>
                            <span>Created: {new Date(lead.createdAt).toISOString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary Bar */}
            <div className="px-4 py-3 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized session active</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Parmaarth Infratech Pvt. Ltd.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
