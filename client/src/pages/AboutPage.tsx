import Footer from "../components/layout/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutBentoGrid from "../components/about/AboutBentoGrid";
import AboutWhyChooseUs from "../components/about/AboutWhyChooseUs";
import AboutPartners from "../components/about/AboutPartners";
import AboutTestimonial from "../components/about/AboutTestimonial";
import AboutCtaBanner from "../components/about/AboutCtaBanner";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden text-slate-800">
      <AboutHero />
      <AboutBentoGrid />
      <AboutWhyChooseUs />
      <AboutPartners />
      <AboutTestimonial />
      <AboutCtaBanner />
      <Footer />
    </div>
  );
}
