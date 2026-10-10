export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export async function apiPost<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      return { success: false, message: json?.message ?? "Something went wrong", data: null };
    }
    return json as ApiResponse<T>;
  } catch {
    return { success: false, message: "Server-e connect kora jacche na", data: null };
  }
}