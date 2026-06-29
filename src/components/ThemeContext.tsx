"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "obsidian" | "alabaster" | "blueprint";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("obsidian");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Determine the initial theme preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const initialTheme = savedTheme || "obsidian";
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);
    
    document.documentElement.classList.remove("theme-obsidian", "theme-alabaster", "theme-blueprint", "dark");
    document.documentElement.classList.add(`theme-${initialTheme}`);
    if (initialTheme === "obsidian" || initialTheme === "blueprint") {
      document.documentElement.classList.add("dark");
    }
    
    setMounted(true);
  }, []);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem("theme", nextTheme);

    document.documentElement.classList.remove("theme-obsidian", "theme-alabaster", "theme-blueprint", "dark");
    document.documentElement.classList.add(`theme-${nextTheme}`);
    if (nextTheme === "obsidian" || nextTheme === "blueprint") {
      document.documentElement.classList.add("dark");
    }
  };

  // Prevent flash/hydration mismatch by rendering a fallback/blank layout
  // until the theme has been hydrated on the client side.
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={mounted ? "" : "invisible"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

