import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ENDPOINTS } from "@/lib/endpoints";

export async function POST(req: Request) {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ success: false, message: "Login koro" }, { status: 401 });
  }

  const incoming = await req.formData();
  const file = incoming.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: "File paoa jayni" }, { status: 400 });
  }

  const form = new FormData();
  form.append("profile-image", file);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ENDPOINTS.users}/profile-image`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, Cookie: `accessToken=${token}` },
      body: form,
      signal: AbortSignal.timeout(30000),
    });
    const json = await res.json().catch(() => null);
    return NextResponse.json(
      json ?? { success: false, message: "Upload failed" },
      { status: res.status },
    );
  } catch {
    return NextResponse.json({ success: false, message: "Server-e connect kora jacche na" }, { status: 502 });
  }
}