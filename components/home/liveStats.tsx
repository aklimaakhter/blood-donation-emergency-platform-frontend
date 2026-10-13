import { CheckCircle2, Droplets, HeartHandshake, Users } from "lucide-react";
import StatCard from "@/components/ui/shared/statCard";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest, Donor } from "@/lib/types";

export default async function LiveStats() {
  const [donorsRes, requestsRes] = await Promise.all([
    authFetch<Donor[]>(ENDPOINTS.donors),
    authFetch<BloodRequest[]>(ENDPOINTS.bloodRequests),
  ]);

  if (!donorsRes.success && !requestsRes.success) {
    return (
      <p className="text-center text-sm text-gray-500">
        Live statistics are temporarily unavailable.
      </p>
    );
  }

  const donors = donorsRes.data ?? [];
  const requests = requestsRes.data ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Approved donors" value={donors.length} icon={Users} />
      <StatCard
        label="Available right now"
        value={donors.filter((d) => d.isAvailable).length}
        icon={HeartHandshake}
      />
      <StatCard
        label="Open requests"
        value={requests.filter((r) => r.status === "PENDING").length}
        icon={Droplets}
      />
      <StatCard
        label="Requests fulfilled"
        value={requests.filter((r) => r.status === "COMPLETED").length}
        icon={CheckCircle2}
      />
    </div>
  );
}