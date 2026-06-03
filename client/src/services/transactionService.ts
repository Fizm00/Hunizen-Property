import { api } from "./api";
import type { TransactionItem } from "../types/profile";

interface ApiTransaction {
  _id: string;
  transactionId: string;
  amount: number;
  paymentMethod: string;
  status: "berhasil" | "proses" | "gagal";
  transactionType: string;
  createdAt?: string;
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
}

/**
 * Pemetaan helper dari objek ApiTransaction (MongoDB) ke bentuk TransactionItem (Frontend).
 */
function mapTransactionToTransactionItem(t: ApiTransaction): TransactionItem {
  return {
    id: t._id,
    propertyName: t.property?.title || "Kost Hunizen Emerald Kemang",
    roomName: t.transactionType || "Sewa Bulanan",
    amount: `Rp ${t.amount.toLocaleString("id-ID")}`,
    date: t.createdAt 
      ? new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) 
      : "-",
    type: t.transactionType || "Sewa Bulanan",
    method: t.paymentMethod ? t.paymentMethod.toUpperCase() : "GOPAY",
    status: t.status,
  };
}

class TransactionService {
  /**
   * Mengambil riwayat transaksi milik penyewa aktif.
   */
  public async getMyTransactions(): Promise<TransactionItem[]> {
    try {
      const response = await api.get<{ success: boolean; transactions: ApiTransaction[] }>("/transactions/my-transactions");
      const list = response.data.transactions || [];
      return list.map(mapTransactionToTransactionItem);
    } catch (error) {
      console.error("Gagal mengambil histori transaksi dari server:", error);
      return [];
    }
  }

  /**
   * Mengambil detail transaksi berdasarkan ID.
   */
  public async getTransactionById(id: string): Promise<ApiTransaction | null> {
    try {
      const response = await api.get<{ success: boolean; transaction: ApiTransaction }>(`/transactions/${id}`);
      return response.data.transaction || null;
    } catch (error) {
      console.error(`Gagal mengambil detail transaksi ID ${id}:`, error);
      return null;
    }
  }
}

export const transactionService = new TransactionService();
export type { ApiTransaction };
