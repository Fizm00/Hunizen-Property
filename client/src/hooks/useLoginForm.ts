import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Swal from "sweetalert2";

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

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Lupa Password?",
      text: "Masukkan nomor handphone Anda untuk menerima tautan pemulihan kata sandi:",
      input: "text",
      inputPlaceholder: "Contoh: 081234567890",
      confirmButtonText: "Kirim Tautan",
      showCancelButton: true,
      cancelButtonText: "Batal",
      background: "#18181B",
      color: "#F4F3EC",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
        title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
        htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-4 block",
        input: "w-[90%] mx-auto px-4 py-3 border border-zinc-850 rounded-xl bg-zinc-900 text-sm text-[#F4F3EC] focus:outline-none focus:border-brand-green mb-4 font-semibold text-center block",
        confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto mr-2",
        cancelButton: "bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-6 py-3 rounded-full transition-all active:scale-95 cursor-pointer border-0 outline-none block mx-auto"
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        if (/^\+?[0-9]{10,14}$/.test(result.value.replace(/\s+/g, ""))) {
          Swal.fire({
            icon: "success",
            title: "Tautan Dikirim!",
            text: `Simulasi: Tautan reset password telah dikirim ke WhatsApp ${result.value}`,
            confirmButtonText: "Mengerti",
            background: "#18181B",
            color: "#F4F3EC",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
              title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
              htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-6 block",
              confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto",
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Format Tidak Valid",
            text: "Nomor WhatsApp yang dimasukkan tidak valid.",
            confirmButtonText: "Mengerti",
            background: "#18181B",
            color: "#F4F3EC",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
              title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
              htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-6 block",
              confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto",
            }
          });
        }
      }
    });
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
      handleForgotPassword,
    },
  };
}
