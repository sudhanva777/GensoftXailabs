import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactRateLimit, getRateLimitIdentifier } from "@/lib/rate-limit";
import { z } from "zod";
import { parseAndValidateBody, secureErrorResponse } from "@/lib/api-security";

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Invalid email format").toLowerCase().trim().max(254),
  phone: z.string().max(20).trim().optional(),
  message: z.string().min(1, "Message is required").max(5000).trim(),
  type: z.enum(["query", "feedback"]).optional(), // Support query/feedback type
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = getRateLimitIdentifier(req);
    const rateLimitResult = await contactRateLimit.limit(identifier);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
          },
        }
      );
    }

    // Parse and validate body
    const validation = await parseAndValidateBody(req, contactSchema);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const { name, email, phone, message, type } = validation.data;

    // Sanitize inputs
    const sanitizedName = name.replace(/[<>]/g, "");
    const sanitizedEmail = email.replace(/[<>]/g, "");
    const sanitizedPhone = phone ? phone.replace(/[<>]/g, "") : "";
    
    // Sanitize message (basic XSS prevention)
    const sanitizedMessage = message
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");

    // Determine submission type
    const submissionType = type === "feedback" ? "Feedback" : "Query";
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Create transporter
    if (!process.env.CONTACT_EMAIL || !process.env.CONTACT_EMAIL_PASSWORD) {
      console.error("[Contact API] Email service not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `New ${submissionType} Received - Gensoft X AI Labs`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5; border-bottom: 2px solid #6366F1; padding-bottom: 10px;">
            New ${submissionType} Received
          </h2>
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Type:</strong> ${submissionType}</p>
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            ${sanitizedPhone ? `<p><strong>Phone:</strong> ${sanitizedPhone}</p>` : ""}
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4F46E5; white-space: pre-wrap;">
              ${sanitizedMessage}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the Gensoft X AI Labs website contact form.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return secureErrorResponse(error, "Failed to send email. Please try again later.");
  }
}
