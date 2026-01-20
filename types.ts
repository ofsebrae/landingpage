
export enum Category {
  ASSOCIADA = 'ASSOCIADA',
  NAO_ASSOCIADA = 'NAO_ASSOCIADA'
}

export enum ProductType {
  CONSTRUIDO_9M2 = 'CONSTRUIDO_9M2',
  CONSTRUIDO_12M2 = 'CONSTRUIDO_12M2',
  APENAS_PISO = 'APENAS_PISO'
}

export interface PricingData {
  products: {
    [key in ProductType]: {
      label: string;
      associated: number;
      nonAssociated: number;
      unitLabel: string;
    }
  };
  observation: string;
}

export interface Lead {
  id?: string;
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  categoria: Category;
  produto: ProductType;
  areaM2: number;
  precoCalculado: number;
  consentimentoLGPD: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
