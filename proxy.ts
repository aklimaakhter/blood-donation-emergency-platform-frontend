import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ROLE_HOME, type Role } from "@/lib/auth";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password", "/account-verify"];

const PROTECTED: Record<string, Role> = {
  "/admin": "ADMIN",
  "/user": "USER",
  "/donor": "DONOR",
};

async function getRole(req: NextRequest): Promise<Role | null> {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role as Role;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const role = await getRole(req);

  if (AUTH_PAGES.includes(pathname)) {
    if (role) return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
    return NextResponse.next();
  }

  if (!role) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  const required = Object.entries(PROTECTED).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(prefix + "/"),
  )?.[1];
  if (required && required !== role) {
    return NextResponse.redirect(new URL(ROLE_HOME[role], req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/user/:path*",
    "/donor/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/account-verify",
  ],
};