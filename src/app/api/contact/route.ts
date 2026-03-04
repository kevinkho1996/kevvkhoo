import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Debugging: Check context
    console.log('--- Email Notification Triggered ---')
    console.log(
      'To:',
      process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'kevinkho96@gmail.com',
    )
    console.log('API Key Defined:', !!process.env.RESEND_API_KEY)
    if (process.env.RESEND_API_KEY) {
      console.log(
        'API Key Starts With:',
        process.env.RESEND_API_KEY.substring(0, 5),
      )
    }

    // We use the Resend API to send an email notification
    // You can get a free API key at https://resend.com
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'kevinkho96@gmail.com'],
        reply_to: email,
        subject: `📬 New Portfolio Message: ${subject || 'No Subject'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
            <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">New Message Received</h2>
            <div style="margin: 20px 0;">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5;">
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
              This message was sent from your portfolio website contact form.
            </p>
          </div>
        `,
      }),
    })

    if (res.ok) {
      return NextResponse.json({ success: true })
    } else {
      const errorData = await res.json()
      console.error('Resend API error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Failed to send email' },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Contact API Internal Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
