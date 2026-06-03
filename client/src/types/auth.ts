export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  gender?: "Laki-laki" | "Perempuan";
  birthDate?: string;
  job?: string;
  city?: string;
  maritalStatus?: string;
  education?: string;
  emergencyPhone?: string;
  avatarUrl?: string;
  role?: "tenant" | "landlord" | "admin";
  isVerified?: boolean;
}

export interface LoginCredentials {
  phone: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  gender?: "Laki-laki" | "Perempuan";
}

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  token?: string;
  error?: string;
}
