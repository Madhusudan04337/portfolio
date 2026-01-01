import { NextResponse } from "next/server"

const projectsData = [
  {
    name: "Portfolio Website",
    description: "A personal portfolio website showcasing my projects and skills.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://myportfolio.com"
  },
  {
    name: "E-commerce Platform",
    description: "An online platform for buying and selling products.",
    technologies: ["Next.js", "Node.js", "MongoDB"],
    link: "https://ecommerce.com"
  }
]

export async function GET() {
  return NextResponse.json(projectsData)
}