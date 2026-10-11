import AcceptRequestButton from "@/components/blood-requests/acceptRequestButton";
import RequestCard from "@/components/blood-requests/requestCard";
import RequestStatusActions from "@/components/blood-requests/requestStatusActions";
import EmptyState from "@/components/ui/shared/emptyState";
import InlineError from "@/components/ui/shared/inlineError";
import { BLOOD_GROUP_LABEL, type BloodGroup } from "@/lib/constants";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import type { BloodRequest, Donor } from "@/lib/types";

export default async function DonorRequestsPage() {
  const me = await authFetch<Donor>(`${ENDPOINTS.donors}/me`);

  if (me.status === 404) {
    return <EmptyState title="Donor profile paoa jayni" description="Admin approve korle request dekhte parbe." />;
  }
  if (!me.success || !me.data) return <InlineError message={me.message} />;

  const donor = me.data;
  if (donor.status !== "APPROVED") {
    return <EmptyState title="Application ekhono approved na" description="Approve hole matching request ekhane dekhabe." />;
  }

  const [pendingRes, approvedRes] = await Promise.all([
    authFetch<BloodRequest[]>(
      `${ENDPOINTS.bloodRequests}?status=PENDING&bloodGroup=${donor.bloodGroup}`,
    ),
    authFetch<BloodRequest[]>(`${ENDPOINTS.bloodRequests}?status=APPROVED`),
  ]);

  const open = (pendingRes.data ?? []).filter((r) => r.requesterId !== donor.userId);
  const mine = (approvedRes.data ?? []).filter((r) => r.donorId === donor.id);
  const label = BLOOD_GROUP_LABEL[donor.bloodGroup as BloodGroup] ?? donor.bloodGroup;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Blood Requests</h1>
          <p className="text-sm text-gray-500">Tomar blood group ({label}) er open request.</p>
        </div>
        {!pendingRes.success ? (
          <InlineError message={pendingRes.message} />
        ) : open.length === 0 ? (
          <EmptyState title="Ekhon kono matching request nai" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {open.map((r) => (
              <RequestCard key={r.id} request={r}>
                <AcceptRequestButton id={r.id} />
              </RequestCard>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Accepted by me</h2>
        {!approvedRes.success ? (
          <InlineError message={approvedRes.message} />
        ) : mine.length === 0 ? (
          <EmptyState title="Ekhono kono request accept koro ni" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mine.map((r) => (
              <RequestCard key={r.id} request={r} showContact>
                <RequestStatusActions id={r.id} status={r.status} />
              </RequestCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}