import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
      // .withIndex("by_username")
      // .eq("username", args.username)

      .withIndex("by_username", (q) => q.eq("username", args.username))
      .order("desc")
      .take(limit);
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
