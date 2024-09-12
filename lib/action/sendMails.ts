"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function sendMails({
  emails,
  message,
}: {
  emails: { email: string }[];
  message: string;
}) {
  try {
    const emailsList = emails.map((email) => email.email);
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailsList.join(", "),
      subject: `TEST`,
      text: message,
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error occurred:", error);
    return { success: false, error: error };
  }
}
