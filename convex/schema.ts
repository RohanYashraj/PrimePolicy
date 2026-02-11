import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    policies: defineTable({
        // Step 1: Client Information
        clientName: v.optional(v.string()),
        clientEmail: v.optional(v.string()),
        dob: v.optional(v.string()),
        gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
        occupation: v.optional(v.string()),
        annualIncome: v.optional(v.number()),

        // Step 2: Documents
        documentIds: v.array(v.string()), // Convex storage IDs
        aadharNumber: v.optional(v.string()),
        panNumber: v.optional(v.string()),

        // Step 3: Risk Assessment
        smokingStatus: v.union(v.literal("smoker"), v.literal("non-smoker")),
        medicalHistory: v.array(v.string()),
        lifestyleRisk: v.string(),

        // Step 4: Compliance & Nominee
        nomineeName: v.string(),
        nomineeRelation: v.string(),
        kycStatus: v.union(v.literal("pending"), v.literal("verified"), v.literal("failed")),

        // Step 5: Pricing & Underwriting
        sumAssured: v.number(),
        premiumAmount: v.number(),
        underwritingNotes: v.optional(v.string()),
        decision: v.optional(v.union(v.literal("accept"), v.literal("reject"), v.literal("refer"))),

        // Metadata
        policyId: v.string(), // PAS-2026-XXXX
        createdBy: v.string(), // Clerk user ID
        status: v.union(
            v.literal("quote"),
            v.literal("under_review"),
            v.literal("approved"),
            v.literal("issued"),
            v.literal("cancelled")
        ),
        currentStep: v.number(),
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_status", ["status"])
        .index("by_creator", ["createdBy"])
        .index("by_policyId", ["policyId"]),
});
