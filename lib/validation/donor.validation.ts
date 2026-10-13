import { z } from "zod";
import { BLOOD_GROUP_VALUES } from "@/lib/constants";

export const applyDonorSchema = z.object({
  bloodGroup: z.enum(BLOOD_GROUP_VALUES, { message: "Select a blood group" }),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area is required"),
  lastDonatedDate: z.string().optional(),
});

export const updateDonorSchema = applyDonorSchema
  .partial()
  .extend({ isAvailable: z.boolean().optional() });

export type ApplyDonorInput = z.infer<typeof applyDonorSchema>;
export type UpdateDonorInput = z.infer<typeof updateDonorSchema>;