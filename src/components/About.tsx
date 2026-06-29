"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto border-b border-card-border bg-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full"
      >
        {/* Left Column: Bold Serif Curator Quote */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-6 flex flex-col justify-start"
        >
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-6">
            01 / CURATOR&apos;S STATEMENT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground leading-[1.15]">
            &ldquo;I view code as a visual medium. Every <span className="italic text-accent font-normal">digital layout</span> is a canvas, and every clean architecture is the frame holding it up.&rdquo;
          </h2>
        </motion.div>

        {/* Right Column: Narrative Biography & Technical Criteria */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-6 flex flex-col gap-10 font-sans"
        >
          <div className="flex flex-col gap-6 text-muted leading-relaxed font-light text-base sm:text-lg">
            <p>
              As an aspiring Full-Stack Developer and IT undergraduate, I have hands-on experience building real-world web platforms and administration software using the MERN stack and Java. I bridge the gap between complex backend architectures and refined frontends.
            </p>
            <p>
              Skilled across both interface design and back-end database systems, I pride myself on a fast learning curve, strong teamwork, and a relentless drive to deliver impactful, production-ready software.
            </p>
          </div>

          {/* Exhibition Criteria Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-card-border/80">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-accent uppercase block mb-3">
                01 / CODE PRACTICE
              </span>
              <h3 className="text-base font-serif font-medium text-foreground mb-2">
                Type-Safe & Clean
              </h3>
              <p className="text-sm font-sans font-light text-muted leading-relaxed">
                Writing strictly-typed TypeScript and modular Kotlin elements ensuring predictability, safety, and rapid deployment.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider text-accent uppercase block mb-3">
                02 / ARCHITECTURE
              </span>
              <h3 className="text-base font-serif font-medium text-foreground mb-2">
                Low-Latency Edge
              </h3>
              <p className="text-sm font-sans font-light text-muted leading-relaxed">
                Leveraging Next.js server actions, edge caching topologies, and relational databases for smooth load times.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
