const RESEND_API_KEY = process.env.RESEND_API_KEY
const SENDER_EMAIL = "onboarding@resend.dev"

// Send an email using Resend
export const sendEmail = async (to, subject, html) => {
  if (!RESEND_API_KEY) {
    console.error("CRITICAL: RESEND_API_KEY environment variable is not set. Email not sent.")
    return { success: false, message: "Email configuration missing." }
  }

  console.log(`Attempting to send email to: ${to} with subject: ${subject}`)

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
    })

    const responseBody = await response.json()
    console.log("Resend API Response Status:", response.status)
    console.log("Resend API Response Body:", responseBody)

    if (!response.ok) {
      console.error("Failed to send email. See response body above.")
      return { success: false, message: "Failed to send email." }
    }

    console.log("Email sent successfully according to Resend.")
    return { success: true, message: "Email sent successfully." }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}

// Send contact form notification email
export const sendContactNotification = async (contactData) => {
  const emailHtml = `
    <h1>New Contact Form Submission</h1>
    <p><strong>Contact ID:</strong> ${contactData.id}</p>
    <h2>Customer Details:</h2>
    <ul>
      <li><strong>Name:</strong> ${contactData.full_name}</li>
      <li><strong>Email:</strong> ${contactData.email}</li>
      <li><strong>Phone:</strong> ${contactData.phone_number || 'Not provided'}</li>
      <li><strong>WhatsApp:</strong> ${contactData.whatsapp_number || 'Not provided'}</li>
    </ul>
    <h2>Company Information:</h2>
    <ul>
      <li><strong>Company Name:</strong> ${contactData.company_name || 'Not provided'}</li>
      <li><strong>Company Email:</strong> ${contactData.company_email || 'Not provided'}</li>
    </ul>
    <h2>Location:</h2>
    <ul>
      <li><strong>Country:</strong> ${contactData.country || 'Not provided'}</li>
      <li><strong>Location:</strong> ${contactData.location || 'Not provided'}</li>
      <li><strong>City:</strong> ${contactData.city || 'Not provided'}</li>
    </ul>
    <h2>Order Details:</h2>
    <ul>
      <li><strong>Product Quantity:</strong> ${contactData.product_quantity || 'Not specified'}</li>
      <li><strong>Shipment Address:</strong> ${contactData.shipment_address || 'Not provided'}</li>
      <li><strong>Emergency Contact:</strong> ${contactData.emergency_contact || 'Not provided'}</li>
    </ul>
    <h2>Message:</h2>
    <p>${contactData.message || 'No message provided'}</p>
  `

  return await sendEmail(
    "huseyinatwork@gmail.com",
    "New Contact Form Submission",
    emailHtml
  )
}

// Send order notification email
export const sendOrderNotification = async (orderData) => {
  const emailHtml = `
    <h1>New Order Received</h1>
    <p><strong>Order ID:</strong> ${orderData.id}</p>
    <h2>Order Details:</h2>
    <ul>
      <li><strong>Order Number:</strong> ${orderData.order_number}</li>
      <li><strong>Total Amount:</strong> ${orderData.total}</li>
    </ul>
    <h2>Shipping Address:</h2>
    <ul>
      <li><strong>Name:</strong> ${orderData.shipping_address.full_name}</li>
      <li><strong>Address:</strong> ${orderData.shipping_address.address}</li>
      <li><strong>City:</strong> ${orderData.shipping_address.city}</li>
      <li><strong>Country:</strong> ${orderData.shipping_address.country}</li>
      <li><strong>Postal Code:</strong> ${orderData.shipping_address.postal_code || 'Not provided'}</li>
      <li><strong>Phone:</strong> ${orderData.shipping_address.phone}</li>
    </ul>
    <h2>Items:</h2>
    <ul>
      ${orderData.items.map(item => `<li>Product ID: ${item.product_id}, Quantity: ${item.quantity}, Price: ${item.price}, Total: ${item.total}</li>`).join('')}
    </ul>
  `

  return await sendEmail(
    "huseyinatwork@gmail.com",
    "New Order Received",
    emailHtml
  )
}
