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
  propertyId?: string;
  priceVal: number;
  initialCheckInDate?: string;
  initialDuration?: string;
  initialRoomType?: string;
  propertyType?: "Campur" | "Putra" | "Putri";
}

export function useBookingForm({
  propertyId,
  priceVal,
  initialCheckInDate,
  initialDuration,
  initialRoomType,
  propertyType
}: UseBookingFormOptions) {
  
  const getInitialDurationMonths = (durationStr?: string): number => {
    if (!durationStr) return 1;
    if (durationStr.includes("3 Bulan")) return 3;
    if (durationStr.includes("6 Bulan")) return 6;
    if (durationStr.includes("Tahun")) return 12;
    return 1;
  };

  // Load user session
  const [sessionUser] = useState<{ id: string; name: string; phone?: string; email?: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("gopay");
  const [name, setName] = useState(sessionUser?.name || "");
  const [phone, setPhone] = useState(sessionUser?.phone || "");
  const [selectedGender, setSelectedGender] = useState<"Laki-laki" | "Perempuan">(() => {
    if (propertyType === "Putri") return "Perempuan";
    return "Laki-laki";
  });

  const gender = propertyType === "Putra"
    ? "Laki-laki"
    : propertyType === "Putri"
    ? "Perempuan"
    : selectedGender;

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

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState("");

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

  const subtotal = priceVal * durationMonths;
  const totalPayment = subtotal + SERVICE_FEE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
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
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (step === 2) {
      setIsSubmitting(true);

      try {
        const response = await bookingService.submitBooking({
          property: propertyId || "",
          roomType: selectedRoomType,
          startDate,
          durationMonths,
          occupantsCount,
          additionalNotes,
          paymentMethod,
          totalPayment
        });

        if (response.success) {
          setBookingId(response.bookingId);
          setStep(3);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setErrors({ name: response.error || "Gagal mengajukan booking" });
        }
      } catch (err) {
        console.error("Failed to submit booking:", err);
        setErrors({ name: "Terjadi kesalahan saat menghubungi server" });
      } finally {
        setIsSubmitting(false);
      }
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
      setGender: setSelectedGender,
      setOccupation,
      setStartDate,
      setAdditionalNotes,
      setSelectedRoomType,
      step,
      setStep,
      paymentMethod,
      setPaymentMethod
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
      isSubmitted: step === 3,
      bookingId,
      isGenderLocked: propertyType === "Putra" || propertyType === "Putri",
      propertyType,
      step,
      setStep
    }
  };
}
