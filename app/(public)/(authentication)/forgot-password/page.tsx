import ForgotPasswordForm from "../_component/forgotPasswordForm";


export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-gray-500">Enter your email and we will send you a one-time code.</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}