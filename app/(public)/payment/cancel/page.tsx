import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Payment Cancelled | BloodConnect",
  robots: { index: false },
};

export default function PaymentCancelPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-12">
      <div className="w-full space-y-3 text-center">
        <XCircle className="mx-auto h-14 w-14 text-gray-400" aria-hidden="true" />
        <h1 className="text-2xl font-bold">Payment cancelled</h1>
        <p className="text-gray-600">You were not charged. You can try again whenever you like.</p>
        <div className="flex justify-center gap-3 pt-3">
          <Link
            href="/user/payments"
            className={cn(buttonVariants(), "bg-emerald-600 text-white hover:bg-emerald-700")}
          >
            Try again
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}