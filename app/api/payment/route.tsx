import { NextResponse, NextRequest } from 'next/server'
const nodemailer = require('nodemailer')

// Handles POST requests to /api

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_PAYMENT_FORM_EMAIL
  const toEmailCC = process.env.NEXT_PUBLIC_CONTACT_FORMCC_EMAIL
  const formData = await request.formData()

  // contact form fields
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const contact = formData.get('contact')
  const emailAddress = formData.get('email')
  const companyName = formData.get('company')
  const city = formData.get('city')
  const country = formData.get('country')
  //   console.log('name, email, message', firstName, lastName, emailAddress, companyName)

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
      from: `"Karandaaz - Payment Form Submission" <${senderEmail}>`,
      to: toEmail,
      cc: toEmailCC,
      subject: `Payment Form Submission`,
      html: `
            <p>FirstName: ${firstName} </p>
            <p>LastName: ${lastName} </p>
            <p>Contact: ${contact} </p>
            <p>Email: ${emailAddress} </p>
            <p>CompanyName: ${companyName} </p>
            <p>City: ${city} </p>
            <p>Country: ${country} </p>
            `,
    })

    return NextResponse.json({ message: 'Success: Email sent' })
  } catch (error) {
    console.log(error)
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
