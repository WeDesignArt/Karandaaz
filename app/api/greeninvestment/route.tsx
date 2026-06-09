import { NextResponse, NextRequest } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
const nodemailer = require('nodemailer')

// Handles POST requests to /api

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_DIRECTINVESTMENT_FORM_EMAIL
  const toEmailCC = process.env.NEXT_PUBLIC_CONTACT_FORMCC_EMAIL
  const formData = await request.formData()

  // contact form fields
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const contact = formData.get('contact')
  const emailAddress = formData.get('email')
  const companyName = formData.get('companyName')
  const companyType = formData.get('companyType')
  const companySize = formData.get('companySize')
  const amount = formData.get('amount')
  const location = formData.get('city')
  const sector = formData.get('sector')
  const desc = formData.get('description')
  //   console.log('name, email, message', firstName, lastName, emailAddress, companyType)

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
      from: `"Karandaaz - Investment Form Submission" <${senderEmail}>`,
      to: toEmail,
      cc: toEmailCC,
      subject: `Green Investment Form Submission`,
      html: `
            <p>FirstName: ${firstName} </p>
            <p>LastName: ${lastName} </p>
            <p>Contact: ${contact} </p>
            <p>Email: ${emailAddress} </p>
            <p>CompanyName: ${companyName} </p>
            <p>CompanyType: ${companyType} </p>
            <p>CompanySize: ${companySize} </p>
            <p>Amount: ${amount} </p>
            <p>Location: ${location} </p>
            <p>Sector: ${sector} </p>
            <p>Desc: ${desc} </p>
            `,
    })

    const values = [
      firstName,
      lastName,
      contact,
      emailAddress,
      companyName,
      companyType,
      companySize,
      amount,
      location,
      sector,
      desc,
    ]

    const sheetTitle = 'Green Investment'
    const result = await appendToGoogleSheet(sheetTitle, values)

    if (result.success) {
      return NextResponse.json({ message: 'Success: Email sent and data added to Google Sheets' })
    } else {
      return NextResponse.json({
        message: 'Email sent, but failed to append data to Google Sheets',
        error: result.error,
      })
    }
  } catch (error) {
    console.log(error)
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
