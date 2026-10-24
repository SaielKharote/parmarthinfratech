/**
 * Types for PIPL high-tech engineering platform
 */

export type ThemeMode = 'dark' | 'light';

export type BackgroundStyle = 'grid' | 'particles' | 'waves';

export interface ProjectItem {
  id: string;
  name: string;
  category: 'civil' | 'electrical' | 'solar' | 'ami' | 'water';
  client: string;
  costMillionINR: number;
  location: string;
  description: string;
  specs: string[];
}

export interface ServiceDivision {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  capabilities: string[];
  icon: string;
  modelId: 'solar' | 'meter' | 'transformer' | 'ev';
}

export interface HotspotInfo {
  id: string;
  title: string;
  category: string;
  description: string;
  techSpecs: { label: string; value: string }[];
  position: [number, number, number];
}

export interface CalculationInput {
  sector: 'industrial' | 'commercial' | 'chs' | 'utility';
  schemeType: 'open-access' | 'vnm' | 'rooftop-epc' | 'ground-mounted';
  monthlyBillINR: number;
  connectedLoadKW: number;
}

export interface CalculationResult {
  recommendedCapacityKW: number;
  annualGenerationKWh: number;
  estimatedAnnualSavingsINR: number;
  monthlySavingsINR: number;
  co2ReductionTonsPerYear: number;
  paybackYears: number;
  roiPercentage: number;
}
