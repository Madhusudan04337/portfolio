"use client"

import { Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const personalInfo = [
  { label: "Name", value: "Madhusudan" },
  { label: "Email", value: "madhusudan27102005@gmail.com", isEmail: true },
  { label: "Location", value: "Chennai, India" },
  { label: "Freelance", value: "Available" },
]

export function About() {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-signature">About Me</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-[280px] md:max-w-md mx-auto">
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-full translate-x-4 translate-y-4" />
              <div className="relative w-full h-full rounded-[39%] overflow-hidden border-2 border-border">
                <Image
                  src="/images/Profile.png"
                  alt="Madhusudan Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 240px, 400px" // Optimized sizes attribute
                  priority // Faster LCP
                />
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">Full Stack Developer & Web Designer</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I am a Full-Stack Developer with a strong foundation in Python, specializing in Django and FastAPI to
              build scalable, high-performance backends. I leverage the MERN stack to build responsive React frontends,
              supported by a solid academic understanding of C++ and software engineering principles. I am a dedicated
              developer committed to writing clean code and delivering impactful, end-to-end web solutions in
              collaborative environments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {personalInfo.map((info) => (
                <div key={info.label} className="bg-background/50 p-4 rounded-xl border border-border/50">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">{info.label}</span>
                  <div className="mt-1 font-medium">
                    {info.isEmail ? (
                      <Link href={`mailto:${info.value}`} className="hover:text-primary transition-colors">
                        {info.value}
                      </Link>
                    ) : (
                      info.value
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/Madhusudan_cv_7719.pdf"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Download CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
