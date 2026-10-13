import { z } from "zod";
import { BLOOD_GROUP_VALUES } from "@/lib/constants";

const today = () => new Date().toISOString().slice(0, 10);

export const bloodRequestSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  bloodGroup: z.enum(BLOOD_GROUP_VALUES, { message: "Select a blood group" }),
  bagsNeeded: z
    .number({ message: "Enter a number" })
    .int("Enter a whole number")
    .min(1, "At least 1 bag is required")
    .max(10, "Maximum 10 bags"),
  hospitalName: z.string().min(1, "Hospital name is required"),
  hospitalAddress: z.string().min(1, "Hospital address is required"),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area is required"),
  dateOfDonation: z
    .string()
    .min(1, "Select a date")
    .refine((v) => v >= today(), "Date must be today or later"),
  contactNumber: z.string().regex(/^[+0-9][0-9\s-]{6,14}$/, "Enter a valid phone number"),
  reason: z.string().max(300, "Maximum 300 characters").optional(),
});

export type BloodRequestInput = z.infer<typeof bloodRequestSchema>;