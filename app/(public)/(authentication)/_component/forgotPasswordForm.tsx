"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "../_actions/authAction";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validation/auth.validation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordInput) => {
    const res = await forgotPasswordAction(values);
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    router.push(`/reset-password?email=${encodeURIComponent(values.email)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input type="email" placeholder="Your email" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {isSubmitting ? "Sending..." : "Send OTP"}
      </Button>
      <p className="text-center text-sm">
        <Link href="/login" className="text-emerald-600 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}