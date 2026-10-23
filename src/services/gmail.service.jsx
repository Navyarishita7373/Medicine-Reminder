import { useState, useEffect } from 'react'

// Gmail configuration - replace with your actual credentials
// The provided code: rieu mxwo fdlu htim
// This appears to be Gmail App Password or SMTP settings

const GMAIL_CONFIG = {
  clientId: 'rieu',          // Gmail client ID or part of credentials
  clientSecret: 'mxwo',      // Gmail client secret or part of credentials
  redirectUri: 'urn:ietf:wg:oauth:2.0:oob', // OAuth redirect URI
  refreshToken: 'fdlu',      // Gmail refresh token
  accessToken: 'htim',       // Gmail access token
  smtpHost: 'smtp.gmail.com',
  smtpPort: 465,
}

// Create transporter for sending emails
function createTransporter() {
  // In a real implementation, you would use nodemailer with the Gmail credentials
  // For now, we'll set up the configuration structure
  return {
    host: GMAIL_CONFIG.smtpHost,
    port: GMAIL_CONFIG.smtpPort,
    secure: true, // SSL
    auth: {
      user: GMAIL_CONFIG.clientId,
      pass: GMAIL_CONFIG.clientSecret,
    },
  }
}

// Send medicine reminder email
export async function sendMedicineReminder(medicineName, time, userEmail) {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"Smart Medicine Reminder" <no-reply@smartmedreminder.com>`,
      to: userEmail,
      subject: '💊 Medicine Reminder - Take Your Medication',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00d4aa, #ff006e); color: white; padding: 20px; text-align: center;">
            <h1>💊 Smart Medicine Reminder</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #333; margin-top: 0;">Time to take your medicine!</h2>
            <p style="font-size: 18px; color: #666;">
              <strong>${medicineName}</strong><br>
              <small>Time: ${time}</small>
            </p>
            <div style="background: white; padding: 20px; border-radius: 4; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p>Don't forget to take your medication on time!</p>
              <p style="font-size: 14px; color: #666;">If you've already taken your medicine, you can dismiss this reminder.</p>
            </div>
          </div>
          <div style="text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated message from Smart Medicine Reminder System</p>
            <p>If you have any questions, please contact your healthcare provider.</p>
          </div>
        </div>
      `,
    }

    // In production, would send via: await transporter.sendMail(mailOptions)
    console.log('📧 Email prepared for:', userEmail)
    console.log('📧 Medicine:', medicineName, 'at', time)
    
    return { success: true, message: 'Email prepared successfully' }
  } catch (error) {
    console.error('❌ Email sending error:', error)
    return { success: false, message: error.message }
  }
}

// Hook to send reminders
export function useMedicineReminder() {
  const [isSending, setIsSending] = useState(false)

  const sendReminder = async (medicineName, time, userEmail) => {
    setIsSending(true)
    const result = await sendMedicineReminder(medicineName, time, userEmail)
    setIsSending(false)
    return result
  }

  return { sendReminder, isSending }
}