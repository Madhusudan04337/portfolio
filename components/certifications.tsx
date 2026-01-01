"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { gsap } from "gsap"
import type { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, ChevronLeft, ChevronRight, ExternalLink, Calendar, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certification {
  id: string
  title: string
  org: string
  date: string
  type: string
  credentialUrl?: string
}

const ANIMATION_CONFIG = {
  HEADER_DELAY: 0.1,
  CARD_DELAY: 0.2,
  TRANSITION_DURATION: 0.6,
  SCROLL_START_HEADER: "top 80%",
  SCROLL_START_CARD: "top 70%",
} as const

export function Certifications() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [certifications, setCertifications] = useState<Certification[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger[]>([])

  // Fetch and transform certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/data/certifications.json")
        const data = await response.json()

        const formattedData: Certification[] = data.map((cert: any, idx: number) => ({
          id: cert.id || idx.toString(),
          title: cert.title,
          org: cert.issuer,
          date: cert.date,
          type: cert.type || "Certification",
          credentialUrl: cert.credentialUrl || undefined,
        }))

        setCertifications(formattedData)
      } catch (error) {
        console.error("Failed to fetch certifications:", error)
      }
    }

    fetchCertifications()
  }, [])

  const currentCertification = useMemo(
    () => certifications[activeIdx] || certifications[0],
    [activeIdx, certifications],
  )

  const navigateNext = useCallback(() => {
    if (isAnimating || certifications.length === 0) return
    setActiveIdx((prev) => (prev + 1) % certifications.length)
  }, [isAnimating, certifications.length])

  const navigatePrev = useCallback(() => {
    if (isAnimating || certifications.length === 0) return
    setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length)
  }, [isAnimating, certifications.length])

  const navigateToIndex = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIdx || index < 0 || index >= certifications.length) return
      setActiveIdx(index)
    },
    [isAnimating, activeIdx, certifications.length],
  )

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return

    let ScrollTrigger: any

    try {
      ScrollTrigger = require("gsap/ScrollTrigger").ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      const headerElement = sectionRef.current.querySelector(".certs-header")
      const cardElement = cardContainerRef.current

      if (headerElement) {
        const headerTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.SCROLL_START_HEADER,
          toggleActions: "play none none reverse",
          onToggle: () => {
            gsap.fromTo(headerElement, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" })
          },
        })
        scrollTriggerRef.current.push(headerTrigger)
      }

      if (cardElement) {
        const cardTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.SCROLL_START_CARD,
          toggleActions: "play none none reverse",
          onToggle: () => {
            gsap.fromTo(
              cardElement,
              { scale: 0.9, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" },
            )
          },
        })
        scrollTriggerRef.current.push(cardTrigger)
      }
    } catch (error) {
      console.warn("GSAP ScrollTrigger failed to initialize:", error)
    }

    return () => {
      scrollTriggerRef.current.forEach((trigger) => {
        try {
          trigger.kill()
        } catch (error) {
          console.warn("Failed to cleanup ScrollTrigger:", error)
        }
      })
      scrollTriggerRef.current = []
    }
  }, [])

  // Card animation on activeIdx change
  useEffect(() => {
    if (!cardContainerRef.current) return

    const currentCard = cardContainerRef.current.querySelector(".active-cert-content")
    if (!currentCard) return

    setIsAnimating(true)

    try {
      gsap.fromTo(
        currentCard,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.TRANSITION_DURATION,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false),
        },
      )
    } catch (error) {
      console.warn("Card animation failed:", error)
      setIsAnimating(false)
    }
  }, [activeIdx])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          navigatePrev()
          break
        case "ArrowRight":
          event.preventDefault()
          navigateNext()
          break
        case "Home":
          event.preventDefault()
          navigateToIndex(0)
          break
        case "End":
          event.preventDefault()
          navigateToIndex(certifications.length - 1)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigateNext, navigatePrev, navigateToIndex, certifications.length])

  const handleCredentialClick = useCallback(() => {
    if (currentCertification?.credentialUrl) {
      try {
        window.open(currentCertification.credentialUrl, "_blank", "noopener,noreferrer")
      } catch (error) {
        console.warn("Failed to open credential URL:", error)
      }
    }
  }, [currentCertification?.credentialUrl])

  if (!certifications.length) {
    return (
      <section className="py-24 text-center">
        <p className="text-zinc-400">No certifications available.</p>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
          style={{ background: "#00d4ff" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ background: "#667eea" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20 certs-header">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white font-signature">
            Achievements & Mastery
          </h2>
          <div
            className="w-32 h-2 mx-auto rounded-full mb-8"
            style={{ background: "linear-gradient(90deg, #00d4ff, #667eea)" }}
          />
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            A curated collection of my professional certifications and competitive achievements.
          </p>
        </div>

        <div className="max-w-5xl mx-auto" ref={cardContainerRef}>
          <div className="relative bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden group">
            <Trophy className="absolute -right-20 -bottom-20 w-96 h-96 text-white/[0.03] -rotate-12 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-0" />

            <div className="active-cert-content relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="shrink-0 relative">
                  <div
                    className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-white relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #667eea)" }}
                  >
                    <Trophy className="w-16 h-16" />
                  </div>
                  <div
                    className="absolute -inset-4 blur-2xl opacity-30 -z-10 rounded-full"
                    style={{ background: "#00d4ff" }}
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                    <span
                      className="px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-[0.2em]"
                      style={{ background: "rgba(0, 212, 255, 0.15)", color: "#00d4ff" }}
                    >
                      {currentCertification.type}
                    </span>{" "}
                    <br />
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-bold">
                      <Calendar className="w-4 h-4" />
                      {currentCertification.date}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black mb-4 text-white leading-tight">
                    {currentCertification.title}
                  </h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-400 text-xl font-semibold mb-10">
                    <MapPin className="w-5 h-5 text-[#667eea]" />
                    {currentCertification.org}
                  </div>

                  <button
                    onClick={handleCredentialClick}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-cyan-500/20"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #667eea)", color: "white" }}
                  >
                    Verify Credential <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 flex gap-3">
              <button
                onClick={navigatePrev}
                disabled={isAnimating}
                className="p-5 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-all border border-zinc-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous certification"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={navigateNext}
                disabled={isAnimating}
                className="p-5 rounded-2xl bg-zinc-800 text-white hover:bg-zinc-700 transition-all border border-zinc-700 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next certification"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex justify-center flex-wrap gap-3 mt-12 px-6">
            {certifications.map((cert, idx) => (
              <button
                key={cert.id}
                onClick={() => navigateToIndex(idx)}
                disabled={isAnimating}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-500 border border-zinc-800 disabled:cursor-not-allowed",
                  activeIdx === idx ? "w-12 bg-cyan-400" : "w-2.5 bg-zinc-800 hover:bg-zinc-700",
                )}
                aria-label={`Go to ${cert.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
