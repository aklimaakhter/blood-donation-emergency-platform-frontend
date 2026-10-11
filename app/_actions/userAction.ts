"use server";

import { revalidatePath } from "next/cache";
import type { ActionState } from "@/lib/auth";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import { profileSchema, type ProfileInput } from "@/lib/validation/profile.validation";

export async function updateProfileAction(input: ProfileInput): Promise<ActionState> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  
  const body = {
    name: parsed.data.name,
    ...(parsed.data.phoneNumber ? { phoneNumber: parsed.data.phoneNumber } : {}),
  };

  const res = await authFetch(`${ENDPOINTS.users}/me`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  if (res.success) {
    revalidatePath("/user/profile");
    revalidatePath("/donor/profile");
  }
  return { success: res.success, message: res.message };
}