"use server";

import { revalidatePath } from "next/cache";
import type { ActionState } from "@/lib/auth";
import type { RequestStatus } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import {
  bloodRequestSchema,
  type BloodRequestInput,
} from "@/lib/validation/blood-request.validation";

function refresh() {
  ["/requests", "/user/requests", "/donor/requests", "/admin/requests"].forEach((p) =>
    revalidatePath(p),
  );
}

export async function createBloodRequestAction(input: BloodRequestInput): Promise<ActionState> {
  const parsed = bloodRequestSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };

  const res = await authFetch(ENDPOINTS.bloodRequests, {
    method: "POST",
    body: JSON.stringify({ ...parsed.data, reason: parsed.data.reason || undefined }),
  });
  if (res.success) refresh();
  return { success: res.success, message: res.message };
}

export async function acceptBloodRequestAction(id: string): Promise<ActionState> {
  const res = await authFetch(`${ENDPOINTS.bloodRequests}/${id}/accept`, { method: "PATCH" });
  if (res.success) refresh();
  return { success: res.success, message: res.message };
}

export async function updateRequestStatusAction(
  id: string,
  status: RequestStatus,
): Promise<ActionState> {
  const res = await authFetch(`${ENDPOINTS.bloodRequests}/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (res.success) refresh();
  return { success: res.success, message: res.message };
}