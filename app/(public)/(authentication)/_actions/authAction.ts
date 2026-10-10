/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decodeJwt } from "jose";
import { apiPost } from "@/lib/api";
import { ROLE_HOME, type ActionState, type Role } from "@/lib/auth";
import { ForgotPasswordInput, forgotPasswordSchema, loginSchema, RegisterInput, registerSchema, ResetPasswordInput, resetPasswordSchema, VerifyEmailInput, verifyEmailSchema } from "@/lib/validation";


interface Tokens {
  accessToken: string;
  refreshToken: string;
}

async function setSession({ accessToken, refreshToken }: Tokens) {
  const store = await cookies();
  const base = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  store.set("accessToken", accessToken, { ...base, maxAge: 60 * 60 * 24 });
  store.set("refreshToken", refreshToken, { ...base, maxAge: 60 * 60 * 24 * 7 });
}

async function loginWith(email: string, password: string): Promise<ActionState> {
  const res = await apiPost<Tokens>("/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });
  if (!res.success || !res.data) {
    return { success: false, message: res.message };
  }

  await setSession(res.data);
  const role = decodeJwt(res.data.accessToken).role as Role;
  redirect(ROLE_HOME[role] ?? "/"); 
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  return loginWith(parsed.data.email, parsed.data.password);
}

const DEMO: Record<Role, { email?: string; password?: string }> = {
  ADMIN: {
    email: process.env.TESTER_ADMIN_EMAIL,
    password: process.env.TESTER_ADMIN_PASSWORD,
  },
  USER: {
    email: process.env.TESTER_USER_EMAIL,
    password: process.env.TESTER_USER_PASSWORD,
  },
  DONOR: {
    email: process.env.TESTER_DONOR_EMAIL,
    password: process.env.TESTER_DONOR_PASSWORD,
  },
};

export async function demoLoginAction(role: Role): Promise<ActionState> {
  const { email, password } = DEMO[role];
  if (!email || !password) {
    return { success: false, message: "Demo credentials set kora nai" };
  }
  return loginWith(email, password);
}

export async function registerAction(input: RegisterInput): Promise<ActionState> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  const res = await apiPost("/auth/register", {
    ...parsed.data,
    email: parsed.data.email.trim().toLowerCase(),
  });
  return { success: res.success, message: res.message };
}



export async function verifyEmailAction(input: VerifyEmailInput): Promise<ActionState> {
  const parsed = verifyEmailSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }
  const res = await apiPost<Tokens>("/auth/verify-email", {
    ...parsed.data,
    email: parsed.data.email.trim().toLowerCase(),
  });
  if (!res.success || !res.data) {
    return { success: false, message: res.message };
  }
  await setSession(res.data);
  redirect(ROLE_HOME.USER); 
}

export async function googleLoginAction(idToken: string): Promise<ActionState> {
  if (!idToken) {
    return { success: false, message: "Google token paoa jayni" };
  }
  const res = await apiPost<Tokens>("/auth/google", { idToken });
  if (!res.success || !res.data) {
    return { success: false, message: res.message };
  }

  await setSession(res.data);
  const role = decodeJwt(res.data.accessToken).role as Role;
  redirect(ROLE_HOME[role] ?? "/");
}

export async function forgotPasswordAction(input: ForgotPasswordInput): Promise<ActionState> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };
  const res = await apiPost("/auth/forgot-password", {
    email: parsed.data.email.trim().toLowerCase(),
  });
  return { success: res.success, message: res.message };
}

export async function resetPasswordAction(input: ResetPasswordInput): Promise<ActionState> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) return { success: false, message: parsed.error.issues[0].message };
  const res = await apiPost("/auth/reset-password", {
    ...parsed.data,
    email: parsed.data.email.trim().toLowerCase(),
  });
  return { success: res.success, message: res.message };
}

export async function logoutAction() {
  const store = await cookies();
  store.delete("accessToken");
  store.delete("refreshToken");
  redirect("/login");   
}