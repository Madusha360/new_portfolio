"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Random increment steps to make the loading feel organic
      const increment = Math.floor(Math.random() * 8) + 4;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        // Delay slightly on 100% to let the user register completion
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Curtain slide exit
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-16 bg-background border-b border-card-border"
    >
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono tracking-widest text-accent uppercase">
        <span>MIS Design Studio</span>
        <span>Exhibition &apos;26 Setup</span>
      </div>

      {/* Centered Monogram & Frame */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative px-12 py-10 border border-card-border rounded-xl bg-card-bg/25 backdrop-blur-sm"
        >
          <h1 className="text-4xl sm:text-5xl font-serif text-foreground mb-2">
            M<span className="font-light text-accent italic">IS</span>
          </h1>
          <p className="text-[9px] font-mono tracking-[0.3em] text-muted uppercase">
            Art Gallery Portfolio
          </p>
          
          {/* Framed border highlights */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-accent" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-accent" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-accent" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-accent" />
        </motion.div>
      </div>

      {/* Bottom Counter Status */}
      <div className="relative z-10 w-full flex flex-col gap-4">
        {/* Loading Progress Line */}
        <div className="relative w-full h-[1px] bg-card-border overflow-hidden">
          <motion.div 
            style={{ width: `${progress}%` }} 
            className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-300 ease-out"
          />
        </div>

        <div className="flex items-baseline justify-between font-mono text-muted">
          <span className="text-[10px] tracking-wider uppercase">Loading Exhibition Assets</span>
          {/* Custom tracked number ticker */}
          <span className="text-3xl sm:text-5xl font-light text-foreground select-none">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
