import { FEDERAL_CAPITAL_GAINS_2025, FEDERAL_ORDINARY_INCOME_2025, NIIT_THRESHOLD } from '../data/taxBrackets';
import { STATE_TAX_RATES } from '../data/stateTaxRates';
import { InvestorProfile, TaxCalculation } from '../../types/calculator';

export function calculateCurrentTaxLiability(profile: InvestorProfile): TaxCalculation {
  const { capitalGainAmount, filingStatus, annualIncome, state } = profile;
  
  // Federal rate calculation
  const brackets = FEDERAL_CAPITAL_GAINS_2025[filingStatus];
  let federalRate = 0;
  for (const bracket of brackets) {
    if (annualIncome >= bracket.min && annualIncome < bracket.max) {
      federalRate = bracket.rate;
      break;
    }
  }
  
  // NIIT calculation
  const niitThreshold = NIIT_THRESHOLD[filingStatus];
  const niitApplies = annualIncome > niitThreshold;
  const niitRate = niitApplies ? NIIT_THRESHOLD.rate : 0;
  
  // State rate
  const stateRate = STATE_TAX_RATES[state] || 0;
  
  // Tax calculations
  const federalTax = capitalGainAmount * federalRate;
  const niitTax = capitalGainAmount * niitRate;
  const stateTax = capitalGainAmount * stateRate;
  const totalTaxOwed = federalTax + niitTax + stateTax;
  
  // Ordinary income rate calculation for depreciation benefits
  const ordinaryBrackets = FEDERAL_ORDINARY_INCOME_2025[filingStatus];
  let ordinaryIncomeRate = 0;
  for (const bracket of ordinaryBrackets) {
    if (annualIncome >= bracket.min && annualIncome < bracket.max) {
      ordinaryIncomeRate = bracket.rate;
      break;
    }
  }
  
  // Add NIIT if applicable to ordinary income rate
  const niitThresholdForOrdinary = NIIT_THRESHOLD[filingStatus];
  if (annualIncome > niitThresholdForOrdinary) {
    ordinaryIncomeRate += NIIT_THRESHOLD.rate;
  }
  
  // 180-day deadline calculation
  const saleDate = new Date(profile.saleDate);
  const deadlineDate = new Date(saleDate.getTime() + (180 * 24 * 60 * 60 * 1000));
  
  return {
    federalRate: federalRate + niitRate,
    stateRate,
    niitApplies,
    totalTaxOwed,
    deadlineDate: deadlineDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    federalTax,
    niitTax,
    stateTax,
    ordinaryIncomeRate: ordinaryIncomeRate + stateRate // Include state tax
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}
