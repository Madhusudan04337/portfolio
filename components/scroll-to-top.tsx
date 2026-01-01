"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-primary hover:bg-primary/90"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    )
  )
}
