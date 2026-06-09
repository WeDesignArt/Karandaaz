import { NextResponse, NextRequest } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
const nodemailer = require('nodemailer')

// Handles POST requests to /api

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_CONTACT_FORM_EMAIL
  const toEmailCC = process.env.NEXT_PUBLIC_CONTACT_FORMCC_EMAIL
  const formData = await request.formData()

  // contact form fields
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const emailAddress = formData.get('email')
  const subject = formData.get('subject')
  const message = formData.get('message')

  const toEmailReceiver =
    subject === 'Procurement & vendor services'
      ? 'procurementteam@karandaaz.com.pk'
      : subject === 'Careers & job opporunities'
      ? 'careers@karandaaz.com.pk'
      : subject === 'Communication & media query' || subject === 'Collaboration opportunities'
      ? 'communications@karandaaz.com.pk'
      : toEmail
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
      from: `"Karandaaz - Form Submission" <${senderEmail}>`,
      to: toEmailReceiver,
      cc: toEmailCC,
      subject: subject,
      html: `
            <p>First Name: ${firstName} </p>
            <p>Last Name: ${lastName} </p>
            <p>Email: ${emailAddress} </p>
            <p>Subject: ${subject} </p>
            <p>Message: ${message} </p>
            `,
    })

    const values = [firstName, lastName, emailAddress, subject, message]

    const sheetTitle = 'Contact Us'
    const result = await appendToGoogleSheet(sheetTitle, values)

    if (result.success) {
      return NextResponse.json({ message: 'Success: Email sent and data added to Google Sheets' })
    } else {
      return NextResponse.json({
        message: 'Email sent, but failed to append data to Google Sheets',
        error: result.error,
      })
    }

    // return NextResponse.json({ message: 'Success: Email sent' })
  } catch (error) {
    NextResponse.json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
