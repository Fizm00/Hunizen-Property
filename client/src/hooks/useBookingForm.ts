import { useState } from "react";
import type { BookingFormErrors } from "../types/booking";
import { bookingService } from "../services/bookingService";
import {
  MAX_OCCUPANTS,
  MIN_OCCUPANTS,
  MAX_DURATION_MONTHS,
  MIN_DURATION_MONTHS,
  SERVICE_FEE
} from "../constants/booking";

interface UseBookingFormOptions {
  priceVal: number;
  initialCheckInDate?: string;
  initialDuration?: string;
  initialRoomType?: string;
}

export function useBookingForm({
  priceVal,
  initialCheckInDate,
  initialDuration,
  initialRoomType
}: UseBookingFormOptions) {
  
  // Helper to parse duration number (e.g. "Per Bulan" -> 1 month)
  const getInitialDurationMonths = (durationStr?: string): number => {
    if (!durationStr) return 1;
    if (durationStr.includes("3 Bulan")) return 3;
    if (durationStr.includes("6 Bulan")) return 6;
    if (durationStr.includes("Tahun")) return 12;
    return 1;
  };

  // Form State
  const [name, setName] = useState("Budi Santoso");
  const [phone, setPhone] = useState("081234567890");
  const [gender, setGender] = useState<"Laki-laki" | "Perempuan">("Laki-laki");
  const [occupation, setOccupation] = useState("Mahasiswa");
  const [occupantsCount, setOccupantsCount] = useState(1);
  const [durationMonths, setDurationMonths] = useState(
    getInitialDurationMonths(initialDuration)
  );
  const [startDate, setStartDate] = useState(
    initialCheckInDate || new Date().toISOString().split("T")[0]
  );
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState(
    initialRoomType || "Standard Room"
  );

  // Status & Error States
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Counter Actions
  const incrementOccupants = () => {
    if (occupantsCount < MAX_OCCUPANTS) {
      setOccupantsCount((prev) => prev + 1);
    }
  };

  const decrementOccupants = () => {
    if (occupantsCount > MIN_OCCUPANTS) {
      setOccupantsCount((prev) => prev - 1);
    }
  };

  const incrementDuration = () => {
    if (durationMonths < MAX_DURATION_MONTHS) {
      setDurationMonths((prev) => prev + 1);
    }
  };

  const decrementDuration = () => {
    if (durationMonths > MIN_DURATION_MONTHS) {
      setDurationMonths((prev) => prev - 1);
    }
  };

  // Dynamic pricing summary
  const subtotal = priceVal * durationMonths;
  const totalPayment = subtotal + SERVICE_FEE;

  // Validation & Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: BookingFormErrors = {};
    if (!name.trim()) newErrors.name = "Nama lengkap wajib diisi";
    if (!phone.trim()) newErrors.phone = "Nomor WhatsApp wajib diisi";
    else if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Format nomor WhatsApp tidak valid";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await bookingService.submitBooking({
        name,
        phone,
        gender,
        occupation,
        occupantsCount,
        durationMonths,
        startDate,
        additionalNotes,
        selectedRoomType
      });

      if (response.success) {
        setBookingId(response.bookingId);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Failed to submit booking:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState: {
      name,
      phone,
      gender,
      occupation,
      occupantsCount,
      durationMonths,
      startDate,
      additionalNotes,
      selectedRoomType,
      setName,
      setPhone,
      setGender,
      setOccupation,
      setStartDate,
      setAdditionalNotes,
      setSelectedRoomType
    },
    actions: {
      incrementOccupants,
      decrementOccupants,
      incrementDuration,
      decrementDuration,
      handleSubmit
    },
    pricing: {
      pricePerMonth: priceVal,
      subtotal,
      serviceFee: SERVICE_FEE,
      totalPayment
    },
    status: {
      errors,
      isSubmitting,
      isSubmitted,
      bookingId
    }
  };
}
