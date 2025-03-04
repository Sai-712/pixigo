import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import UploadImage from './components/UploadImage';
import UploadSelfie from './components/UploadSelfie';
import { GoogleAuthConfig } from './config/GoogleAuthConfig';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <GoogleAuthConfig>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <Features />
                <Testimonials />
                <Pricing />
                <FAQ />
              </main>
            } />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/upload_selfie" element={<UploadSelfie />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GoogleAuthConfig>
  );
}

export default App;