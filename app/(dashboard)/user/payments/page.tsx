import type { Metadata } from "next";
import DonateForm from "@/components/payments/donateForm";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import StatusBadge from "@/components/ui/shared/statusBadge";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import type { Donation } from "@/lib/types";

export const metadata: Metadata = { title: "Payments | BloodConnect" };

export default async function UserPaymentsPage() {
  const res = await authFetch<Donation[]>(`${ENDPOINTS.donations}/my`);
  const rows = res.data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payments</h1>

      <Card className="max-w-md space-y-4 p-5 shadow-none">
        <div>
          <h2 className="font-semibold">Support BloodConnect</h2>
          <p className="text-sm text-gray-500">
            Your donation helps us keep the platform free for patients and donors.
          </p>
        </div>
        <DonateForm />
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Payment history</h2>
        {!res.success ? (
          <InlineError message={res.message} />
        ) : rows.length === 0 ? (
          <EmptyState title="No payments yet" description="Your donations will appear here." />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3">{new Date(d.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="p-3 font-medium">৳{(d.amount / 100).toFixed(2)}</td>
                    <td className="p-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}