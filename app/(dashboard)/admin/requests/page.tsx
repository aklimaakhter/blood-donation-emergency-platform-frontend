import type { Metadata } from "next";
import { Suspense } from "react";
import RequestFilters from "@/components/blood-requests/requestFilters";
import RequestStatusActions from "@/components/blood-requests/requestStatusActions";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import Pagination from "@/components/ui/shared/pagination";
import StatusBadge from "@/components/ui/shared/statusBadge";
import {
  BLOOD_GROUP_LABEL,
  REQUEST_STATUS_VALUES,
  type BloodGroup,
} from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { first, paginate, toPage, type SearchParams } from "@/lib/search-params";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest } from "@/lib/types";

export const metadata: Metadata = { title: "Blood Requests | Admin" };

export default async function AdminRequestsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const searchTerm = first(sp.searchTerm);
  const bloodGroup = first(sp.bloodGroup);
  const status = first(sp.status);

  const qs = new URLSearchParams();
  if (searchTerm) qs.set("searchTerm", searchTerm);
  if (bloodGroup) qs.set("bloodGroup", bloodGroup);
  if (status) qs.set("status", status);

  const res = await authFetch<BloodRequest[]>(
    `${ENDPOINTS.bloodRequests}${qs.toString() ? `?${qs}` : ""}`,
  );
  const { rows, current, totalPages } = paginate(res.data ?? [], toPage(sp.page), 10);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Blood Requests</h1>

      <Suspense fallback={<div className="h-9 animate-pulse rounded bg-gray-100" />}>
        <RequestFilters statuses={REQUEST_STATUS_VALUES} />
      </Suspense>

      {!res.success ? (
        <InlineError message={res.message} />
      ) : rows.length === 0 ? (
        <EmptyState title="No requests found" description="Filter bodlao ba clear koro." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Blood</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Requester</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="p-3 font-medium">{r.patientName}</td>
                    <td className="p-3">{BLOOD_GROUP_LABEL[r.bloodGroup as BloodGroup] ?? r.bloodGroup}</td>
                    <td className="p-3">
                      {r.hospitalName}
                      <span className="block text-xs text-gray-500">{r.area}, {r.district}</span>
                    </td>
                    <td className="p-3">{new Date(r.dateOfDonation).toLocaleDateString("en-GB")}</td>
                    <td className="p-3 text-gray-600">{r.requester?.name}</td>
                    <td className="p-3"><StatusBadge status={r.status} /></td>
                    <td className="p-3"><RequestStatusActions id={r.id} status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={current}
            totalPages={totalPages}
            basePath="/admin/requests"
            params={{ searchTerm, bloodGroup, status }}
          />
        </>
      )}
    </div>
  );
}