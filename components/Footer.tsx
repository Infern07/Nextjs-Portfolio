"use client";

import { useEffect, useRef } from "react";
import { Twitter, Linkedin, Github, Instagram, Mail } from "lucide-react";
import { gsap } from "gsap";

const socialLinks = [
  { icon: Twitter, href: "https://x.com/JP_0017", label: "X (Twitter)" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jay-pandya9904/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Infern07", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/jaypandya9904", label: "Instagram" },
  { icon: Mail, href: "mailto:jaypandya428@gmail.com", label: "Email" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(Array.from(entry.target.children), {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footerElement);

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 border-t border-border/40"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label={label}
            >
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

