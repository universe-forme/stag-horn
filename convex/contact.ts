import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

// Submit contact form
export const submitContactForm = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Create contact submission record
    const contactId = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Schedule email notification
    await ctx.scheduler.runAfter(0, api.emails.sendContactNotification, {
      contactId: contactId,
      to: "huseyinatwork@gmail.com",
      subject: "New Contact Form Submission",
      data: args,
    });

    return contactId;
  },
});

// Get all contact submissions (admin only)
export const getAllContactSubmissions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .order("desc")
      .collect();
  },
});

// Get contact submissions by status
export const getContactSubmissionsByStatus = query({
  args: { status: v.union(
    v.literal("new"),
    v.literal("in_progress"),
    v.literal("completed"),
    v.literal("cancelled")
  ) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
  },
});

// Get contact submission by ID
export const getContactSubmissionById = query({
  args: { submissionId: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.submissionId);
  },
});

// Update contact submission status
export const updateContactSubmissionStatus = mutation({
  args: {
    submissionId: v.id("contactSubmissions"),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.submissionId, {
      status: args.status,
      updatedAt: Date.now(),
    });

    return args.submissionId;
  },
});

// Get contact submissions by email
export const getContactSubmissionsByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .order("desc")
      .collect();
  },
});
