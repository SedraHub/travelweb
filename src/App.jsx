import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>


      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;