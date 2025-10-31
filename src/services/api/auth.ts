// API d'authentification
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/auth";
import { authClient } from "./client";

export const authApi = {
  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    //   return  {
    //     // uuid?: string
    //     // email?: string
    //   id: "1",
    //   username: "user",
    //   firstName: "Firstname",
    //   lastName: "Lastname",
    //   roles: [],
    //   active: true,
    //   // createdAt?: string,
    //   // updatedAt?: string,
    // }
    const admin = {
      id: "1",
      username: "admin",
      firstName: "Admin",
      lastName: "Lastname",
      roles: ["ROLE_ADMIN_TEST"],
      active: true,
    };

    const user = {
      id: "2",
      username: "user",
      firstName: "User",
      lastName: "Lastname",
      roles: ["ROLE_USER_TEST"],
      active: true,
    };

    const token = "my-token";
    const refreshToken = "my-refresh-token";

    return {
      user: credentials.username === "admin" ? admin : user,
      token: token,
      refreshToken: refreshToken,
      tenants: [],
    };

    const response = await authClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  /**
   * Déconnexion utilisateur
   */
  async logout(): Promise<void> {
    // await authClient.post("/auth/logout");
  },

  /**
   * Rafraîchissement du token
   */
  async refresh(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await authClient.post<RefreshTokenResponse>(
      "/auth/refresh",
      {
        refreshToken,
      }
    );
    return response.data;
  },

  /**
   * Récupérer les informations du profil actuel
   */
  async me(): Promise<any> {
    const response = await authClient.get("/auth/me");
    return response.data;
  },

  /**
   * Mettre à jour le profil
   */
  async updateProfile(data: any): Promise<any> {
    const response = await authClient.put("/auth/profile", data);
    return response.data;
  },

  /**
   * Changer le mot de passe
   */
  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await authClient.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  },

  /**
   * Valider une clé API et obtenir un token
   */
  async validateApiKey(apiKey: string): Promise<LoginResponse> {
    const response = await authClient.post<LoginResponse>(
      "/auth/manager/validate-api-key",
      {
        apiKey,
      }
    );
    return response.data;
  },
};
