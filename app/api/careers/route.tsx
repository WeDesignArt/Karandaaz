import { NextResponse } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
import { uploadFileToDrive } from '../lib/googleDrive'
const nodemailer = require('nodemailer')

// Handles POST requests to /api
export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_CAREERS_FORM_EMAIL
  const toEmailCC = process.env.NEXT_PUBLIC_CAREERS_FORMCC_EMAIL
  const formData = await request.formData()

  // Contact form fields
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')
  const gender = formData.get('gender')
  const contact = formData.get('contact')
  const emailAddress = formData.get('email')
  const city = formData.get('city')
  const country = formData.get('country')
  const education = formData.get('education')
  const accreditation = formData.get('accreditation')
  const experience = formData.get('experience')
  const currentDesignation = formData.get('currentDesignation')
  const currentOrganization = formData.get('currentOrganization')
  const linkedinProfile = formData.get('linkedinProfile')
  const availableDate = formData.get('availableDate')
  const currentSalary = formData.get('currentSalary')
  const desiredPay = formData.get('desiredPay')
  // const blogLink = formData.get('blogLink')
  const resume = formData.get('resume')
  const isReferred = formData.get('isReferred')
  const referredBy = formData.get('referredBy')
  const hearAboutUs = formData.get('hearAboutUs')
  const jobTitle = formData.get('jobTitle')

  const resumeBuffer = await resume.arrayBuffer()
  const buffer = Buffer.from(resumeBuffer)

  let resumeLink = ''
  try {
    resumeLink = await uploadFileToDrive(resume.name, buffer, process.env.GOOGLE_CAREERS_DRIVE_ID)
  } catch (error) {
    console.error('Error uploading resume to Google Drive:', error)
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
  })

  try {
    const mailToKrn = await transporter.sendMail({
      from: `"Karandaaz - Career Application" <${senderEmail}>`,
      to: `${toEmail}`,
      cc: `${toEmailCC}`,
      subject: `Career Application`,
      html: `
       <p> Here are the responses of the application submitted.</p>
         <ul>
          <li>First Name: ${firstName}</li>
          <li>Last Name: ${lastName}</li>
          <li>Gender: ${gender}</li>
          <li>Mobile number: ${contact}</li>
          <li>Email address: ${emailAddress}</li>
          <li>City: ${city}</li>
          <li>Country: ${country}</li>
          <li>Highest Educational Qualification: ${education}</li>
          <li>Professional accreditation: ${accreditation}</li>
          <li>Total Experience: ${experience}</li>
          <li>Current Designation: ${currentDesignation}</li>
          <li>Current Organization: ${currentOrganization}</li>
          <li>Profile Link: ${linkedinProfile}</li>
          <li>Available Date: ${availableDate}</li>
          <li>Existing Gross Salary: ${currentSalary}</li>
          <li>Desired Gross Salary: ${desiredPay}</li>
          <li>Is Referred: ${isReferred}</li>
          <li>Referred By: ${referredBy}</li>
          <li>Hear About Us: ${hearAboutUs}</li>
          <li>Position Title: ${jobTitle}</li>
        </ul>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    })

    // const mailToApplicant = await transporter.sendMail({
    //   from: `"Karandaaz - Career Application" <${senderEmail}>`,
    //   to: emailAddress,
    //   subject: `Thank you for your application`,
    //   html: `
    //     <p>Dear ${firstName} ${lastName},</p>
    //     <p>Thank you for applying to our company. We have received your application and will review it shortly.</p>
    //     <p>Here are the details you provided:</p>
    //     <ul>
    //       <li>First Name: ${firstName}</li>
    //       <li>Last Name: ${lastName}</li>
    //       <li>Gender: ${gender}</li>
    //       <li>Mobile number: ${contact}</li>
    //       <li>Email address: ${emailAddress}</li>
    //       <li>City: ${city}</li>
    //       <li>Country: ${country}</li>
    //       <li>Highest Educational Qualification: ${education}</li>
    //       <li>Professional accreditation: ${accreditation}</li>
    //       <li>Total Experience: ${experience}</li>
    //       <li>Profile Link: ${linkedinProfile}</li>
    //       <li>Available Date: ${availableDate}</li>
    //       <li>Existing Gross Salary: ${currentSalary}</li>
    //       <li>Expected Gross Salary: ${desiredPay}</li>
    //       <li>Is Referred: ${isReferred}</li>
    //       <li>Referred By: ${referredBy}</li>
    //       <li>Hear About Us: ${hearAboutUs}</li>
    //       <li>Position Title: ${jobTitle}</li>
    //     </ul>
    //     <p>Best regards,<br/>Karandaaz Team</p>
    //   `,
    //   attachments: [
    //     {
    //       filename: resume.name,
    //       content: buffer,
    //     },
    //   ],
    // })

    const values = [
      firstName,
      lastName,
      gender,
      contact,
      emailAddress,
      city,
      country,
      education,
      accreditation,
      experience,
      currentDesignation,
      currentOrganization,
      linkedinProfile,
      availableDate,
      currentSalary,
      desiredPay,
      isReferred,
      referredBy,
      hearAboutUs,
      jobTitle,
      resumeLink,
    ]

    const sheetTitle = 'Work For Us'

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
    return NextResponse.json({ message: 'COULD NOT SEND MESSAGE' })
  }
}
