import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(60, "Maximum 60 characters"),
  phoneNumber: z
    .string()
    .regex(/^[+0-9][0-9\s-]{6,14}$/, "Enter a valid phone number")
    .or(z.literal(""))
    .optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;