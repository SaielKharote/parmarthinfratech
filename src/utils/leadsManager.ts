import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

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

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
}

// Seed sample leads for immediate demonstration if collection is empty
const INITIAL_SEED_LEADS: LeadItem[] = [
  {
    id: 'PIPL-RFP-2026-1082',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
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
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
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
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
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

// In-memory leads cache initialized from localStorage if available
let cachedLeads: LeadItem[] = [];

function loadLocalStorageLeads(): LeadItem[] {
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

cachedLeads = loadLocalStorageLeads();

function saveLocalStorageLeads(leads: LeadItem[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (err) {
      console.error('Failed to write leads to localStorage:', err);
    }
  }
}

/**
 * Subscribe to real-time Firestore database updates for all enquiry leads.
 * Automatically synchronizes changes across all devices and server restarts.
 */
export function subscribeToLeads(onUpdate: (leads: LeadItem[]) => void): () => void {
  const leadsPath = 'leads';
  try {
    const leadsCollectionRef = collection(db, leadsPath);
    
    const unsubscribe = onSnapshot(
      leadsCollectionRef,
      (snapshot) => {
        if (snapshot.empty) {
          // Seed database once if completely empty
          seedInitialLeadsToFirestore();
          onUpdate(cachedLeads);
          return;
        }

        const items: LeadItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as LeadItem;
          if (data && data.id) {
            items.push(data);
          }
        });

        // Sort leads newest first
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        cachedLeads = items;
        saveLocalStorageLeads(items);
        onUpdate(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, leadsPath);
        onUpdate(cachedLeads);
      }
    );

    return unsubscribe;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, leadsPath);
    onUpdate(cachedLeads);
    return () => {};
  }
}

async function seedInitialLeadsToFirestore() {
  for (const lead of INITIAL_SEED_LEADS) {
    try {
      const docRef = doc(db, 'leads', lead.id);
      await setDoc(docRef, lead);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `leads/${lead.id}`);
    }
  }
}

export function getLeads(): LeadItem[] {
  return cachedLeads;
}

export function saveLead(data: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { id?: string }): LeadItem {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newLead: LeadItem = {
    ...data,
    id: data.id || `PIPL-RFP-2026-${randomNum}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // Update local memory & storage instantly
  cachedLeads = [newLead, ...cachedLeads.filter((l) => l.id !== newLead.id)];
  saveLocalStorageLeads(cachedLeads);

  // Persist directly to Firestore database for cross-device permanent availability
  const docPath = `leads/${newLead.id}`;
  setDoc(doc(db, 'leads', newLead.id), newLead).catch((err) => {
    handleFirestoreError(err, OperationType.WRITE, docPath);
  });

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem['status']): LeadItem[] {
  cachedLeads = cachedLeads.map((item) => (item.id === id ? { ...item, status } : item));
  saveLocalStorageLeads(cachedLeads);

  // Sync update to Firestore
  const docPath = `leads/${id}`;
  updateDoc(doc(db, 'leads', id), { status }).catch((err) => {
    handleFirestoreError(err, OperationType.UPDATE, docPath);
  });

  return cachedLeads;
}

export function deleteLead(id: string): LeadItem[] {
  cachedLeads = cachedLeads.filter((item) => item.id !== id);
  saveLocalStorageLeads(cachedLeads);

  // Sync deletion to Firestore
  const docPath = `leads/${id}`;
  deleteDoc(doc(db, 'leads', id)).catch((err) => {
    handleFirestoreError(err, OperationType.DELETE, docPath);
  });

  return cachedLeads;
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
