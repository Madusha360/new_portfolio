"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Layout, Database, Smartphone, Zap } from "lucide-react";

interface SpecialtyCardProps {
  title: string;
  category: string;
  description: string;
  metric: string;
  brandColor: string;
  icon: React.ReactNode;
  svgGlowGradId: string;
  details: string[];
}

const specialties: SpecialtyCardProps[] = [
  {
    title: "Next.js & Frontend Engineering",
    category: "01 / WEB ARCHITECT",
    description: "Designing high-fidelity, fluid web platforms utilizing React 19, Server Components, server actions, and client-side hydration optimizations.",
    metric: "CORE WEB VITALS: 100%",
    brandColor: "#A5A5A5",
    icon: <Layout className="w-5 h-5" />,
    svgGlowGradId: "nextGlow",
    details: ["Hydration optimization", "Type-safe routing states", "Lenis & Framer timelines"]
  },
  {
    title: "Native Kotlin Mobile Systems",
    category: "02 / MOBILE ENGINEER",
    description: "Developing modern native Android application spaces using Jetpack Compose, asynchronous Coroutines, and local SQLite caching models.",
    metric: "SDK SUPPORT: API 21-34+",
    brandColor: "#7F52FF",
    icon: <Smartphone className="w-5 h-5" />,
    svgGlowGradId: "kotlinGlow",
    details: ["Jetpack Compose architectures", "Room DB offline caching", "Multi-threaded state systems"]
  },
  {
    title: "Low-Latency Systems Logic",
    category: "03 / SYSTEM DEVELOPER",
    description: "Engineering secure back-end platforms and API routing endpoints leveraging Node.js streams, Spring Boot JPA, and Python computational routines.",
    metric: "API RESPONSE TIME: <50MS",
    brandColor: "#6DB33F",
    icon: <Cpu className="w-5 h-5" />,
    svgGlowGradId: "nodeGlow",
    details: ["RESTful & Event APIs", "Secure OAuth2 policies", "Microservice database indices"]
  },
  {
    title: "Relational Database Design",
    category: "04 / DATABASE ADMIN",
    description: "Designing structured relational schemas, query tuning, high-performance indexing, and secure persistent transaction layers.",
    metric: "QUERY SPEED: SUB-SECOND",
    brandColor: "#4169E1",
    icon: <Database className="w-5 h-5" />,
    svgGlowGradId: "postgresGlow",
    details: ["Complex query optimizations", "Foreign-key indexing audits", "High-concurrency pool management"]
  }
];

export default function BestThings() {
  return (
    <section id="specialties" className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto border-b border-card-border bg-background">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
            my best specialties
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground">
            Curator&apos;s Elite Stack
          </h2>
        </div>
        <p className="text-sm font-sans font-light text-muted max-w-xs leading-relaxed">
          Detailed breakdown of top core domains, featuring technical metrics and matching brand-color micro-interactions.
        </p>
      </div>

      {/* Grid of Specialty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {specialties.map((spec, idx) => (
          <SpecialtyCard key={idx} {...spec} />
        ))}
      </div>
    </section>
  );
}

function SpecialtyCard({
  title,
  category,
  description,
  metric,
  brandColor,
  icon,
  svgGlowGradId,
  details
}: SpecialtyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl border transition-all duration-500 overflow-hidden cursor-crosshair group h-[380px] bg-card-bg/25"
      style={{
        borderColor: hovered ? `${brandColor}40` : "var(--card-border)",
        boxShadow: hovered ? `0 20px 40px -15px ${brandColor}18` : "none",
        perspective: 1000,
      }}
    >
      {/* 3D Parallax Inner Content */}
      <motion.div
        animate={{
          rotateX: coords.y * -12,
          rotateY: coords.x * 12,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="w-full h-full p-8 flex flex-col justify-between relative z-10 select-none"
      >
        {/* Top Section */}
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono tracking-wider text-muted/80">{category}</span>
            <div
              className="p-2.5 rounded-xl border transition-all duration-500"
              style={{
                borderColor: hovered ? `${brandColor}50` : "var(--card-border)",
                backgroundColor: hovered ? `${brandColor}0d` : "var(--card-bg)/30",
                color: hovered ? brandColor : "var(--muted)",
              }}
            >
              {icon}
            </div>
          </div>

          <h3
            className="text-2xl font-serif text-foreground mb-4 transition-colors duration-500"
            style={{ color: hovered ? brandColor : "var(--foreground)" }}
          >
            {title}
          </h3>
          <p className="text-sm font-sans font-light text-muted leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-card-border/60 pt-6 mt-6 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono tracking-wider text-muted uppercase">Key Competencies</span>
            <div className="flex flex-wrap gap-1.5">
              {details.map((det, dIdx) => (
                <span
                  key={dIdx}
                  className="text-[9px] font-mono px-2 py-0.5 rounded border border-card-border bg-card-bg/50 text-muted/90"
                >
                  {det}
                </span>
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-mono font-medium shadow-sm transition-all duration-500"
            style={{
              borderColor: hovered ? `${brandColor}40` : "var(--card-border)",
              backgroundColor: hovered ? `${brandColor}0f` : "var(--card-bg)/20",
              color: hovered ? brandColor : "var(--accent)",
            }}
          >
            <Zap size={10} className="animate-pulse" />
            <span>{metric}</span>
          </div>
        </div>
      </motion.div>

      {/* Embedded Ambient SVGs behind Content */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.04] group-hover:opacity-[0.16] transition-all duration-700 ease-out group-hover:scale-105"
        >
          <circle cx="100" cy="100" r="75" fill={`url(#${svgGlowGradId})`} />
          <circle cx="100" cy="100" r="85" stroke={brandColor} strokeWidth="0.4" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="62" stroke={brandColor} strokeWidth="0.4" />
          <circle cx="100" cy="100" r="48" stroke={brandColor} strokeWidth="0.4" strokeDasharray="2 4" />
          <line x1="100" y1="15" x2="100" y2="185" stroke={brandColor} strokeWidth="0.4" opacity="0.3" />
          <line x1="15" y1="100" x2="185" y2="100" stroke={brandColor} strokeWidth="0.4" opacity="0.3" />
          <defs>
            <radialGradient
              id={svgGlowGradId}
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              transform="translate(100 100) rotate(90) scale(75)"
            >
              <stop offset="0%" stopColor={brandColor} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Hover Ambient Neon Radial Backlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            background: `radial-gradient(circle at 80% 80%, ${brandColor}06 0%, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
}
