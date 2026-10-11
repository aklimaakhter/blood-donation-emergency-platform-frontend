"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";
import { authFetch } from "@/lib/server-api";
import { ROLE_HOME, type ActionState, type Role } from "@/lib/auth";
import {
  applyDonorSchema,
  updateDonorSchema,
  type ApplyDonorInput,
  type UpdateDonorInput,
} from "@/lib/validation/donor.validation";

export async function applyDonorAction(input: ApplyDonorInput): Promise<ActionState> {
  const parsed = applyDonorSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  const res = await authFetch("/donors/apply", { method: "POST", body: JSON.stringify(parsed.data) });
  if (res.success) revalidatePath("/user");
  return { success: res.success, message: res.message };
}

export async function updateDonorProfileAction(input: UpdateDonorInput): Promise<ActionState> {
  const parsed = updateDonorSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  const res = await authFetch("/donors/me", { method: "PATCH", body: JSON.stringify(parsed.data) });
  if (res.success) revalidatePath("/donor");
  return { success: res.success, message: res.message };
}

export async function updateDonorStatusAction(
  id: string,
  status: "APPROVED" | "REJECTED",
): Promise<ActionState> {
  const res = await authFetch(`/donors/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (res.success) revalidatePath("/admin/donors");
  return { success: res.success, message: res.message };
}

// Approve-er por token-e notun role ante
export async function refreshSessionAction(): Promise<ActionState> {
  const store = await cookies();
  const refreshToken = store.get("refreshToken")?.value;
  if (!refreshToken) return { success: false, message: "Session nai, abar login koro" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { Cookie: `refreshToken=${refreshToken}` },
    cache: "no-store",
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    return { success: false, message: json?.message ?? "Session refresh hoyni" };
  }

  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set("accessToken", json.data.accessToken, { ...base, maxAge: 60 * 60 * 24 });
  store.set("refreshToken", json.data.refreshToken, { ...base, maxAge: 60 * 60 * 24 * 7 });

  const role = decodeJwt(json.data.accessToken).role as Role;
  redirect(ROLE_HOME[role] ?? "/");
}