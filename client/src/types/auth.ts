export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
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
}

export interface AuthResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}
