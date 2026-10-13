import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(60, "Maximum 60 characters"),
  email: z.email("Enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(100, "Maximum 100 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Maximum 1000 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;