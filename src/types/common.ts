// Types communs utilisés dans toute l'application

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: ApiError[]
  meta?: PaginationMeta
}

export interface ApiError {
  field?: string
  message: string
  code?: string
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  from?: number
  to?: number
}

export interface PaginationParams {
  page?: number
  perPage?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
  icon?: string
}

export interface FileUpload {
  file: File
  progress?: number
  url?: string
  error?: string
}

export interface Address {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
  complement?: string
}

export interface DateRange {
  start: Date | string
  end: Date | string
}

export interface Money {
  amount: number
  currency: string
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export type SortOrder = 'asc' | 'desc'
