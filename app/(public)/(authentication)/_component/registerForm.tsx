"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction, verifyEmailAction } from "../_actions/authAction";
import { RegisterFormInput, registerFormSchema, VerifyEmailInput, verifyEmailSchema } from "@/lib/validation";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;
}

export default function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [pendingData, setPendingData] = useState<RegisterFormInput | null>(null);

  const infoForm = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const otpForm = useForm<VerifyEmailInput>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "", otp: "" },
  });

  const sendOtp = async (values: RegisterFormInput) => {
    const { confirmPassword: _ignored, ...payload } = values;
    const res = await registerAction(payload);
    if (!res.success) {
      toast.error(res.message);
      return false;
    }
    toast.success(res.message);
    return true;
  };

  const onInfoSubmit = async (values: RegisterFormInput) => {
    if (await sendOtp(values)) {
      setPendingData(values);
      otpForm.reset({ email: values.email, otp: "" });
      setStep(2);
    }
  };

  const onOtpSubmit = async (values: VerifyEmailInput) => {
    const res = await verifyEmailAction(values); 
    if (res && !res.success) toast.error(res.message);
  };

  const resend = async () => {
    if (pendingData) await sendOtp(pendingData);
  };

  return (
    <Card className="space-y-4 border-gray-100 p-5 shadow-none">
      <p className="text-center text-xs text-gray-500">Step {step} of 2</p>

      {step === 1 ? (
        <form onSubmit={infoForm.handleSubmit(onInfoSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full name" {...infoForm.register("name")} />
            <FieldError message={infoForm.formState.errors.name?.message} />
          </div>
          <div>
            <Input type="email" placeholder="Email" {...infoForm.register("email")} />
            <FieldError message={infoForm.formState.errors.email?.message} />
          </div>
          <div>
            <Input type="password" placeholder="Password" {...infoForm.register("password")} />
            <FieldError message={infoForm.formState.errors.password?.message} />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Confirm password"
              {...infoForm.register("confirmPassword")}
            />
            <FieldError message={infoForm.formState.errors.confirmPassword?.message} />
          </div>
          <Button
            type="submit"
            disabled={infoForm.formState.isSubmitting}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {infoForm.formState.isSubmitting ? "Sending OTP..." : "Continue"}
          </Button>
        </form>
      ) : (
        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
          <p className="text-sm text-gray-600">
            Amra <b>{pendingData?.email}</b>-e ekta 6 digit OTP pathiyechi (5 minute valid).
          </p>
          <div>
            <Input
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              className="text-center tracking-[0.5em]"
              {...otpForm.register("otp")}
            />
            <FieldError message={otpForm.formState.errors.otp?.message} />
          </div>
          <Button
            type="submit"
            disabled={otpForm.formState.isSubmitting}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {otpForm.formState.isSubmitting ? "Verifying..." : "Verify & Create account"}
          </Button>
          <div className="flex justify-between text-sm">
            <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:underline">
              Back
            </button>
            <button type="button" onClick={resend} className="text-emerald-600 hover:underline">
              Resend OTP
            </button>
          </div>
        </form>
      )}

      <div className="border-t border-gray-100 pt-3 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-emerald-600 hover:underline">
          Sign in
        </Link>
      </div>
    </Card>
  );
}