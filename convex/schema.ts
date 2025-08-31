import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.optional(v.string()),
    companyName: v.optional(v.string()),
    companyEmail: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    location: v.optional(v.string()),
    shipmentAddress: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Admin login history table
  adminLoginHistory: defineTable({
    username: v.string(),
    loginTime: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    success: v.boolean(),
    failureReason: v.optional(v.string()),
  })
    .index("by_username", ["username"])
    .index("by_login_time", ["loginTime"])
    .index("by_success", ["success"]),

  // Categories table
  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    slug: v.string(),
    isActive: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_active", ["isActive"]),

  // Products table
  products: defineTable({
    name: v.string(),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    price: v.number(),
    comparePrice: v.optional(v.number()),
    categoryId: v.id("categories"),
    images: v.array(v.string()),
    mainImage: v.string(),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    isTopRated: v.boolean(),
    isBestSelling: v.boolean(),
    stockQuantity: v.number(),
    sku: v.string(),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    })),
    tags: v.array(v.string()),
    rating: v.optional(v.number()),
    reviewCount: v.optional(v.number()),
    estimatedDelivery: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["categoryId"])
    .index("by_active", ["isActive"])
    .index("by_featured", ["isFeatured"])
    .index("by_sku", ["sku"]),

  // Orders table
  orders: defineTable({
    userId: v.id("users"),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_order_number", ["orderNumber"]),

  // Reviews table
  reviews: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    rating: v.number(),
    title: v.optional(v.string()),
    comment: v.string(),
    isVerified: v.boolean(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_user", ["userId"])
    .index("by_rating", ["rating"]),

  // Cart table
  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  // Wishlist table
  wishlistItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_product", ["userId", "productId"]),

  // Contact form submissions
  contactSubmissions: defineTable({
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
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),
});
