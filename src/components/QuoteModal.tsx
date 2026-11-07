import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, ShieldCheck, MessageSquare, Loader2, MailCheck } from 'lucide-react';
import { ThemeMode } from '../types';
import { saveLead } from '../utils/leadsManager';
import { sendEmailNotification } from '../utils/emailService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDivision?: string;
  initialNotes?: string;
  isBessStudy?: boolean;
  initialBessData?: {
    powerKW?: number;
    capacityKWh?: number;
    backupHours?: number;
    application?: string;
    existingSolarKWp?: number;
    facilityPeakKW?: number;
  };
  theme?: ThemeMode;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialDivision = 'Civil Infrastructure & Structural Works',
  initialNotes = '',
  isBessStudy = false,
  initialBessData,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const [division, setDivision] = useState(
    isBessStudy ? 'Battery Energy Storage Systems (BESS)' : initialDivision
  );
  const [sector, setSector] = useState('Industrial / C&I');
  const [projectScale, setProjectScale] = useState('₹10M to ₹50 Million (₹1 - ₹5 Cr)');
  const [location, setLocation] = useState('Pune & PCMC, Maharashtra');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(initialNotes);

  // Dedicated BESS Sizing States
  const [isBessMode, setIsBessMode] = useState(
    isBessStudy || initialDivision.toLowerCase().includes('bess') || initialDivision.toLowerCase().includes('battery')
  );
  const [bessPeakKW, setBessPeakKW] = useState<number>(initialBessData?.facilityPeakKW || initialBessData?.powerKW || 200);
  const [bessDurationHours, setBessDurationHours] = useState<number>(initialBessData?.backupHours || 2);
  const [bessPowerKW, setBessPowerKW] = useState<number>(initialBessData?.powerKW || 150);
  const [bessCapacityKWh, setBessCapacityKWh] = useState<number>(initialBessData?.capacityKWh || 300);
  const [existingSolarKWp, setExistingSolarKWp] = useState<number>(initialBessData?.existingSolarKWp || 100);
  const [bessApplication, setBessApplication] = useState<string>(
    initialBessData?.application || 'Time-of-Day (TOD) Peak Shaving & Demand Shaving'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSentStatus, setEmailSentStatus] = useState<string>('');

  useEffect(() => {
    if (isBessStudy) {
      setDivision('Battery Energy Storage Systems (BESS)');
      setIsBessMode(true);
    } else if (initialDivision) {
      setDivision(initialDivision);
      setIsBessMode(
        initialDivision.toLowerCase().includes('bess') || initialDivision.toLowerCase().includes('battery')
      );
    }
    if (initialNotes) setNotes(initialNotes);
    if (initialBessData) {
      if (initialBessData.facilityPeakKW) setBessPeakKW(initialBessData.facilityPeakKW);
      if (initialBessData.backupHours) setBessDurationHours(initialBessData.backupHours);
      if (initialBessData.powerKW) setBessPowerKW(initialBessData.powerKW);
      if (initialBessData.capacityKWh) setBessCapacityKWh(initialBessData.capacityKWh);
      if (initialBessData.existingSolarKWp) setExistingSolarKWp(initialBessData.existingSolarKWp);
      if (initialBessData.application) setBessApplication(initialBessData.application);
    }
  }, [initialDivision, initialNotes, isBessStudy, initialBessData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Generate unique reference ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const prefix = isBessMode ? 'PIPL-BESS-2026' : 'PIPL-RFP-2026';
      const refCode = `${prefix}-${randomNum}`;
      setReferenceId(refCode);

      // Compile comprehensive notes including BESS technical sizing details if applicable
      let compiledNotes = notes.trim();
      if (isBessMode) {
        const bessSummary = `[BESS FEASIBILITY SIZING] Peak Demand: ${bessPeakKW} kW | Target Backup: ${bessDurationHours} Hours | Sized Power: ${bessPowerKW} kW | Storage Capacity: ${bessCapacityKWh} kWh | Solar Capacity: ${existingSolarKWp} kWp | Primary Application: ${bessApplication}`;
        compiledNotes = compiledNotes ? `${bessSummary}\nClient Notes: ${compiledNotes}` : bessSummary;
      }

      // 1. Save lead into local CRM and Cloud Firestore DB
      const newLead = saveLead({
        id: refCode,
        fullName: fullName.trim(),
        company: company.trim() || undefined,
        phone: phone.trim(),
        email: email.trim(),
        division,
        sector,
        projectScale,
        location,
        notes: compiledNotes || undefined,
        source: isBessMode ? 'BESS Feasibility Study Request' : 'Website RFP Quote Form',
      });

      // 2. Transition UI to success confirmation
      setIsSubmitted(true);
      setEmailSentStatus('Logged into CRM database');

      // 3. Dispatch email notification in background
      sendEmailNotification(newLead)
        .then((emailResult) => {
          if (emailResult?.success) {
            setEmailSentStatus('Email notification dispatched to Pune HQ');
          } else {
            setEmailSentStatus('Logged into CRM database (Email queue processing)');
          }
        })
        .catch((err) => {
          console.warn('Background email dispatch catch:', err);
          setEmailSentStatus('Logged into CRM database');
        });
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setCompany('');
    setPhone('');
    setEmail('');
    setNotes('');
    setReferenceId('');
    setEmailSentStatus('');
    onClose();
  };

  const waLeadText = encodeURIComponent(
    `*${isBessMode ? 'BESS FEASIBILITY STUDY REQUEST' : 'NEW PROJECT RFP'} - PIPL*\n` +
      `*Reference:* ${referenceId}\n` +
      `*Name:* ${fullName}\n` +
      `*Company/Facility:* ${company || 'Industrial / Commercial Client'}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Division:* ${division}\n` +
      (isBessMode
        ? `*BESS Power:* ${bessPowerKW} kW | *Storage Capacity:* ${bessCapacityKWh} kWh\n` +
          `*Target Backup:* ${bessDurationHours} hrs | *Facility Peak:* ${bessPeakKW} kW\n` +
          `*Solar Capacity:* ${existingSolarKWp} kWp | *Objective:* ${bessApplication}\n`
        : `*Scale:* ${projectScale}\n`) +
      `*Location:* ${location}\n` +
      (notes ? `*Site Notes:* ${notes}\n` : '') +
      `\nPlease review my technical specifications.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl border p-4 sm:p-8 shadow-2xl transition-all max-h-[92vh] overflow-y-auto ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              {isBessMode ? 'Clean Energy Storage Division' : 'EPC & Infrastructure Request'}
            </span>
            <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-slate-100 mt-1">
              {isBessMode ? 'Request a BESS Feasibility Study' : 'Request Project Proposal (RFP)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-slate-100 font-heading">
              Proposal Request Logged Successfully
            </h4>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{fullName}</strong>. Your project requirement has been registered and assigned to our Senior Projects Engineering Division at Pune HQ.
            </p>

            {/* Reference Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto space-y-2">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                Official Tracking Reference
              </div>
              <div className="text-2xl font-mono font-bold text-cyan-400 select-all">
                {referenceId}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 pt-1">
                <MailCheck className="w-4 h-4 shrink-0" />
                <span>{emailSentStatus || 'Email notification sent to Pune HQ'}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                A technical engineer will contact you within 4 business hours.
              </div>
            </div>

            {/* Instant WhatsApp Forwarding Option */}
            <div className="pt-2 max-w-md mx-auto space-y-3">
              <div className="text-xs text-slate-400 font-medium">
                Want immediate priority review? Forward this directly to our desk on WhatsApp:
              </div>
              <a
                href={`https://wa.me/919359543323?text=${waLeadText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Forward via WhatsApp (+91 93595 43323)</span>
              </a>
            </div>

            <div className="pt-3 flex justify-center">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Engineering Division
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDivision(val);
                    setIsBessMode(val.toLowerCase().includes('bess') || val.toLowerCase().includes('battery'));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Battery Energy Storage Systems (BESS)">Battery Energy Storage Systems (BESS)</option>
                  <option value="Civil Infrastructure & Structural Works">Civil Infrastructure & Structural Works</option>
                  <option value="Roads, Bridges & Municipal Infrastructure">Roads, Bridges & Municipal Infrastructure</option>
                  <option value="Electrical Infrastructure & Substations">Electrical Infrastructure & Substations (33kV/11kV)</option>
                  <option value="Smart Metering & AMI">Smart Metering & AMI</option>
                  <option value="Renewable Energy & Solar EPC">Renewable Energy & Solar EPC (MW / C&I)</option>
                  <option value="O&M Lifecycle Maintenance">O&M Lifecycle Maintenance</option>
                  <option value="Green Open Access (100kW+)">Green Open Access (100kW+)</option>
                  <option value="Virtual Net Metering (CHS)">Virtual Net Metering (CHS)</option>
                  <option value="EV Charging Infrastructure">EV Charging Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Client / Sector Category
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Industrial / C&I">Industrial / Commercial (C&I / Factories)</option>
                  <option value="Government / Municipal">Government Department / Municipal (PCMC/PMC/PWD)</option>
                  <option value="Infrastructure Developer">Infrastructure Developer / General Contractor</option>
                  <option value="Housing Society (CHS)">Cooperative Housing Society (CHS)</option>
                </select>
              </div>
            </div>

            {/* If BESS is selected, show explicit technical sizing fields */}
            {isBessMode ? (
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-cyan-900/40">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    ⚡ BESS Technical Sizing Details
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Power (kW/MW) vs Storage (kWh/MWh)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Facility Peak Demand / Connected Load (kW / kVA)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={20000}
                      value={bessPeakKW}
                      onChange={(e) => {
                        const val = Math.max(10, parseInt(e.target.value) || 10);
                        setBessPeakKW(val);
                        // Auto-propose power and capacity
                        const pKW = Math.round(val * 0.7);
                        setBessPowerKW(pKW);
                        setBessCapacityKWh(Math.round(pKW * bessDurationHours));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                      placeholder="e.g. 500 kW"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Target Backup / Shaving Duration (Hours)
                    </label>
                    <select
                      value={bessDurationHours}
                      onChange={(e) => {
                        const h = parseFloat(e.target.value) || 2;
                        setBessDurationHours(h);
                        setBessCapacityKWh(Math.round(bessPowerKW * h));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                    >
                      <option value="1">1 Hour (1C - Rapid Peak Shaving)</option>
                      <option value="2">2 Hours (0.5C - Standard Commercial / TOD)</option>
                      <option value="4">4 Hours (0.25C - Extended Evening Discharge)</option>
                      <option value="6">6 Hours (0.16C - Deep Industrial Backup)</option>
                      <option value="8">8 Hours (Full Shift Microgrid)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Battery Power (kW)
                    </label>
                    <input
                      type="number"
                      min={10}
                      value={bessPowerKW}
                      onChange={(e) => {
                        const p = parseInt(e.target.value) || 10;
                        setBessPowerKW(p);
                        setBessCapacityKWh(Math.round(p * bessDurationHours));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      = {(bessPowerKW / 1000).toFixed(2)} MW PCS Rating
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Energy Capacity (kWh)
                    </label>
                    <input
                      type="number"
                      min={20}
                      value={bessCapacityKWh}
                      onChange={(e) => setBessCapacityKWh(parseInt(e.target.value) || 20)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      = {(bessCapacityKWh / 1000).toFixed(2)} MWh LFP Storage
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Existing / Planned Solar
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={existingSolarKWp}
                      onChange={(e) => setExistingSolarKWp(parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-mono focus:outline-none focus:border-cyan-500"
                      placeholder="e.g. 250 kWp"
                    />
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      kWp on site (0 if none)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Primary Sizing Objective / Use Case
                  </label>
                  <select
                    value={bessApplication}
                    onChange={(e) => setBessApplication(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Time-of-Day (TOD) Peak Shaving & Demand Shaving">Time-of-Day (TOD) Peak Shaving & Demand Shaving</option>
                    <option value="Solar-Plus-Storage Self-Consumption (Zero Export & Arbitrage)">Solar-Plus-Storage Self-Consumption (Zero Export & Arbitrage)</option>
                    <option value="Diesel Generator Displacement (Clean DG Offset)">Diesel Generator Displacement (Clean DG Offset)</option>
                    <option value="EV Fast Charging Buffer & Grid Demand Mitigation">EV Fast Charging Buffer & Grid Demand Mitigation</option>
                    <option value="Islanded Critical Microgrid & Uninterruptible Backup">Islanded Critical Microgrid & Uninterruptible Backup</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Capacity / Scope
                  </label>
                  <select
                    value={projectScale}
                    onChange={(e) => setProjectScale(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Under ₹10 Million (< ₹1 Cr)">Under ₹10 Million (&lt; ₹1 Cr) / Fast-Track Scope</option>
                    <option value="₹10M to ₹50 Million (₹1 - ₹5 Cr)">₹10M to ₹50 Million (₹1 - ₹5 Cr)</option>
                    <option value="₹50M to ₹150 Million (₹5 - ₹15 Cr)">₹50M to ₹150 Million (₹5 - ₹15 Cr)</option>
                    <option value="₹150 Million+ Landmark EPC">₹150 Million+ (&gt; ₹15 Cr) Landmark EPC</option>
                    <option value="100 kW to 2 MW Solar Capacity">100 kW to 2 MW Solar / Renewable</option>
                    <option value="Annual O&M / Maintenance Contract">Annual O&M / Maintenance Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Project Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Pune & PCMC, Maharashtra">Pune & PCMC, Maharashtra</option>
                    <option value="Mumbai & MMR Region">Mumbai & MMR Region</option>
                    <option value="Chakan / Ranjangaon / Talegaon Industrial">Chakan / Ranjangaon / Talegaon Industrial</option>
                    <option value="Rest of Maharashtra">Rest of Maharashtra</option>
                    <option value="Other State in India">Other State in India</option>
                  </select>
                </div>
              </div>
            )}

            {isBessMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Project / Facility Site Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Chakan / Bhosari / Talegaon MIDC (Pune)">Chakan / Bhosari / Talegaon MIDC (Pune)</option>
                  <option value="Ranjangaon / Sanaswadi Industrial Belt">Ranjangaon / Sanaswadi Industrial Belt</option>
                  <option value="Mumbai, Thane & MMR Industrial Zone">Mumbai, Thane & MMR Industrial Zone</option>
                  <option value="Aurangabad / Waluj / Shendra Industrial">Aurangabad / Waluj / Shendra Industrial</option>
                  <option value="Rest of Maharashtra">Rest of Maharashtra</option>
                  <option value="Other State in India">Other State in India</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patil"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Organization / Society Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Finolex / PCMC / Society Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Technical Scope / Site Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention connected load details, rooftop area, or specific requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>NDA Protected & Instant Notification to Pune Desk</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Dispatching RFP...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit RFP Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
