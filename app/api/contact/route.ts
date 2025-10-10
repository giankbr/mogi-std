import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, message } = body;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, just log the data
    console.log('Contact form submission:', {
      name,
      email,
      company,
      projectType,
      budget,
      message,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email using Resend
    // const { data, error } = await resend.emails.send({
    //   from: 'Mogi Studio <hello@mogistudio.com>',
    //   to: ['hello@mogistudio.com'],
    //   subject: `New Contact Form: ${projectType} - ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company || 'Not provided'}</p>
    //     <p><strong>Project Type:</strong> ${projectType}</p>
    //     <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // if (error) {
    //   return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    // }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
