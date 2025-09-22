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
}

export function Step1Profile({ onComplete }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<InvestorProfile>>();

  const onSubmit = (data: Partial<InvestorProfile>) => {
    onComplete(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ 
            color: 'var(--primary-navy)',
            fontFamily: 'var(--font-primary)'
          }}>
            Calculate Your Opportunity Zone Tax Savings
          </CardTitle>
          <CardContent className="text-center" style={{ 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-secondary)'
          }}>
            See your potential tax savings in 2 minutes
          </CardContent>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Profit Calculator</CardTitle>
        </CardHeader>
        <CardContent>
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
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-50"
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
            
            <Select
              label="Filing Status"
              placeholder="Select filing status"
              options={[
                { value: 'single', label: 'Single' },
                { value: 'marriedJoint', label: 'Married Filing Jointly' },
                { value: 'marriedSeparate', label: 'Married Filing Separately' }
              ]}
              {...register('filingStatus', validationRules.filingStatus)}
              error={errors.filingStatus?.message}
            />
            
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
