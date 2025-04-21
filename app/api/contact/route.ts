import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message, language } = body;

    // Log the received information and environment variables (for debugging)
    console.log("Contact form submission received:", {
      name,
      email,
      subject,
      language,
    });
    console.log("Using email configuration:", {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: process.env.EMAIL_SERVER_SECURE === "true",
      username: process.env.EMAIL_USERNAME ? "Set" : "Not set",
      password: process.env.EMAIL_PASSWORD ? "Set" : "Not set",
      from: process.env.EMAIL_FROM,
    });

    // Validate required environment variables
    if (
      !process.env.EMAIL_SERVER_HOST ||
      !process.env.EMAIL_SERVER_PORT ||
      !process.env.EMAIL_USERNAME ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.EMAIL_FROM
    ) {
      console.error(
        "Missing required email configuration environment variables"
      );
      return NextResponse.json(
        { error: "Server email configuration is incomplete" },
        { status: 500 }
      );
    }

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
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    // Define the destination email (8Leaps team email)
    const toEmail = "info@8leaps.com"; // Hardcoded recipient

    // Prepare email content based on language
    const isNL = language === "nl";

    // Email to 8Leaps team
    const emailSubject = isNL
      ? `Nieuw Contactformulier Bericht: ${subject}`
      : `New Contact Form Submission: ${subject}`;

    const emailContent = isNL
      ? `
        Naam: ${name}
        E-mail: ${email}
        Onderwerp: ${subject}
        
        Bericht:
        ${message}
      `
      : `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `;

    // HTML version of the email for better formatting
    const htmlContent = isNL
      ? `
        <h2>Nieuw Contactformulier Bericht</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <h3>Bericht:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
      : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `;

    // Verify SMTP connection configuration
    try {
      console.log("Verifying SMTP connection...");
      const verification = await transporter.verify();
      console.log("SMTP Verification successful");
    } catch (verifyError) {
      console.error("SMTP Verification Error:", verifyError);
      return NextResponse.json(
        {
          error: "Failed to verify SMTP connection",
          details:
            verifyError instanceof Error
              ? verifyError.message
              : String(verifyError),
        },
        { status: 500 }
      );
    }

    // Send the email to 8Leaps
    console.log("Sending email to 8Leaps team...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      replyTo: email, // Set reply-to as the user's email
      subject: emailSubject,
      text: emailContent,
      html: htmlContent,
    });

    console.log("Contact form email sent successfully");

    // Send confirmation email to the user
    try {
      console.log("Sending confirmation email to user...");

      // Confirmation email content based on language
      const userConfirmationSubject = isNL
        ? "Bedankt voor uw bericht aan 8Leaps"
        : "Thank you for contacting 8Leaps";

      const userConfirmationText = isNL
        ? `
          Beste ${name},
          
          Bedankt voor uw bericht aan 8Leaps. We hebben uw bericht ontvangen en zullen zo snel mogelijk contact met u opnemen.
          
          Hier is een kopie van uw bericht:
          
          Onderwerp: ${subject}
          
          ${message}
          
          Met vriendelijke groet,
          Het 8Leaps Team
        `
        : `
          Dear ${name},
          
          Thank you for contacting 8Leaps. We have received your message and will get back to you as soon as possible.
          
          Here's a copy of your message:
          
          Subject: ${subject}
          
          ${message}
          
          Best regards,
          The 8Leaps Team
        `;

      const userConfirmationHtml = isNL
        ? `
          <p>Beste ${name},</p>
          
          <p>Bedankt voor uw bericht aan 8Leaps. We hebben uw bericht ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
          
          <p>Hier is een kopie van uw bericht:</p>
          
          <p><strong>Onderwerp:</strong> ${subject}</p>
          
          <p>${message.replace(/\n/g, "<br>")}</p>
          
          <p>Met vriendelijke groet,<br>Het 8Leaps Team</p>
        `
        : `
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting 8Leaps. We have received your message and will get back to you as soon as possible.</p>
          
          <p>Here's a copy of your message:</p>
          
          <p><strong>Subject:</strong> ${subject}</p>
          
          <p>${message.replace(/\n/g, "<br>")}</p>
          
          <p>Best regards,<br>The 8Leaps Team</p>
        `;

      const userConfirmationInfo = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: userConfirmationSubject,
        text: userConfirmationText,
        html: userConfirmationHtml,
      });

      console.log(
        "User confirmation email sent successfully:",
        userConfirmationInfo.messageId
      );
    } catch (confirmationError) {
      // If confirmation email fails, log it but don't fail the whole request
      console.error("Error sending confirmation email:", confirmationError);
    }

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
