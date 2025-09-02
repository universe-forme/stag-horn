import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

// Get all orders
export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("orders")
      .order("desc")
      .collect();
  },
});

// Get orders by user
export const getOrdersByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Get order by ID
export const getOrderById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});

// Create new order
export const createOrder = mutation({
  args: {
    userId: v.union(v.id("users"), v.string()),
    orderNumber: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
    items: v.array(v.object({
      productId: v.id("products"),
      quantity: v.number(),
      price: v.number(),
      total: v.number(),
    })),
    subtotal: v.number(),
    shippingCost: v.number(),
    tax: v.number(),
    total: v.number(),
    shippingAddress: v.object({
      fullName: v.string(),
      address: v.string(),
      city: v.string(),
      country: v.string(),
      postalCode: v.optional(v.string()),
      phone: v.string(),
    }),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    paymentMethod: v.optional(v.string()),
    notes: v.optional(v.string()),
    estimatedDelivery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Schedule email notification
    await ctx.scheduler.runAfter(0, api.emails.sendOrderNotification, {
      orderId: orderId,
      to: "huseyinatwork@gmail.com",
      subject: "New Order Received",
      data: {
        orderNumber: args.orderNumber,
        total: args.total,
        shippingAddress: args.shippingAddress,
        items: args.items,
      },
    });

    return orderId;
  },
});

// Update order status
export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("processing"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return true;
  },
});

// Update payment status
export const updatePaymentStatus = mutation({
  args: {
    orderId: v.id("orders"),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      paymentStatus: args.paymentStatus,
      updatedAt: Date.now(),
    });

    return true;
  },
});
