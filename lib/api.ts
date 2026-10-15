
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function apiPost<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  try {
    const url = `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || !json?.success) {
      return {
        success: false,
        message: json?.message ?? "Something went wrong",
        data: null,
      };
    }

    return json as ApiResponse<T>;
  } catch (error) {
    console.error("API POST Fetch Error:", error);
    return {
      success: false,
      message: "Unable to reach the server. Please try again.",
      data: null,
    };
  }
}