'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OZProjection } from '../../types/calculator';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatCurrency } from '../../lib/utils/formatters';
import { validationRules } from '../../lib/utils/validators';

interface Props {
  ozProjection: OZProjection | null;
  onBack: () => void;
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  hasQualifyingGains: boolean;
  interestedInHazen: boolean;
  saleDate?: string;
}

export function Step5LeadCapture({ ozProjection, onBack }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    defaultValues: {
      hasQualifyingGains: false,
      interestedInHazen: false
    }
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit to API
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          calculationData: {
            projectedValue: ozProjection?.projectedValue,
            totalTaxSavings: ozProjection?.totalTaxSavings,
            investmentAmount: ozProjection?.investmentAmount
          }
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: 'var(--background-light)' }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--primary-navy)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-2xl" style={{ 
              color: 'var(--primary-navy)',
              fontFamily: 'var(--font-primary)'
            }}>
              Your Investment Package is On Its Way!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div style={{ color: 'var(--text-secondary)' }}>
              <p className="mb-2" style={{ fontFamily: 'var(--font-secondary)' }}>Check your email in the next 5 minutes for:</p>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary-navy)' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Complete Opportunity Zone Investor Guide
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary-navy)' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Hazen Road Executive Summary
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary-navy)' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  OZ Compliance Checklist
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--primary-navy)' }}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free 15-minute consultation details
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Remember, you have until your 180-day deadline to invest your gains in a Qualified Opportunity Fund to capture these tax benefits.
              </p>
            </div>
            
            <Button onClick={() => window.location.reload()} className="btn-primary" style={{ 
              fontSize: '0.875rem',
              padding: 'var(--space-4) var(--space-6)'
            }}>
              Calculate Another Scenario
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center" style={{ 
            fontFamily: 'var(--font-primary)', 
            color: 'var(--primary-navy)' 
          }}>
            Get Your Personalized Hazen Road Investment Package
          </CardTitle>
          <CardContent className="text-center py-8">
            <div className="financial-highlight" style={{ padding: '2rem' }}>
              <div className="text-5xl font-bold mb-6" style={{ 
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#2c3e50'
              }}>
                {ozProjection ? formatCurrency(ozProjection.totalStackedBenefits) : '$0'}
              </div>
              <div className="text-xl mb-4" style={{ 
                fontFamily: 'Inter, Helvetica Neue, sans-serif',
                color: '#2c3e50'
              }}>
                Your Total Tax Advantage with Triple-Stacked Benefits
              </div>
              
              {/* Benefits Breakdown */}
              {ozProjection && (
                <div className="space-y-2 text-sm" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  color: '#2c3e50',
                  opacity: 0.9
                }}>
                  <div className="flex justify-center items-center space-x-2">
                    <span>OZ Deferral: {formatCurrency(ozProjection.deferredTax)}</span>
                    <span>+</span>
                    <span>Bonus Depreciation: {formatCurrency(ozProjection.depreciationTaxSavings)}</span>
                    <span>+</span>
                    <span>Tax-Free Gains: {formatCurrency(ozProjection.appreciationTaxSaved)}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    = {formatCurrency(ozProjection.totalStackedBenefits)} Total
                  </div>
                </div>
              )}
              
              {!ozProjection && (
                <div className="text-sm" style={{ 
                  fontFamily: 'Inter, Helvetica Neue, sans-serif',
                  color: '#2c3e50',
                  opacity: 0.9
                }}>
                  OZ Deferral + Bonus Depreciation + 10-Year Tax-Free Gains
                </div>
              )}
            </div>
          </CardContent>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Here's what we&apos;ll send you:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-black mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Complete Opportunity Zone Investor Guide</p>
                <p className="text-sm text-gray-600">CPA-reviewed with real examples</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-black mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Hazen Road Executive Summary</p>
                <p className="text-sm text-gray-600">Full project details & financial projections</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-black mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">OZ Compliance Checklist</p>
                <p className="text-sm text-gray-600">Ensure your gains qualify for the program</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-black mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium text-gray-900">Free 15-minute consultation</p>
                <p className="text-sm text-gray-600">With Hazen Road Investment Director</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              {...register('name', validationRules.name)}
              error={errors.name?.message}
            />
            <Input
              label="Email Address"
              type="email"
              {...register('email', validationRules.email)}
              error={errors.email?.message}
            />
          </div>
          
          <Input
            label="Phone Number"
            type="tel"
            {...register('phone', validationRules.phone)}
            error={errors.phone?.message}
          />
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="hasQualifyingGains"
                {...register('hasQualifyingGains')}
                className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hasQualifyingGains" className="text-sm text-gray-700">
                I have $250K+ in eligible capital gains to invest
              </label>
            </div>
            
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="interestedInHazen"
                {...register('interestedInHazen')}
                className="mt-1 h-4 w-4 text-black border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="interestedInHazen" className="text-sm text-gray-700">
                I&apos;m interested in learning about the Hazen Road OZ Fund
              </label>
            </div>
          </div>
          
          <Input
            label="When did you realize your capital gains? (Optional)"
            type="date"
            {...register('saleDate')}
            error={errors.saleDate?.message}
          />
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Used by 500+ high-net-worth investors • Reviewed by tax attorneys and CPAs • No obligation - educational purposes only</span>
            </div>
          </div>
          
          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={onBack} className="btn-secondary">
              ← Back
            </Button>
            <Button type="submit" className="btn-primary" isLoading={isSubmitting} style={{ 
              fontSize: '0.875rem',
              padding: 'var(--space-4) var(--space-6)'
            }}>
              Receive Investment Package
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
