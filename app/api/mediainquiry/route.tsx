import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer')

// Handles POST requests to /api

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_MEDIAENQUIRY_FORM_EMAIL
  const toEmailCC = process.env.NEXT_PUBLIC_MEDIAENQUIRY_FORM_EMAIL
  const formData = await request.formData()

  // contact form fields
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const emailAddress = formData.get('email')
  const organization = formData.get('organization')
  const enquiry = formData.get('enquiry')

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use secure connection
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
    authMethod: 'PLAIN', // Specify authentication method
  })

  try {
    const mail = await transporter.sendMail({
      from: `"Karandaaz - Media Inquiry " <${senderEmail}>`,
      to: toEmail,
      cc: toEmailCC,
      subject: `Media Inquiry Form Submission`,
      html: `
            <p>FirstName: ${firstName} </p>
            <p>LastName: ${lastName} </p>
            <p>Email: ${emailAddress} </p>
            <p>Organization: ${organization} </p>
            <p>Inquiry: ${enquiry} </p>
            `,
    })

    return NextResponse.json({ message: 'Success: Email sent' })
  } catch (error) {
    console.log(error)
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
