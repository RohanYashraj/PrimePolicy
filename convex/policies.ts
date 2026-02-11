import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const initializePolicy = mutation({
    args: { createdBy: v.string() },
    handler: async (ctx, args) => {
        const timestamp = Date.now();
        const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        const policyIdStr = `PAS-${new Date().getFullYear()}-${suffix}`;

        const policyId = await ctx.db.insert("policies", {
            policyId: policyIdStr,
            createdBy: args.createdBy,
            clientName: "",
            clientEmail: "",
            dob: "",
            gender: "male",
            occupation: "",
            annualIncome: 0,
            documentIds: [],
            smokingStatus: "non-smoker",
            medicalHistory: [],
            lifestyleRisk: "low",
            nomineeName: "",
            nomineeRelation: "",
            kycStatus: "pending",
            sumAssured: 0,
            premiumAmount: 0,
            status: "quote",
            currentStep: 1,
            createdAt: timestamp,
            updatedAt: timestamp,
        });
        return policyId;
    },
});

export const createPolicy = mutation({
    args: {
        clientName: v.string(),
        clientEmail: v.string(),
        dob: v.string(),
        gender: v.union(v.literal("male"), v.literal("female"), v.literal("other")),
        occupation: v.string(),
        annualIncome: v.number(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const timestamp = Date.now();
        const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
        const policyIdStr = `PAS-${new Date().getFullYear()}-${suffix}`;

        const policyId = await ctx.db.insert("policies", {
            ...args,
            policyId: policyIdStr,
            documentIds: [],
            smokingStatus: "non-smoker",
            medicalHistory: [],
            lifestyleRisk: "low",
            nomineeName: "",
            nomineeRelation: "",
            kycStatus: "pending",
            sumAssured: 0,
            premiumAmount: 0,
            status: "quote",
            currentStep: 1,
            createdAt: timestamp,
            updatedAt: timestamp,
        });
        return policyId;
    },
});

export const getPolicy = query({
    args: { id: v.id("policies") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const updatePolicy = mutation({
    args: {
        id: v.id("policies"),
        updates: v.any(), // Using any for flexible partial updates across steps
    },
    handler: async (ctx, args) => {
        const { id, updates } = args;
        await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
        return id;
    },
});

export const listPolicies = query({
    args: {
        createdBy: v.optional(v.string()),
        status: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (args.createdBy) {
            return await ctx.db
                .query("policies")
                .withIndex("by_creator", (q) => q.eq("createdBy", args.createdBy!))
                .order("desc")
                .collect();
        }

        if (args.status) {
            return await ctx.db
                .query("policies")
                .withIndex("by_status", (q) => q.eq("status", args.status as "quote" | "under_review" | "approved" | "issued" | "cancelled"))
                .order("desc")
                .collect();
        }

        return await ctx.db.query("policies").order("desc").collect();
    },
});
export const deletePolicy = mutation({
    args: { id: v.id("policies") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
