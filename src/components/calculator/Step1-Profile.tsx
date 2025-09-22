'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { InvestorProfile } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { STATE_OPTIONS } from '../../lib/data/stateTaxRates';
import { INCOME_RANGES } from '../../lib/data/taxBrackets';
import { validationRules } from '../../lib/utils/validators';

interface Props {
  onComplete: (data: Partial<InvestorProfile>) => void;
  initialData?: Partial<InvestorProfile>;
}

export function Step1Profile({ onComplete, initialData }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData
  });
  
  const onSubmit = (data: Partial<InvestorProfile>) => {
    onComplete(data);
  };
  
  
  const filingStatusOptions = [
    { value: 'single', label: 'Single', description: 'Unmarried or legally separated' },
    { value: 'marriedJoint', label: 'Married Filing Jointly', description: 'Married filing a joint return' },
    { value: 'marriedSeparate', label: 'Married Filing Separately', description: 'Married filing separate returns' }
  ];
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ 
            fontFamily: 'Playfair Display, Georgia, serif', 
            color: '#000000' 
          }}>
            Calculate Your Opportunity Zone Tax Savings
          </CardTitle>
          <CardContent className="text-center" style={{ 
            color: '#2c3e50',
            fontFamily: 'Inter, Helvetica Neue, sans-serif'
          }}>
            See your potential tax savings in 2 minutes
          </CardContent>
          
          {/* Value Proposition */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" style={{
            backgroundColor: '#f0f8ff',
            borderColor: '#bfdbfe'
          }}>
            <p className="text-xs text-blue-800 text-center mb-3" style={{ 
              fontFamily: 'Inter, Helvetica Neue, sans-serif'
            }}>
              Enter your recent capital gains to discover how much you could save by reinvesting those profits into the Hazen Road Opportunity Zone Fund
            </p>
            
            {/* What they'll discover */}
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-700" style={{ 
              fontFamily: 'Inter, Helvetica Neue, sans-serif'
            }}>
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Your current tax liability
              </div>
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Potential OZ tax savings
              </div>
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Side-by-side comparison
              </div>
              <div className="flex items-center">
                <svg className="w-3 h-3 mr-1 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Projected returns over 10 years
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Investment Profit Calculator
            </label>
            <p className="text-xs text-gray-600 mb-2" style={{ 
              fontFamily: 'Inter, Helvetica Neue, sans-serif'
            }}>
              How much profit did you make from recent sales? (stocks, property, business assets, etc.)
            </p>
            <input
              type="number"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              placeholder="e.g., 500000"
              {...register('capitalGainAmount', validationRules.capitalGainAmount)}
            />
            <p className="text-xs text-gray-500 mt-1" style={{ 
              fontFamily: 'Inter, Helvetica Neue, sans-serif'
            }}>
              Enter any amount - we'll show the tax benefits for your situation
            </p>
            {errors.capitalGainAmount && (
              <p className="text-sm text-red-600">{errors.capitalGainAmount.message}</p>
            )}
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium form-label">
              <p className="text-sm text-red-600">{errors.gainType.message}</p>
            )}
          </div>
          
          <Input
            label="Date of Sale"
            type="date"
            placeholder="Select date"
            {...register('saleDate', validationRules.saleDate)}
            error={errors.saleDate?.message}
          />
          
          <Select
            label="State of Residence"
            placeholder="Select your state"
            options={STATE_OPTIONS}
            {...register('state', validationRules.state)}
            error={errors.state?.message}
          />
          
          <div className="space-y-3">
            <label className="block text-sm font-medium form-label">
              Filing Status
            </label>
            <div className="space-y-2">
              {filingStatusOptions.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors radio-container" style={{
                  borderColor: '#e9ecef',
                  backgroundColor: '#ffffff'
                }}>
                  <input
                    type="radio"
                    value={option.value}
                    {...register('filingStatus', validationRules.filingStatus)}
                    className="mt-1 h-4 w-4"
                    style={{
                      accentColor: '#2c3e50'
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: '#000000' }}>
                      {option.label}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#6c757d' }}>
                      {option.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors.filingStatus && (
              <p className="text-sm text-red-600">{errors.filingStatus.message}</p>
            )}
          </div>
          
          <Select
            label="Estimated Annual Income"
            placeholder="Select income range"
            options={INCOME_RANGES}
            {...register('annualIncome', validationRules.annualIncome)}
            error={errors.annualIncome?.message}
          />
          
          <div className="pt-4">
            <Button type="submit" className="w-full" style={{ 
              fontSize: '1.125rem',
              padding: '16px 24px',
              backgroundColor: '#2c3e50',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Calculate My Tax Liability
            </Button>
            
            {/* Trust signals */}
            <div className="text-center mt-4 space-y-1">
              <p className="text-xs text-gray-500" style={{ 
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>
                This calculation is private and secure
              </p>
              <p className="text-xs text-gray-500" style={{ 
                fontFamily: 'Inter, Helvetica Neue, sans-serif'
              }}>
                Takes 2 minutes to complete
              </p>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
