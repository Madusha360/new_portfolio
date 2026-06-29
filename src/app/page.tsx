"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BestThings from "@/components/BestThings";
import ProjectGallery from "@/components/ProjectGallery";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Lock standard window scroll while loading is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {/* Intro Exhibition Loader Screen */}
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen">
        {/* Floating Glassmorphic Navbar */}
        <Navbar />

        {/* Main Exhibition Layout */}
        <main className="flex-grow">
          {/* Hero Section with Tech Stack Dock */}
          <Hero />

          {/* Curator's Statement About Section */}
          <About />

          {/* Best Specialties Section */}
          <BestThings />

          {/* Bento Grid Project Gallery */}
          <ProjectGallery />

          {/* Minimal Timeline Experience */}
          <ExperienceTimeline />

          {/* Curator Inquiry Desk Contact Section */}
          <ContactSection />
        </main>

        {/* Contact and Footer Details */}
        <Footer />
      </div>
    </>
  );
}
