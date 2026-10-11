import AvailabilityToggle from "@/components/donor/availabilityToggle";
import DonorProfileForm from "@/components/donor/donorProfileForm";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import StatusBadge from "@/components/ui/shared/statusBadge";
import { authFetch } from "@/lib/server-api";
import type { Donor } from "@/lib/types";

export default async function DonorDashboardPage() {
  const res = await authFetch<Donor>("/donors/me");

  if (res.status === 404) {
    return <EmptyState title="Donor profile paoa jayni" description="Admin approve korle profile ekhane dekhabe." />;
  }
  if (!res.success || !res.data) return <InlineError message={res.message} />;

  const donor = res.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Donor Dashboard</h1>

      <Card className="flex items-center justify-between gap-4 p-5 shadow-none">
        <div>
          <p className="font-semibold">Availability</p>
          <p className="text-sm text-gray-500">Unavailable thakle search-e tomake emergency-te dekhabe na.</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={donor.status} />
          <AvailabilityToggle initial={donor.isAvailable} />
        </div>
      </Card>

      <Card className="max-w-md space-y-4 p-5 shadow-none">
        <h2 className="font-semibold">My donor profile</h2>
        <DonorProfileForm donor={donor} />
      </Card>
    </div>
  );
}