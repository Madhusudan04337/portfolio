"use client"

import type React from "react"
import { useState } from "react"
import { Send, User, Mail, MessageSquare, Type, X, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"

if (typeof window !== "undefined") {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  if (publicKey) {
    emailjs.init(publicKey)
    console.log("[v0] EmailJS initialized successfully")
  } else {
    console.error("[v0] NEXT_PUBLIC_EMAILJS_PUBLIC_KEY is not set in .env.local")
  }
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

    if (!serviceId || !templateId || !contactEmail) {
      const missing = []
      if (!serviceId) missing.push("NEXT_PUBLIC_EMAILJS_SERVICE_ID")
      if (!templateId) missing.push("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID")
      if (!contactEmail) missing.push("NEXT_PUBLIC_CONTACT_EMAIL")

      console.error("[v0] Missing environment variables:", missing)
      toast.error(`Missing configuration: ${missing.join(", ")}`)
      setIsSubmitting(false)
      return
    }

    try {
      console.log("[v0] Sending email with:", { name, email, subject })

      const response = await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: contactEmail,
      })

      console.log("[v0] EmailJS response:", response)

      if (response.status === 200) {
        setShowConfirmation(true)
        toast.success("Thank you for your message! I'll get back to you soon.")
        ;(event.target as HTMLFormElement).reset()

        // Auto-close confirmation modal after 5 seconds
        setTimeout(() => setShowConfirmation(false), 5000)
      } else {
        throw new Error(`Email sending failed with status: ${response.status}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error("[v0] Error submitting contact form:", errorMessage)
      toast.error(`Failed to send message: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-8 md:p-12 shadow-xl shadow-primary/5">
        <h3 className="text-2xl font-bold mb-8">Send Me a Message</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground block">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-secondary/40 border border-border/60 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="w-full bg-secondary/40 border border-border/60 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-semibold text-foreground block">
              Subject
            </label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="What is this about?"
                required
                className="w-full bg-secondary/40 border border-border/60 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-foreground block">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                required
                rows={5}
                className="w-full bg-secondary/40 border border-border/60 rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          I'll get back to you as soon as possible. Usually within 24 hours.
        </p>
      </div>

      {showConfirmation && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowConfirmation(false)}
        >
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-4">
              <CheckCircle className="w-12 h-12 text-primary" />
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close confirmation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. I've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all duration-200"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  )
}
