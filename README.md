# Serverless Email function

## Required Environment Variables

- **TO_EMAIL**: The email address that receives the emails.
- **FROM_EMAIL**: The email address that sends the emails. Must be approved on SendGrid.
- **SENDGRID_KEY**: Your SendGrid API key.

## Request Body

- **"subject"**: the email's subject
- **"text"**: the email's text body
- **"html"**: the email's html body

