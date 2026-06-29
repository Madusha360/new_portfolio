"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  span: string;
  index: string;
  image: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Background Dimmer Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Main Modal Panel */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl h-[90vh] md:h-[80vh] overflow-y-auto rounded-3xl border border-card-border bg-card-bg/95 backdrop-blur-lg shadow-2xl flex flex-col p-6 md:p-12"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-card-border hover:bg-background hover:text-accent transition-all duration-300 z-50 text-muted"
          aria-label="Close case study details"
        >
          <X size={16} />
        </button>

        {/* Modal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1 mt-6">
          
          {/* Column A: Artwork & Tech Details */}
          <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-video md:flex-1 min-h-[220px] rounded-2xl overflow-hidden border border-card-border bg-background shadow-inner">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-90 dark:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Structured Specifications Panel */}
            <div className="p-6 rounded-2xl border border-card-border bg-background/40 flex flex-col gap-4">
              <h4 className="text-[10px] font-mono tracking-widest text-accent uppercase pb-2 border-b border-card-border/60">
                system parameters
              </h4>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono">
                <div>
                  <span className="text-muted block text-[10px] uppercase mb-0.5">exhibition catalog</span>
                  <span className="text-foreground">{project.index}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase mb-0.5">context framework</span>
                  <span className="text-foreground">{project.category}</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase mb-0.5">latency audit</span>
                  <span className="text-foreground">&lt; 140ms load time</span>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase mb-0.5">lighthouse score</span>
                  <span className="text-accent font-semibold">100 / 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Project Content description */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase block mb-3">
                {project.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground mb-6">
                {project.title}
              </h2>
              
              <div className="prose prose-sm dark:prose-invert font-sans font-light text-muted leading-relaxed flex flex-col gap-4 text-sm">
                <p>
                  {project.description}
                </p>
                <p>
                  Architected with modular design tokens, this repository leverages static rendering techniques and dynamic routing. It enforces optimized image delivery and localized caching structures to guarantee reliable load performance globally.
                </p>
              </div>

              {/* Technologies list */}
              <div className="mt-8">
                <h4 className="text-[10px] font-mono tracking-widest text-accent uppercase mb-3">
                  integrated stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-muted bg-background border border-card-border rounded px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-card-border/60">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-wider hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md group/btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] group-hover/btn:rotate-12 transition-transform duration-300">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <span>view repository</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-full border border-card-border hover:bg-background font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground transition-all duration-300"
              >
                close
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
