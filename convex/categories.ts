import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new category
export const createCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    slug: v.string(),
    isActive: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("categories", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return categoryId;
  },
});

// Get all active categories
export const getActiveCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
  },
});

// Get all categories (including inactive)
export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("categories")
      .order("asc")
      .collect();
  },
});

// Get category by ID
export const getCategoryById = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.categoryId);
  },
});

// Get category by slug
export const getCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

// Update category
export const updateCategory = mutation({
  args: {
    categoryId: v.id("categories"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    slug: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { categoryId, ...updates } = args;
    
    await ctx.db.patch(categoryId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return categoryId;
  },
});

// Delete category
export const deleteCategory = mutation({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.categoryId);
    return true;
  },
});

// Get categories with product counts
export const getCategoriesWithProductCounts = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await ctx.db
          .query("products")
          .filter((q) => q.eq(q.field("categoryId"), category._id))
          .filter((q) => q.eq(q.field("isActive"), true))
          .collect()
          .then(products => products.length);

        return {
          ...category,
          productCount,
        };
      })
    );

    return categoriesWithCounts;
  },
});
