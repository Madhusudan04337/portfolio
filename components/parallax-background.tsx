"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Create floating animation for gradient orbs
      orbsRef.current.forEach((orb, i) => {
        gsap.to(orb, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "none",
          delay: i * 2,
        })
      })

      // Mouse tracking parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 40
        const yPos = (clientY / window.innerHeight - 0.5) * 40

        gsap.to(containerRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      <div ref={containerRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
        {/* Animated Gradient Orbs */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) orbsRef.current[i] = el
            }}
            className={`absolute rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${
              i === 0
                ? "w-[500px] h-[500px] bg-primary left-[10%] top-[20%]"
                : i === 1
                  ? "w-[600px] h-[600px] bg-secondary right-[10%] bottom-[20%]"
                  : "w-[400px] h-[400px] bg-accent left-[40%] top-[40%]"
            }`}
          />
        ))}

        {/* Static Grain/Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </div>
  )
}
