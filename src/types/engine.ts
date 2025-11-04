// Types pour le moteur de calcul d'assurance

import Engine from "@/entity/Engine";

export interface EngineMethod {
  id: string;
  uuid: string;
  name: string;
  code: string;
  description?: string;
  active: boolean;
  version?: string;
  parameters?: MethodParameter[];
  createdAt?: string;
  updatedAt?: string;
  engine?: Engine;
}

export interface MethodParameter {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface Branch {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
  icon?: string;
  active: boolean;
  order?: number;
  parentId?: string;
  children?: Branch[];
}

export interface Category {
  id: string;
  uuid: string;
  label: string;
  slug: string;
  color: string;
  branches?: Branch[];
}

export interface Insurer {
  id: string;
  uuid: string;
  name: string;
  code: string;
  logo?: string;
  active: boolean;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

export interface Guarantee {
  id: string;
  uuid: string;
  code: string;
  name: string;
  description?: string;
  amount?: number;
  type?: "mandatory" | "optional";
  category?: string;
}

export interface Pack {
  id: string;
  uuid: string;
  code: string;
  name: string;
  description?: string;
  guarantees: Guarantee[];
  branchId: string;
  insurerId: string;
}

export interface Tax {
  name: string;
  code?: string;
  rate: number;
  amount: number;
  base: number;
  type?: "percentage" | "fixed";
}

export interface Taxes {
  total: number;
  details: Tax[];
}

export interface Surprime {
  uuid: string;
  code?: string;
  label: string;
  amount: number;
  rate?: number;
  reason?: string;
}

export interface Reduction {
  uuid: string;
  code?: string;
  label: string;
  amount: number;
  rate?: number;
  type?: "commercial" | "loyalty" | "volume";
}

export interface CalculationInput {
  methodId: string;
  branchId: string;
  insurerId: string;
  guarantees?: string[];
  packId?: string;
  parameters: Record<string, any>;
}

export interface CalculationResult {
  uuid: string;
  success: boolean;
  primeNette: number;
  primeTTC: number;
  taxes: Taxes;
  surprimes: Surprime[];
  reductions: Reduction[];
  guarantees: Guarantee[];
  metadata: CalculationMetadata;
  error?: string;
  warnings?: string[];
}

export interface CalculationMetadata {
  calculatedAt: string;
  methodUsed: string;
  methodVersion?: string;
  branchCode: string;
  insurerCode: string;
  engineVersion: string;
  processingTime: number;
  requestId?: string;
}
