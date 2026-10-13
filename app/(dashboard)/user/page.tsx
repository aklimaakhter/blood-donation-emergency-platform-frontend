import ApplyDonorForm from "@/components/donor/applyDonorForm";
import RefreshRoleButton from "@/components/donor/refreshRoleButton";
import { Card } from "@/components/ui/card";

import InlineError from "@/components/ui/shared/inlineError";
import StatusBadge from "@/components/ui/shared/statusBadge";
import { authFetch } from "@/lib/server-api";
import type { Donor } from "@/lib/types";

export default async function UserDashboardPage() {
  const res = await authFetch<Donor>("/donors/me");
  if (!res.success && res.status !== 404) return <InlineError message={res.message} />;

  const donor = res.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {donor && (
        <Card className="space-y-3 p-5 shadow-none">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Your donor application</h2>
            <StatusBadge status={donor.status} />
          </div>
          {donor.status === "PENDING" && (
            <p className="text-sm text-gray-600">Your application is under review. You will receive an email once it is approved.</p>
          )}
          {donor.status === "APPROVED" && (
            <>
              <p className="text-sm text-gray-600">Your application has been approved. Switch to your donor dashboard to start helping.</p>
              <RefreshRoleButton />
            </>
          )}
          {donor.status === "REJECTED" && (
            <p className="text-sm text-gray-600">Your application was rejected. You can apply again after 24 hours.</p>
          )}
        </Card>
      )}

      {(!donor || donor.status === "REJECTED") && (
        <Card className="max-w-md space-y-4 p-5 shadow-none">
          <h2 className="font-semibold">Become a blood donor</h2>
          <ApplyDonorForm />
        </Card>
      )}
    </div>
  );
}