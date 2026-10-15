import RegisterForm from "../_component/registerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | BloodConnect",
  description:
    "Create a BloodConnect account to request blood, apply as a donor and help patients in emergency need.",
  openGraph: {
    title: "Create Account | BloodConnect",
    description: "Join the blood donation community.",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500">Join the blood donation community</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}