"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Globe, MessageSquare, Check, ArrowRight, AlertCircle } from "lucide-react";

type InquiryType = "fulltime" | "contract" | "consulting" | "other";

export default function ContactSection() {
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("contract");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Live Colombo timezone clock client-side sync
  useEffect(() => {
    const updateClock = () => {
      const colomboTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Colombo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(colomboTime);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Standard Client-Side Validation
    if (!name.trim()) {
      setError("Please specify your name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please input your project brief or message.");
      return;
    }

    setIsSubmitting(true);

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        inquiryType,
        message,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.success) {
          if (data.activationRequired) {
            setSuccessMessage(data.message);
          } else {
            setSuccessMessage("");
          }
          setIsSuccess(true);
          // Clear inputs
          setName("");
          setEmail("");
          setCompany("");
          setMessage("");
        } else {
          setError(data.error || "Failed to send inquiry. Please try again later.");
        }
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setError("Network error. Please check your internet connection.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const inquiryOptions: { id: InquiryType; label: string }[] = [
    { id: "contract", label: "Project / Contract" },
    { id: "fulltime", label: "Full-Time Role" },
    { id: "consulting", label: "Consultation" },
    { id: "other", label: "General Inquiry" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-6 max-w-6xl mx-auto border-b border-card-border bg-background relative overflow-hidden">
      {/* Ambient glowing radial light */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/2 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full relative z-10">
        
        {/* Left Column: Inquiry Metadata & Studio Stats */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
              04 / COMMISSION WORK
            </span>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-foreground">
              Inquiry Desk
            </h2>
          </div>

          <p className="text-sm font-sans font-light text-muted leading-relaxed max-w-sm">
            Interested in starting a full-stack project or discussing engineering opportunities? Fill out the brief or reach out directly.
          </p>

          {/* Studio Metrics Cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border border-card-border bg-card-bg/20 rounded-2xl p-4.5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono tracking-wide text-foreground font-medium uppercase">Studio Availability</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">Immediate</span>
            </div>

            <div className="flex items-center justify-between border border-card-border bg-card-bg/20 rounded-2xl p-4.5">
              <div className="flex items-center gap-3 text-muted">
                <Globe size={14} className="text-accent" />
                <span className="text-xs font-mono tracking-wide text-foreground font-medium uppercase">Colombo Time</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase tabular-nums">
                {time ? `${time} (LK)` : "GMT+5:30"}
              </span>
            </div>

            <div className="flex items-center justify-between border border-card-border bg-card-bg/20 rounded-2xl p-4.5">
              <div className="flex items-center gap-3 text-muted">
                <MessageSquare size={14} className="text-accent" />
                <span className="text-xs font-mono tracking-wide text-foreground font-medium uppercase">Response Time SLA</span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase font-medium">⚡ &lt; 4 Hours</span>
            </div>
          </div>

          {/* Direct channels */}
          <div className="flex flex-col gap-4 border-t border-card-border/60 pt-8 mt-4 text-xs font-mono text-muted">
            <div className="flex items-center gap-3.5">
              <Mail size={14} className="text-accent" />
              <a href="mailto:isurangamadusha476@gmail.com" className="hover:text-foreground transition-colors">
                isurangamadusha476@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3.5">
              <Phone size={14} className="text-accent" />
              <a href="https://wa.me/447829620808" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                +44 7829 620808 (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Submission Form */}
        <div className="lg:col-span-7 w-full relative">
          <div className="border border-card-border bg-card-bg/15 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-sm backdrop-blur-[6px]">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Name & Email inputs row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-name" className="text-[9px] font-mono uppercase tracking-wider text-muted font-medium">
                        Your Name *
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full bg-card-bg/25 border border-card-border rounded-xl px-4 py-3.5 text-sm font-sans font-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/25 transition-all text-foreground placeholder:text-muted/40"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-email" className="text-[9px] font-mono uppercase tracking-wider text-muted font-medium">
                        Your Email *
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. john@company.com"
                        className="w-full bg-card-bg/25 border border-card-border rounded-xl px-4 py-3.5 text-sm font-sans font-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/25 transition-all text-foreground placeholder:text-muted/40"
                        required
                      />
                    </div>
                  </div>

                  {/* Company/Organization */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-company" className="text-[9px] font-mono uppercase tracking-wider text-muted font-medium">
                      Company / Organization <span className="opacity-60">(Optional)</span>
                    </label>
                    <input
                      id="form-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Stripe, SLT, SLIIT"
                      className="w-full bg-card-bg/25 border border-card-border rounded-xl px-4 py-3.5 text-sm font-sans font-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/25 transition-all text-foreground placeholder:text-muted/40"
                    />
                  </div>

                  {/* Inquiry Type Tabs */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-muted font-medium mb-1">
                      Inquiry Category
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] font-mono uppercase tracking-widest text-center">
                      {inquiryOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setInquiryType(opt.id)}
                          className={`py-2.5 px-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                            inquiryType === opt.id
                              ? "bg-accent text-background border-accent font-semibold"
                              : "bg-card-bg/10 border-card-border text-muted hover:text-foreground hover:bg-card-bg/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message brief */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="form-message" className="text-[9px] font-mono uppercase tracking-wider text-muted font-medium">
                      Project Details / Brief *
                    </label>
                    <textarea
                      id="form-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe the product scope, timelines, or role details..."
                      className="w-full bg-card-bg/25 border border-card-border rounded-xl px-4 py-3.5 text-sm font-sans font-light focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/25 transition-all text-foreground placeholder:text-muted/40 resize-none"
                      required
                    />
                  </div>

                  {/* Error Notification Alert */}
                  {error && (
                    <div className="flex items-center gap-2 text-xs font-mono text-red-500 bg-red-500/5 border border-red-500/10 p-3.5 rounded-xl">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 bg-accent hover:bg-accent/90 text-background font-mono text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 font-semibold cursor-pointer shadow-[0_4px_12px_rgba(var(--accent),0.1)] group/btn disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    <span>{isSubmitting ? "transmitting inquiry..." : "send brief"}</span>
                    {!isSubmitting && (
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform" />
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
                    <Check size={24} className="stroke-[2.5]" />
                  </div>

                  <h3 className="text-2xl font-serif text-foreground mb-3">
                    {successMessage && successMessage.includes("Activation") ? "Activation Required" : "Transmission Complete"}
                  </h3>
                  <p className="text-sm font-sans font-light text-muted leading-relaxed max-w-sm mb-8">
                    {successMessage ? successMessage : "Thank you for reaching out. Your commission inquiry has been securely routed. I typically follow up within 4 hours."}
                  </p>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="flex items-center gap-2 text-xs font-mono tracking-wider text-accent hover:text-foreground transition-colors duration-200 uppercase cursor-pointer"
                  >
                    <span>Send another inquiry</span>
                    <ArrowRight size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
