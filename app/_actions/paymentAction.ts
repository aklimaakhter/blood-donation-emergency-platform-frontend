"use server";

import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/auth";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import { donationSchema } from "@/lib/validation/payment.validation";

export async function createCheckoutAction(amount: number): Promise<ActionState> {
  const parsed = donationSchema.safeParse({ amount });
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  const res = await authFetch<{ url: string | null }>(`${ENDPOINTS.donations}/checkout`, {
    method: "POST",
    body: JSON.stringify(parsed.data),
  });

  if (!res.success || !res.data?.url) {
    return { success: false, message: res.message || "Could not start the payment" };
  }

  redirect(res.data.url);
}