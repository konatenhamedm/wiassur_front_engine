// Types pour la production (devis, contrats, etc.)

import type { Money, Status, Address } from './common'

export interface Customer {
  id: string
  uuid: string
  type: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  email: string
  phone?: string
  mobile?: string
  birthDate?: string
  address?: Address
  status: Status
  createdAt: string
  updatedAt: string
}

export interface Quotation {
  id: string
  uuid: string
  number: string
  customerId: string
  customer?: Customer
  branchId: string
  branch?: any
  insurerId: string
  insurer?: any
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  primeNette: number
  primeTTC: number
  validUntil: string
  items: QuotationItem[]
  documents?: Document[]
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export interface QuotationItem {
  id: string
  guaranteeId: string
  guarantee?: any
  amount: number
  premium: number
  description?: string
}

export interface Contract {
  id: string
  uuid: string
  number: string
  quotationId?: string
  quotation?: Quotation
  customerId: string
  customer?: Customer
  branchId: string
  insurerId: string
  status: 'active' | 'suspended' | 'cancelled' | 'expired'
  startDate: string
  endDate: string
  primeNette: number
  primeTTC: number
  paymentFrequency: 'monthly' | 'quarterly' | 'annual'
  items: ContractItem[]
  documents?: Document[]
  createdAt: string
  updatedAt: string
}

export interface ContractItem {
  id: string
  guaranteeId: string
  guarantee?: any
  amount: number
  premium: number
  startDate: string
  endDate?: string
}

export interface Avenant {
  id: string
  uuid: string
  number: string
  contractId: string
  contract?: Contract
  type: 'modification' | 'suspension' | 'cancellation' | 'renewal'
  reason: string
  effectiveDate: string
  status: 'draft' | 'pending' | 'approved' | 'rejected'
  changes: AvenantChange[]
  documents?: Document[]
  createdAt: string
  updatedAt: string
}

export interface AvenantChange {
  field: string
  oldValue: any
  newValue: any
  description?: string
}

export interface Invoice {
  id: string
  uuid: string
  number: string
  contractId: string
  contract?: Contract
  customerId: string
  customer?: Customer
  type: 'premium' | 'commission' | 'refund'
  status: 'draft' | 'sent' | 'paid' | 'cancelled' | 'overdue'
  amount: number
  taxAmount: number
  totalAmount: number
  dueDate: string
  paidDate?: string
  items: InvoiceItem[]
  payments?: Payment[]
  createdAt: string
  updatedAt: string
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  amount: number
}

export interface Payment {
  id: string
  uuid: string
  invoiceId?: string
  invoice?: Invoice
  customerId: string
  customer?: Customer
  method: 'cash' | 'card' | 'transfer' | 'check' | 'mobile'
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  reference?: string
  transactionId?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  uuid: string
  name: string
  type: string
  url: string
  size?: number
  mimeType?: string
  uploadedBy?: string
  uploadedAt: string
}
