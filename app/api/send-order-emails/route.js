import { sendOrderNotification, sendOrderConfirmation } from '../../../lib/email-service';

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    if (!orderData || !orderData.order_number) {
      return Response.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // Send emails to both admin and customer
    const [adminResult, customerResult] = await Promise.allSettled([
      sendOrderNotification(orderData),
      sendOrderConfirmation(orderData)
    ]);

    const results = {
      adminEmail: adminResult.status === 'fulfilled' ? adminResult.value : { success: false, error: adminResult.reason },
      customerEmail: customerResult.status === 'fulfilled' ? customerResult.value : { success: false, error: customerResult.reason }
    };

    return Response.json({ 
      success: true, 
      results 
    });

  } catch (error) {
    console.error('Error sending order emails:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to send emails' 
    }, { status: 500 });
  }
}
