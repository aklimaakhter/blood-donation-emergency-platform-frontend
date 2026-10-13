import type { Metadata } from "next";
import Link from "next/link";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import Pagination from "@/components/ui/shared/pagination";
import StatusBadge from "@/components/ui/shared/statusBadge";
import { BLOOD_GROUP_LABEL, type BloodGroup } from "@/lib/constants";
import { authFetch } from "@/lib/server-api";
import type { Donor } from "@/lib/types";
import DonorStatusActions from "@/components/donor/donorStatusActions";

export const metadata: Metadata = { title: "Donor Applications | Admin" };

const STATUSES = ["PENDING", "APPROVED", "REJECTED"] as const;
const PAGE = 10;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function AdminDonorsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const raw = first(sp.status);
  const status = STATUSES.find((s) => s === raw);
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const res = await authFetch<Donor[]>(`/donor/applications${status ? `?status=${status}` : ""}`);
  const all = res.data ?? [];
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE));
  const current = Math.min(page, totalPages);
  const rows = all.slice((current - 1) * PAGE, current * PAGE);

  const tab = (label: string, value?: string) => (
    <Link
      key={label}
      href={value ? `/admin/donor?status=${value}` : "/admin/donor"}
      className={`rounded-full border px-3 py-1 text-sm ${
        status === value || (!status && !value)
          ? "border-emerald-600 bg-emerald-50 font-semibold text-emerald-700"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Donor Applications</h1>

      <div className="flex flex-wrap gap-2">
        {tab("All")}
        {STATUSES.map((s) => tab(s.charAt(0) + s.slice(1).toLowerCase(), s))}
      </div>

      {!res.success ? (
        <InlineError message={res.message} />
      ) : rows.length === 0 ? (
        <EmptyState title="No applications found" description="There are no applications with this status." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Blood</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="p-3 font-medium">{d.user?.name}</td>
                    <td className="p-3 text-gray-600">{d.user?.email}</td>
                    <td className="p-3">{BLOOD_GROUP_LABEL[d.bloodGroup as BloodGroup] ?? d.bloodGroup}</td>
                    <td className="p-3">{d.area}, {d.district}</td>
                    <td className="p-3"><StatusBadge status={d.status} /></td>
                    <td className="p-3"><DonorStatusActions id={d.id} status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={current} totalPages={totalPages} basePath="/admin/donor" params={{ status }} />
        </>
      )}
    </div>
  );
}