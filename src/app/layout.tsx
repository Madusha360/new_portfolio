import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import CanvasBackground from "@/components/CanvasBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minimalist Art Gallery Portfolio | MIS Design",
  description: "Senior Full-Stack Developer portfolio featuring scalable applications and premium aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="font-sans h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <CanvasBackground />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
