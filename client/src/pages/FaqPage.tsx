import { useState, useEffect } from "react";
import FaqHero from "../components/faq/FaqHero";
import FaqCategories from "../components/faq/FaqCategories";
import FaqCta from "../components/faq/FaqCta";
import Footer from "../components/layout/Footer";
import { FAQ_CATEGORIES } from "../constants/faq";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden text-slate-800">
      <FaqHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <FaqCategories categories={FAQ_CATEGORIES} searchQuery={searchQuery} />

      <FaqCta />

      <Footer />
    </div>
  );
}
