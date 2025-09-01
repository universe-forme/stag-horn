import { v } from "convex/values";
import { action } from "./_generated/server";

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
    // For now, we'll use a simple email service
    // In production, you'd integrate with SendGrid, AWS SES, or similar
    
    const emailBody = `
New Contact Form Submission

Customer Details:
- Name: ${args.data.fullName}
- Email: ${args.data.email}
- Phone: ${args.data.phoneNumber || 'Not provided'}
- WhatsApp: ${args.data.whatsappNumber || 'Not provided'}

Company Information:
- Company Name: ${args.data.companyName || 'Not provided'}
- Company Email: ${args.data.companyEmail || 'Not provided'}

Location:
- Country: ${args.data.country || 'Not provided'}
- Location: ${args.data.location || 'Not provided'}
- City: ${args.data.city || 'Not provided'}

Order Details:
- Product Quantity: ${args.data.productQuantity || 'Not specified'}
- Shipment Address: ${args.data.shipmentAddress || 'Not provided'}
- Emergency Contact: ${args.data.emergencyContact || 'Not provided'}

Message:
${args.data.message || 'No message provided'}

---
This email was sent from the Wazir Cutlery contact form.
Contact ID: ${args.contactId}
    `;

    // For development, log the email content
    console.log("Email would be sent to:", args.to);
    console.log("Subject:", args.subject);
    console.log("Body:", emailBody);

    // TODO: Integrate with actual email service
    // Example with a hypothetical email service:
    // await sendEmail({
    //   to: args.to,
    //   subject: args.subject,
    //   body: emailBody,
    //   from: "noreply@wazircutlery.com"
    // });

    return { success: true, message: "Email notification logged" };
  },
});
