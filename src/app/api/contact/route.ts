import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import https from "https";

// Helper function to send POST requests using Node's native https module
function httpsPost(url: string, payload: any): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const parsedUrl = new URL(url);

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "Origin": "http://localhost:3000",
        "Referer": "http://localhost:3000/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const responseData = JSON.parse(body);
            // FormSubmit returns {"success":"false", "message": "..."} for activation
            if (responseData.success === "false" || responseData.success === false) {
              resolve({
                success: false,
                message: responseData.message || "Failed to deliver message via form service."
              });
            } else {
              resolve({
                success: true,
                message: responseData.message || "Message delivered successfully."
              });
            }
          } else {
            reject(new Error(`Server responded with status code ${res.statusCode}: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

export async function POST(request: Request) {
  try {
    const { name, email, company, inquiryType, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || "isurangamadusha476@gmail.com";

    // If SMTP environment variables are not fully configured, fall back to FormSubmit service
    if (!host || !port || !user || !pass) {
      console.warn("SMTP credentials not fully configured. Using FormSubmit server-side fallback.");
      
      try {
        const result = await httpsPost(
          `https://formsubmit.co/ajax/${toEmail}`,
          {
            name,
            email,
            company: company || "N/A",
            inquiryType: inquiryType || "general",
            message,
            _subject: `New Portfolio Inquiry from ${name}`,
          }
        );

        if (!result.success) {
          // If it's an activation message, return success but specify that activation is required
          if (result.message && result.message.toLowerCase().includes("activation")) {
            return NextResponse.json({
              success: true,
              activationRequired: true,
              message: result.message
            });
          }
          return NextResponse.json(
            { success: false, error: result.message },
            { status: 400 }
          );
        }

        return NextResponse.json({ success: true, message: "Message delivered successfully." });
      } catch (err: any) {
        console.error("FormSubmit service error:", err);
        return NextResponse.json(
          { success: false, error: err.message || "Failed to send message via the form delivery service." },
          { status: 500 }
        );
      }
    }

    // SMTP Transport Configuration
    const transporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: port === "465", // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${user}>`, // Some SMTP servers require 'from' to be the authenticated user
      replyTo: email,
      to: toEmail,
      subject: `New Portfolio Inquiry: [${inquiryType.toUpperCase()}] from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Inquiry Type: ${inquiryType}

Message:
${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #6366f1; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 6px; line-height: 1.6;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (error: any) {
    console.error("Error in contact route:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process contact inquiry." },
      { status: 500 }
    );
  }
}
