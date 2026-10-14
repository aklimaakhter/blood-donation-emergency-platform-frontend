import { z } from "zod";

export const donationSchema = z.object({
  amount: z
    .number({ message: "Enter an amount" })
    .min(1, "Minimum donation is $1")
    .max(1000, "Maximum donation is $1000"),
});

export type DonationInput = z.infer<typeof donationSchema>;