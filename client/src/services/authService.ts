import type { LoginCredentials, RegisterData, AuthResponse } from "../types/auth";

/**
 * AuthService handles authentication operations (Login and Registration).
 * It simulates network request latency and validates data format.
 */
class AuthService {
  private readonly latencyMs = 1000;

  /**
   * Simulates a login API request.
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, this.latencyMs));

    const { phone, password } = credentials;

    // Simulated verification logic
    if (!phone || !password) {
      return { success: false, error: "Nomor handphone dan password wajib diisi" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password minimal terdiri dari 6 karakter" };
    }

    // Success response mockup
    console.log("Logged in successfully via phone:", phone);
    return {
      success: true,
      user: {
        id: "usr-91023",
        name: "Budi Santoso",
        phone,
        email: "budi.santoso@email.com",
      },
    };
  }

  /**
   * Simulates a registration API request.
   */
  public async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, this.latencyMs));

    const { name, phone, email, password, confirmPassword } = data;

    // Simulated verification logic
    if (!name || !phone || !email || !password || !confirmPassword) {
      return { success: false, error: "Semua kolom wajib diisi" };
    }

    if (password !== confirmPassword) {
      return { success: false, error: "Konfirmasi password tidak cocok" };
    }

    if (password.length < 6) {
      return { success: false, error: "Password minimal terdiri dari 6 karakter" };
    }

    // Success response mockup
    console.log("Registered successfully:", { name, phone, email });
    return {
      success: true,
      user: {
        id: `usr-${Math.floor(10000 + Math.random() * 90000)}`,
        name,
        phone,
        email,
      },
    };
  }
}

export const authService = new AuthService();
