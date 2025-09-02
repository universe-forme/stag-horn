import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER_EMAIL = "onboarding@resend.dev";

// Send an email using Resend
export const sendEmail = internalAction({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  handler: async (_, { to, subject, html }) => {
    if (!RESEND_API_KEY) {
      console.error("CRITICAL: RESEND_API_KEY environment variable is not set. Email not sent.");
      return { success: false, message: "Email configuration missing." };
    }

    console.log(`Attempting to send email to: ${to} with subject: ${subject}`);

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: SENDER_EMAIL,
          to: [to],
          subject,
          html,
        }),
      });

      const responseBody = await response.json();
      console.log("Resend API Response Status:", response.status);
      console.log("Resend API Response Body:", responseBody);

      if (!response.ok) {
        console.error("Failed to send email. See response body above.");
        return { success: false, message: "Failed to send email." };
      }

      console.log("Email sent successfully according to Resend.");
      return { success: true, message: "Email sent successfully." };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },
});

// Send contact form notification email
export const sendContactNotification = action({
  args: {
    contactId: v.id("contactSubmissions"),
    to: v.string(),
    subject: v.string(),
    data: v.object({
      fullName: v.string(),
      email: v.string(),
      phoneNumber: v.optional(v.string()),
      whatsappNumber: v.optional(v.string()),
      companyName: v.optional(v.string()),
      companyEmail: v.optional(v.string()),
      country: v.optional(v.string()),
      location: v.optional(v.string()),
      city: v.optional(v.string()),
      productQuantity: v.optional(v.number()),
      shipmentAddress: v.optional(v.string()),
      emergencyContact: v.optional(v.string()),
      message: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>Contact ID:</strong> ${args.contactId}</p>
      <h2>Customer Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${args.data.fullName}</li>
        <li><strong>Email:</strong> ${args.data.email}</li>
        <li><strong>Phone:</strong> ${args.data.phoneNumber || 'Not provided'}</li>
        <li><strong>WhatsApp:</strong> ${args.data.whatsappNumber || 'Not provided'}</li>
      </ul>
      <h2>Company Information:</h2>
      <ul>
        <li><strong>Company Name:</strong> ${args.data.companyName || 'Not provided'}</li>
        <li><strong>Company Email:</strong> ${args.data.companyEmail || 'Not provided'}</li>
      </ul>
      <h2>Location:</h2>
      <ul>
        <li><strong>Country:</strong> ${args.data.country || 'Not provided'}</li>
        <li><strong>Location:</strong> ${args.data.location || 'Not provided'}</li>
        <li><strong>City:</strong> ${args.data.city || 'Not provided'}</li>
      </ul>
      <h2>Order Details:</h2>
      <ul>
        <li><strong>Product Quantity:</strong> ${args.data.productQuantity || 'Not specified'}</li>
        <li><strong>Shipment Address:</strong> ${args.data.shipmentAddress || 'Not provided'}</li>
        <li><strong>Emergency Contact:</strong> ${args.data.emergencyContact || 'Not provided'}</li>
      </ul>
      <h2>Message:</h2>
      <p>${args.data.message || 'No message provided'}</p>
    `;

    await ctx.runAction(internal.emails.sendEmail, {
      to: args.to,
      subject: args.subject,
      html: emailHtml,
    });

    return { success: true, message: "Email notification sent." };
  },
});

export const sendOrderNotification = action({
  args: {
    orderId: v.id("orders"),
    to: v.string(),
    subject: v.string(),
    data: v.object({
      orderNumber: v.string(),
      total: v.number(),
      shippingAddress: v.object({
        fullName: v.string(),
        address: v.string(),
        city: v.string(),
        country: v.string(),
        postalCode: v.optional(v.string()),
        phone: v.string(),
      }),
      items: v.array(v.object({
        productId: v.id("products"),
        quantity: v.number(),
        price: v.number(),
        total: v.number(),
      })),
    }),
  },
  handler: async (ctx, args) => {
    const emailHtml = `
      <h1>New Order Received</h1>
      <p><strong>Order ID:</strong> ${args.orderId}</p>
      <h2>Order Details:</h2>
      <ul>
        <li><strong>Order Number:</strong> ${args.data.orderNumber}</li>
        <li><strong>Total Amount:</strong> ${args.data.total}</li>
      </ul>
      <h2>Shipping Address:</h2>
      <ul>
        <li><strong>Name:</strong> ${args.data.shippingAddress.fullName}</li>
        <li><strong>Address:</strong> ${args.data.shippingAddress.address}</li>
        <li><strong>City:</strong> ${args.data.shippingAddress.city}</li>
        <li><strong>Country:</strong> ${args.data.shippingAddress.country}</li>
        <li><strong>Postal Code:</strong> ${args.data.shippingAddress.postalCode || 'Not provided'}</li>
        <li><strong>Phone:</strong> ${args.data.shippingAddress.phone}</li>
      </ul>
      <h2>Items:</h2>
      <ul>
        ${args.data.items.map(item => `<li>Product ID: ${item.productId}, Quantity: ${item.quantity}, Price: ${item.price}, Total: ${item.total}</li>`).join('')}
      </ul>
    `;

    await ctx.runAction(internal.emails.sendEmail, {
      to: args.to,
      subject: args.subject,
      html: emailHtml,
    });

    return { success: true, message: "Email notification sent." };
  },
});
