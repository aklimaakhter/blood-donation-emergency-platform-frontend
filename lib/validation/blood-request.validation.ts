import { z } from "zod";
import { BLOOD_GROUP_VALUES } from "@/lib/constants";

const today = () => new Date().toISOString().slice(0, 10);

export const bloodRequestSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  bloodGroup: z.enum(BLOOD_GROUP_VALUES, { message: "Blood group select koro" }),
  bagsNeeded: z
    .number({ message: "Number dao" })
    .int("Whole number dao")
    .min(1, "Kom-pokkhe 1 bag lagbe")
    .max(10, "Maximum 10 bag"),
  hospitalName: z.string().min(1, "Hospital name is required"),
  hospitalAddress: z.string().min(1, "Hospital address is required"),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area is required"),
  dateOfDonation: z
    .string()
    .min(1, "Date select koro")
    .refine((v) => v >= today(), "Date ajker ba tar por hote hobe"),
  contactNumber: z.string().regex(/^[+0-9][0-9\s-]{6,14}$/, "Valid phone number dao"),
  reason: z.string().max(300, "Maximum 300 character").optional(),
});

export type BloodRequestInput = z.infer<typeof bloodRequestSchema>;