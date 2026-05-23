export interface SidebarMenuItem {
  id: string;
  label: string;
  iconName: "History" | "Home" | "MessageSquare" | "Settings" | "CreditCard" | "Receipt";
}

export interface RentHistoryItem {
  id: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  applyDate: string;
  startDate: string;
  duration: string;
  price: string;
  status: "disetujui" | "pending" | "ditolak";
  roomType: string;
  landlordPhone: string;
}

export interface ActiveRentItem {
  id: string;
  propertyName: string;
  propertyImage: string;
  location: string;
  roomName: string;
  startDate: string;
  endDate: string;
  price: string;
  landlordName: string;
  landlordPhone: string;
  nextPaymentDate: string;
  paymentStatus: "lunas" | "belum_bayar";
  kostRules: string[];
}

export interface ComplaintItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  status: "selesai" | "proses" | "baru";
  notes?: string;
}

export interface UserReviewItem {
  id: string;
  propertyName: string;
  roomName: string;
  rating: number;
  date: string;
  comment: string;
  landlordReply?: string;
}

export interface TransactionItem {
  id: string;
  propertyName: string;
  roomName: string;
  amount: string;
  date: string;
  type: string;
  method: string;
  status: "berhasil" | "proses" | "gagal";
}

export interface BillItem {
  id: string;
  propertyName: string;
  roomName: string;
  amount: string;
  dueDate: string;
  type: string;
  status: "belum_bayar" | "lunas" | "tunggakan";
  month: string;
}
