import { api } from "./api";
import axios from "axios";
import type { ApiReview } from "./propertyService";

class ReviewService {
  /**
   * Mengirim ulasan baru untuk suatu properti.
   */
  public async createReview(data: { property: string; rating: number; comment: string }): Promise<{ success: boolean; message: string; review?: ApiReview }> {
    try {
      const response = await api.post<{ success: boolean; message: string; review: ApiReview }>("/reviews", data);
      return {
        success: true,
        message: response.data.message || "Ulasan berhasil dikirim",
        review: response.data.review,
      };
    } catch (error) {
      console.error("Gagal mengirim ulasan:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return {
          success: false,
          message: responseData.message || "Gagal mengirimkan ulasan",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi ke server",
      };
    }
  }

  /**
   * Mengambil semua ulasan untuk suatu properti.
   */
  public async getPropertyReviews(propertyId: string): Promise<ApiReview[]> {
    try {
      const response = await api.get<{ success: boolean; reviews: ApiReview[] }>(`/reviews/property/${propertyId}`);
      return response.data.reviews || [];
    } catch (error) {
      console.error("Gagal mengambil ulasan properti:", error);
      return [];
    }
  }

  /**
   * Tanggapi ulasan oleh landlord.
   */
  public async replyToReview(reviewId: string, landlordReply: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await api.post<{ success: boolean; message: string }>(`/reviews/${reviewId}/reply`, { landlordReply });
      return {
        success: true,
        message: response.data.message || "Tanggapan berhasil disimpan",
      };
    } catch (error) {
      console.error("Gagal membalas ulasan:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return {
          success: false,
          message: responseData.message || "Gagal mengirim tanggapan ulasan",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi ke server",
      };
    }
  }
}

export const reviewService = new ReviewService();
