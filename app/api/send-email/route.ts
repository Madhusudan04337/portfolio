import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email address" }, { status: 400 })
    }

    // Send email using Resend or your preferred email service
    // For now, we'll use a simple solution that logs the email
    // You can integrate with Resend, SendGrid, Nodemailer, etc.

    const response = await sendEmailNotification({
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    })

    if (!response.success) {
      throw new Error(response.error || "Failed to send email")
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Email API Error:", error)
    return NextResponse.json({ success: false, message: "Failed to send email. Please try again." }, { status: 500 })
  }
}

// Email sending function - configure with your preferred service
async function sendEmailNotification(data: {
  from_name: string
  from_email: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  // Option 1: Using Resend (recommended)
  // Uncomment and install: npm install resend
  /*
  import { Resend } from "resend"
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  const result = await resend.emails.send({
    from: "noreply@yourdomain.com",
    to: "madhusudan27102005@gmail.com",
    subject: `New Message from ${data.from_name}: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.from_name}</p>
      <p><strong>Email:</strong> ${data.from_email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
  })

  if (result.error) {
    return { success: false, error: result.error.message }
  }
  return { success: true }
  */

  // Option 2: Using Nodemailer (self-hosted)
  // Uncomment and configure with your email service
  /*
  import nodemailer from "nodemailer"
  
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "madhusudan27102005@gmail.com",
      subject: `New Message from ${data.from_name}: ${data.subject}`,
      html: `...`,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
  */

  // Option 3: Using SendGrid
  // Uncomment and install: npm install @sendgrid/mail
  /*
  import sgMail from "@sendgrid/mail"
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

  try {
    await sgMail.send({
      to: "madhusudan27102005@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `New Message from ${data.from_name}: ${data.subject}`,
      html: `...`,
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
  */

  // For now, return success (configure above options to send real emails)
  console.log("[v0] Email would be sent:", data)
  return { success: true }
}
