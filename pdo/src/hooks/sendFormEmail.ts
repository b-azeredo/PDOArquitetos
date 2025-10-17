import type { CollectionAfterChangeHook } from 'payload'
import nodemailer from 'nodemailer'
import type { FormSubmission } from '@/payload-types'

export const sendFormEmail: CollectionAfterChangeHook<FormSubmission> = async ({
  doc,
  operation,
}) => {
  if (operation !== 'create') return doc

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.EMAIL_PASS,
      },
    })

    const submissionData = doc.submissionData || []
    const formattedData = submissionData
      .map((item) => `${item.field}: ${item.value}`)
      .join('\n')

    // Email options
    const mailOptions = {
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'po@pdo-arquitetos.pt', 
      subject: 'Nova Submissão de Formulário - Vamos Construir Algo Juntos',
      text: `Você recebeu uma nova submissão de formulário:\n\n${formattedData}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B688C;">Nova Submissão de Formulário</h2>
          <p>Você recebeu uma nova submissão do formulário "Vamos Construir Algo Juntos":</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${submissionData
              .map(
                (item) =>
                  `<p style="margin: 10px 0;"><strong>${item.field}:</strong> ${item.value}</p>`,
              )
              .join('')}
          </div>
          <p style="color: #666; font-size: 12px;">
            Submissão recebida em: ${new Date(doc.createdAt).toLocaleString('pt-PT')}
          </p>
        </div>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)
    console.log('Form submission email sent successfully')
  } catch (error) {
    console.error('Error sending form submission email:', error)
    // Don't throw error to prevent form submission from failing
  }

  return doc
}

