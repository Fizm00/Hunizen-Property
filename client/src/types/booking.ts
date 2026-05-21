export interface BookingFormData {
  name: string;
  phone: string;
  gender: "Laki-laki" | "Perempuan";
  occupation: string;
  occupantsCount: number;
  durationMonths: number;
  startDate: string;
  additionalNotes: string;
  selectedRoomType: string;
}

export interface BookingFormErrors {
  name?: string;
  phone?: string;
}

export interface BookingSummary {
  pricePerMonth: number;
  subtotal: number;
  serviceFee: number;
  totalPayment: number;
}
