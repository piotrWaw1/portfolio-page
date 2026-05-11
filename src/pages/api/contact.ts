import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const sanitize = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const allowedOrigin = "https://www.p-wawrzenczyk.dev";

export const POST: APIRoute = async ({ request }) => {
  const origin = request.headers.get("origin");
  if (!origin || !origin.startsWith(allowedOrigin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Invalid content type" }), {
      status: 415,
    });
  }

  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || name.length > 100 || message.length > 1000) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
    });
  }

  let emailMessage: string;
  const referer = request.headers.get("referer");

  if (referer?.includes("oferta")) {
    if (
      !body.company ||
      body.company.length > 200 ||
      !body.projectType ||
      body.projectType.length > 100
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    emailMessage = `
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Company:</strong> ${sanitize(body.company)}</p>
        <p><strong>Project type:</strong> ${sanitize(body.projectType)}</p>
        <p><strong>Message:</strong><br/>${sanitize(message)}</p>
      `;
  } else {
    emailMessage = `
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Message:</strong><br/>${sanitize(message)}</p>
      `;
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: "Contact <portfolio-contact@contact.p-wawrzenczyk.dev>",
      to: ["p.wawrzenczyk1@gmail.com"],
      subject: `New message from ${name}`,
      replyTo: email,
      html: emailMessage,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
};
