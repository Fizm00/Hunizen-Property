import { api } from "./api";
import axios from "axios";
import type { BillItem } from "../types/profile";
import type { ApiTransaction } from "./transactionService";

interface ApiBill {
  _id: string;
  billId: string;
  amount: number;
  dueDate: string;
  type: string;
  status: "belum_bayar" | "lunas" | "tunggakan";
  month: string;
  property?: {
    title: string;
    location: string;
  };
  tenant?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gender?: string;
    avatarUrl?: string;
  };
  createdAt?: string;
}

/**
 * Pemetaan helper dari objek ApiBill (MongoDB) ke bentuk BillItem (Frontend).
 */
function mapBillToBillItem(b: ApiBill): BillItem {
  return {
    id: b._id,
    propertyName: b.property?.title || "Kost Hunizen Emerald Kemang",
    roomName: b.type || "Sewa Bulanan",
    amount: `Rp ${b.amount.toLocaleString("id-ID")}`,
    dueDate: b.dueDate 
      ? new Date(b.dueDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) 
      : "-",
    type: b.type || "Sewa Bulanan",
    status: b.status,
    month: b.month || "Bulan Ini",
  };
}

class BillService {
  /**
   * Mengambil semua tagihan milik penyewa aktif.
   */
  public async getMyBills(): Promise<BillItem[]> {
    try {
      const response = await api.get<{ success: boolean; bills: ApiBill[] }>("/bills/my-bills");
      const list = response.data.bills || [];
      return list.map(mapBillToBillItem);
    } catch (error) {
      console.error("Gagal mengambil tagihan dari server:", error);
      return [];
    }
  }

  /**
   * Membayar tagihan dengan metode pembayaran tertentu.
   */
  public async payBill(billId: string, paymentMethod: string): Promise<{ success: boolean; message: string; transaction?: ApiTransaction }> {
    try {
      const response = await api.post<{ success: boolean; message: string; transaction: ApiTransaction }>(
        `/bills/${billId}/pay`,
        { paymentMethod }
      );
      return {
        success: true,
        message: response.data.message || "Pembayaran berhasil diproses",
        transaction: response.data.transaction,
      };
    } catch (error) {
      console.error("Gagal memproses pembayaran tagihan:", error);
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data as { message?: string };
        return {
          success: false,
          message: data.message || "Gagal memproses pembayaran",
        };
      }
      return {
        success: false,
        message: "Terjadi kesalahan koneksi ke server",
      };
    }
  }

  /**
   * Mengambil detail tagihan tertentu berdasarkan ID.
   */
  public async getBillById(id: string): Promise<ApiBill | null> {
    try {
      const response = await api.get<{ success: boolean; bill: ApiBill }>(`/bills/${id}`);
      return response.data.bill || null;
    } catch (error) {
      console.error(`Gagal memproses detail tagihan ID ${id}:`, error);
      return null;
    }
  }
}

export const billService = new BillService();
export type { ApiBill };
