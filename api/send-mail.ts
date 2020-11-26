import { NowRequest, NowResponse } from '@vercel/node'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_KEY)

const to = process.env.TO_EMAIL
const from = process.env.FROM_EMAIL

export default async (req: NowRequest, res: NowResponse) => {
  const { subject, text, html } = req.body

  const msg = { to, from, subject, text, html }

  try {
    await sgMail.send(msg)
    res.status(201).json({ success: true })
  } catch (err) {
    res.status(500).json({ success: false, errors: err.response.body.errors })
  }
}
