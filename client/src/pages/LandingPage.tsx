import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import PropertyList from "../components/landing/PropertyList";
import Showcase from "../components/landing/Showcase";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-white font-sans overflow-x-hidden selection:bg-slate-200 selection:text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PropertyList />
        <Showcase />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
