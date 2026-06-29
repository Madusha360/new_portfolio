"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

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

const fallbackProjects: Project[] = [
  {
    id: "cv-01",
    title: "Smart Campus Operations",
    category: "AUTH & NOTIFICATION",
    description: "Security system for user logins and a real-time notification panel for students and staff. Features Google Sign-In, encrypted data, and tracking.",
    tech: ["Spring Boot", "React.js", "MySQL"],
    link: "https://github.com/Madusha360",
    span: "md:col-span-1",
    index: "Featured 01",
    image: "/art-01.png"
  },
  {
    id: "cv-02",
    title: "UniCollab",
    category: "RESOURCE SHARING",
    description: "Centralized file-sharing hub and real-time alert panel to improve communication and track deadlines. Implemented smart uploads and auto-reminders.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/Madusha360",
    span: "md:col-span-1",
    index: "Featured 02",
    image: "/art-02.png"
  },
  {
    id: "cv-03",
    title: "Tea Factory Management",
    category: "MANAGEMENT SYSTEM",
    description: "Raw Material Management functionality to track and manage incoming materials. Implemented supply-form CRUD operations with a MERN-stack backend.",
    tech: ["Node.js", "React", "MongoDB"],
    link: "https://github.com/Madusha360",
    span: "md:col-span-1",
    index: "Featured 03",
    image: "/art-03.png"
  },
  {
    id: "01",
    title: "Art Gallary",
    category: "DIGITAL ART EXHIBITION",
    description: "An immersive digital art gallery exhibition platform. Showcases high-fidelity creative layouts, smooth transitions, interactive frames, and custom styling.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Madusha360/ArtGallary",
    span: "md:col-span-1",
    index: "Repository No. 01",
    image: "/art-01.png"
  },
  {
    id: "02",
    title: "Coffee Shop",
    category: "MOBILE E-COMMERCE",
    description: "A premium mobile application for a boutique coffee shop order system. Built with Kotlin, offering seamless menu browsing, cart management, and checkout flows.",
    tech: ["Kotlin", "Android SDK", "Jetpack Compose", "SQLite"],
    link: "https://github.com/Madusha360/Coffee-shop",
    span: "md:col-span-1",
    index: "Repository No. 02",
    image: "/art-02.png"
  },
  {
    id: "03",
    title: "Finance Tracker App",
    category: "PERSONAL UTILITY",
    description: "A personal finance tracking application designed for Android. Enables real-time expense monitoring, budget curation, and financial analytics dashboard.",
    tech: ["Kotlin", "Android Studio", "Material Design", "Coroutines"],
    link: "https://github.com/Madusha360/Finance-Tracker-App",
    span: "md:col-span-1",
    index: "Repository No. 03",
    image: "/art-03.png"
  },
  {
    id: "04",
    title: "IT23174344 Assignment01 ITPM",
    category: "ENTERPRISE PLANNING",
    description: "An advanced IT Project Management workspace assignment. Focuses on project lifecycle tracking, scope definitions, and schedule estimation frameworks.",
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS"],
    link: "https://github.com/Madusha360/IT23174344_Assignment01_ITPM",
    span: "md:col-span-1",
    index: "Repository No. 04",
    image: "/art-04.png"
  },
  {
    id: "05",
    title: "ITPM Assignment01 IT23174344",
    category: "COMPUTATIONAL ALGORITHMS",
    description: "A comprehensive project estimation and modeling engine. Built with Python, featuring mathematical models for project scope and resource optimization.",
    tech: ["Python", "NumPy", "Matplotlib", "Algorithms"],
    link: "https://github.com/Madusha360/ITPM_Assignment01_IT23174344",
    span: "md:col-span-1",
    index: "Repository No. 05",
    image: "/art-01.png"
  },
  {
    id: "06",
    title: "Lab01paf",
    category: "SYSTEMS ARCHITECTURE",
    description: "A practice-driven web application architecture lab. Showcases design patterns, RESTful API integrations, and secure backend routing handlers.",
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate"],
    link: "https://github.com/Madusha360/lab01paf",
    span: "md:col-span-1",
    index: "Repository No. 06",
    image: "/art-02.png"
  },
  {
    id: "07",
    title: "Madusha360",
    category: "WORKSPACE PROFILE",
    description: "A curated profile repository housing personal metrics, developer workspace customizations, and automated GitHub integrations.",
    tech: ["Markdown", "GitHub Actions", "Shell Scripting", "YAML"],
    link: "https://github.com/Madusha360/Madusha360",
    span: "md:col-span-1",
    index: "Repository No. 07",
    image: "/art-03.png"
  },
  {
    id: "08",
    title: "MadushaIsuranga",
    category: "PORTFOLIO HUB",
    description: "A professional portfolio hub representing software projects, academic timeline milestones, and creative engineering works.",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
    link: "https://github.com/Madusha360/MadushaIsuranga",
    span: "md:col-span-1",
    index: "Repository No. 08",
    image: "/art-04.png"
  },
  {
    id: "09",
    title: "Online StockMangement System Payment",
    category: "FINANCIAL INTEGRATION",
    description: "A robust payment integration layer for an online stock and inventory management ecosystem. Utilizes secure transaction processing.",
    tech: ["Java", "JavaScript", "Spring Boot", "Stripe API"],
    link: "https://github.com/Madusha360/Online_StockMangement_System_Payment",
    span: "md:col-span-1",
    index: "Repository No. 09",
    image: "/art-01.png"
  },
  {
    id: "10",
    title: "Wellnessapp",
    category: "HEALTHCARE UTILITY",
    description: "A modern health and wellness companion application built for Android. Tracks daily hydration, mindfulness, and fitness metrics.",
    tech: ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines"],
    link: "https://github.com/Madusha360/wellnessapp",
    span: "md:col-span-1",
    index: "Repository No. 10",
    image: "/art-02.png"
  }
];

const curatedProjectMetadata: Record<string, { category: string; description: string; tech: string[] }> = {
  "smart-campus-operations-hub": {
    category: "AUTH & NOTIFICATION",
    description: "Security system for user logins and a real-time notification panel for students and staff. Features Google Sign-In, encrypted data, and tracking.",
    tech: ["Spring Boot", "React.js", "MySQL"]
  },
  "unicollab": {
    category: "RESOURCE SHARING",
    description: "Centralized file-sharing hub and real-time alert panel to improve communication and track deadlines. Implemented smart uploads and auto-reminders.",
    tech: ["MongoDB", "Express", "React", "Node.js"]
  },
  "tea-factory-management-system": {
    category: "MANAGEMENT SYSTEM",
    description: "Raw Material Management functionality to track and manage incoming materials. Implemented supply-form CRUD operations with a MERN-stack backend.",
    tech: ["Node.js", "React", "MongoDB"]
  },
  "artgallary": {
    category: "DIGITAL ART EXHIBITION",
    description: "An immersive digital art gallery exhibition platform. Showcases high-fidelity creative layouts, smooth transitions, interactive frames, and custom styling.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  "coffee-shop": {
    category: "MOBILE E-COMMERCE",
    description: "A premium mobile application for a boutique coffee shop order system. Built with Kotlin, offering seamless menu browsing, cart management, and checkout flows.",
    tech: ["Kotlin", "Android SDK", "Jetpack Compose", "SQLite"]
  },
  "finance-tracker-app": {
    category: "PERSONAL UTILITY",
    description: "A personal finance tracking application designed for Android. Enables real-time expense monitoring, budget curation, and financial analytics dashboard.",
    tech: ["Kotlin", "Android Studio", "Material Design", "Coroutines"]
  },
  "it23174344_assignment01_itpm": {
    category: "ENTERPRISE PLANNING",
    description: "An advanced IT Project Management workspace assignment. Focuses on project lifecycle tracking, scope definitions, and schedule estimation frameworks.",
    tech: ["TypeScript", "React", "Node.js", "Tailwind CSS"]
  },
  "itpm_assignment01_it23174344": {
    category: "COMPUTATIONAL ALGORITHMS",
    description: "A comprehensive project estimation and modeling engine. Built with Python, featuring mathematical models for project scope and resource optimization.",
    tech: ["Python", "NumPy", "Matplotlib", "Algorithms"]
  },
  "lab01paf": {
    category: "SYSTEMS ARCHITECTURE",
    description: "A practice-driven web application architecture lab. Showcases design patterns, RESTful API integrations, and secure backend routing handlers.",
    tech: ["Java", "Spring Boot", "MySQL", "Hibernate"]
  },
  "madusha360": {
    category: "WORKSPACE PROFILE",
    description: "A curated profile repository housing personal metrics, developer workspace customizations, and automated GitHub integrations.",
    tech: ["Markdown", "GitHub Actions", "Shell Scripting", "YAML"]
  },
  "madushaisuranga": {
    category: "PORTFOLIO HUB",
    description: "A professional portfolio hub representing software projects, academic timeline milestones, and creative engineering works.",
    tech: ["TypeScript", "Next.js", "React", "Tailwind CSS"]
  },
  "online_stockmangement_system_payment": {
    category: "FINANCIAL INTEGRATION",
    description: "A robust payment integration layer for an online stock and inventory management ecosystem. Utilizes secure transaction processing.",
    tech: ["Java", "JavaScript", "Spring Boot", "Stripe API"]
  },
  "wellnessapp": {
    category: "HEALTHCARE UTILITY",
    description: "A modern health and wellness companion application built for Android. Tracks daily hydration, mindfulness, and fitness metrics.",
    tech: ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines"]
  }
};

function cleanRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function ProjectCardSkeleton() {
  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-card-border bg-card-bg/15 p-8 animate-pulse h-[540px]">
      <div className="flex flex-col justify-between h-full w-full">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="h-2.5 w-20 bg-muted/20 rounded" />
            <div className="h-2.5 w-24 bg-muted/20 rounded" />
          </div>
          <div className="h-6 w-48 bg-muted/20 rounded mb-4" />
          <div className="h-4 w-full bg-muted/15 rounded mb-2" />
          <div className="h-4 w-3/4 bg-muted/15 rounded" />
        </div>

        {/* Skeleton Artwork Frame */}
        <div className="bg-muted/10 rounded-2xl border border-card-border/40 w-full h-44 mt-6" />

        <div className="flex flex-col gap-4 pt-6 border-t border-card-border/40 mt-6">
          <div className="flex gap-2">
            <div className="h-6 w-12 bg-muted/20 rounded" />
            <div className="h-6 w-16 bg-muted/20 rounded" />
          </div>
          <div className="h-4 w-24 bg-muted/20 rounded" />
        </div>
      </div>
    </div>
  );
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  fork: boolean;
  language: string | null;
}

export default function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setProjectsList(fallbackProjects);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("https://api.github.com/users/Madusha360/repos?sort=updated&per_page=100");
        if (!res.ok) {
          throw new Error("Failed to fetch repositories from GitHub");
        }
        
        const data = await res.json() as GitHubRepo[];
        // Filter out forked repositories, displaying only original works
        const originalRepos = data.filter((repo) => !repo.fork);

        if (originalRepos.length === 0) {
          setProjectsList(fallbackProjects);
          setLoading(false);
          return;
        }

        // Map all public repositories
        const mappedProjects = originalRepos.map((repo, idx) => {
          const lowerName = repo.name.toLowerCase();
          const curated = curatedProjectMetadata[lowerName];
          
          const title = curated ? cleanRepoName(repo.name) : cleanRepoName(repo.name);
          const category = curated?.category || (repo.language || "Software").toUpperCase();
          const description = curated?.description || repo.description || "A dynamic full-stack repository created and maintained on GitHub. Showcases clean modular architecture.";
          const techTags = curated?.tech || (repo.topics && repo.topics.length > 0
            ? repo.topics.slice(0, 3)
            : [repo.language || "TypeScript", "React", "CSS"].filter(Boolean));

          const imageIndex = (idx % 4) + 1;

          return {
            id: String(idx + 1).padStart(2, "0"),
            title,
            category,
            description,
            tech: techTags,
            link: repo.html_url,
            span: "md:col-span-1",
            index: `Repository No. ${String(idx + 1).padStart(2, "0")}`,
            image: `/art-0${imageIndex}.png`
          };
        });

        setProjectsList(mappedProjects);
      } catch (err) {
        console.warn("Could not load dynamic GitHub projects, using local fallback.", err);
        // Graceful fallback to high-quality mock data
        setProjectsList(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
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
    <section id="projects" className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto border-b border-card-border">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
            selected works
          </span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground">
            Project Gallery
          </h2>
        </div>
        <p className="text-sm font-sans font-light text-muted max-w-xs leading-relaxed">
          A dynamic exhibition wall of projects fetched directly from GitHub, paired with curated abstract artwork prints.
        </p>
      </div>

      {/* Bento Grid (Uniform 3-Column Layout) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {loading ? (
          <>
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </>
        ) : (
          projectsList.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              data-cursor="project"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-card-border bg-card-bg/25 p-8 transition-all duration-500 hover:bg-card-bg/50 hover:border-accent/25 hover:shadow-[0_12px_40px_rgba(111,95,77,0.03)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] h-[540px] cursor-pointer"
            >
              {/* Dynamic Inner Layout */}
              <div className="flex flex-col justify-between h-full w-full relative z-10">
                
                {/* Content Details Column */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-6 text-[10px] font-mono tracking-wider text-muted">
                      <span>{project.index}</span>
                      <span className="uppercase">{project.category}</span>
                    </div>

                    <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm font-sans font-light text-muted leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags & Actions */}
                  <div className="mt-auto pt-6 border-t border-card-border">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-muted bg-card-bg border border-card-border rounded px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs font-mono tracking-wider text-muted hover:text-foreground hover:gap-3 transition-all duration-300 group/link uppercase"
                    >
                      <span>view project</span>
                      <ArrowUpRight size={14} className="text-accent group-hover/link:text-foreground transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Framed Graphic Column */}
                <div className="relative w-full h-44 mt-6 overflow-hidden rounded-2xl border border-card-border bg-background shadow-inner transition-all duration-500 group-hover:border-accent/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-80 dark:opacity-70 group-hover:opacity-100 dark:group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-[0.16, 1, 0.3, 1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                </div>

              </div>

              {/* Decorative Glow accent border on hover */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent translate-y-[2px] group-hover:translate-y-0 transition-transform duration-500" />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Dynamic Project Details Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
