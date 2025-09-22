# Opportunity Zone Tax Savings Calculator

A comprehensive Next.js application that helps investors calculate their potential tax savings by investing in the Hazen Road Opportunity Zone Fund. The calculator provides a step-by-step analysis of current tax liability versus OZ investment benefits.

## Features

### 🧮 5-Step Calculator Flow
1. **Investor Profile Setup** - Collect capital gains, filing status, and income information
2. **Current Tax Liability** - Calculate federal, state, and NIIT taxes on capital gains
3. **OZ Projection** - Show potential returns with Hazen Road project data
4. **Side-by-Side Comparison** - Compare regular investment vs OZ investment
5. **Lead Capture** - Collect contact information and send investment package

### 🏢 Hazen Road Project Integration
- Real project data with 178-unit development in Buckeye, Arizona
- Three rent scenarios: Conservative, Moderate, and Optimistic
- Institutional-quality projections with 15-18% IRR range
- Phase 2 pipeline information (219 additional units)
- **100% Bonus Depreciation eligible** qualified improvement property
- Year 1 cash flow projections with tax-free distributions

### 💰 Tax Calculations
- 2025 Federal Capital Gains Tax brackets (0%, 15%, 20%)
- 2025 Federal Ordinary Income Tax brackets (10% - 37%)
- Net Investment Income Tax (NIIT) for high earners
- State capital gains tax for all 50 states
- 180-day deadline tracking for OZ investments
- **100% Bonus Depreciation** calculations for qualified improvement property

### 🎯 Lead Management
- **GoHighLevel Integration** - Automatic lead capture and scoring
- Lead scoring based on investment amount, tax savings, and interest level
- Custom fields for OZ-specific data
- Email notifications and CRM integration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Forms**: React Hook Form with validation
- **State Management**: Custom React hooks
- **API**: GoHighLevel CRM integration
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oz-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your GoHighLevel credentials:
   ```env
   GHL_API_KEY=your_ghl_api_key
   GHL_LOCATION_ID=your_location_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/submit-lead/   # Lead capture API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── calculator/        # Calculator step components
│   ├── ui/               # Reusable UI components
│   └── Calculator.tsx    # Main calculator component
├── hooks/                # Custom React hooks
│   ├── useCalculator.ts  # Calculator state management
│   └── useLocalStorage.ts
├── lib/                  # Utility libraries
│   ├── calculations/     # Tax and OZ calculations
│   ├── data/            # Static data (tax rates, project info)
│   └── utils/           # Helper functions
└── types/               # TypeScript type definitions
    └── calculator.ts
```

## Key Components

### Calculator Steps

1. **Step1-Profile.tsx** - Investor information collection
2. **Step2-TaxLiability.tsx** - Current tax burden display
3. **Step3-HazenProjection.tsx** - OZ investment configuration with bonus depreciation
4. **Step4-Comparison.tsx** - Side-by-side analysis with triple-stacked benefits
5. **Step5-LeadCapture.tsx** - Contact form and lead capture

### 🎯 Triple-Stacked Tax Benefits

The calculator now showcases three powerful tax advantages:

1. **100% Bonus Depreciation**
   - Immediate deduction against other income
   - Pro-rata share based on investment amount
   - Year 1 cash flow effectively tax-free

2. **Opportunity Zone Deferral**
   - Defer capital gains tax until 2026
   - Full investment amount available for growth

3. **10-Year Tax-Free Appreciation**
   - Zero taxes on appreciation after 10 years
   - Maximum wealth building potential

### UI Components

- **Button** - Customizable button with variants
- **Input** - Form input with validation
- **Select** - Dropdown selection
- **Slider** - Range input for investment amounts
- **Card** - Content containers
- **RadioGroup** - Radio button groups

### Calculation Engine

- **taxCalculations.ts** - Federal, state, and NIIT calculations
- **ozBenefits.ts** - Opportunity Zone benefit calculations
- **hazenData.ts** - Real project data and scenarios

## GoHighLevel Integration

The calculator automatically captures leads in GoHighLevel with:

- **Contact Information**: Name, email, phone
- **Investment Details**: Amount, scenario, hold period
- **Tax Calculations**: Projected savings and benefits
- **Lead Scoring**: Automatic scoring based on investment potential
- **Custom Fields**: OZ-specific data for follow-up

### Lead Scoring Algorithm

- Base score: 50 points
- Has qualifying gains: +30 points
- Interested in Hazen Road: +20 points
- High investment amount ($1M+): +25 points
- High tax savings ($200K+): +20 points

## Customization

### Adding New States
Update `src/lib/data/stateTaxRates.ts` with new state tax rates.

### Modifying Tax Brackets
Update `src/lib/data/taxBrackets.ts` for new tax year brackets.

### Updating Project Data
Modify `src/lib/data/hazenData.ts` with new project information.

### Styling Changes
Customize `src/app/globals.css` and `tailwind.config.js` for brand colors and styling.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## API Endpoints

### POST /api/submit-lead

Captures lead information and sends to GoHighLevel.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "hasQualifyingGains": true,
  "interestedInHazen": true,
  "saleDate": "2024-01",
  "calculationData": {
    "projectedValue": 1500000,
    "totalTaxSavings": 250000,
    "investmentAmount": 500000
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "ghlContactId": "contact_id"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions about the calculator, please contact the development team.

---

**Built with ❤️ for Hazen Road Opportunity Zone Fund**# OZ Calculator - Updated Mon Sep 22 16:46:06 WITA 2025
# Fixed CSV model calculations - Mon Sep 22 16:51:02 WITA 2025
