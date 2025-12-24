"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "journey" | null>(null);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (activeSection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeSection]);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Header 
        onViewProjects={() => setActiveSection("projects")} 
        onViewJourney={() => setActiveSection("journey")} 
      />
      <Hero onViewProjects={() => setActiveSection("projects")} onViewJourney={() => setActiveSection("journey")} />
      <Footer />
      {activeSection === "projects" && (
        <Projects onClose={() => setActiveSection(null)} />
      )}
      {activeSection === "journey" && (
        <Journey onClose={() => setActiveSection(null)} />
      )}
    </main>
  );
}

