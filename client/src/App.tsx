import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PropertyList from "./components/PropertyList";
import Showcase from "./components/Showcase";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import PropertyDetailPage from "./components/PropertyDetailPage";

function LandingPage() {
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

function App() {
  useLenis();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
    </Routes>
  );
}

export default App;

