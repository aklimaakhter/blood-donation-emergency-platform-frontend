import type { Metadata } from "next";
import LoginForm from "../_component/loginForm";

export const metadata: Metadata = {
  title: "Login | Blood Donation Platform",
  description:
    "Login to your account to request blood, donate, and manage emergency blood donation requests.",
  openGraph: {
    title: "Login | Blood Donation Platform",
    description: "Login to your blood donation account.",
    type: "website",
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg sm:p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Login to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}