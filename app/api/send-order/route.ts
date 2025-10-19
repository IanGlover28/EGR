import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, phone, whatsapp, location, quantity, packageType, price, note } = await req.json();

    // Validate required fields
    if (!name || !phone || !whatsapp || !location || !packageType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Format plain text email (good for inbox deliverability)
    const emailText = `
NEW ORDER FROM EVERGREEN REMEDY GHANA

Customer Details:
-----------------
Name: ${name}
Phone: ${phone}
WhatsApp: ${whatsapp}
Location: ${location}

Order Details:
--------------
Package: ${packageType}
Quantity: ${quantity}
Price: GH₵${price}

Additional Note:
${note || "No additional notes"}

-----------------
Submitted via the Evergreen Remedy Ghana website.
    `.trim();

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: "Evergreen Remedy Ghana <onboarding@resend.dev>", // or your verified domain sender
      to: ["supplegenixsaleshub@gmail.com"], // recipient email
      subject: `New Order - ${packageType}`,
      text: emailText,
    });

    if (error) {
      console.error("❌ Resend send error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Order sent successfully",
    });
  } catch (error) {
    console.error("❌ Unexpected server error:", error);
    return NextResponse.json({ error: "Server error occurred" }, { status: 500 });
  }
}
