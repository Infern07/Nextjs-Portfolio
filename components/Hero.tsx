"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Download } from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

interface HeroProps {
  onViewProjects: () => void;
  onViewJourney: () => void;
}

export default function Hero({ onViewProjects, onViewJourney }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(textRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.8,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 py-20 pt-32"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Profile Picture */}
          <div ref={imageRef} className="flex-shrink-0">
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-lg overflow-hidden bg-foreground/10 shadow-xl ring-1 ring-foreground/10">
              <Image
                src="/profilepic.png"
                alt="Jay Pandya"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 224px, 288px"
              />
            </div>
          </div>

          {/* Content */}
          <div ref={textRef} className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-[1.2]">
              Jay Pandya
            </h1>

            <p className="text-base md:text-lg text-foreground/85 leading-[1.7] max-w-2xl font-grotesk font-normal tracking-normal">
              I&apos;m a frontend developer who enjoys building thoughtful, user-focused web experiences.
              My work revolves around React, modern styling systems, and writing clean, maintainable code.
              I focus on learning through hands-on projects, refining my problem-solving skills, and continuously improving how I design and build interfaces.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onViewProjects}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors font-medium"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onViewJourney}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors font-medium"
              >
                My Journey <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="/Jay_resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors font-medium"
              >
                Download Resume <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

