import { Building2, CalendarDays, Droplets, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import StatusBadge from "@/components/ui/shared/statusBadge";
import { BLOOD_GROUP_LABEL, type BloodGroup } from "@/lib/constants";
import type { BloodRequest } from "@/lib/types";

interface Props {
  request: BloodRequest;
  showContact?: boolean;
  showDonor?: boolean;
  children?: React.ReactNode;
}

export default function RequestCard({ request, showContact = false, showDonor = false, children }: Props) {
  const label = BLOOD_GROUP_LABEL[request.bloodGroup as BloodGroup] ?? request.bloodGroup;
  const donor = request.donor?.user;

  return (
    <Card className="space-y-3 p-5 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{request.patientName}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{request.hospitalName}</span>
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
          <Droplets className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
      </div>

      <ul className="space-y-1 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {request.area}, {request.district}
        </li>
        <li className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
          {new Date(request.dateOfDonation).toLocaleDateString("en-GB")} · {request.bagsNeeded} bag(s)
        </li>
        {showContact && (
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            {request.contactNumber}
          </li>
        )}
      </ul>

      {request.reason && <p className="text-sm text-gray-500">{request.reason}</p>}

      {showDonor && request.status === "APPROVED" && donor && (
        <p className="rounded-md bg-emerald-50 p-2 text-sm text-emerald-700">
          Donor: {donor.name}
          {donor.phoneNumber ? ` · ${donor.phoneNumber}` : ""}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={request.status} />
        {children}
      </div>
    </Card>
  );
}