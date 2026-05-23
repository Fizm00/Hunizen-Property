import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export function useRegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama Lengkap wajib diisi");
      return;
    }
    if (!phone.trim()) {
      setError("Nomor handphone wajib diisi");
      return;
    }
    if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/\s+/g, ""))) {
      setError("Format nomor handphone tidak valid");
      return;
    }
    if (!email.trim()) {
      setError("Alamat email wajib diisi");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format alamat email tidak valid");
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
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        name,
        phone,
        email,
        password,
        confirmPassword,
      });

      if (response.success) {
        navigate("/login");
      } else {
        setError(response.error || "Gagal melakukan registrasi.");
      }
    } catch (err) {
      console.error("Registration failure:", err);
      setError("Terjadi kesalahan pada server. Coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      name,
      phone,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      isLoading,
      error,
    },
    actions: {
      setName,
      setPhone,
      setEmail,
      setPassword,
      setConfirmPassword,
      setShowPassword,
      setShowConfirmPassword,
      handleRegister,
    },
  };
}
