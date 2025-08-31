import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Admin credentials
const ADMIN_USERNAME = "waziradmin";
const ADMIN_PASSWORD = "wazir@123";

// Admin login verification
export const verifyAdminLogin = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { username, password, ipAddress, userAgent } = args;
    
    // Check admin credentials
    const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
    
    // Log the login attempt
    await ctx.db.insert("adminLoginHistory", {
      username,
      loginTime: Date.now(),
      ipAddress,
      userAgent,
      success: isValid,
      failureReason: isValid ? undefined : "Invalid credentials",
    });

    return {
      success: isValid,
      message: isValid ? "Login successful" : "Invalid username or password",
    };
  },
});

// Get admin login history
export const getAdminLoginHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    
    return await ctx.db
      .query("adminLoginHistory")
      .withIndex("by_login_time")
      .order("desc")
      .take(limit);
  },
});

// Get admin login history by username
export const getAdminLoginHistoryByUsername = query({
  args: {
    username: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;
    
    return await ctx.db
      .query("adminLoginHistory")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .order("desc")
      .take(limit);
  },
});

// Create a new user
export const createUser = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      isAdmin: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Update user
export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    companyName: v.optional(v.string()),
    companyEmail: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    location: v.optional(v.string()),
    shipmentAddress: v.optional(v.string()),
    emergencyContact: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Get all users (admin only)
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Check if user is admin
export const isUserAdmin = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user?.isAdmin || false;
  },
});
