import { api } from "./api";
import axios from "axios";
import type { ComplaintItem } from "../types/profile";

interface ApiComplaint {
  _id: string;
  complaintId: string;
  category: string;
  title: string;
  description: string;
  status: "baru" | "proses" | "selesai";
  landlordNotes?: string;
  createdAt?: string;
}

/**
 * Pemetaan helper dari objek ApiComplaint (MongoDB) ke bentuk ComplaintItem (Frontend).
 */
function mapComplaintToComplaintItem(c: ApiComplaint): ComplaintItem {
  return {
    id: c._id,
    category: c.category,
    title: c.title,
    description: c.description,
    date: c.createdAt 
      ? new Date(c.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) 
      : "-",
    status: c.status,
    notes: c.landlordNotes,
  };
}

class ComplaintService {
  /**
   * Mengambil semua pengaduan (complaints) milik penyewa aktif.
   */
  public async getMyComplaints(): Promise<ComplaintItem[]> {
    try {
      const response = await api.get<{ success: boolean; complaints: ApiComplaint[] }>("/complaints/my-complaints");
      const list = response.data.complaints || [];
      return list.map(mapComplaintToComplaintItem);
    } catch (error) {
      console.error("Gagal mengambil keluhan dari server:", error);
      return [];
    }
  }

  /**
   * Membuat pengaduan baru ke REST API.
   */
  public async createComplaint(data: { property: string; category: string; title: string; description: string }): Promise<{ success: boolean; message: string; complaint?: ApiComplaint }> {
    try {
      const response = await api.post<{ success: boolean; message: string; complaint: ApiComplaint }>("/complaints", data);
      return {
        success: true,
        message: response.data.message || "Keluhan berhasil dikirim",
        complaint: response.data.complaint,
      };
    } catch (error) {
      console.error("Gagal mengirim keluhan:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const responseData = error.response.data as { message?: string };
        return {
          success: false,
          message: responseData.message || "Gagal mengajukan pengaduan",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi ke server",
      };
    }
  }
}

export const complaintService = new ComplaintService();
export type { ApiComplaint };
