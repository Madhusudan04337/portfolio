import { Navbar } from "@/components/navbar"
import { ParallaxBackground } from "@/components/parallax-background"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Experience } from "@/components/experience"
import { Portfolio } from "@/components/portfolio"
import { Certifications } from "@/components/certifications"
import { Contact } from "@/components/contact"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-vh-100">
      <ParallaxBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Certifications />
      <Contact />
      <ScrollToTop />
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center max-w-7xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xl font-bold tracking-tight uppercase">portfolio</span>
            <span className="text-muted-foreground">| Madhusudan</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Madhusudan. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
