import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return Response.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return Response.json({ orders: data || [] });
  } catch (error) {
    console.error('Error in orders API:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const orderData = await request.json();
    
    if (!orderData || !orderData.order_number) {
      return Response.json({ error: 'Invalid order data' }, { status: 400 });
    }

    // Use the provided UUID or generate one if not provided
    const orderId = orderData.id || crypto.randomUUID();
    
    const orderToInsert = {
      id: orderId,
      order_number: orderData.order_number,
      user_id: orderData.user_id || null, // Allow null for anonymous orders
      status: orderData.status || 'pending',
      items: orderData.items,
      subtotal: parseFloat(orderData.subtotal),
      shipping_cost: parseFloat(orderData.shipping_cost),
      tax: parseFloat(orderData.tax),
      total: parseFloat(orderData.total),
      shipping_address: orderData.shipping_address,
      payment_status: orderData.payment_status || 'pending',
      payment_method: orderData.payment_method,
      notes: orderData.notes || null,
      estimated_delivery: orderData.estimated_delivery || null
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([orderToInsert])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      console.error('Order data being inserted:', orderToInsert);
      return Response.json({ error: 'Failed to create order', details: error.message }, { status: 500 });
    }

    return Response.json({ order: data }, { status: 201 });
  } catch (error) {
    console.error('Error in orders POST API:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { orderId, updates } = await request.json();
    
    if (!orderId) {
      return Response.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return Response.json({ error: 'Failed to update order' }, { status: 500 });
    }

    return Response.json({ order: data });
  } catch (error) {
    console.error('Error in orders PUT API:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
