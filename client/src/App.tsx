import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis";

// Pages
import LandingPage from "./pages/LandingPage";
import SearchPage from "./pages/SearchPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import BookingPage from "./pages/BookingPage";

function App() {
  useLenis();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
      <Route path="/booking/:id" element={<BookingPage />} />
    </Routes>
  );
}

export default App;
