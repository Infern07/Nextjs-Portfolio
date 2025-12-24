"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import { gsap } from "gsap";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Project {
  title: string;
  link?: string;
  date: string;
  description: string;
  role: string;
  stack: string[];
  outcome: string;
  takeaway: string;
}

const projects: Project[] = [
  {
    title: "NESTCRAFT",
    link: "https://nestcraft.vercel.app/",
    date: "2024",
    description:
      "Nestcraft is an e-commerce website built with HTML, CSS, Tailwind CSS, and JavaScript that helps users find their perfect home. The app offers a clean, responsive design with features like search, filters, and property cards. Tailwind CSS ensures smooth responsiveness across devices, while JavaScript adds interactivity for a seamless user experience.",
    role: "Frontend Developer",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "Vercel"],
    outcome: "Deployed a fully functional e-commerce platform with responsive design and interactive features for property browsing.",
    takeaway: "Building with modern CSS frameworks like Tailwind CSS enables rapid development while maintaining clean, maintainable code.",
  },
  {
    title: "FINDMUCKS",
    link: "https://www.youtube.com/watch?v=8utY3OLf9Xs",
    date: "2024",
    description:
      "Findmucks is a mental health support platform developed as part of a hackathon project using TypeScript. It focuses on providing a safe space for individuals dealing with anxiety and depression. Key features include 24/7 support, anonymous interactions, and resources to help users manage their mental well-being. The platform combines clean design with a functional user interface to ensure a supportive and intuitive experience for all users.",
    role: "Full Stack Developer",
    stack: ["TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Vercel"],
    outcome: "Created a supportive mental health platform with anonymous interactions and 24/7 support features for users in need.",
    takeaway: "Building platforms that prioritize user privacy and mental well-being requires thoughtful design and empathetic development approaches.",
  },
  {
    title: "ARTFOLIO",
    link: "https://artfolio-nft.netlify.app/",
    date: "2024",
    description:
      "Artfolio is an innovative NFT-based platform designed for artists to showcase and trade their work. Built with modern web technologies, it provides a seamless interface for exploring, minting, and purchasing unique digital art pieces. The platform ensures a user-friendly experience with responsive design, interactive galleries, and secure NFT transactions. Artfolio empowers artists by connecting them directly with collectors in the digital space.",
    role: "Frontend Developer",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React", "Netlify"],
    outcome: "Launched an NFT marketplace platform enabling artists to showcase and trade digital art with secure transactions.",
    takeaway: "Creating platforms for digital art requires balancing technical complexity with intuitive user experience to make NFT technology accessible.",
  },
  {
    title: "Expense Tracker",
    link: "https://expense-tracker-etrackr.infinityfreeapp.com/",
    date: "2024",
    description:
      "A full-stack expense tracking web app with Google authentication. Built using PHP, MySQL, and Tailwind CSS. The application tracks expenses, categorizes spending, and generates insights to help users manage their finances effectively.",
    role: "Full Stack Developer",
    stack: ["PHP", "MySQL", "Tailwind CSS", "Google OAuth"],
    outcome: "Developed a complete expense tracking solution with authentication, categorization, and financial insights.",
    takeaway: "Building full-stack applications with PHP and MySQL taught me the importance of secure authentication and efficient database design for financial applications.",
  },
];

interface ProjectsProps {
  onClose: () => void;
}

export default function Projects({ onClose }: ProjectsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const title = "Projects";
  const subtitle =
    "A collection of projects I've built over the years — from web applications to developer tools.";

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

      // Animate project cards
      const cards = contentRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        // Set initial state
        cards.forEach((card, index) => {
          gsap.set(card, { opacity: 0, y: 50 });
          // Animate in with delay
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.5 + index * 0.15,
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

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-foreground/5 rounded-lg p-8 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 hover:bg-foreground/8 hover:shadow-xl hover:shadow-foreground/5"
            >
              {/* Title and Date */}
              <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold">
                    {project.title}
                  </h3>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/60 hover:text-foreground transition-colors"
                      aria-label={`Visit ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  ) : (
                    <ExternalLink className="h-5 w-5 text-foreground/40" />
                  )}
                </div>
                <span className="text-sm md:text-base text-foreground/70 font-grotesk">
                  {project.date}
                </span>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-foreground/90 mb-6 leading-relaxed font-grotesk">
                {project.description}
              </p>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-foreground/90 font-grotesk">
                    Role:{" "}
                  </span>
                  <span className="text-foreground/80 font-grotesk">
                    {project.role}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-foreground/90 font-grotesk block mb-2">
                    Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-foreground/10 text-foreground/90 rounded-md text-sm font-grotesk border border-foreground/20 hover:bg-foreground/15 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-foreground/90 font-grotesk">
                    Outcome:{" "}
                  </span>
                  <span className="text-foreground/80 font-grotesk">
                    {project.outcome}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-foreground/90 font-grotesk">
                    Takeaway:{" "}
                  </span>
                  <span className="text-foreground/80 font-grotesk italic">
                    {project.takeaway}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

