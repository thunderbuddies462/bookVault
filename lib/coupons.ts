export interface Coupon {
  discount: number
  description: string
}

export const COUPONS: Record<string, Coupon> = {
  VAULT10:    { discount: 10, description: '10% off your order' },
  VAULT20:    { discount: 20, description: '20% off your order' },
  NEWREADER:  { discount: 15, description: '15% off for new readers' },
  ANNUAL30:   { discount: 30, description: '30% off for annual subscribers' },
}
