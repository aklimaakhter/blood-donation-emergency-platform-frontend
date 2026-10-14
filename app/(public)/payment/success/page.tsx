import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import InlineError from "@/components/ui/shared/inlineError";
import { ENDPOINTS } from "@/lib/endpoints";
import { first, type SearchParams } from "@/lib/search-params";
import { authFetch } from "@/lib/server-api";
import type { Donation } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Payment Result | BloodConnect",
  robots: { index: false },
};

async function PaymentResult({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const sessionId = first(sp.session_id);

  if (!sessionId) return <InlineError message="Missing payment session." />;

  const res = await authFetch<Donation>(
    `${ENDPOINTS.donations}/verify?session_id=${encodeURIComponent(sessionId)}`,
  );
  if (!res.success || !res.data) return <InlineError message={res.message} />;

  const d = res.data;
  const amount = `$${(d.amount / 100).toFixed(2)}`;

  const view =
    d.status === "PAID"
      ? { icon: CheckCircle2, color: "text-emerald-600", title: "Payment successful", text: `Thank you for your ${amount} donation.` }
      : d.status === "FAILED"
        ? { icon: XCircle, color: "text-red-600", title: "Payment failed", text: "The payment session expired. No money was taken." }
        : { icon: Clock, color: "text-amber-600", title: "Payment pending", text: "We are still waiting for confirmation. Refresh in a moment." };

  return (
    <div className="space-y-3 text-center">
      <view.icon className={cn("mx-auto h-14 w-14", view.color)} aria-hidden="true" />
      <h1 className="text-2xl font-bold">{view.title}</h1>
      <p className="text-gray-600">{view.text}</p>
      <div className="flex justify-center gap-3 pt-3">
        <Link
          href="/user/payments"
          className={cn(buttonVariants(), "bg-emerald-600 text-white hover:bg-emerald-700")}
        >
          View payment history
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center px-4 py-12">
      <div className="w-full">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-lg bg-gray-100" />}>
          <PaymentResult searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}