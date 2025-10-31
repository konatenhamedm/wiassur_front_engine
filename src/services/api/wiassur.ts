// API Wiassur
import type { ApiResponse, PaginationParams } from "@/types/common";
import { Insurer } from "@/types/engine";
import { wiassurClient } from "./client";

export const wiassurApi = {
  // ===== INSURERS =====
  async getInsurers(
    params?: PaginationParams
  ): Promise<ApiResponse<Insurer[]>> {
    const response = await wiassurClient.get<ApiResponse<Insurer[]>>(
      "/insurer/list",
      { params }
    );
    return response.data;
  },
};
