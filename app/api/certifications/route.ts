import { NextResponse } from "next/server"

const certificationsData = [
  {
    title: "Certified React Developer",
    issuer: "React Academy",
    date: "2023",
    description: "Advanced certification in React development."
  },
  {
    title: "TypeScript Mastery",
    issuer: "Code Institute",
    date: "2022",
    description: "Comprehensive training in TypeScript."
  }
]

export async function GET() {
  return NextResponse.json(certificationsData)
}