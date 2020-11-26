import { NowRequest, NowResponse } from '@vercel/node'
import sgMail from '@sendgrid/mail'

const API_KEY = process.env.SENDGRID_KEY

try {
  sgMail.setApiKey(API_KEY)
} catch (err) {
  console.log(err)
  process.exit(1)
}

const to = process.env.TO_EMAIL
const from = process.env.FROM_EMAIL

export default async (req: NowRequest, res: NowResponse) => {
  const { subject, text, html } = req.body

  if (!to) {
    console.error(
      "Looks like you haven't set the `TO_EMAIL` environment variable"
    )
    res.status(500)
    return
  }

  if (!from) {
    console.error(
      "Looks like you haven't set the `FROM_EMAIL` environment variable"
    )
    res.status(500)
    return
  }

  const msg = { to, from, subject, text, html }

  try {
    await sgMail.send(msg)
    console.log('Sent email', { msg })
    res.status(201).json({ success: true })
  } catch (err) {
    const { errors } = err.response.body
    console.error({ errors })
    res.status(500).json({ success: false, errors: err.response.body.errors })
  }
}
