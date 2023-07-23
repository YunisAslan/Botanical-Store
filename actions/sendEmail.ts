"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  console.log("Running on the server");
  console.log(formData.get("senderEmail"));
  console.log(formData.get("message")); // ->null  because we dont have message input

  const senderEmail = formData.get("senderEmail");
  console.log(senderEmail);

  await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: senderEmail as string,
    subject: "Message from contact form",
    react: "HHHHHHelloooo mf",
  });
};
