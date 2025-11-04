// API Wiassur
import type { ApiResponse, PaginationParams } from "@/types/common";
import { Branch, EngineMethod } from "@/types/engine";
import { mosaicClient } from "./client";

export const mosaicApi = {
  // ===== INSURERS =====
  async getBranches(params?: PaginationParams): Promise<ApiResponse<Branch[]>> {
    const response = await mosaicClient.get<ApiResponse<Branch[]>>(
      "/api/engine/engineBranch",
      { params }
    );
    return response.data;
  },

  async getOneBranche(
    id: string,
    params?: PaginationParams
  ): Promise<ApiResponse<Branch[]>> {
    const response = await mosaicClient.get<ApiResponse<Branch[]>>(
      "/api/engine/engineBranch/" + id,
      { params }
    );
    return response.data;
  },

  async getEngineMethods(
    slug: string,
    params?: PaginationParams
  ): Promise<ApiResponse<EngineMethod[]>> {
    const response = await mosaicClient.get<ApiResponse<EngineMethod[]>>(
      "/api/engine/method/" + slug,
      { params }
    );
    return response.data;
  },
};
