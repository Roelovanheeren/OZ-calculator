import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-3e5a23df-ba94-461d-be76-4d5177727590';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || 'VYZcxHGdxD0Dj1cj1ZU4';

interface LeadData {
  name: string;
  email: string;
  phone: string;
  hasQualifyingGains: boolean;
  interestedInHazen: boolean;
  saleDate?: string;
  calculationData?: {
    projectedValue?: number;
    totalTaxSavings?: number;
    investmentAmount?: number;
  };
}

async function createGHLContact(leadData: LeadData) {
  const contactData = {
    firstName: leadData.name.split(' ')[0] || '',
    lastName: leadData.name.split(' ').slice(1).join(' ') || '',
    email: leadData.email,
    phone: leadData.phone,
    locationId: GHL_LOCATION_ID,
    tags: ['OZ Calculator', 'Opportunity Zone', 'Tax Calculator Lead'],
    customFields: [
      {
        key: 'has_qualifying_gains',
        value: leadData.hasQualifyingGains ? 'Yes' : 'No'
      },
      {
        key: 'interested_in_hazen',
        value: leadData.interestedInHazen ? 'Yes' : 'No'
      },
      {
        key: 'sale_date',
        value: leadData.saleDate || 'Not provided'
      },
      {
        key: 'projected_value',
        value: leadData.calculationData?.projectedValue?.toString() || '0'
      },
      {
        key: 'total_tax_savings',
        value: leadData.calculationData?.totalTaxSavings?.toString() || '0'
      },
      {
        key: 'investment_amount',
        value: leadData.calculationData?.investmentAmount?.toString() || '0'
      },
      {
        key: 'lead_source',
        value: 'OZ Tax Savings Calculator'
      },
      {
        key: 'lead_score',
        value: calculateLeadScore(leadData).toString()
      }
    ]
  };

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(contactData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GHL API Error:', response.status, errorText);
      throw new Error(`GHL API Error: ${response.status}`);
    }

    const result = await response.json();
    console.log('GHL Contact Created:', result);
    return result;
  } catch (error) {
    console.error('Error creating GHL contact:', error);
    throw error;
  }
}

function calculateLeadScore(leadData: LeadData): number {
  let score = 0;
  
  // Base score for completing calculator
  score += 50;
  
  // Has qualifying gains
  if (leadData.hasQualifyingGains) {
    score += 30;
  }
  
  // Interested in Hazen Road
  if (leadData.interestedInHazen) {
    score += 20;
  }
  
  // High investment amount
  if (leadData.calculationData?.investmentAmount && leadData.calculationData.investmentAmount >= 1000000) {
    score += 25;
  } else if (leadData.calculationData?.investmentAmount && leadData.calculationData.investmentAmount >= 500000) {
    score += 15;
  }
  
  // High tax savings
  if (leadData.calculationData?.totalTaxSavings && leadData.calculationData.totalTaxSavings >= 200000) {
    score += 20;
  } else if (leadData.calculationData?.totalTaxSavings && leadData.calculationData.totalTaxSavings >= 100000) {
    score += 10;
  }
  
  return Math.min(score, 100); // Cap at 100
}

export async function POST(request: NextRequest) {
  try {
    const leadData: LeadData = await request.json();
    
    // Validate required fields
    if (!leadData.name || !leadData.email || !leadData.phone) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create contact in GHL
    const ghlResult = await createGHLContact(leadData);
    
    // Log the lead for backup
    console.log('New OZ Calculator Lead:', {
      ...leadData,
      timestamp: new Date().toISOString(),
      ghlContactId: ghlResult.contact?.id
    });

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      ghlContactId: ghlResult.contact?.id
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    
    // Even if GHL fails, we should still log the lead
    try {
      const leadData: LeadData = await request.json();
      console.log('Lead captured (GHL failed):', {
        ...leadData,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (logError) {
      console.error('Failed to log lead:', logError);
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to capture lead. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
}
