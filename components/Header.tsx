"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  onViewProjects?: () => void;
  onViewJourney?: () => void;
  onClose?: () => void;
  showClose?: boolean;
}

export default function Header({ onViewProjects, onViewJourney, onClose, showClose = false }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight">Jay Pandya</h1>
        <nav className="flex items-center gap-6">
          <button
            onClick={onViewProjects}
            className="text-sm md:text-base font-grotesk hover:text-foreground/80 transition-colors tracking-wide"
          >
            Projects
          </button>
          <button
            onClick={onViewJourney}
            className="text-sm md:text-base font-grotesk hover:text-foreground/80 transition-colors tracking-wide"
          >
            Journey
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-foreground/10 rounded-md transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

