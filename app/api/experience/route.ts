import { NextResponse } from "next/server"

const experienceData = [
  {
    period: "2020 - Present",
    title: "Senior Developer",
    company: "TechCorp",
    description: "Leading the development team and managing projects.",
    skills: ["React", "TypeScript", "GSAP"]
  },
  {
    period: "2018 - 2020",
    title: "Frontend Developer",
    company: "Webify",
    description: "Developed user interfaces and optimized performance.",
    skills: ["JavaScript", "CSS", "HTML"]
  }
]

export async function GET() {
  return NextResponse.json(experienceData)
}