import { useState, useEffect } from "react";
import FaqHero from "../components/faq/FaqHero";
import FaqCategories from "../components/faq/FaqCategories";
import FaqCta from "../components/faq/FaqCta";
import Footer from "../components/layout/Footer";
import { FAQ_CATEGORIES } from "../constants/faq";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Smoothly scroll to the top of the page when loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden text-slate-800">
      {/* FAQ Hero Section with transparent navbar and search capability */}
      <FaqHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* FAQ Accordions grouped by category */}
      <FaqCategories categories={FAQ_CATEGORIES} searchQuery={searchQuery} />

      {/* Still Have Questions CTA Banner */}
      <FaqCta />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
