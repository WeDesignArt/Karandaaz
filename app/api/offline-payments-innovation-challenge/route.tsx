import { NextResponse, NextRequest } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
import { uploadFileToDrive } from '../lib/googleDrive'
const nodemailer = require('nodemailer')

// Handles POST requests to /api/offline-payments-innovation-challenge

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_OPIC_FORM_EMAIL
  const formData = await request.formData()

  // Form fields for Offline Payments Innovation Challenge
  const category = formData.get('category')
  const businessName = formData.get('businessName')
  const yearOfEstablishment = formData.get('yearOfEstablishment')
  const website = formData.get('website') || 'Not provided'
  const coreWorkingArea = formData.get('coreWorkingArea') || 'Not provided'
  const ownerName = formData.get('ownerName')
  const primaryMobile = formData.get('primaryMobile')
  const primaryEmail = formData.get('primaryEmail')
  const businessAddress = formData.get('businessAddress')
  const city = formData.get('city')
  const province = formData.get('province')
  const isRegistered = formData.get('isRegistered')
  const isStateBankLicensed = formData.get('isStateBankLicensed')
  const workedWithKarandaaz = formData.get('workedWithKarandaaz')
  const proposalOption = formData.get('proposalOption')
  const proposalFile = formData.get('proposalFile') as File | null

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
    // If proposalOption is 'now', upload the file to Google Drive and include the link in the email
    let proposalFileLink = ''
    if (proposalOption === 'now') {
      if (!proposalFile) {
        return NextResponse.json({ message: 'Proposal file is required when submitting now.' }, { status: 400 })
      }
      // Read the file as a buffer
      const fileBuffer = Buffer.from(await proposalFile.arrayBuffer())
      try {
        proposalFileLink = await uploadFileToDrive(proposalFile.name, fileBuffer, process.env.GOOGLE_DFS_DRIVE_ID)
      } catch (error) {
        return NextResponse.json({ message: 'Failed to upload proposal file to Google Drive.' }, { status: 500 })
      }
    }

    let mailOptions: any = {
      from: `"Karandaaz - Offline Payments Innovation Challenge" <${senderEmail}>`,
      to: toEmail,
      subject: `Offline Payments Innovation Challenge Submission - ${businessName}`,
      html: `
        <h2>Offline Payments Innovation Challenge Submission</h2>
        <p><strong>Category:</strong> ${category}</p>
        <h3>Business Information</h3>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Year of Establishment:</strong> ${yearOfEstablishment}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Core Working Area:</strong> ${coreWorkingArea}</p>
        <h3>Contact & Location Information</h3>
        <p><strong>Owner's Name:</strong> ${ownerName}</p>
        <p><strong>Primary Mobile Number:</strong> ${primaryMobile}</p>
        <p><strong>Primary Email Address:</strong> ${primaryEmail}</p>
        <p><strong>Business Address:</strong> ${businessAddress}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Province:</strong> ${province}</p>
        <h3>Legal & Registration Details</h3>
        <p><strong>Business Registered:</strong> ${isRegistered}</p>
        <p><strong>State Bank Licensed Institution:</strong> ${isStateBankLicensed}</p>
        <h3>Other</h3>
        <p><strong>Previously Worked with Karandaaz:</strong> ${workedWithKarandaaz}</p>
        <p><strong>Proposal Submission Option:</strong> ${
          proposalOption === 'now' ? 'Submitted with this form' : 'Will send later'
        }</p>
        ${proposalFileLink ? `<p><strong>Proposal File:</strong> <a href="${proposalFileLink}">Download</a></p>` : ''}
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Application Type:</strong> Offline Payments Innovation Challenge</p>
      `,
    }
    const mail = await transporter.sendMail(mailOptions)

    const values = [
      category,
      businessName,
      yearOfEstablishment,
      website,
      coreWorkingArea,
      ownerName,
      primaryMobile,
      primaryEmail,
      businessAddress,
      city,
      province,
      isRegistered,
      isStateBankLicensed,
      workedWithKarandaaz,
      new Date().toISOString(), // Submission timestamp
      proposalFileLink,
    ]

    const sheetTitle = 'Offline Payments Innovation Challenge Applications'
    const result = await appendToGoogleSheet(sheetTitle, values)

    if (result.success) {
      return NextResponse.json({ message: 'Success: Application submitted and data saved' })
    } else {
      return NextResponse.json({
        message: 'Application submitted, but failed to save to Google Sheets',
        error: result.error,
      })
    }
  } catch (error) {
    console.log('Offline Payments Innovation Challenge form submission error:', error)
    return NextResponse.json(
      {
        message: 'COULD NOT SEND EMAIL',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
