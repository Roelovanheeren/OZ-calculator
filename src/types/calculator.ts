export interface InvestorProfile {
  capitalGainAmount: number;
  gainType: 'stock' | 'realEstate' | 'business' | 'other';
  saleDate: string;
  state: string;
  filingStatus: 'single' | 'marriedJoint' | 'marriedSeparate';
  annualIncome: number;
}

export interface TaxCalculation {
  federalRate: number;
  stateRate: number;
  niitApplies: boolean;
  totalTaxOwed: number;
  deadlineDate: string;
  federalTax: number;
  niitTax: number;
  stateTax: number;
  ordinaryIncomeRate: number;
}

export interface OZProjection {
  investmentAmount: number;
  scenario: 'conservative' | 'moderate' | 'optimistic';
  holdPeriod: number;
  projectedValue: number;
  taxFreeGains: number;
  totalTaxSavings: number;
  deferredTax: number;
  appreciationTaxSaved: number;
  bonusDepreciationDeduction: number;
  depreciationTaxSavings: number;
  totalStackedBenefits: number;
  year1CashFlowTaxFree: boolean;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  hasQualifyingGains: boolean;
  interestedInHazen: boolean;
  saleDate?: string;
}

export interface ComparisonData {
  withoutOZ: {
    initialInvestment: number;
    taxesPaidNow: number;
    tenYearValue: number;
    taxesOnAppreciation: number;
    netWealth: number;
  };
  withOZ: {
    initialInvestment: number;
    taxesPaidNow: number;
    tenYearValue: number;
    taxesOnAppreciation: number;
    netWealth: number;
  };
  netWealthDifference: number;
}
