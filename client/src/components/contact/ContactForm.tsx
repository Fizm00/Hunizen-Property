import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowUpRight, ChevronDown } from "lucide-react";
import { CONTACT_FORM_FIELDS } from "../../constants/contact";
import heroBgWaterfront from "../../assets/hero_bg_waterfront.png";
import { scrollViewport } from "../../lib/animations";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    city: "",
    budget: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: hook to API / email service
    alert("Pesan Anda telah dikirim! Tim kami akan segera menghubungi Anda.");
    setForm({ name: "", email: "", phone: "", type: "", city: "", budget: "", message: "" });
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={scrollViewport}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
      >
        {/* ─── Left: Form ─── */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label={CONTACT_FORM_FIELDS.name.label}
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              placeholder={CONTACT_FORM_FIELDS.name.placeholder}
            />
            <FormField
              label={CONTACT_FORM_FIELDS.email.label}
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              placeholder={CONTACT_FORM_FIELDS.email.placeholder}
              type="email"
            />
          </div>

          {/* Row 2: Phone + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label={CONTACT_FORM_FIELDS.phone.label}
              value={form.phone}
              onChange={(v) => handleChange("phone", v)}
              placeholder={CONTACT_FORM_FIELDS.phone.placeholder}
              type="tel"
            />
            <SelectField
              label={CONTACT_FORM_FIELDS.type.label}
              value={form.type}
              onChange={(v) => handleChange("type", v)}
              placeholder={CONTACT_FORM_FIELDS.type.placeholder}
              options={CONTACT_FORM_FIELDS.type.options}
            />
          </div>

          {/* Row 3: City + Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label={CONTACT_FORM_FIELDS.city.label}
              value={form.city}
              onChange={(v) => handleChange("city", v)}
              placeholder={CONTACT_FORM_FIELDS.city.placeholder}
            />
            <SelectField
              label={CONTACT_FORM_FIELDS.budget.label}
              value={form.budget}
              onChange={(v) => handleChange("budget", v)}
              placeholder={CONTACT_FORM_FIELDS.budget.placeholder}
              options={CONTACT_FORM_FIELDS.budget.options}
            />
          </div>

          {/* Row 4: Message */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 tracking-wide">
              {CONTACT_FORM_FIELDS.message.label}
            </label>
            <textarea
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder={CONTACT_FORM_FIELDS.message.placeholder}
              rows={4}
              className="w-full border-b border-slate-200 focus:border-brand-green bg-transparent text-sm text-slate-700 placeholder-slate-300 py-3 resize-y focus:outline-none transition-colors font-medium"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              className="bg-brand-green hover:bg-brand-green-hover text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4 shrink-0" />
              {CONTACT_FORM_FIELDS.submitLabel}
            </button>
            <button
              type="submit"
              className="w-11 h-11 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
              aria-label="Submit"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* ─── Right: Image with floating badge ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={scrollViewport}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden select-none"
        >
          <img
            src={heroBgWaterfront}
            alt="Modern waterfront property"
            className="w-full h-full object-cover"
          />

          {/* Floating Badge */}
          <div className="absolute top-5 right-5 bg-brand-green text-white text-[11px] font-extrabold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-lg">
            Hunian Impian
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Internal Sub-Components ─── */

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}

function FormField({ label, value, onChange, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold text-slate-800 tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-slate-200 focus:border-brand-green bg-transparent text-sm text-slate-700 placeholder-slate-300 py-3 focus:outline-none transition-colors font-medium"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  options: string[];
}

function SelectField({ label, value, onChange, placeholder, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-xs font-bold text-slate-800 tracking-wide">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-b border-slate-200 focus:border-brand-green bg-transparent text-sm text-slate-700 py-3 focus:outline-none transition-colors font-medium appearance-none cursor-pointer pr-8"
        >
          <option value="" disabled className="text-slate-300">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}
