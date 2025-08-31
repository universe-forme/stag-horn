import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new product
export const createProduct = mutation({
  args: {
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
    estimatedDelivery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      ...args,
      rating: 0,
      reviewCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return productId;
  },
});

// Get all active products
export const getActiveProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .collect();
  },
});

// Get featured products
export const getFeaturedProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
  },
});

// Get products by category
export const getProductsByCategory = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Get product by ID
export const getProductById = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

// Get product by SKU
export const getProductBySku = query({
  args: { sku: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_sku", (q) => q.eq("sku", args.sku))
      .first();
  },
});

// Update product
export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    price: v.optional(v.number()),
    comparePrice: v.optional(v.number()),
    categoryId: v.optional(v.id("categories")),
    images: v.optional(v.array(v.string())),
    mainImage: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isTopRated: v.optional(v.boolean()),
    isBestSelling: v.optional(v.boolean()),
    stockQuantity: v.optional(v.number()),
    weight: v.optional(v.number()),
    dimensions: v.optional(v.object({
      length: v.number(),
      width: v.number(),
      height: v.number(),
    })),
    tags: v.optional(v.array(v.string())),
    estimatedDelivery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { productId, ...updates } = args;
    
    await ctx.db.patch(productId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return productId;
  },
});

// Delete product
export const deleteProduct = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId);
    return true;
  },
});

// Search products
export const searchProducts = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return products.filter(product => 
      product.name.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(args.searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(args.searchTerm.toLowerCase()))
    );
  },
});

// Get top rated products
export const getTopRatedProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return products
      .filter(product => product.rating && product.rating > 0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, args.limit || 10);
  },
});

// Get best selling products
export const getBestSellingProducts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    return products
      .filter(product => product.isBestSelling)
      .slice(0, args.limit || 10);
  },
});
