import { cookies } from "next/headers";
import type { ApiResponse } from "./api";

export interface ServerResult<T> extends ApiResponse<T> {
  status: number;
}

const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function authFetch<T>(
  path: string,
  init: Omit<RequestInit, "headers"> = {},
): Promise<ServerResult<T>> {
  if (!BASE) {
    return { success: false, message: "NEXT_PUBLIC_API_URL set kora nai", data: null, status: 0 };
  }
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}`, Cookie: `accessToken=${token}` } : {}),
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      return { success: false, message: json?.message ?? "Something went wrong", data: null, status: res.status };
    }
    return { ...(json as ApiResponse<T>), status: res.status };
  } catch {
    return { success: false, message: "Server-e connect kora jacche na", data: null, status: 0 };
  }
}