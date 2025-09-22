export const validationRules = {
  capitalGainAmount: {
    required: 'Capital gain amount is required',
    min: { value: 1000, message: 'Minimum $1,000 required' },
    max: { value: 100000000, message: 'Maximum $100M allowed' }
  },
  gainType: {
    required: 'Gain type is required'
  },
  saleDate: {
    required: 'Sale date is required',
    validate: (value: string | undefined) => {
      if (!value) return 'Sale date is required';
      const date = new Date(value);
      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      
      if (date > now) {
        return 'Sale date cannot be in the future';
      }
      if (date < oneYearAgo) {
        return 'Sale date cannot be more than 1 year ago';
      }
      return true;
    }
  },
  state: {
    required: 'State is required'
  },
  filingStatus: {
    required: 'Filing status is required'
  },
  annualIncome: {
    required: 'Annual income is required',
    min: { value: 0, message: 'Income must be positive' }
  },
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name must be at least 2 characters' }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Invalid phone number'
    }
  }
};

export function validateEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function validateCapitalGainAmount(amount: number): boolean {
  return amount >= 1000 && amount <= 100000000;
}
