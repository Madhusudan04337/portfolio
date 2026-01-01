"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled
          ? "bg-background/85 backdrop-blur-lg border-border/50 py-3 shadow-sm shadow-primary/5"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        <Link href="#home" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight font-signature">
            MADHU<span className="text-accent font-signature">SUDAN</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary px-4 py-2 rounded-lg transition-colors hover:bg-secondary/50"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground p-1" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50 transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col p-6 gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-medium px-4 py-2 rounded-lg hover:bg-secondary/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
