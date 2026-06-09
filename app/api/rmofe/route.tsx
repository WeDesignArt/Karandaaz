import { NextResponse, NextRequest } from 'next/server'
import { appendToGoogleSheet } from '../lib/googleSheet'
import { uploadFileToDrive } from '../lib/googleDrive'
const nodemailer = require('nodemailer')

// Handles POST requests to /api/rmofe

export async function POST(request: any) {
  const senderEmail = process.env.NEXT_PUBLIC_SENDER_EMAIL
  const senderPass = process.env.NEXT_PUBLIC_SENDER_PASSWORD
  const toEmail = process.env.NEXT_PUBLIC_RMOFE_FORM_EMAIL
  const formData = await request.formData()

  // RMOFE form fields
  const category = formData.get('category')
  const businessName = formData.get('businessName')
  const yearEstablishment = formData.get('yearEstablishment')
  const website = formData.get('website') || 'Not provided'
  const companySize = formData.get('companySize')
  const coreWorkingAreas = formData.get('coreWorkingAreas') || 'Not provided'
  const fieldForceSize = formData.get('fieldForceSize') || 'N/A'
  const languages = formData.get('languages') || 'N/A'
  const ownerName = formData.get('ownerName')
  const contact = formData.get('contact')
  const emailAddress = formData.get('email')
  const businessAddress = formData.get('businessAddress')
  const city = formData.get('city')
  const province = formData.get('province')
  const isRegistered = formData.get('isRegistered')
  const isStateBankLicensed = formData.get('isStateBankLicensed')
  const workedWithKarandaaz = formData.get('workedWithKarandaaz')
  const merchantRelationships = formData.get('merchantRelationships')
  const merchantDescription = formData.get('merchantDescription')
  const onboardingExperience = formData.get('onboardingExperience')
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

    const mail = await transporter.sendMail({
      from: `"Karandaaz - RMOFE Application" <${senderEmail}>`,
      to: toEmail,
      subject: `RMOFE Application Submission - ${businessName}`,
      html: `
        <h2>RMOFE Application Submission</h2>
        
        <p><strong>Selected Category:</strong> ${category}</p>
        
        <h3>Business Information</h3>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Year of Establishment:</strong> ${yearEstablishment}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        <p><strong>Core Working Areas:</strong> ${coreWorkingAreas}</p>
        ${
          category === 'Category A'
            ? `
        <p><strong>Field Force Size:</strong> ${fieldForceSize}</p>
        <p><strong>Languages Spoken by Field Workers:</strong> ${languages}</p>
        `
            : ''
        }
        
        <h3>Contact & Location Information</h3>
        <p><strong>Owner Full Name:</strong> ${ownerName}</p>
        <p><strong>Primary Mobile Number:</strong> ${contact}</p>
        <p><strong>Email Address:</strong> ${emailAddress}</p>
        <p><strong>Business Address:</strong> ${businessAddress}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Province:</strong> ${province}</p>
        
        <h3>Legal & Registration Details</h3>
        <p><strong>Business Registered:</strong> ${isRegistered}</p>
        <p><strong>State Bank Licensed Financial Institution:</strong> ${isStateBankLicensed}</p>
        
        <h3>Market Connectivity</h3>
        <p><strong>Previously Worked with Karandaaz:</strong> ${workedWithKarandaaz}</p>
        <p><strong>Existing Merchant Community Relationships:</strong> ${merchantRelationships}</p>
        <p><strong>Merchant Relationship Description:</strong> ${merchantDescription}</p>
        <p><strong>Previous Merchant Onboarding Experience:</strong> ${onboardingExperience}</p>
        <p><strong>Proposal Submission Option:</strong> ${
          proposalOption === 'now' ? 'Submitted with this form' : 'Will send later'
        }</p>
        ${proposalFileLink ? `<p><strong>Proposal File:</strong> <a href="${proposalFileLink}">Download</a></p>` : ''}
        
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Application Type:</strong> RMOFE (Remote Mobile Finance Extension)</p>
      `,
    })

    const values = [
      category,
      businessName,
      yearEstablishment,
      website,
      companySize,
      coreWorkingAreas,
      fieldForceSize,
      languages,
      ownerName,
      contact,
      emailAddress,
      businessAddress,
      city,
      province,
      isRegistered,
      isStateBankLicensed,
      workedWithKarandaaz,
      merchantRelationships,
      merchantDescription,
      onboardingExperience,
      proposalOption,
      proposalFileLink,
      new Date().toISOString(), // Submission timestamp
    ]

    const sheetTitle = 'RMOFE Applications'
    const result = await appendToGoogleSheet(sheetTitle, values)

    if (result.success) {
      return NextResponse.json({ message: 'Success: RMOFE application submitted and data saved' })
    } else {
      return NextResponse.json({
        message: 'Application submitted, but failed to save to Google Sheets',
        error: result.error,
      })
    }
  } catch (error) {
    console.log('RMOFE form submission error:', error)
    return NextResponse.json(
      {
        message: 'COULD NOT SEND EMAIL',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
