// API du moteur de tarification
import type { EngineMethod, Branch, Insurer, CalculationInput, CalculationResult } from '@/types/engine'
import type { PaginationParams, ApiResponse } from '@/types/common'
import { coreClient } from './client'

export const engineApi = {
  /**
   * Récupérer toutes les méthodes de calcul
   */
  async getMethods(params?: PaginationParams): Promise<ApiResponse<EngineMethod[]>> {
    const response = await coreClient.get<ApiResponse<EngineMethod[]>>('/engine/methods', { params })
    return response.data
  },

  /**
   * Récupérer une méthode spécifique
   */
  async getMethod(id: string): Promise<EngineMethod> {
    const response = await coreClient.get<EngineMethod>(`/engine/methods/${id}`)
    return response.data
  },

  /**
   * Calculer une prime d'assurance
   */
  async calculate(input: CalculationInput): Promise<CalculationResult> {
    const response = await coreClient.post<CalculationResult>('/engine/calculate', input)
    return response.data
  },

  /**
   * Récupérer toutes les branches
   */
  async getBranches(params?: PaginationParams): Promise<ApiResponse<Branch[]>> {
    const response = await coreClient.get<ApiResponse<Branch[]>>('/engine/branches', { params })
    return response.data
  },

  /**
   * Récupérer une branche spécifique
   */
  async getBranch(id: string): Promise<Branch> {
    const response = await coreClient.get<Branch>(`/engine/branches/${id}`)
    return response.data
  },

  /**
   * Récupérer tous les assureurs
   */
  async getInsurers(params?: PaginationParams): Promise<ApiResponse<Insurer[]>> {
    const response = await coreClient.get<ApiResponse<Insurer[]>>('/engine/insurers', { params })
    return response.data
  },

  /**
   * Récupérer un assureur spécifique
   */
  async getInsurer(id: string): Promise<Insurer> {
    const response = await coreClient.get<Insurer>(`/engine/insurers/${id}`)
    return response.data
  }
}
