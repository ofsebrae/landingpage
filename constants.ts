
import { ProductType, PricingData } from './types';

export const PRICING_CONFIG: PricingData = {
  products: {
    [ProductType.CONSTRUIDO_9M2]: {
      label: "Stand Construído — 9 m²",
      associated: 11290.00,
      nonAssociated: 13290.00,
      unitLabel: "Total"
    },
    [ProductType.CONSTRUIDO_12M2]: {
      label: "Stand Construído — 12 m²",
      associated: 13860.00,
      nonAssociated: 16310.00,
      unitLabel: "Total"
    },
    [ProductType.APENAS_PISO]: {
      label: "Apenas Piso — m²",
      associated: 675.00,
      nonAssociated: 750.00,
      unitLabel: "Preço por m²"
    }
  },
  observation: "No valor está incluso 1 KVA de energia + Taxa de limpeza."
};

export const COLORS = {
  floor: '#1d4ed8', // Blue
  backWall: '#0891b2', // Cyan/Blue
  sideWall: '#bef264', // Lime
  pilar: '#ffffff',
  counter: '#ffffff',
  furniture: '#ffffff'
};
