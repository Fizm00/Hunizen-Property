import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Calendar } from "lucide-react";
import { CONTACT_FORM_FIELDS } from "../../constants/contact";
import propStaggered1 from "../../assets/prop_staggered_1.png";
import { scrollViewport } from "../../lib/animations";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    occupants: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah dikirim! Tim kami akan segera menghubungi Anda.");
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      occupants: "",
      message: "",
    });
  };

  return (
    <section className="w-full bg-white pb-16 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center">
      <div className="w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 bg-[#F4F7F5] rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-6 justify-between"
        >
          <div className="flex flex-col gap-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                label={CONTACT_FORM_FIELDS.phone.label}
                value={form.phone}
                onChange={(v) => handleChange("phone", v)}
                placeholder={CONTACT_FORM_FIELDS.phone.placeholder}
                type="tel"
              />
              <SelectField
                label={CONTACT_FORM_FIELDS.service.label}
                value={form.service}
                onChange={(v) => handleChange("service", v)}
                placeholder={CONTACT_FORM_FIELDS.service.placeholder}
                options={CONTACT_FORM_FIELDS.service.options}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DateField
                label={CONTACT_FORM_FIELDS.date.label}
                value={form.date}
                onChange={(v) => handleChange("date", v)}
                placeholder={CONTACT_FORM_FIELDS.date.placeholder}
              />
              <FormField
                label={CONTACT_FORM_FIELDS.occupants.label}
                value={form.occupants}
                onChange={(v) => handleChange("occupants", v)}
                placeholder={CONTACT_FORM_FIELDS.occupants.placeholder}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-800 mb-1.5 block">
                {CONTACT_FORM_FIELDS.message.label}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder={CONTACT_FORM_FIELDS.message.placeholder}
                rows={4}
                className="w-full bg-[#E9ECE9] text-slate-800 placeholder-slate-400 text-sm font-medium rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all resize-none h-32"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              className="bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs tracking-wider uppercase h-12 px-8 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shadow-xs"
            >
              {CONTACT_FORM_FIELDS.submitLabel}
            </button>
            <button
              type="submit"
              className="w-12 h-12 rounded-full bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 shadow-xs"
              aria-label="Submit Form"
            >
              <ArrowUpRight className="w-5 h-5" strokeWidth={2.2} />
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={scrollViewport}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative w-full min-h-[400px] lg:min-h-full rounded-[32px] overflow-hidden select-none shadow-xs"
        >
          <img
            src={propStaggered1}
            alt="Premium residence"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-6 right-6 bg-brand-green text-white text-[10px] font-bold tracking-widest uppercase py-2.5 px-4 rounded-full shadow-md">
            Hunian Impian
          </div>
        </motion.div>

      </div>
    </section>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
}

function FormField({ label, value, onChange, placeholder, type = "text" }: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-slate-800 mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#E9ECE9] text-slate-800 placeholder-slate-400 text-sm font-medium rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all"
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
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-slate-800 mb-1.5 block">{label}</label>
      <div className="relative flex items-center">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#E9ECE9] text-slate-800 text-sm font-medium rounded-xl py-3.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-slate-400">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}

function DateField({ label, value, onChange, placeholder }: DateFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-slate-800 mb-1.5 block">{label}</label>
      <div className="relative flex items-center">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#E9ECE9] text-slate-800 placeholder-slate-400 text-sm font-medium rounded-xl py-3.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-all appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
        />
        <Calendar className="absolute right-4 w-4 h-4 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}
