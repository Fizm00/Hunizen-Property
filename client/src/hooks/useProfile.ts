import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default_user_avatar.png";
import { showAlert, showToast } from "../utils/alerts";

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
  const [gender, setGender] = useState("Perempuan");
  const [birthDate, setBirthDate] = useState("2024-02-29");
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [education, setEducation] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("+62");

  const [avatarUrl, setAvatarUrl] = useState<string>(() => {
    const customAvatar = localStorage.getItem("user_custom_avatar");
    return customAvatar || defaultAvatar;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

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
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (sessionUser) {
        const updatedUser = { ...sessionUser, name };
        setSessionUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        const mockUser = { id: "usr-guest", name };
        setSessionUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
      }

      window.dispatchEvent(new Event("profile-update"));

      showAlert("success", "Profil Berhasil Diperbarui", "Biodata diri Anda telah berhasil disimpan.");
    } catch (err) {
      console.error("Save profile error:", err);
      showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat menyimpan data diri Anda.");
    } finally {
      setIsLoading(false);
    }
  }, [name, sessionUser]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
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
