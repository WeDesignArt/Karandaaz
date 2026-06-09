// app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json(); // Extract JSON body

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  // Here, you would integrate with Constant Contact or any other service
  try {
    const response = await fetch('https://api.cc.email/v3/contacts/sign_up_form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONSTANT_CONTACT_ACCESS_TOKEN}`, // Use your access token
      },
      body: JSON.stringify({
        "email_address": email,
        "list_ids": ["cf5df876-377c-11ea-b498-d4ae52724810"],  // Replace with your list ID
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.detail }, { status: response.status });
    }

    return NextResponse.json({ message: 'Subscription successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
