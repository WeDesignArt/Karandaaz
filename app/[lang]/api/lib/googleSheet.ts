const { google } = require('googleapis')

export async function appendToGoogleSheet(sheetTitle: string, values: any) {
  const sanitizeValue = (value: any) => {
    if (typeof value === 'string' && (value.startsWith('+') || value.startsWith('=') || value.startsWith('-'))) {
      return `'${value}`
    }
    return value
  }
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY

    if (!privateKey) {
      throw new Error('Google Private Key is not defined in environment variables.')
    }
    const credentials = {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: privateKey.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    }
    const spreadsheetId = process.env.GOOGLE_SPREEDSHEET_ID

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const client = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: client })

    const sanitizedValues = values.map(sanitizeValue)

    // Append the form data to the specified sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetTitle}`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [sanitizedValues],
      },
    })

    console.log('Data successfully appended to Google Sheets')
    return { success: true }
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    return { success: false, error }
  }
}

// module.exports = { appendToGoogleSheet }
