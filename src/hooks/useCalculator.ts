import { useState, useCallback } from 'react';
import { InvestorProfile, TaxCalculation, OZProjection, LeadData, ComparisonData } from '../types/calculator';
import { calculateCurrentTaxLiability } from '../lib/calculations/taxCalculations';
import { calculateOZProjection, calculateComparison } from '../lib/calculations/ozBenefits';

export function useCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState<Partial<InvestorProfile>>({});
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculation | null>(null);
  const [ozProjection, setOZProjection] = useState<OZProjection | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  
  const updateProfile = useCallback((data: Partial<InvestorProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  }, []);
  
  const calculateTaxes = useCallback(() => {
    if (isProfileComplete(profile)) {
      const result = calculateCurrentTaxLiability(profile as InvestorProfile);
      setTaxCalculation(result);
      return result;
    }
    return null;
  }, [profile]);
  
  const calculateProjection = useCallback((
    investmentAmount: number,
    scenario: 'conservative' | 'moderate' | 'optimistic',
    holdPeriod: number
  ) => {
    if (taxCalculation) {
      const totalTaxRate = taxCalculation.federalRate + taxCalculation.stateRate;
      const result = calculateOZProjection(
        investmentAmount,
        scenario,
        holdPeriod,
        totalTaxRate,
        taxCalculation.ordinaryIncomeRate
      );
      setOZProjection(result);
      
      // Calculate comparison data
      const comparison = calculateComparison(
        result,
        totalTaxRate,
        profile.capitalGainAmount || 0
      );
      setComparisonData(comparison);
      
      return result;
    }
    return null;
  }, [taxCalculation, profile.capitalGainAmount]);
  
  const updateLeadData = useCallback((data: Partial<LeadData>) => {
    setLeadData(prev => ({ ...prev, ...data }));
  }, []);
  
  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);
  
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top when moving to previous step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);
  
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
      // Scroll to top when navigating to any step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  
  const reset = useCallback(() => {
    setCurrentStep(1);
    setProfile({});
    setTaxCalculation(null);
    setOZProjection(null);
    setComparisonData(null);
    setLeadData({});
  }, []);
  
  return {
    // State
    currentStep,
    profile,
    taxCalculation,
    ozProjection,
    comparisonData,
    leadData,
    
    // Actions
    updateProfile,
    calculateTaxes,
    calculateProjection,
    updateLeadData,
    nextStep,
    prevStep,
    goToStep,
    reset,
    
    // Computed
    isProfileComplete: isProfileComplete(profile),
    canProceedToStep2: isProfileComplete(profile),
    canProceedToStep3: taxCalculation !== null,
    canProceedToStep4: ozProjection !== null,
    canProceedToStep5: comparisonData !== null
  };
}

function isProfileComplete(profile: Partial<InvestorProfile>): profile is InvestorProfile {
  return !!(
    profile.capitalGainAmount &&
    
    profile.saleDate &&
    profile.state &&
    profile.filingStatus &&
    profile.annualIncome
  );
}
