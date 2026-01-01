"use server"

import { neon } from "@neondatabase/serverless"

export async function submitContactForm(formData: FormData) {
  const sql = neon(process.env.DATABASE_URL!)

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  try {
    await sql("INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)", [
      name,
      email,
      subject,
      message,
    ])

    return { success: true, message: "Thank you for your message! I'll get back to you soon." }
  } catch (error) {
    console.error("[v0] Error submitting contact form:", error)
    return { success: false, message: "Something went wrong. Please try again later." }
  }
}
