"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction, demoLoginAction } from "../_actions/authAction";
import type { Role } from "@/lib/auth";



const DEMO_ROLES: { role: Role; label: string; emoji: string }[] = [
  { role: "ADMIN", label: "Admin", emoji: "👨‍💼" },
  { role: "USER", label: "User", emoji: "👤" },
  { role: "DONOR", label: "Donor", emoji: "🩸" },
];

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {
    success: false,
    message: "",
  });
  const [demoPending, startDemo] = useTransition();
  const [activeRole, setActiveRole] = useState<Role | null>(null);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  const handleDemo = (role: Role) => {
    setActiveRole(role);
    startDemo(async () => {
      const result = await demoLoginAction(role);
      if (result && !result.success) {
        toast.error(result.message);
        setActiveRole(null);
      }
    });
  };

  const busy = pending || demoPending;

  return (
    <div className="space-y-4">
      <form action={action}>
        <Card className="space-y-4 border-gray-100 p-5 shadow-none">
          <Input name="email" type="email" placeholder="Enter your email" required />

          <div className="space-y-1">
            <Input name="password" type="password" placeholder="Enter your password" required />
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={busy}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {pending ? "Signing in..." : "Sign in"}
          </Button>

          <div className="border-t border-gray-100 pt-3 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-emerald-600 hover:underline">
              Sign up
            </Link>
          </div>
        </Card>
      </form>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span className="h-px flex-1 bg-gray-200" /> OR <span className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="pt-2 text-center text-sm font-medium"> Quick Demo Login</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {DEMO_ROLES.map((r) => (
          <Card key={r.role} className="space-y-2 p-3 text-center shadow-none">
            <div className="text-sm">
              {r.emoji} {r.label}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => handleDemo(r.role)}
              className="w-full"
            >
              {demoPending && activeRole === r.role ? "Logging in..." : "Demo Login"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}