"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Github, Linkedin, Twitter, Instagram, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import { memo, useMemo } from "react"
import gsap from "gsap"

// Image configuration with responsive breakpoints and validation
const PROFILE_IMAGE = {
  src: "/images/Profile.png",
  alt: "Madhusudan's Profile Picture",
  sizes: {
    mobile: { width: 200, height: 200, breakpoint: "max-width: 768px" }, // w-48 h-48
    tablet: { width: 240, height: 240, breakpoint: "max-width: 1024px" }, // md:w-56 md:h-56
    desktop: { width: 320, height: 320, breakpoint: "min-width: 1025px" }, // lg:w-80 lg:h-80
  },
  // Fallback dimensions for error cases
  fallback: { width: 200, height: 200 },
  // Supported formats for progressive enhancement
  formats: ["webp", "jpeg"] as const,
  // Quality settings for different screen densities
  quality: {
    standard: 75,
    retina: 85,
  },
} as const

// Type definitions for better type safety
type ImageSize = (typeof PROFILE_IMAGE.sizes)[keyof typeof PROFILE_IMAGE.sizes]
type ImageFormat = (typeof PROFILE_IMAGE.formats)[number]

// Utility functions for image handling
const generateImageSizes = (sizes: typeof PROFILE_IMAGE.sizes): string => {
  const { mobile, tablet, desktop } = sizes
  return `(${mobile.breakpoint}) ${mobile.width}px, (${tablet.breakpoint}) ${tablet.width}px, ${desktop.width}px`
}

const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

// Performance optimization: Preload critical image
if (typeof window !== "undefined") {
  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "image"
  link.href = PROFILE_IMAGE.src
  document.head.appendChild(link)
}

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Madhusudan04337",
    icon: Github,
    label: "GitHub Profile",
    isExternal: true,
  },
  {
    href: "https://www.linkedin.com/in/madhu-sudan-0006a429a/",
    icon: Linkedin,
    label: "LinkedIn Profile",
    isExternal: true,
  },
  {
    href: "#",
    icon: Twitter,
    label: "Twitter Profile",
    isExternal: false,
  },
  {
    href: "#",
    icon: Instagram,
    label: "Instagram Profile",
    isExternal: false,
  },
] as const

const FLOATING_ELEMENTS = [
  {
    className: "absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-float",
    delay: "0s",
  },
  {
    className: "absolute bottom-10 -left-6 w-12 h-12 bg-primary/40 rounded-full animate-float delay-700",
    delay: "1s",
  },
  {
    className: "absolute top-1/2 -right-8 w-6 h-6 bg-primary/60 rounded-full animate-float delay-1400",
    delay: "2s",
  },
] as const

// Memoized components for better performance
const BackgroundDecoration = memo(() => (
  <div className="absolute inset-0 z-0" aria-hidden="true">
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-xl animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-xl animate-pulse delay-700" />
  </div>
))
BackgroundDecoration.displayName = "BackgroundDecoration"

const SocialLinks = memo(() => (
  <div className="flex justify-center lg:justify-start gap-6" role="list">
    {SOCIAL_LINKS.map(({ href, icon: Icon, label, isExternal }) => (
      <Link
        key={label}
        href={href}
        {...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
        className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md p-1"
        aria-label={label}
        role="listitem"
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </Link>
    ))}
  </div>
))
SocialLinks.displayName = "SocialLinks"

const ProfileImage = memo(() => {
  // Generate responsive sizes string with all breakpoints
  const profileImageSizes = useMemo(() => generateImageSizes(PROFILE_IMAGE.sizes), [])

  // Error handling for image loading with retry mechanism
  const handleImageError = (event: React.SyntheticEvent<SVGImageElement>) => {
    console.warn("Profile image failed to load, using fallback dimensions")
    const target = event.target as SVGImageElement

    // Apply fallback dimensions
    target.setAttribute("width", PROFILE_IMAGE.fallback.width.toString())
    target.setAttribute("height", PROFILE_IMAGE.fallback.height.toString())

    // Optional: Try alternative image format if available
    const currentSrc = target.getAttribute("href")
    if (currentSrc && !currentSrc.includes("fallback")) {
      // Could implement fallback to different format here
      console.info("Consider implementing fallback image format")
    }
  }

  // Generate unique mask ID to avoid conflicts in SSR/multiple instances
  const maskId = useMemo(() => generateUniqueId("blobMask"), [])

  return (
    <div className="relative hidden lg:flex lg:justify-center lg:items-center">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent)
        `,
          backgroundSize: "50px 50px",
        }}
      />

      <svg viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" className="w-80 h-[420px] relative z-10">
        <defs>
          {/* BORDER */}
          <filter id="personBorder" x="-30%" y="-30%" width="160%" height="160%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="outline" />
            <feColorMatrix
              type="matrix"
              values="
            0 0 0 0 0
            0 1 0 0 0.7
            0 1 0 0 1
            0 0 0 1 0"
            />
            <feComposite in="outline" in2="SourceAlpha" operator="out" />
          </filter>

          {/* GLOW */}
          <filter id="personGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="12" />
            <feColorMatrix
              type="matrix"
              values="
            0 0 0 0 0
            0 1 0 0 0.6
            0 1 0 0 1
            0 0 0 1 0"
            />
          </filter>
        </defs>

        {/* 🔵 BORDER */}
        <image href="/images/profile.jpeg" width="500" height="700" filter="url(#personBorder)" />

        {/* ✨ GLOW */}
        <image href="/images/profile.jpeg" width="500" height="700" filter="url(#personGlow)" opacity="0.6" />

        {/* 🧍 MAIN IMAGE */}
        <image href="/images/profile.jpeg" width="500" height="700" preserveAspectRatio="xMidYMid meet" />
      </svg>
    </div>
  )
})
ProfileImage.displayName = "ProfileImage"

export const Hero = memo(() => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Stagger animation for the main title text (word by word)
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".hero-word")
        if (words.length > 0) {
          tl.fromTo(
            words,
            { opacity: 0, y: 40, rotationX: -90 },
            { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" },
            0,
          )
        } else {
          // Fallback if words aren't wrapped
          tl.from(titleRef.current, { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" }, 0)
        }
      }

      // Subtitle entrance
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, "-=0.3")
      }

      // Description entrance
      if (descriptionRef.current) {
        tl.from(descriptionRef.current, { opacity: 0, y: 30, duration: 0.6, ease: "power2.out" }, "-=0.3")
      }

      // Buttons entrance with scale effect
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll("a")
        tl.fromTo(
          buttons,
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.5)" },
          "-=0.3",
        )
      }

      // Social links entrance
      if (socialRef.current) {
        const links = socialRef.current.querySelectorAll("a")
        tl.fromTo(
          links,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.3",
        )
      }

      // Profile image entrance with rotation and scale
      if (profileRef.current) {
        tl.fromTo(
          profileRef.current,
          { opacity: 0, scale: 0.5, rotationY: 90 },
          { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: "back.out(1.3)" },
          0.2,
        )

        // Continuous subtle floating animation for profile
        gsap.to(profileRef.current, {
          y: -15,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background grid-background"
      aria-label="Hero section"
    >
      <BackgroundDecoration />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-extrabold mb-6 text-balance leading-tight tracking-tight"
            >
              <span className="hero-word inline-block">Hi,</span> <span className="hero-word inline-block">I'm</span>{" "}
              <span className="hero-word inline-block gradient-text">Madhusudan</span>
            </h1>
            <h2
              ref={subtitleRef}
              className="text-xl md:text-3xl font-bold text-accent mb-6 text-balance font-signature"
            >
              Python & Full Stack Developer  
            </h2>
            <p
              ref={descriptionRef}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 text-pretty leading-relaxed"
            >
              I craft elegant, scalable web solutions using modern technologies. Specializing in Python backends with
              Django & FastAPI, and responsive React frontends for exceptional user experiences.
            </p>

            {/* Action Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/Madhusudan_cv_7719.pdf"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
                aria-label="Download CV (PDF)"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                Download CV
              </Link>
              <Link
                href="#contact"
                className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 hover:border-primary/80"
                aria-label="Go to contact section"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex justify-center lg:justify-start gap-6" role="list">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, isExternal }) => (
                <Link
                  key={label}
                  href={href}
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md p-1"
                  aria-label={label}
                  role="listitem"
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Profile Image Section */}
          <div ref={profileRef} className="relative hidden lg:flex lg:justify-center lg:items-center">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(148, 0, 211, .1) 25%, rgba(148, 0, 211, .1) 26%, transparent 27%, transparent 74%, rgba(148, 0, 211, .1) 75%, rgba(148, 0, 211, .1) 76%, transparent 77%, transparent)
              `,
                backgroundSize: "50px 50px",
              }}
            />

            <svg viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" className="w-80 h-[420px] relative z-10">
              <defs>
                {/* BORDER */}
                <filter id="personBorder" x="-30%" y="-30%" width="160%" height="160%">
                  <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="outline" />
                  <feColorMatrix
                    type="matrix"
                    values="
                  0 0 0 0 0
                  0 1 0 0 0.7
                  0 1 0 0 1
                  0 0 0 1 0"
                  />
                  <feComposite in="outline" in2="SourceAlpha" operator="out" />
                </filter>

                {/* GLOW */}
                <filter id="personGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="12" />
                  <feColorMatrix
                    type="matrix"
                    values="
                  0 0 0 0 0
                  0 1 0 0 0.6
                  0 1 0 0 1
                  0 0 0 1 0"
                  />
                </filter>
              </defs>

              {/* 🔵 BORDER */}
              <image href="/images/Profile.png" width="500" height="700" filter="url(#personBorder)" />

              {/* ✨ GLOW */}
              <image href="/images/Profile.png" width="500" height="700" filter="url(#personGlow)" opacity="0.6" />

              {/* 🧍 MAIN IMAGE */}
              <image href="/images/Profile.png" width="500" height="700" preserveAspectRatio="xMidYMid meet" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = "Hero"
