"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Building2, X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Experience {
  period: string
  title: string
  company: string
  description: string
  skills: string[]
  certificate?: string
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/experience.json")
      .then((res) => res.json())
      .then((data: Experience[]) => setExperience(data))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [experience])

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-signature">Professional Journey</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My career path and key experiences that shaped my expertise as a developer.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 hidden md:block" />

          {/* Experience Cards */}
          {experience.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className={`relative mb-16 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"}`}
            >
              {/* Timeline Dot */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 hidden md:block" />

              {/* Card */}
              <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/40 p-8">
                {/* Period */}
                <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm font-mono text-primary font-semibold">{exp.period}</span>
                </div>

                {/* Title with Certificate Button */}
                <div className="flex items-center gap-3 mb-1 flex-col md:flex-row md:justify-end">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">{exp.title}</h3>

                  {exp.certificate && (
                    <button
                      type="button"
                      title="View Certificate"
                      onClick={() => exp.certificate && setActiveCertificate(exp.certificate)}
                      className="text-primary hover:text-accent transition-colors hover:scale-110 duration-300"
                    >
                      <ExternalLink size={20} />
                    </button>
                  )}
                </div>

                {/* Company */}
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-semibold justify-start md:justify-end">
                  <Building2 className="w-4 h-4" />
                  {exp.company}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">{exp.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative bg-background rounded-2xl shadow-2xl w-[95vw] max-w-5xl h-[90vh] overflow-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 bg-primary/20 hover:bg-primary/40 text-primary rounded-full p-2 transition-colors"
              onClick={() => setActiveCertificate(null)}
              title="Close certificate"
            >
              <X size={24} />
            </button>

            {/* Certificate Viewer - supports PDF and images */}
            {activeCertificate?.endsWith(".pdf") ? (
              <iframe src={activeCertificate} className="w-full h-full border-none" title="Certificate PDF" />
            ) : (
              <img
                src={activeCertificate || "/placeholder.svg"}
                alt="Certificate"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  )
}
