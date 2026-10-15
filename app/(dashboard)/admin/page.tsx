import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, HandCoins, Hourglass, Users } from "lucide-react";
import { AreaChartCard, BarChartCard, PieChartCard } from "@/components/admin/charts";
import { Card } from "@/components/ui/card";
import InlineError from "@/components/ui/shared/inlineError";
import StatCard from "@/components/ui/shared/statCard";
import {
  applicationsByStatus,
  donationsByDay,
  requestsByBloodGroup,
  requestsByStatus,
  totalPaid,
} from "@/lib/admin-stats";
import { ENDPOINTS } from "@/lib/endpoints";
import { formatMoney } from "@/lib/format";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest, Donation, Donor } from "@/lib/types";

export const metadata: Metadata = { title: "Admin Overview | BloodConnect" };

export default async function AdminDashboardPage() {
  const [donorsRes, requestsRes, donationsRes] = await Promise.all([
    authFetch<Donor[]>(`${ENDPOINTS.donors}/applications`),
    authFetch<BloodRequest[]>(ENDPOINTS.bloodRequests),
    authFetch<Donation[]>(ENDPOINTS.donations),
  ]);

  const donors = donorsRes.data ?? [];
  const requests = requestsRes.data ?? [];
  const donations = donationsRes.data ?? [];

  const errors = [...new Set(
    [donorsRes, requestsRes, donationsRes].filter((r) => !r.success).map((r) => r.message),
  )];

  const currency =
    donations.find((d) => d.status === "PAID")?.currency ?? donations[0]?.currency ?? "usd";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Overview</h1>

      {errors.map((message) => (
        <InlineError key={message} message={message} />
      ))}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending applications"
          value={donors.filter((d) => d.status === "PENDING").length}
          icon={Hourglass}
        />
        <StatCard
          label="Approved donors"
          value={donors.filter((d) => d.status === "APPROVED").length}
          icon={Users}
        />
        <StatCard
          label="Open requests"
          value={requests.filter((r) => r.status === "PENDING").length}
          icon={ClipboardList}
        />
        <StatCard
          label="Total donations"
          value={formatMoney(totalPaid(donations), currency)}
          icon={HandCoins}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title="Requests by status"
          description="How blood requests are progressing"
          data={requestsByStatus(requests)}
          color="#059669"
          seriesName="Requests"
        />
        <BarChartCard
          title="Requests by blood group"
          description="Which blood groups are needed most"
          data={requestsByBloodGroup(requests)}
          color="#dc2626"
          seriesName="Requests"
        />
        <PieChartCard
          title="Donor applications"
          description="Review status of all applications"
          data={applicationsByStatus(donors)}
        />
        <AreaChartCard
          title="Donations, last 14 days"
          description="Completed Stripe payments per day"
          data={donationsByDay(donations)}
          currency={currency}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/donors">
          <Card className="p-5 shadow-none transition hover:border-emerald-600">
            <p className="font-semibold">Donor applications</p>
            <p className="text-sm text-gray-500">Review, approve or reject applications</p>
          </Card>
        </Link>
        <Link href="/admin/requests">
          <Card className="p-5 shadow-none transition hover:border-emerald-600">
            <p className="font-semibold">Blood requests</p>
            <p className="text-sm text-gray-500">Filter and manage every request</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}