import { NextResponse, NextRequest } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
import { uploadFileToDrive } from '../lib/googleDrive'
const nodemailer = require('nodemailer')

// Handles POST requests to /api/ai-in-digital-payments

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_AIDP_FORM_EMAIL
  const formData = await request.formData()

  // Form fields (same as Offline Payments Innovation Challenge)
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
  const hasDfiExperience = formData.get('hasDfiExperience')
  const proposalOption = formData.get('proposalOption')
  // Support multiple files (proposalFiles). Some browsers send single file under the same name
  const proposalFiles = (formData.getAll('proposalFiles') as File[]).filter(Boolean)

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
    // If proposalOption is 'now', upload up to 2 files to Google Drive and include the links in the email
    let proposalFileLinks: string[] = []
    if (proposalOption === 'now') {
      if (proposalFiles.length === 0) {
        return NextResponse.json({ message: 'Proposal file is required when submitting now.' }, { status: 400 })
      }
      const filesToUpload = proposalFiles.slice(0, 2)
      try {
        for (const file of filesToUpload) {
          const fileBuffer = Buffer.from(await file.arrayBuffer())
          const link = await uploadFileToDrive(file.name, fileBuffer, process.env.GOOGLE_DFS_DRIVE_ID)
          proposalFileLinks.push(link)
        }
      } catch (error) {
        return NextResponse.json(
          { message: 'Failed to upload one or more proposal files to Google Drive.' },
          { status: 500 }
        )
      }
    }

    let mailOptions: any = {
      from: `"Karandaaz - AI in Digital Payments" <${senderEmail}>`,
      to: toEmail,
      subject: `AI in Digital Payments Submission - ${businessName}`,
      html: `
        <h2>AI in Digital Payments Submission</h2>
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
        <p><strong>Worked on Digital Financial Inclusion Programs:</strong> ${hasDfiExperience}</p>
        <p><strong>Proposal Submission Option:</strong> ${
          proposalOption === 'now' ? 'Submitted with this form' : 'Will send later'
        }</p>
        ${
          proposalFileLinks.length
            ? `<p><strong>Proposal Files:</strong> ${proposalFileLinks
                .map((l, idx) => `<a href="${l}">File ${idx + 1}</a>`)
                .join(' | ')}</p>`
            : ''
        }
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Application Type:</strong> AI in Digital Payments</p>
      `,
    }
    const mail = await transporter.sendMail(mailOptions)

    const values = [
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
      hasDfiExperience,
      new Date().toISOString(), // Submission timestamp
      proposalFileLinks.join(', '),
    ]

    const sheetTitle = 'AI in Digital Payments Applications'
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
    console.log('AI in Digital Payments form submission error:', error)
    return NextResponse.json(
      {
        message: 'COULD NOT SEND EMAIL',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
