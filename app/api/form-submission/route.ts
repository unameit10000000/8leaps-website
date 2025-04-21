import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { formType, formData } = body
    const language = formData.language || "en" // Default to English if not specified

    // Log the received information
    console.log(`Form submission received from ${formType} page:`, formData)

    // Validate required environment variables
    if (
      !process.env.EMAIL_SERVER_HOST ||
      !process.env.EMAIL_SERVER_PORT ||
      !process.env.EMAIL_USERNAME ||
      !process.env.EMAIL_PASSWORD ||
      !process.env.EMAIL_FROM
    ) {
      console.error("Missing required email configuration environment variables")
      return NextResponse.json({ error: "Server email configuration is incomplete" }, { status: 500 })
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
      debug: true,
      logger: true,
      tls: {
        rejectUnauthorized: false,
      },
    })

    // Define the destination email (8Leaps team email)
    const toEmail = "info@8leaps.com"

    // Check if Dutch language is selected
    const isNL = language === "nl"

    // Prepare email content based on form type
    let subject = ""
    let emailContent = ""
    let htmlContent = ""

    if (formType === "pricing") {
      const { firstName, lastName, email, phone, message, packageDetails } = formData

      subject = isNL
        ? `Nieuwe Prijsaanvraag: ${packageDetails.package || "Aangepast Pakket"}`
        : `New Pricing Form Submission: ${packageDetails.package || "Custom Package"}`

      emailContent = isNL
        ? `
          Nieuwe Prijsaanvraag
          
          Klantinformatie:
          Naam: ${firstName} ${lastName}
          E-mail: ${email}
          Telefoon: ${phone || "Niet opgegeven"}
          
          Pakketdetails:
          Pakket: ${packageDetails.package || "Aangepast Pakket"}
          Klanttype: ${packageDetails.clientType || "Niet gespecificeerd"}
          ${packageDetails.tier ? `Niveau: ${packageDetails.tier}` : ""}
          ${packageDetails.technology ? `Technologie: ${packageDetails.technology}` : ""}
          ${packageDetails.price ? `Prijs: €${packageDetails.price}` : ""}
          ${packageDetails.monthlyPrice ? `Maandelijkse Prijs: €${packageDetails.monthlyPrice}/maand` : ""}
          
          Aanvullend Bericht:
          ${message || "Geen aanvullend bericht opgegeven"}
        `
        : `
          New Pricing Form Submission
          
          Client Information:
          Name: ${firstName} ${lastName}
          Email: ${email}
          Phone: ${phone || "Not provided"}
          
          Package Details:
          Package: ${packageDetails.package || "Custom Package"}
          Client Type: ${packageDetails.clientType || "Not specified"}
          ${packageDetails.tier ? `Tier: ${packageDetails.tier}` : ""}
          ${packageDetails.technology ? `Technology: ${packageDetails.technology}` : ""}
          ${packageDetails.price ? `Price: €${packageDetails.price}` : ""}
          ${packageDetails.monthlyPrice ? `Monthly Price: €${packageDetails.monthlyPrice}/month` : ""}
          
          Additional Message:
          ${message || "No additional message provided"}
        `

      htmlContent = isNL
        ? `
          <h2>Nieuwe Prijsaanvraag</h2>
          
          <h3>Klantinformatie:</h3>
          <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
          
          <h3>Pakketdetails:</h3>
          <p><strong>Pakket:</strong> ${packageDetails.package || "Aangepast Pakket"}</p>
          <p><strong>Klanttype:</strong> ${packageDetails.clientType || "Niet gespecificeerd"}</p>
          ${packageDetails.tier ? `<p><strong>Niveau:</strong> ${packageDetails.tier}</p>` : ""}
          ${packageDetails.technology ? `<p><strong>Technologie:</strong> ${packageDetails.technology}</p>` : ""}
          ${packageDetails.price ? `<p><strong>Prijs:</strong> €${packageDetails.price}</p>` : ""}
          ${packageDetails.monthlyPrice ? `<p><strong>Maandelijkse Prijs:</strong> €${packageDetails.monthlyPrice}/maand</p>` : ""}
          
          <h3>Aanvullend Bericht:</h3>
          <p>${message ? message.replace(/\n/g, "<br>") : "Geen aanvullend bericht opgegeven"}</p>
        `
        : `
          <h2>New Pricing Form Submission</h2>
          
          <h3>Client Information:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          
          <h3>Package Details:</h3>
          <p><strong>Package:</strong> ${packageDetails.package || "Custom Package"}</p>
          <p><strong>Client Type:</strong> ${packageDetails.clientType || "Not specified"}</p>
          ${packageDetails.tier ? `<p><strong>Tier:</strong> ${packageDetails.tier}</p>` : ""}
          ${packageDetails.technology ? `<p><strong>Technology:</strong> ${packageDetails.technology}</p>` : ""}
          ${packageDetails.price ? `<p><strong>Price:</strong> €${packageDetails.price}</p>` : ""}
          ${packageDetails.monthlyPrice ? `<p><strong>Monthly Price:</strong> €${packageDetails.monthlyPrice}/month</p>` : ""}
          
          <h3>Additional Message:</h3>
          <p>${message ? message.replace(/\n/g, "<br>") : "No additional message provided"}</p>
        `
    } else if (formType === "mvp") {
      const { firstName, lastName, email, phone, projectDescription, selectedPackage } = formData

      subject = isNL
        ? `Nieuwe MVP Aanvraag: ${selectedPackage || "Aangepaste Aanvraag"}`
        : `New MVP Request: ${selectedPackage || "Custom Request"}`

      emailContent = isNL
        ? `
          Nieuwe MVP Ontwikkelingsaanvraag
          
          Klantinformatie:
          Naam: ${firstName} ${lastName}
          E-mail: ${email}
          Telefoon: ${phone || "Niet opgegeven"}
          
          Pakket: ${selectedPackage || "Aangepaste Aanvraag"}
          
          Projectbeschrijving:
          ${projectDescription || "Geen projectbeschrijving opgegeven"}
        `
        : `
          New MVP Development Request
          
          Client Information:
          Name: ${firstName} ${lastName}
          Email: ${email}
          Phone: ${phone || "Not provided"}
          
          Package: ${selectedPackage || "Custom Request"}
          
          Project Description:
          ${projectDescription || "No project description provided"}
        `

      htmlContent = isNL
        ? `
          <h2>Nieuwe MVP Ontwikkelingsaanvraag</h2>
          
          <h3>Klantinformatie:</h3>
          <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
          
          <h3>Pakket:</h3>
          <p>${selectedPackage || "Aangepaste Aanvraag"}</p>
          
          <h3>Projectbeschrijving:</h3>
          <p>${projectDescription ? projectDescription.replace(/\n/g, "<br>") : "Geen projectbeschrijving opgegeven"}</p>
        `
        : `
          <h2>New MVP Development Request</h2>
          
          <h3>Client Information:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          
          <h3>Package:</h3>
          <p>${selectedPackage || "Custom Request"}</p>
          
          <h3>Project Description:</h3>
          <p>${projectDescription ? projectDescription.replace(/\n/g, "<br>") : "No project description provided"}</p>
        `
    } else {
      subject = isNL ? `Nieuw Formulier Bericht: ${formType}` : `New Form Submission: ${formType}`

      emailContent = isNL
        ? `Algemeen formulier bericht van ${formType} pagina:\n\n${JSON.stringify(formData, null, 2)}`
        : `Generic form submission from ${formType} page:\n\n${JSON.stringify(formData, null, 2)}`

      htmlContent = isNL
        ? `<h2>Algemeen formulier bericht van ${formType} pagina:</h2><pre>${JSON.stringify(formData, null, 2)}</pre>`
        : `<h2>Generic form submission from ${formType} page:</h2><pre>${JSON.stringify(formData, null, 2)}</pre>`
    }

    // Verify SMTP connection
    try {
      console.log("Verifying SMTP connection...")
      await transporter.verify()
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

    // Send the email to 8Leaps
    console.log(`Sending ${formType} form submission to 8Leaps team...`)
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: toEmail,
      replyTo: formData.email, // Set reply-to as the user's email
      subject,
      text: emailContent,
      html: htmlContent,
    })

    console.log(`${formType} form email sent successfully:`, info.messageId)

    // Send confirmation email to the user
    try {
      console.log("Sending confirmation email to user...")

      // Confirmation email content based on language
      const userConfirmationSubject = isNL
        ? formType === "pricing"
          ? "Bedankt voor uw prijsaanvraag"
          : "Bedankt voor uw MVP ontwikkelingsaanvraag"
        : formType === "pricing"
          ? "Thank you for your pricing request"
          : "Thank you for your MVP development request"

      const userConfirmationText = isNL
        ? `
          Beste ${formData.firstName},
          
          Bedankt voor uw ${formType === "pricing" ? "prijsaanvraag" : "MVP ontwikkelingsaanvraag"} bij 8Leaps. We hebben uw aanvraag ontvangen en zullen zo snel mogelijk contact met u opnemen.
          
          Met vriendelijke groet,
          Het 8Leaps Team
        `
        : `
          Dear ${formData.firstName},
          
          Thank you for your ${formType === "pricing" ? "pricing request" : "MVP development request"} with 8Leaps. We have received your submission and will get back to you as soon as possible.
          
          Best regards,
          The 8Leaps Team
        `

      const userConfirmationHtml = isNL
        ? `
          <p>Beste ${formData.firstName},</p>
          
          <p>Bedankt voor uw ${formType === "pricing" ? "prijsaanvraag" : "MVP ontwikkelingsaanvraag"} bij 8Leaps. We hebben uw aanvraag ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>
          
          <p>Met vriendelijke groet,<br>Het 8Leaps Team</p>
        `
        : `
          <p>Dear ${formData.firstName},</p>
          
          <p>Thank you for your ${formType === "pricing" ? "pricing request" : "MVP development request"} with 8Leaps. We have received your submission and will get back to you as soon as possible.</p>
          
          <p>Best regards,<br>The 8Leaps Team</p>
        `

      const userConfirmationInfo = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: formData.email,
        subject: userConfirmationSubject,
        text: userConfirmationText,
        html: userConfirmationHtml,
      })

      console.log("User confirmation email sent successfully:", userConfirmationInfo.messageId)
    } catch (confirmationError) {
      // If confirmation email fails, log it but don't fail the whole request
      console.error("Error sending confirmation email:", confirmationError)
    }

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    })
  } catch (error) {
    console.error(`Error sending ${request.body?.formType || "form"} submission email:`, error)
    return NextResponse.json(
      {
        error: "Failed to send form submission",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
