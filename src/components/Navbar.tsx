"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Compass } from "lucide-react";
import { useTheme, Theme } from "./ThemeContext";

const navItems = [
  { id: "home", label: "home", num: "01" },
  { id: "about", label: "about", num: "02" },
  { id: "projects", label: "projects", num: "03" },
  { id: "experience", label: "experience", num: "04" },
  { id: "contact", label: "contact", num: "05" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection observer behavior for active navigation item
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      setMobileMenuOpen(false);
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
        <motion.div
          className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-500 ${
            scrolled
              ? "bg-nav-bg backdrop-blur-md border-card-border shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
              : "bg-transparent border-transparent"
          }`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "home")}
            className="group flex items-center gap-1 font-serif text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <span className="text-accent font-light">M</span>
            <span className="font-serif">IS</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="relative py-1 text-sm font-sans tracking-wide text-muted hover:text-foreground transition-colors duration-200 group"
              >
                <span className="text-[10px] font-mono mr-1.5 opacity-60 group-hover:text-accent transition-colors duration-200">
                  {item.num}
                </span>
                <span className="capitalize">{item.label}</span>
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Area (Theme toggle & Mobile menu) */}
          <div className="flex items-center gap-4">
            
            {/* Unified Theme Cycle Button */}
            <button
              onClick={() => {
                const nextMap: Record<Theme, Theme> = {
                  obsidian: "alabaster",
                  alabaster: "blueprint",
                  blueprint: "obsidian",
                };
                setTheme(nextMap[theme]);
              }}
              className="flex p-2 rounded-full border border-card-border bg-card-bg/10 hover:bg-card-bg/30 text-muted hover:text-accent transition-all duration-300 cursor-pointer group shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:border-accent/30"
              aria-label="Cycle gallery theme"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {theme === "obsidian" ? (
                  <Moon size={15} className="transition-transform duration-500 group-hover:rotate-12" />
                ) : theme === "alabaster" ? (
                  <Sun size={15} className="transition-transform duration-500 group-hover:rotate-45" />
                ) : (
                  <Compass size={15} className="transition-transform duration-500 group-hover:rotate-90" />
                )}
              </div>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-card-border hover:bg-card-bg text-muted hover:text-foreground transition-all duration-300 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="flex items-baseline text-4xl font-serif text-muted hover:text-foreground transition-colors duration-200 py-2 border-b border-card-border"
                  initial={{ x: -35, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -35, opacity: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <span className="text-xs font-mono text-accent mr-4">{item.num}</span>
                  <span className="capitalize">{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="absolute bottom-12 left-8 right-8 flex justify-between items-center text-xs font-mono text-muted border-t border-card-border pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span>© {new Date().getFullYear()} MIS DESIGN</span>
              <button
                onClick={() => {
                  const nextMap: Record<Theme, Theme> = {
                    obsidian: "alabaster",
                    alabaster: "blueprint",
                    blueprint: "obsidian",
                  };
                  setTheme(nextMap[theme]);
                }}
                className="flex items-center gap-2 text-accent capitalize cursor-pointer font-medium"
              >
                {theme === "obsidian" ? (
                  <Moon size={12} className="text-[#d4af37]" />
                ) : theme === "alabaster" ? (
                  <Sun size={12} className="text-[#9e472a]" />
                ) : (
                  <Compass size={12} className="text-[#38bdf8]" />
                )}
                {theme} Mode
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
