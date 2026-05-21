import type { BookingFormData } from "../types/booking";

export const bookingService = {
  /**
   * Simulates submitting a booking application to the server.
   * Returns a promise with success status and a generated unique Booking ID.
   */
  async submitBooking(data: BookingFormData): Promise<{ success: boolean; bookingId: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate unique HNZ-xxxxxx ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingId = `HNZ-${randomNum}`;

    console.log("Booking successfully submitted to server:", {
      id: bookingId,
      submittedData: data,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      bookingId
    };
  }
};
