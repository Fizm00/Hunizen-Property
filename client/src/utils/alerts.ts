import Swal from "sweetalert2";

// Custom Toast mixin matching our app style
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#18181B",
  color: "#F4F3EC",
  customClass: {
    popup: "rounded-2xl border border-zinc-800 shadow-2xl font-sans",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

/**
 * Show a modern, non-blocking toast notification at the top-right of the screen.
 */
export function showToast(icon: "success" | "error" | "warning" | "info", title: string) {
  Toast.fire({
    icon,
    title,
  });
}

/**
 * Show a premium, custom-styled modal dialog.
 */
export function showAlert(
  icon: "success" | "error" | "warning" | "info" | "question",
  title: string,
  text: string
) {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonText: "Mengerti",
    background: "#18181B",
    color: "#F4F3EC",
    buttonsStyling: false,
    customClass: {
      popup: "rounded-3xl border border-zinc-800 p-8 shadow-2xl font-sans",
      title: "text-lg font-black tracking-tight mb-2 text-[#F4F3EC] block",
      htmlContainer: "text-xs text-slate-400 font-medium leading-relaxed mb-6 block",
      confirmButton: "bg-[#F4F3EC] hover:bg-white text-[#09090B] text-xs font-black px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer border-0 outline-none block mx-auto",
    },
  });
}
