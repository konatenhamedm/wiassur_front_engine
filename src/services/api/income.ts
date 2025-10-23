// API de production (Income)
import type { Customer, Quotation, Contract, Invoice, Payment } from '@/types/income'
import type { PaginationParams, ApiResponse } from '@/types/common'
import { coreClient } from './client'

export const incomeApi = {
  // ===== Customers =====
  async getCustomers(params?: PaginationParams): Promise<ApiResponse<Customer[]>> {
    const response = await coreClient.get<ApiResponse<Customer[]>>('/income/customers', { params })
    return response.data
  },

  async getCustomer(id: string): Promise<Customer> {
    const response = await coreClient.get<Customer>(`/income/customers/${id}`)
    return response.data
  },

  async createCustomer(data: Partial<Customer>): Promise<Customer> {
    const response = await coreClient.post<Customer>('/income/customers', data)
    return response.data
  },

  async updateCustomer(id: string, data: Partial<Customer>): Promise<Customer> {
    const response = await coreClient.put<Customer>(`/income/customers/${id}`, data)
    return response.data
  },

  async deleteCustomer(id: string): Promise<void> {
    await coreClient.delete(`/income/customers/${id}`)
  },

  // ===== Quotations =====
  async getQuotations(params?: PaginationParams): Promise<ApiResponse<Quotation[]>> {
    const response = await coreClient.get<ApiResponse<Quotation[]>>('/income/quotations', { params })
    return response.data
  },

  async getQuotation(id: string): Promise<Quotation> {
    const response = await coreClient.get<Quotation>(`/income/quotations/${id}`)
    return response.data
  },

  async createQuotation(data: Partial<Quotation>): Promise<Quotation> {
    const response = await coreClient.post<Quotation>('/income/quotations', data)
    return response.data
  },

  async updateQuotation(id: string, data: Partial<Quotation>): Promise<Quotation> {
    const response = await coreClient.put<Quotation>(`/income/quotations/${id}`, data)
    return response.data
  },

  async deleteQuotation(id: string): Promise<void> {
    await coreClient.delete(`/income/quotations/${id}`)
  },

  // ===== Contracts =====
  async getContracts(params?: PaginationParams): Promise<ApiResponse<Contract[]>> {
    const response = await coreClient.get<ApiResponse<Contract[]>>('/income/contracts', { params })
    return response.data
  },

  async getContract(id: string): Promise<Contract> {
    const response = await coreClient.get<Contract>(`/income/contracts/${id}`)
    return response.data
  },

  async createContract(data: Partial<Contract>): Promise<Contract> {
    const response = await coreClient.post<Contract>('/income/contracts', data)
    return response.data
  },

  async updateContract(id: string, data: Partial<Contract>): Promise<Contract> {
    const response = await coreClient.put<Contract>(`/income/contracts/${id}`, data)
    return response.data
  },

  async deleteContract(id: string): Promise<void> {
    await coreClient.delete(`/income/contracts/${id}`)
  },

  // ===== Invoices =====
  async getInvoices(params?: PaginationParams): Promise<ApiResponse<Invoice[]>> {
    const response = await coreClient.get<ApiResponse<Invoice[]>>('/income/invoices', { params })
    return response.data
  },

  async getInvoice(id: string): Promise<Invoice> {
    const response = await coreClient.get<Invoice>(`/income/invoices/${id}`)
    return response.data
  },

  // ===== Payments =====
  async getPayments(params?: PaginationParams): Promise<ApiResponse<Payment[]>> {
    const response = await coreClient.get<ApiResponse<Payment[]>>('/income/payments', { params })
    return response.data
  },

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    const response = await coreClient.post<Payment>('/income/payments', data)
    return response.data
  }
}
