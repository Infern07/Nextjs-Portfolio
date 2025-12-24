"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface JourneyProps {
  onClose: () => void;
}

interface JourneyEntry {
  year: string;
  title: string;
  institution: string;
  details: string;
  grade?: string;
}

const journeyEntries: JourneyEntry[] = [
  {
    year: "2022-2026",
    title: "Bachelor of Engineering",
    institution: "Sardar Vallabhbhai Patel Institute of Technology",
    details: "Computer Science and Design",
    grade: "Current - 8.76 CPI",
  },
  {
    year: "2022",
    title: "Senior Secondary School (12th)",
    institution: "Kokilaben Dhirubhai Ambani Reliance Foundation School",
    details: "Completed higher secondary education with focus on science and mathematics.",
    grade: "82%",
  },
  {
    year: "2020",
    title: "Secondary Examination (10th)",
    institution: "Kokilaben Dhirubhai Ambani Reliance Foundation School",
    details: "Completed secondary education with excellent academic performance.",
    grade: "92%",
  },
];

export default function Journey({ onClose }: JourneyProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const title = "My Journey";
  const subtitle =
    "From curiosity to code, from solo experiments to working in teams and communities — here's how I evolved as a builder.";

  // Slide in animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial position (off screen bottom)
      gsap.set(sectionRef.current, { y: "100%" });

      // Slide in from bottom
      gsap.to(sectionRef.current, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Typing animation for title
  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < title.length) {
        setDisplayedTitle(title.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isTyping, title]);

  // GSAP animations for content
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate subtitle after typing completes
      if (!isTyping && subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Animate journey entries
      const entries = contentRef.current?.querySelectorAll(".journey-entry");
      if (entries && entries.length > 0) {
        // Set initial state
        entries.forEach((entry, index) => {
          gsap.set(entry, { opacity: 0, x: -50 });
          // Animate in with delay
          gsap.to(entry, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5 + index * 0.2,
          });
        });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [isTyping]);

  // Handle close with slide out animation
  const handleClose = () => {
    if (!sectionRef.current) {
      onClose();
      return;
    }

    gsap.to(sectionRef.current, {
      y: "100%",
      duration: 0.6,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={sectionRef}
      className="fixed inset-0 z-50 bg-background overflow-y-auto"
    >
      <Header 
        onViewProjects={() => {}} 
        onViewJourney={() => {}} 
      />
      <div
        ref={contentRef}
        className="min-h-screen py-32 px-6 relative"
      >
        <div className="container mx-auto max-w-4xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="fixed top-20 right-6 z-[70] p-3 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-16">
            <h2
              ref={titleRef}
              className="text-5xl md:text-6xl font-serif font-bold mb-4"
            >
              {displayedTitle}
              {isTyping && (
                <span className="inline-block w-0.5 h-8 md:h-12 bg-foreground ml-1 animate-[blink_1s_infinite]" />
              )}
            </h2>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-foreground/80 font-grotesk max-w-3xl"
            >
              {subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-foreground/20"></div>

            {/* Journey Entries */}
            <div className="space-y-16">
              {journeyEntries.map((entry, index) => (
                <div
                  key={index}
                  className="journey-entry relative pl-20 md:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 rounded-full border-2 border-foreground bg-background z-10"></div>

                  {/* Content */}
                  <div className="bg-foreground/5 rounded-lg p-6 md:p-8 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:bg-foreground/8 hover:shadow-xl hover:shadow-foreground/5">
                    <div className="flex items-start justify-between mb-3 flex-wrap gap-4">
                      <span className="text-sm md:text-base font-grotesk font-semibold text-foreground/70 bg-foreground/10 px-3 py-1 rounded-md">
                        {entry.year}
                      </span>
                      {entry.grade && (
                        <span className="text-sm md:text-base font-grotesk font-semibold text-foreground/90">
                          {entry.grade}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                      {entry.title}
                    </h3>

                    <p className="text-base md:text-lg text-foreground/80 font-grotesk mb-2">
                      {entry.institution}
                    </p>

                    <p className="text-base text-foreground/70 font-grotesk leading-relaxed">
                      {entry.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
