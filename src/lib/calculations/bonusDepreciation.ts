import { HAZEN_PROJECT_DATA } from '../data/hazenData';

export function calculateBonusDepreciation(
  investmentAmount: number,
  totalProjectCost: number,
  ordinaryIncomeRate: number
) {
  // Calculate investor's pro-rata share of depreciation
  const investorShare = investmentAmount / totalProjectCost;
  const totalQualifyingAssets = HAZEN_PROJECT_DATA.bonusDepreciation.qualifyingAssets;
  const investorDepreciation = totalQualifyingAssets * investorShare;
  
  // Calculate tax savings from depreciation
  const depreciationTaxSavings = investorDepreciation * ordinaryIncomeRate;
  
  return {
    bonusDepreciationDeduction: investorDepreciation,
    depreciationTaxSavings,
    eligibleCategories: HAZEN_PROJECT_DATA.bonusDepreciation.eligibleCategories
  };
}

export function calculateYear1CashFlowBenefit(
  investmentAmount: number,
  scenario: 'conservative' | 'moderate' | 'optimistic',
  depreciationDeduction: number
) {
  const scenarioData = HAZEN_PROJECT_DATA.scenarios[scenario];
  const year1NOI = scenarioData.year1NOI; // Use actual NOI share
  const year1CashFlow = investmentAmount * scenarioData.year1CashFlow;
  
  // If depreciation deduction >= NOI, it's effectively tax-free
  const effectivelyTaxFree = depreciationDeduction >= year1NOI;
  const excessDepreciation = Math.max(0, depreciationDeduction - year1NOI);
  
  return {
    year1CashFlow,
    year1NOI,
    effectivelyTaxFree,
    shelteredAmount: Math.min(depreciationDeduction, year1NOI),
    excessDepreciation
  };
}
