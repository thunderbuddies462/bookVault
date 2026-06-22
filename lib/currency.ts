export const CURRENCIES = {
  US: { code: 'USD', symbol: '$',    name: 'United States',    rate: 1      },
  IN: { code: 'INR', symbol: '₹',    name: 'India',            rate: 83.5   },
  GB: { code: 'GBP', symbol: '£',    name: 'United Kingdom',   rate: 0.79   },
  EU: { code: 'EUR', symbol: '€',    name: 'European Union',   rate: 0.92   },
  AU: { code: 'AUD', symbol: 'A$',   name: 'Australia',        rate: 1.53   },
  CA: { code: 'CAD', symbol: 'C$',   name: 'Canada',           rate: 1.36   },
  SG: { code: 'SGD', symbol: 'S$',   name: 'Singapore',        rate: 1.34   },
  JP: { code: 'JPY', symbol: '¥',    name: 'Japan',            rate: 150.2  },
  AE: { code: 'AED', symbol: 'AED',  name: 'UAE',              rate: 3.67   },
  BR: { code: 'BRL', symbol: 'R$',   name: 'Brazil',           rate: 5.1    },
} as const

export type CountryCode = keyof typeof CURRENCIES

export function formatPrice(usdPrice: number, country: CountryCode): string {
  const c = CURRENCIES[country]
  const converted = usdPrice * c.rate
  if (c.code === 'JPY') return `${c.symbol}${Math.round(converted).toLocaleString()}`
  return `${c.symbol}${converted.toFixed(2)}`
}
