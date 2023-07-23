import { Resend } from "resend";
import Welcomee from "@/emails/welcome";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { firstName, email } = await request.json();
  console.log(email);

  // not work because we need real domain name
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: Welcomee({
        firstName,
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
