import { useEffect } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactCta from "../components/contact/ContactCta";
import Footer from "../components/layout/Footer";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden text-slate-800">
      <ContactHero />

      <ContactForm />

      <ContactInfo />

      <ContactCta />

      <Footer />
    </div>
  );
}
