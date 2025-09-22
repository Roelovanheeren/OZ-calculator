'use client';

import React from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { InvestorProfile } from '../types/calculator';
import { Step1Profile } from './calculator/Step1-Profile';
import { Step2TaxLiability } from './calculator/Step2-TaxLiability';
import { Step3HazenProjection } from './calculator/Step3-HazenProjection';
import { Step4Comparison } from './calculator/Step4-Comparison';
import { Step5LeadCapture } from './calculator/Step5-LeadCapture';
import { ProgressBar } from './calculator/ProgressBar';

export function Calculator() {
  const {
    currentStep,
    profile,
    taxCalculation,
    ozProjection,
    updateProfile,
    calculateTaxes,
    calculateProjection,
    nextStep,
    prevStep
  } = useCalculator();
  
  const handleStep1Complete = (data: Partial<InvestorProfile>) => {
    updateProfile(data);
    const taxResult = calculateTaxes();
    if (taxResult) {
      nextStep();
    }
  };
  
  const handleStep3Complete = (projectionData: { investmentAmount: number; scenario: string; holdPeriod: number }) => {
    calculateProjection(
      projectionData.investmentAmount,
      projectionData.scenario as 'conservative' | 'moderate' | 'optimistic',
      projectionData.holdPeriod
    );
    nextStep();
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Profile 
            onComplete={handleStep1Complete}
            initialData={profile}
          />
        );
      
      case 2:
        return taxCalculation ? (
          <Step2TaxLiability 
            taxCalculation={taxCalculation}
            onNext={nextStep}
            onBack={prevStep}
          />
        ) : null;
      
      case 3:
        return (
          <Step3HazenProjection 
            profile={profile}
            taxCalculation={taxCalculation}
            onComplete={handleStep3Complete}
            onBack={prevStep}
          />
        );
      
      case 4:
        return ozProjection ? (
          <Step4Comparison 
            ozProjection={ozProjection}
            taxCalculation={taxCalculation}
            onNext={nextStep}
            onBack={prevStep}
          />
        ) : null;
      
      case 5:
        return (
          <Step5LeadCapture 
            ozProjection={ozProjection}
            onBack={prevStep}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '32px 16px'
    }}>
      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        backgroundImage: 'url("/background image.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '16px',
        padding: '32px'
      }}>
        {/* Fifth Avenue Properties Logo - Centered at Top */}
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '24px',
              fontWeight: '600',
              color: '#000000',
              lineHeight: '1.2',
              letterSpacing: '1px'
            }}>
              FIFTH AVENUE PROPERTIES
            </div>
          </div>
        </div>
        
        <ProgressBar currentStep={currentStep} totalSteps={5} />
        {renderCurrentStep()}
      </div>
    </div>
  );
}
