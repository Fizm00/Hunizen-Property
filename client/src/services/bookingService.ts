import { api } from "./api";
import axios from "axios";
import type { ApiProperty } from "./propertyService";

export interface ApiBooking {
  _id: string;
  tenant: string;
  property: ApiProperty;
  roomType: string;
  startDate: string;
  durationMonths: number;
  status: "pending" | "disetujui" | "ditolak";
  occupantsCount: number;
  additionalNotes?: string;
  paymentMethod: string;
  totalPayment: number;
  bookingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSubmitData {
  property: string;
  roomType: string;
  startDate: string;
  durationMonths: number;
  occupantsCount: number;
  additionalNotes: string;
  paymentMethod: string;
  totalPayment: number;
}

export const bookingService = {
  /**
   * Mengirim pengajuan sewa (booking) ke REST API backend.
   */
  async submitBooking(data: BookingSubmitData): Promise<{ success: boolean; bookingId: string; error?: string }> {
    try {
      const response = await api.post<{ success: boolean; message: string; booking: { bookingId: string } }>(
        "/bookings",
        data
      );
      return {
        success: true,
        bookingId: response.data.booking.bookingId,
      };
    } catch (error) {
      console.error("Gagal mengirim pengajuan booking:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return {
          success: false,
          bookingId: "",
          error: responseData.message || "Gagal mengajukan booking ke server",
        };
      }
      return {
        success: false,
        bookingId: "",
        error: "Terjadi kesalahan koneksi ke server",
      };
    }
  },

  /**
   * Mengambil riwayat booking milik penyewa aktif.
   */
  async getMyBookings(): Promise<ApiBooking[]> {
    try {
      const response = await api.get<{ success: boolean; bookings: ApiBooking[] }>("/bookings/my-bookings");
      return response.data.bookings || [];
    } catch (error) {
      console.error("Gagal mengambil riwayat booking:", error);
      return [];
    }
  }
};
