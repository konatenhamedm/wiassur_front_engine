// Types pour le CRM

import type { Address, Status } from './common'

export interface Contact {
  id: string
  uuid: string
  type: 'individual' | 'company'
  firstName?: string
  lastName?: string
  companyName?: string
  position?: string
  email: string
  phone?: string
  mobile?: string
  website?: string
  address?: Address
  companyId?: string
  company?: Company
  source?: string
  status: Status
  tags?: string[]
  notes?: Note[]
  activities?: Activity[]
  deals?: Deal[]
  createdAt: string
  updatedAt: string
  ownerId?: string
}

export interface Company {
  id: string
  uuid: string
  name: string
  legalName?: string
  taxId?: string
  industry?: string
  size?: 'small' | 'medium' | 'large' | 'enterprise'
  website?: string
  email?: string
  phone?: string
  address?: Address
  contacts?: Contact[]
  deals?: Deal[]
  status: Status
  tags?: string[]
  notes?: Note[]
  createdAt: string
  updatedAt: string
  ownerId?: string
}

export interface Deal {
  id: string
  uuid: string
  title: string
  description?: string
  contactId?: string
  contact?: Contact
  companyId?: string
  company?: Company
  value: number
  currency: string
  stage: DealStage
  probability?: number
  expectedCloseDate?: string
  actualCloseDate?: string
  status: 'open' | 'won' | 'lost' | 'abandoned'
  lostReason?: string
  products?: DealProduct[]
  activities?: Activity[]
  notes?: Note[]
  tags?: string[]
  createdAt: string
  updatedAt: string
  ownerId?: string
}

export interface DealStage {
  id: string
  name: string
  order: number
  probability?: number
}

export interface DealProduct {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Activity {
  id: string
  uuid: string
  type: 'call' | 'email' | 'meeting' | 'task' | 'note'
  subject: string
  description?: string
  contactId?: string
  companyId?: string
  dealId?: string
  status: 'planned' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  completedAt?: string
  duration?: number
  location?: string
  attendees?: string[]
  createdAt: string
  updatedAt: string
  ownerId?: string
}

export interface Note {
  id: string
  uuid: string
  content: string
  entityType: 'contact' | 'company' | 'deal'
  entityId: string
  isPinned?: boolean
  createdAt: string
  updatedAt: string
  createdBy?: string
}

export interface Campaign {
  id: string
  uuid: string
  name: string
  description?: string
  type: 'email' | 'sms' | 'social' | 'event'
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed'
  startDate?: string
  endDate?: string
  budget?: number
  targetAudience?: CampaignAudience
  metrics?: CampaignMetrics
  createdAt: string
  updatedAt: string
  ownerId?: string
}

export interface CampaignAudience {
  totalContacts: number
  filters?: Record<string, any>
  segments?: string[]
}

export interface CampaignMetrics {
  sent?: number
  delivered?: number
  opened?: number
  clicked?: number
  converted?: number
  bounced?: number
  unsubscribed?: number
}
