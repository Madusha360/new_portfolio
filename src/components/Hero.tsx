"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, FileText, ArrowDown } from "lucide-react";
import Image from "next/image";
import TechDock from "./TechDock";

const socialLinks = [
  {
    href: "https://github.com/Madusha360",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    label: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/madu-isuranga-ab129a234",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn"
  },
  {
    href: "https://wa.me/447829620808",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    label: "WhatsApp"
  },
  { href: "mailto:isurangamadusha476@gmail.com", icon: <Mail size={18} />, label: "Email" },
  { href: "/resume-1.pdf", icon: <FileText size={18} />, label: "Resume 1" },
  { href: "/resume-2.pdf", icon: <FileText size={18} />, label: "Resume 2" },
];

export default function Hero() {
  const [time, setTime] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateClock = () => {
      const colomboTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(colomboTime);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-6 py-24 lg:py-32 bg-grid-pattern overflow-hidden border-b border-card-border"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent/5 dark:bg-accent/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full bg-accent/5 dark:bg-accent/2 blur-3xl pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl flex flex-col gap-12 lg:gap-16"
      >
        {/* Asymmetric Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Metadata Badges row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 mb-8 text-[9px] font-mono tracking-wider"
            >
              <div className="flex items-center gap-2 bg-accent/8 border border-accent/25 rounded-full px-3.5 py-1 text-accent shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="uppercase font-medium">AVAILABLE FOR WORK</span>
              </div>
              
              <div className="text-muted flex items-center gap-2 bg-card-bg/25 border border-card-border/60 rounded-full px-3.5 py-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[10px] h-[10px] text-accent">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                </svg>
                <span className="font-light">COLOMBO, LK</span>
                {time && (
                  <>
                    <span className="opacity-30">|</span>
                    <span className="text-foreground font-light tabular-nums">{time}</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* Headline statement */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-[64px] font-serif font-medium tracking-tight text-foreground leading-[1.08] mb-8"
            >
              Building scalable <br />
              <span className="italic font-light text-accent bg-gradient-to-r from-accent via-accent/85 to-accent/95 bg-clip-text text-transparent">full-stack</span> applications <br />
              with elegant code.
            </motion.h1>

            {/* Bio paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted/95 max-w-xl leading-relaxed mb-10 font-sans font-light tracking-wide"
            >
              A minimalist developer designing fluid digital spaces where clean architecture 
              meets premium visual aesthetics. Specializing in Next.js, React, Node.js, and high-fidelity micro-interactions.
            </motion.p>

            {/* Social Links as Premium Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2.5 text-xs font-mono tracking-wider text-muted hover:text-foreground bg-card-bg/15 hover:bg-card-bg/40 border border-card-border hover:border-accent/40 px-4.5 py-2.5 rounded-full transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(111,95,77,0.04)] hover:-translate-y-0.5 group"
                  aria-label={link.label}
                >
                  <span className="text-muted/80 group-hover:text-accent transition-colors duration-200">
                    {link.icon}
                  </span>
                  <span className="font-light">{link.label}</span>
                </a>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Interactive Digital Art Frame */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center items-center w-full"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-3xl border border-card-border bg-card-bg/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-accent/25 hover:bg-card-bg/20 backdrop-blur-[6px] cursor-crosshair group"
              style={{ perspective: 1000 }}
            >
              {/* Profile Portrait Image as Frame Background */}
              <Image
                src="/portrait.png"
                alt="Madusha Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-80 group-hover:opacity-90 transition-all duration-500 ease-out z-0 select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
                priority
              />

              {/* Tint / Gradient overlays on top of portrait image */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/25 mix-blend-multiply pointer-events-none z-0" />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/5 mix-blend-overlay pointer-events-none z-0" />

              {/* Top border text indicators */}
              <div className="flex justify-between items-center text-[8px] font-mono tracking-wider text-muted/70 select-none relative z-10">
                <span>[ FRAME NO. 00 ]</span>
                <span>[ ARTIST PORTRAIT ]</span>
              </div>

              {/* Dynamic Parallax Graphic */}
              <motion.div
                animate={{
                  rotateX: coords.y * -22,
                  rotateY: coords.x * 22,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="w-full flex-grow flex items-center justify-center relative py-6 z-10"
              >
                {/* Embedded Astrolabe / Blueprint Geometric Vector Art */}
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4/5 h-4/5 filter drop-shadow-[0_8px_32px_rgba(0,0,0,0.25)] opacity-30 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
                >
                  {/* Glowing core background */}
                  <circle cx="100" cy="100" r="75" fill="url(#artGrad)" opacity="0.12" />

                  {/* Concentric blueprint reference circles */}
                  <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="0.4" className="text-card-border" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.4" className="text-card-border" />
                  <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="0.4" className="text-card-border" strokeDasharray="4 8" />
                  <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="0.4" className="text-card-border" />
                  <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="0.4" className="text-card-border" strokeDasharray="1 3" />

                  {/* Fine technical radial degrees scales ticks */}
                  <g className="text-card-border/60" stroke="currentColor" strokeWidth="0.5">
                    <line x1="100" y1="12" x2="100" y2="18" />
                    <line x1="100" y1="182" x2="100" y2="188" />
                    <line x1="12" y1="100" x2="18" y2="100" />
                    <line x1="182" y1="100" x2="188" y2="100" />
                    {/* 45 degree ticks */}
                    <line x1="38" y1="38" x2="43" y2="43" />
                    <line x1="157" y1="157" x2="162" y2="162" />
                    <line x1="162" y1="38" x2="157" y2="43" />
                    <line x1="43" y1="157" x2="38" y2="162" />
                  </g>

                  {/* Main cursor coordinate indicators */}
                  <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="0.4" className="text-card-border/50" />
                  <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="0.4" className="text-card-border/50" />

                  {/* Outer mechanical gear ring (Counter-clockwise rotation) */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="75"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    className="text-accent/25"
                    strokeDasharray="8 20 4 20"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                  />

                  {/* Core astronomical orbit scale (Clockwise rotation) */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="62"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-accent/40"
                    strokeDasharray="30 15 10 15"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                  />

                  {/* Inner technical rings */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent/60"
                    strokeDasharray="4 92"
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                  />

                  {/* Curated central geometry structure */}
                  <rect x="75" y="75" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" className="text-accent/25" />
                  <rect x="75" y="75" width="50" height="50" rx="6" stroke="currentColor" strokeWidth="0.8" className="text-accent/15" transform="rotate(45 100 100)" />
                  
                  <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="1" className="text-accent" />
                  <circle cx="100" cy="100" r="4" fill="currentColor" className="text-accent" />

                  {/* Framing crosshair indicators */}
                  <path d="M60 60h12v12M140 60h-12v12M60 140h12v-12M140 140h-12v-12" stroke="currentColor" strokeWidth="0.8" className="text-accent" />

                  {/* Gradients */}
                  <defs>
                    <radialGradient id="artGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(100 100) rotate(90) scale(75)">
                      <stop offset="0%" stopColor="var(--accent)" />
                      <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Subtle glassmorphic reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
              </motion.div>

              {/* Bottom footer text indicators inside the frame */}
              <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-muted/70 select-none border-t border-card-border pt-4 relative z-10">
                <span>[ COORD: X_{(coords.x * 100).toFixed(0)}, Y_{(coords.y * 100).toFixed(0)} ]</span>
                <span>[ SCALE 1.00 ]</span>
              </div>

              {/* Ambient background hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
            </div>
          </motion.div>

        </div>

        {/* Bottom Section: Full Width Tech Dock */}
        <motion.div
          variants={itemVariants}
          className="w-full pt-8 border-t border-card-border/50 flex flex-col items-center"
        >
          <TechDock />
        </motion.div>

        {/* Scroll down Indicator */}
        <motion.button
          variants={itemVariants}
          onClick={handleExploreClick}
          className="mx-auto text-muted hover:text-foreground flex flex-col items-center gap-2 text-[10px] font-mono tracking-widest uppercase transition-colors duration-200 group cursor-pointer"
        >
          <span>explore exhibition</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-accent group-hover:text-foreground transition-colors duration-200"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.button>

      </motion.div>
    </section>
  );
}
