import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useLoginForm() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form Client-side Validations
    if (!phone.trim()) {
      setError("Nomor handphone wajib diisi");
      return;
    }
    if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/\s+/g, ""))) {
      setError("Format nomor handphone tidak valid");
      return;
    }
    if (!password) {
      setError("Password wajib diisi");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal terdiri dari 6 karakter");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ phone, password });
      
      if (response.success && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/");
      } else {
        setError(response.error || "Gagal masuk. Silakan periksa kembali kredensial Anda.");
      }
    } catch (err) {
      console.error("Login failure:", err);
      setError("Terjadi kesalahan pada server. Coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      localStorage.setItem("user", JSON.stringify({
        id: "usr-google",
        name: "User Google",
        phone: "+6281234567890",
        email: "user.google@email.com",
      }));
      navigate("/");
    } catch (err) {
      console.error("Google login failure:", err);
      setError("Terjadi kesalahan pada login Google. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      phone,
      password,
      showPassword,
      isLoading,
      error,
    },
    actions: {
      setPhone,
      setPassword,
      setShowPassword,
      handleLogin,
      handleGoogleLogin,
    },
  };
}
