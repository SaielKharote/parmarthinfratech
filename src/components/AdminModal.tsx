import React, { useState, useEffect, useMemo } from 'react';
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
  CheckCircle2,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import {
  LeadItem,
  getLeads,
  updateLeadStatus,
  deleteLead,
  exportLeadsToCSV
} from '../utils/leadsManager';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_PASSCODE = 'pipl2026';

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pipl_admin_auth') === 'true';
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // Load leads on open
  useEffect(() => {
    if (isOpen) {
      setLeads(getLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === DEFAULT_PASSCODE || passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('pipl_admin_auth', 'true');
      setPasswordError('');
      setLeads(getLeads());
    } else {
      setPasswordError('Invalid passcode. Use default passcode: pipl2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pipl_admin_auth');
    setPasswordInput('');
  };

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
            New Lead
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
            Closed / Won
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 text-slate-100 shadow-2xl transition-all max-h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  PIPL Executive CRM
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  v2.0
                </span>
              </div>
              <h3 id="admin-modal-title" className="text-base sm:text-lg font-bold text-slate-100 font-heading">
                Client Proposals & RFP Leads Dashboard
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Log out of Admin"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Password Gate */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold font-heading text-slate-100">
                Parmaarth Infratech Executive Access
              </h4>
              <p className="text-xs text-slate-400">
                Please enter your executive passcode to view and manage customer quote submissions, contact inquiries, and email dispatches.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter passcode (default: pipl2026)"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 text-center font-mono focus:outline-none focus:border-cyan-500"
                  autoFocus
                />
                {passwordError && (
                  <p className="mt-2 text-xs text-rose-400 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Leads Portal</span>
              </button>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Default Access Passcode:</span>{' '}
                <code className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 font-mono">pipl2026</code>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
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
                  <p className="text-sm font-medium text-slate-300">No leads match your search criteria</p>
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
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>

                          {/* Quick Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                            title="Call customer directly"
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
                            title="View full lead details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Lead Inspector Drawer */}
                      {isExpanded && (
                        <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs animate-fade-in">
                          <div className="font-semibold text-slate-200 border-b border-slate-800/80 pb-2 flex items-center justify-between">
                            <span>Full Technical Specification & Lead Context</span>
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
                              <span className="text-slate-500 block mb-1">Customer Site Notes:</span>
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 text-slate-300 leading-relaxed">
                                {lead.notes}
                              </div>
                            </div>
                          )}

                          <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                            <span>Notification Destination: SAIELKHAROTE219@gmail.com</span>
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
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Real-time persistence enabled (stored in secure local storage + email dispatched).</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Parmaarth Infratech Pvt. Ltd. | Pune HQ
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
