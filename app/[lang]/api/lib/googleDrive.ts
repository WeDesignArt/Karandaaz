import { google } from 'googleapis'
import { Readable } from 'stream'

export async function uploadFileToDrive(fileName: string, fileBuffer: Buffer, folderIdOverride?: string): Promise<string> {
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

    const folderId = folderIdOverride || process.env.GOOGLE_DRIVE_ID

    if (!folderId) {
      throw new Error('Google Drive ID is not defined in environment variables.')
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive'],
    })

    const drive = google.drive({ version: 'v3', auth })

    fileName = fileName || 'resume.pdf'

    const bufferStream = new Readable()
    bufferStream.push(fileBuffer)
    bufferStream.push(null)

    const res = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: 'application/pdf',
        parents: [folderId],
      },
      media: {
        mimeType: 'application/pdf',
        body: bufferStream,
      },
      fields: 'id',
    })

    const fileId = res.data.id

    if (!fileId) {
      throw new Error('Failed to upload file: file ID is undefined.')
    }

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    })

    const file = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink',
    })

    const webViewLink = file.data.webViewLink

    if (!webViewLink) {
      throw new Error('Failed to retrieve webViewLink of the file.')
    }

    console.log('File uploaded to Google Drive')

    return webViewLink
  } catch (error) {
    console.error('Error uploading file to Google Drive:', error)
    throw error
  }
}
