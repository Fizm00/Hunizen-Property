import { api } from "./api";
import axios from "axios";
import type { LoginCredentials, RegisterData, AuthResponse, UserProfile } from "../types/auth";

class AuthService {
  /**
   * Mengirim request login ke API backend.
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<{ success: boolean; token: string; user: UserProfile }>("/auth/login", credentials);
      const { token, user } = response.data;
      
      // Simpan data otentikasi ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as { message?: string };
        return { success: false, error: data.message || "Gagal masuk" };
      }
      return { success: false, error: "Terjadi kesalahan koneksi ke server" };
    }
  }

  /**
   * Mengirim request registrasi akun baru ke API backend.
   */
  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        gender: data.gender || "Laki-laki",
        role: "tenant", // Peran default adalah penyewa
      };
      
      const response = await api.post<{ success: boolean; token: string; user: UserProfile }>("/auth/register", payload);
      const { token, user } = response.data;
      
      // Simpan data otentikasi ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string; errors?: Record<string, string> };
        let errMsg = responseData.message || "Gagal mendaftar";
        if (responseData.errors) {
          errMsg = Object.values(responseData.errors).join(", ");
        }
        return { success: false, error: errMsg };
      }
      return { success: false, error: "Terjadi kesalahan koneksi ke server" };
    }
  }

  /**
   * Mengambil data profil lengkap pengguna yang sedang aktif (me).
   */
  public async getProfile(): Promise<AuthResponse> {
    try {
      const response = await api.get<{ success: boolean; user: UserProfile }>("/auth/me");
      const { user } = response.data;
      
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as { message?: string };
        return { success: false, error: data.message || "Gagal mengambil profil" };
      }
      return { success: false, error: "Terjadi kesalahan koneksi ke server" };
    }
  }

  /**
   * Memperbarui data profil pengguna ke server.
   */
  public async updateProfile(data: Partial<UserProfile>): Promise<AuthResponse> {
    try {
      const response = await api.put<{ success: boolean; user: UserProfile }>("/auth/profile", data);
      const { user } = response.data;
      
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true, user };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return { success: false, error: responseData.message || "Gagal memperbarui profil" };
      }
      return { success: false, error: "Terjadi kesalahan koneksi ke server" };
    }
  }

  /**
   * Mengirim request lupa password ke API backend.
   */
  public async forgotPassword(phone: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post<{ success: boolean; message: string }>("/auth/forgot-password", { phone });
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return {
          success: false,
          message: responseData.message || "Gagal memproses lupa password",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi ke server",
      };
    }
  }
}

export const authService = new AuthService();
