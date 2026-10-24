export interface LeadItem {
  id: string;
  createdAt: string;
  fullName: string;
  company?: string;
  phone: string;
  email: string;
  division: string;
  sector: string;
  projectScale: string;
  location: string;
  notes?: string;
  status: 'new' | 'contacted' | 'survey_scheduled' | 'quote_sent' | 'closed';
  source: string;
}

const STORAGE_KEY = 'pipl_rfp_leads_v1';

// Seed sample leads for immediate demonstration in the Admin Portal
const INITIAL_SEED_LEADS: LeadItem[] = [
  {
    id: 'PIPL-RFP-2026-1082',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    fullName: 'Sunil Deshmukh',
    company: 'Finolex Industries Plant Unit-2',
    phone: '+91 98220 44120',
    email: 's.deshmukh@finolex-ind.com',
    division: 'Renewable Energy & Solar EPC',
    sector: 'Industrial / C&I',
    projectScale: '500 kW to 2 MW',
    location: 'Chakan / Ranjangaon / Talegaon Industrial',
    notes: 'Inquiry regarding 1.2MW ground mounted captive solar plant with grid synchronisation to reduce HT tariff.',
    status: 'new',
    source: 'Website RFP',
  },
  {
    id: 'PIPL-RFP-2026-1049',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    fullName: 'Aniket Kulkarni',
    company: 'Green Woods CHS Pune',
    phone: '+91 94225 18765',
    email: 'aniket.kulkarni@gmail.com',
    division: 'Virtual Net Metering (CHS)',
    sector: 'Housing Society (CHS)',
    projectScale: '50 kW to 100 kW',
    location: 'Pune & PCMC, Maharashtra',
    notes: 'Society common meter load is 65 kW. Need rooftop solar installation and VNM net-metering under MSEDCL.',
    status: 'survey_scheduled',
    source: 'Solar Calculator',
  },
  {
    id: 'PIPL-RFP-2026-1015',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    fullName: 'Mahesh Patil',
    company: 'Patil Cold Storage & Logistics',
    phone: '+91 93701 55901',
    email: 'patil.coldstorage@yahoo.in',
    division: 'Green Open Access (100kW+)',
    sector: 'Industrial / C&I',
    projectScale: '100 kW to 500 kW',
    location: 'Rest of Maharashtra',
    notes: 'Interested in Green Open Access contract to substitute peak tariff power.',
    status: 'contacted',
    source: 'Website RFP',
  },
];

export function getLeads(): LeadItem[] {
  if (typeof window === 'undefined') return INITIAL_SEED_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
      return INITIAL_SEED_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_LEADS;
  } catch (err) {
    console.error('Failed to read leads from localStorage:', err);
    return INITIAL_SEED_LEADS;
  }
}

export function saveLead(data: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { id?: string }): LeadItem {
  const currentLeads = getLeads();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newLead: LeadItem = {
    ...data,
    id: data.id || `PIPL-RFP-2026-${randomNum}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const updated = [newLead, ...currentLeads];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save lead:', err);
    }
  }
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem['status']): LeadItem[] {
  const currentLeads = getLeads();
  const updated = currentLeads.map((item) => (item.id === id ? { ...item, status } : item));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  }
  return updated;
}

export function deleteLead(id: string): LeadItem[] {
  const currentLeads = getLeads();
  const updated = currentLeads.filter((item) => item.id !== id);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  }
  return updated;
}

export function exportLeadsToCSV(leads: LeadItem[]): void {
  const headers = [
    'Reference ID',
    'Date Submitted',
    'Full Name',
    'Organization',
    'Phone',
    'Email',
    'Division',
    'Sector',
    'Project Scale',
    'Location',
    'Status',
    'Source',
    'Notes',
  ];

  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.division || '').replace(/"/g, '""')}"`,
    `"${(l.sector || '').replace(/"/g, '""')}"`,
    `"${(l.projectScale || '').replace(/"/g, '""')}"`,
    `"${(l.location || '').replace(/"/g, '""')}"`,
    `"${l.status.toUpperCase()}"`,
    `"${l.source || ''}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `pipl-rfp-leads-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
