import React from 'react';
import { cn } from '../../lib/utils/cn';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const steps = [
    { number: 1, title: 'Profile', description: 'Your investment details' },
    { number: 2, title: 'Tax Liability', description: 'Current tax burden' },
    { number: 3, title: 'OZ Projection', description: 'Hazen Road benefits' },
    { number: 4, title: 'Comparison', description: 'Side-by-side analysis' },
    { number: 5, title: 'Lead Capture', description: 'Get your package' }
  ];

  return (
    <div className={cn('w-full max-w-7xl mx-auto mb-8', className)}>
      <div className="flex items-center justify-between overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 transition-colors',
                  currentStep >= step.number
                    ? 'progress-step active'
                    : 'progress-step'
                )}
    style={{
      backgroundColor: currentStep >= step.number ? '#000000' : '#e9ecef',
      borderColor: currentStep >= step.number ? '#000000' : '#adb5bd',
      color: currentStep >= step.number ? '#ffffff' : '#6c757d'
    }}
              >
                {currentStep > step.number ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center">
    <div className="text-xs font-medium" style={{
      color: currentStep >= step.number ? '#000000' : '#6c757d',
      fontFamily: 'Inter, Helvetica Neue, sans-serif'
    }}>
                  {step.title}
                </div>
                <div className="text-xs hidden sm:block" style={{
                  color: '#adb5bd',
                  fontFamily: 'Inter, Helvetica Neue, sans-serif'
                }}>
                  {step.description}
                </div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className="w-8 h-0.5 mx-2 transition-colors"
    style={{
      backgroundColor: currentStep > step.number ? '#000000' : '#e9ecef'
    }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
