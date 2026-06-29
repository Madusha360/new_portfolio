"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ExperienceItem {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    period: "JAN 2026 — JUL 2026",
    role: "Full Stack Developer",
    company: "SRI LANKA TELECOM",
    description: [
      "Engineered and maintained internal web systems using modern full-stack architectures, collaborating with senior engineering teams.",
      "Developed responsive, high-performance user interfaces and integrated secure backend RESTful APIs.",
      "Optimized SQL database query performances and streamlined local development build workflows."
    ]
  },
  {
    id: 2,
    period: "JUL 2023 — PRESENT",
    role: "B.Sc. (Hons.) in Information Technology",
    company: "SRI LANKA INSTITUTE OF INFORMATION TECHNOLOGY (SLIIT)",
    description: [
      "Specializing in Information Technology, maintaining a strong academic record.",
      "Developed diverse software architectures, covering stock management, finance tracking, and mobile e-commerce systems.",
      "Collaborated on team-based software engineering projects, implementing agile methodologies and robust version control."
    ]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the container to animate the vertical drawing line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto border-b border-card-border">
      {/* Section Header */}
      <div className="mb-20">
        <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
          my professional timeline
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground">
          Work Experience
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
        {/* The Animated Vertical Timeline Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-card-border" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-accent origin-top"
        />

        {/* Timeline Items */}
        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative pl-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 group"
            >
              {/* Timeline dot node */}
              <div className="absolute left-1.5 top-2.5 w-[11px] h-[11px] rounded-full border-2 border-background bg-card-bg group-hover:bg-accent transition-colors duration-300 z-10" />

              {/* Year Period */}
              <div className="md:col-span-1 pt-1">
                <span className="text-xs font-mono tracking-wider text-muted font-light group-hover:text-accent transition-colors duration-300">
                  {exp.period}
                </span>
              </div>

              {/* Details Content */}
              <div className="md:col-span-3">
                <h3 className="text-lg md:text-xl font-serif text-foreground font-medium mb-1">
                  {exp.role}
                </h3>
                <h4 className="text-xs font-mono tracking-wider text-accent uppercase mb-6">
                  {exp.company}
                </h4>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-3 font-sans font-light text-muted text-sm leading-relaxed">
                  {exp.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-3">
                      <span className="text-accent select-none mt-1 font-mono text-[10px]">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
