// API CRM
import type { Contact, Company, Deal, Activity, Campaign } from '@/types/crm'
import type { PaginationParams, ApiResponse } from '@/types/common'
import { crmClient } from './client'

export const crmApi = {
  // ===== Contacts =====
  async getContacts(params?: PaginationParams): Promise<ApiResponse<Contact[]>> {
    const response = await crmClient.get<ApiResponse<Contact[]>>('/contacts', { params })
    return response.data
  },

  async getContact(id: string): Promise<Contact> {
    const response = await crmClient.get<Contact>(`/contacts/${id}`)
    return response.data
  },

  async createContact(data: Partial<Contact>): Promise<Contact> {
    const response = await crmClient.post<Contact>('/contacts', data)
    return response.data
  },

  async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    const response = await crmClient.put<Contact>(`/contacts/${id}`, data)
    return response.data
  },

  async deleteContact(id: string): Promise<void> {
    await crmClient.delete(`/contacts/${id}`)
  },

  // ===== Companies =====
  async getCompanies(params?: PaginationParams): Promise<ApiResponse<Company[]>> {
    const response = await crmClient.get<ApiResponse<Company[]>>('/companies', { params })
    return response.data
  },

  async getCompany(id: string): Promise<Company> {
    const response = await crmClient.get<Company>(`/companies/${id}`)
    return response.data
  },

  async createCompany(data: Partial<Company>): Promise<Company> {
    const response = await crmClient.post<Company>('/companies', data)
    return response.data
  },

  async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    const response = await crmClient.put<Company>(`/companies/${id}`, data)
    return response.data
  },

  async deleteCompany(id: string): Promise<void> {
    await crmClient.delete(`/companies/${id}`)
  },

  // ===== Deals =====
  async getDeals(params?: PaginationParams): Promise<ApiResponse<Deal[]>> {
    const response = await crmClient.get<ApiResponse<Deal[]>>('/deals', { params })
    return response.data
  },

  async getDeal(id: string): Promise<Deal> {
    const response = await crmClient.get<Deal>(`/deals/${id}`)
    return response.data
  },

  async createDeal(data: Partial<Deal>): Promise<Deal> {
    const response = await crmClient.post<Deal>('/deals', data)
    return response.data
  },

  async updateDeal(id: string, data: Partial<Deal>): Promise<Deal> {
    const response = await crmClient.put<Deal>(`/deals/${id}`, data)
    return response.data
  },

  async deleteDeal(id: string): Promise<void> {
    await crmClient.delete(`/deals/${id}`)
  },

  // ===== Activities =====
  async getActivities(params?: PaginationParams): Promise<ApiResponse<Activity[]>> {
    const response = await crmClient.get<ApiResponse<Activity[]>>('/activities', { params })
    return response.data
  },

  async createActivity(data: Partial<Activity>): Promise<Activity> {
    const response = await crmClient.post<Activity>('/activities', data)
    return response.data
  },

  // ===== Campaigns =====
  async getCampaigns(params?: PaginationParams): Promise<ApiResponse<Campaign[]>> {
    const response = await crmClient.get<ApiResponse<Campaign[]>>('/campaigns', { params })
    return response.data
  },

  async getCampaign(id: string): Promise<Campaign> {
    const response = await crmClient.get<Campaign>(`/campaigns/${id}`)
    return response.data
  },

  async createCampaign(data: Partial<Campaign>): Promise<Campaign> {
    const response = await crmClient.post<Campaign>('/campaigns', data)
    return response.data
  }
}
