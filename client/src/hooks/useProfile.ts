import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default_user_avatar.png";
import { showAlert, showToast } from "../utils/alerts";
import { authService } from "../services/authService";

export interface ProfileData {
  name: string;
  gender: string;
  birthDate: string;
  job: string;
  city: string;
  maritalStatus: string;
  education: string;
  emergencyPhone: string;
  avatarUrl: string;
}

export function useProfile() {
  const navigate = useNavigate();
  const [sessionUser, setSessionUser] = useState<{ id: string; name: string; phone?: string; email?: string } | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [activeMenuTab, setActiveMenuTab] = useState<string>("pengaturan");
  
  const [activeSubTab, setActiveSubTab] = useState<"biodata" | "verifikasi">("biodata");

  const [name, setName] = useState(sessionUser?.name || "Username");
  const [gender, setGender] = useState("Laki-laki");
  const [birthDate, setBirthDate] = useState("");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("Belum Menikah");
  const [education, setEducation] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("+62");

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const customAvatar = localStorage.getItem("user_custom_avatar");
    return customAvatar || defaultAvatar;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Ambil profil lengkap dari server saat hook dimuat
  useEffect(() => {
    let isMounted = true;
    async function loadProfile() {
      setIsLoading(true);
      const response = await authService.getProfile();
      if (isMounted && response.success && response.user) {
        const u = response.user;
        setName(u.name || "");
        setGender(u.gender || "Laki-laki");
        setBirthDate(u.birthDate || "");
        setJob(u.job || "");
        setCity(u.city || "");
        setMaritalStatus(u.maritalStatus || "Belum Menikah");
        setEducation(u.education || "");
        setEmergencyPhone(u.emergencyPhone || "");
        if (u.avatarUrl) {
          setAvatarUrl(u.avatarUrl);
        }
        setSessionUser({
          id: u.id,
          name: u.name,
          phone: u.phone,
          email: u.email,
        });
      }
      if (isMounted) {
        setIsLoading(false);
      }
    }
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showAlert("error", "Ukuran File Terlalu Besar", "Maksimal ukuran file yang diperbolehkan adalah 10 Megabytes (10.000.000 bytes).");
      return;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      showAlert("error", "Ekstensi File Tidak Valid", "Ekstensi file yang diperbolehkan hanya: .JPG, .JPEG, .PNG");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);
    
    localStorage.setItem("user_custom_avatar", previewUrl);
    
    showToast("success", "Foto profil berhasil dipilih");
  }, []);

  const handleSaveProfile = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("Nama Lengkap wajib diisi");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.updateProfile({
        name,
        gender: gender as "Laki-laki" | "Perempuan",
        birthDate,
        job,
        city,
        maritalStatus,
        education,
        emergencyPhone,
        avatarUrl,
      });

      if (response.success && response.user) {
        const u = response.user;
        const updatedUser = {
          id: u.id,
          name: u.name,
          phone: u.phone,
          email: u.email,
        };
        setSessionUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        window.dispatchEvent(new Event("profile-update"));
        showAlert("success", "Profil Berhasil Diperbarui", "Biodata diri Anda telah berhasil disimpan.");
      } else {
        showAlert("error", "Gagal Menyimpan", response.error || "Terjadi kesalahan saat menyimpan data diri Anda.");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat menyimpan data diri Anda.");
    } finally {
      setIsLoading(false);
    }
  }, [name, gender, birthDate, job, city, maritalStatus, education, emergencyPhone, avatarUrl]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("user_custom_avatar");
    
    showToast("success", "Berhasil keluar dari akun");
    
    navigate("/");
    window.location.reload();
  }, [navigate]);

  return {
    state: {
      sessionUser,
      activeMenuTab,
      activeSubTab,
      name,
      gender,
      birthDate,
      job,
      city,
      maritalStatus,
      education,
      emergencyPhone,
      avatarUrl,
      isLoading,
      validationError,
    },
    actions: {
      setActiveMenuTab,
      setActiveSubTab,
      setName,
      setGender,
      setBirthDate,
      setJob,
      setCity,
      setMaritalStatus,
      setEducation,
      setEmergencyPhone,
      handleAvatarUpload,
      handleSaveProfile,
      handleLogout,
    },
  };
}
