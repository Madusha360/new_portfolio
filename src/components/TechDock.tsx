"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

interface TechIcon {
  name: string;
  category: string[];
  icon: React.ReactNode;
  brandColor: string;
  isBest?: boolean;
}

// SVGs for all 16 Tech Stack Icons
const techIcons: TechIcon[] = [
  {
    name: "Next.js",
    category: ["web"],
    brandColor: "#A5A5A5",
    isBest: true,
    icon: (
      <svg viewBox="0 0 180 180" fill="none" className="w-full h-full stroke-current">
        <circle cx="90" cy="90" r="85" strokeWidth="6" />
        <path
          d="M141.5 141.5L80 60H65V120H75V76.5L130.5 146C134.3 144.7 138 143.2 141.5 141.5Z"
          fill="currentColor"
        />
        <rect x="110" y="60" width="10" height="60" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "React",
    category: ["web"],
    brandColor: "#61DAFB",
    isBest: true,
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" className="w-full h-full stroke-current">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: ["web"],
    brandColor: "#3178C6",
    isBest: true,
    icon: (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-current">
        <rect x="5" y="5" width="90" height="90" rx="10" strokeWidth="6" />
        <path d="M30 35H55V43H47V80H38V43H30V35Z" fill="currentColor" />
        <path d="M58 66C58 60 62 55 69 55C75 55 79 58 79 64C79 74 61 72 61 80C61 83 64 86 69 86C75 86 79 81 79 76" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: ["web"],
    brandColor: "#38BDF8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current">
        <path
          d="M12 6.018C13.8 3.618 16.5 3 20.1 4.218C21 8.418 18.9 11.418 13.8 13.218C12 15.618 9.3 16.218 5.7 15.018C4.8 10.818 6.9 7.818 12 6.018Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3 11.418C19.5 9.818 21.3 9.418 23.7 10.218C24.3 13.018 22.9 15.018 19.5 16.218C18.3 17.818 16.5 18.218 14.1 17.418C13.5 14.618 14.9 12.618 18.3 11.418Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Kotlin",
    category: ["mobile"],
    brandColor: "#7F52FF",
    isBest: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M2 22V2h20L12 12l10 10H2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Android SDK",
    category: ["mobile"],
    brandColor: "#3DDC84",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M5 10a7 7 0 0 1 14 0v5a7 7 0 0 1-14 0v-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 5l-1-2M15 5l1-2" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1.2" fill="currentColor" />
        <circle cx="15" cy="10" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: ["systems"],
    brandColor: "#339933",
    isBest: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current">
        <path
          d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zM12 6.5l6.5 3.6v7.3L12 21l-6.5-3.6v-7.3L12 6.5z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 6.5v14.5" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: "Java",
    category: ["systems"],
    brandColor: "#F89820",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M12 21c4.5 0 8-1.5 8-3s-3.5-3-8-3-8 1.5-8 3 3.5 3 8 3z" />
        <path d="M8 15c0-2.5 3-4.5 3-6.5S10 4 10 2" strokeLinecap="round" />
        <path d="M14 14c0-2 2.5-3.5 2.5-5.5S14.5 4 14.5 2" strokeLinecap="round" />
        <path d="M5 17c3 1 11 1 14 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Spring Boot",
    category: ["systems"],
    brandColor: "#6DB33F",
    isBest: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8 7.5 9.5.5.2 1-.2 1-.7v-4c0-.5-.5-1-1-1-2 0-3.5-1.5-3.5-3.5 0-1.5.8-2.8 2-3.3" strokeLinecap="round" />
        <path d="M12 5c2.5 0 4.5 2 4.5 4.5 0 1.5-.8 2.8-2 3.3" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: ["systems"],
    brandColor: "#3776AB",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M12 2v6a4 4 0 0 1-4 4H2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22v-6a4 4 0 0 1 4-4h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: ["databases"],
    brandColor: "#47A248",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current">
        <path
          d="M12 2C12 2 6 7 6 12C6 16.5 9 19.5 12 22C15 19.5 18 16.5 18 12C18 7 12 2 12 2Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 2V22" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: ["databases"],
    brandColor: "#4169E1",
    isBest: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M12 3c-4.5 0-8 1.8-8 4s3.5 4 8 4 8-1.8 8-4-3.5-4-8-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 7v5c0 2.2 3.5 4 8 4s8-1.8 8-4V7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12v5c0 2.2 3.5 4 8 4s8-1.8 8-4v-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    category: ["databases"],
    brandColor: "#00758F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.5 0 4.8-.9 6.5-2.5" strokeLinecap="round" />
        <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "SQLite",
    category: ["databases", "mobile"],
    brandColor: "#003B57",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        <rect x="2" y="2" width="20" height="20" rx="4" />
      </svg>
    ),
  },
  {
    name: "Git",
    category: ["systems"],
    brandColor: "#F05032",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current">
        <circle cx="5" cy="12" r="3" strokeWidth="1.5" />
        <circle cx="19" cy="12" r="3" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path d="M8 12h1" strokeWidth="1.5" />
        <path d="M15 12h1" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    category: ["web"],
    brandColor: "#FF00C1",
    isBest: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current">
        <path
          d="M0 0h24v24H0z"
          fill="none"
        />
        <path
          d="M12 12L6 6h12l-6 6zm0 0l6 6H6l6-6z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Figma",
    category: ["web", "mobile"],
    brandColor: "#F24E1E",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <circle cx="8" cy="6" r="4" />
        <circle cx="16" cy="6" r="4" />
        <circle cx="8" cy="14" r="4" />
        <circle cx="16" cy="14" r="4" />
        <path d="M8 10v8a4 4 0 0 0 8 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PHP",
    category: ["systems", "web"],
    brandColor: "#777BB4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <path d="M7 10v4" strokeLinecap="round" />
        <path d="M7 12h1.5a1.5 1.5 0 0 0 0-3H7" strokeLinecap="round" />
        <path d="M12 10v4" strokeLinecap="round" />
        <path d="M12 12h1.5" strokeLinecap="round" />
        <path d="M15 10h1.5a1.5 1.5 0 0 1 0 3H15v1" strokeLinecap="round" />
      </svg>
    ),
  },
];

const categories = [
  { id: "all", label: "all" },
  { id: "best", label: "★ best" },
  { id: "web", label: "web" },
  { id: "mobile", label: "mobile" },
  { id: "systems", label: "systems" },
  { id: "databases", label: "databases" },
];

export default function TechDock() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const mouseX = useMotionValue(Infinity);

  const filteredIcons = techIcons.filter(
    (tech) =>
      activeCategory === "all" ||
      (activeCategory === "best" ? tech.isBest : tech.category.includes(activeCategory))
  );

  return (
    <div className="flex flex-col items-center gap-6 mt-12 w-full">
      <p className="text-[10px] font-mono tracking-widest text-muted uppercase">
        tech stack & tools
      </p>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 bg-card-bg/15 border border-card-border/60 rounded-full p-1 text-[8px] font-mono tracking-widest uppercase">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-accent text-background font-medium"
                : "text-muted hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* The Dock Grid */}
      <motion.div
        layout
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 px-4 py-3 rounded-2xl border border-card-border bg-card-bg/30 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.1)] min-h-[68px]"
      >
        {filteredIcons.map((tech) => (
          <DockIcon key={tech.name} mouseX={mouseX} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  tech,
}: {
  mouseX: MotionValue<number>;
  tech: TechIcon;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Measure the distance from the mouse to the center of the icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // Adjust mouse value (pageX) relative to screen scroll position
    const scrollX = typeof window !== "undefined" ? window.scrollX : 0;
    const iconCenterX = bounds.x + bounds.width / 2 + scrollX;
    return val - iconCenterX;
  });

  // Calculate size based on distance (magnify when closer)
  const widthTransform = useTransform(distance, [-100, 0, 100], [42, 60, 42]);
  const heightTransform = useTransform(distance, [-100, 0, 100], [42, 60, 42]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 250,
    damping: 18,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 250,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width,
        height,
        borderColor: hovered ? tech.brandColor : "var(--card-border)",
        color: hovered ? tech.brandColor : "var(--muted)",
        backgroundColor: hovered ? `${tech.brandColor}0e` : "var(--card-bg)",
        boxShadow: hovered ? `0 0 16px ${tech.brandColor}2b` : "none",
        transition: "border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="relative flex items-center justify-center rounded-xl border cursor-help group"
    >
      <div className="w-1/2 h-1/2 flex items-center justify-center">
        {tech.icon}
      </div>

      {tech.isBest && (
        <span
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full shadow-sm"
          style={{
            backgroundColor: tech.brandColor,
            boxShadow: `0 0 4px ${tech.brandColor}`,
          }}
        />
      )}
      
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-1 text-[10px] font-mono tracking-wider rounded bg-foreground text-background whitespace-nowrap shadow-md uppercase z-20">
        {tech.name}
      </span>
    </motion.div>
  );
}

