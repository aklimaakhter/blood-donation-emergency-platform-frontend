import type { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "../_component/resetPasswordForm";


export const metadata: Metadata = {
  title: "Reset Password | Blood Donation Platform",
  description: "Enter the OTP sent to your email and choose a new password.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-gray-500">Enter the OTP and your new password</p>
        </div>
        <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-gray-100" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}