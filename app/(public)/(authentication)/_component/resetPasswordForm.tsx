"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "../_actions/authAction";
import {
  resetPasswordFormSchema,
  type ResetPasswordFormInput,
} from "@/lib/validation/auth.validation";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;
}

export default function ResetPasswordForm({ defaultEmail }: { defaultEmail: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormInput>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { email: defaultEmail, otp: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async ({ confirmPassword: _ignored, ...payload }: ResetPasswordFormInput) => {
    const res = await resetPasswordAction(payload);
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div>
        <Input
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit OTP"
          {...register("otp")}
        />
        <FieldError message={errors.otp?.message} />
      </div>
      <div>
        <Input type="password" placeholder="New password" {...register("newPassword")} />
        <FieldError message={errors.newPassword?.message} />
      </div>
      <div>
        <Input type="password" placeholder="Confirm new password" {...register("confirmPassword")} />
        <FieldError message={errors.confirmPassword?.message} />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {isSubmitting ? "Updating..." : "Reset password"}
      </Button>
    </form>
  );
}