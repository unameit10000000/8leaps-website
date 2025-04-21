import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { to, subject, text, html } = body

    console.log("Email request received:", { to, subject })

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Enable debug output
      logger: true, // Log information to the console
    })

    console.log("SMTP Configuration:", {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USERNAME,
        // Password hidden for security
      },
    })

    // Verify SMTP connection configuration
    try {
      const verification = await transporter.verify()
      console.log("SMTP Verification:", verification)
    } catch (verifyError) {
      console.error("SMTP Verification Error:", verifyError)
      return NextResponse.json(
        {
          error: "Failed to verify SMTP connection",
          details: verifyError instanceof Error ? verifyError.message : String(verifyError),
        },
        { status: 500 },
      )
    }

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html: html || text,
    })

    console.log("Email sent successfully:", info)

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
      envelope: info.envelope,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
