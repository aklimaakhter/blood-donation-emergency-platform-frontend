import { cookies } from "next/headers";
import { decodeJwt } from "jose";

import type { JwtUser } from "@/lib/auth";
import NavbarClient from "./navbarClient";

async function getCurrentUser(): Promise<Pick<JwtUser, "name" | "role"> | null> {
  const store = await cookies();
  const token = store.get("accessToken")?.value;
  if (!token) return null;

  try {
    const payload = decodeJwt(token);
    if (!payload.role) return null;
    return {
      name: String(payload.name ?? ""),
      role: payload.role as JwtUser["role"],
    };
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const user = await getCurrentUser();
  return <NavbarClient user={user} />;
}