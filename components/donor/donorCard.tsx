import { Droplets, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BLOOD_GROUP_LABEL, type BloodGroup } from "@/lib/constants";
import type { Donor } from "@/lib/types";

export default function DonorCard({ donor }: { donor: Donor }) {
  const label = BLOOD_GROUP_LABEL[donor.bloodGroup as BloodGroup] ?? donor.bloodGroup;

  return (
    <Card className="space-y-3 p-5 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{donor.user?.name ?? "Donor"}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {donor.area}, {donor.district}
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
          <Droplets className="h-4 w-4" aria-hidden="true" />
          {label}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className={donor.isAvailable ? "font-semibold text-emerald-600" : "text-gray-400"}>
          {donor.isAvailable ? "Available" : "Unavailable"}
        </span>
        {donor.lastDonatedDate && (
          <span className="text-gray-500">
            Last donated: {new Date(donor.lastDonatedDate).toLocaleDateString("en-GB")}
          </span>
        )}
      </div>
    </Card>
  );
}