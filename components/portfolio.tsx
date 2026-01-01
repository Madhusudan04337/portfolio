"use client"

import type React from "react"

import { useEffect, useRef, useCallback, useState, useLayoutEffect } from "react"
import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { Github, ExternalLink, Code2 } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

interface RawProject {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  icon: React.ReactNode
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<Project[]>([])

  // Fetch & normalize data
  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data: RawProject[]) => {
        const normalized: Project[] = data.map((p) => ({
          id: p.id,
          title: p.name,
          description: p.description,
          tags: p.technologies,
          link: p.link,
          github: p.github,
          icon: <Code2 className="w-16 h-16" />,
        }))
        setProjects(normalized)
      })
  }, [])

  // Animations
  useLayoutEffect(() => {
    if (!sectionRef.current || projects.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })

      gsap.fromTo(
        ".project-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 95%",
            once: true,
          },
        },
      )
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [projects])

  const renderProjectCard = useCallback((project: Project) => {
    return (
      <article
        key={project.id}
        className="project-card opacity-100 group relative bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
        aria-labelledby={`project-${project.id}`}
      >
        <div className="flex flex-col h-full">
          {/* Header with Icon */}
          <div className="relative h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-muted/10 flex items-center justify-center p-12 border-b border-border/30">
            <div className="text-primary/30 group-hover:text-primary group-hover:scale-110 transition-all duration-700">
              {project.icon}
            </div>

            {/* Links Overlay */}
            <nav className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  aria-label="View on GitHub"
                >
                  <Github className="w-6 h-6 text-white" />
                </Link>
              )}

              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="w-6 h-6 text-white" />
                </Link>
              )}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8 flex-1 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] font-bold uppercase bg-primary/15 text-primary rounded-md hover:bg-primary/25 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-3 py-1 text-[11px] font-bold uppercase text-muted-foreground">
                  +{project.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              id={`project-${project.id}`}
              className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm flex-1 leading-relaxed">{project.description}</p>
          </div>
        </div>
      </article>
    )
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="portfolio-header text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-signature">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent projects showcasing expertise in full-stack development and modern web technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground col-span-full py-12">Loading projects...</p>
          ) : (
            projects.map(renderProjectCard)
          )}
        </div>
      </div>
    </section>
  )
}
