import {
  BLOOD_GROUP_LABEL,
  BLOOD_GROUP_VALUES,
  REQUEST_STATUS_VALUES,
} from "@/lib/constants";
import type { BloodRequest, Donation, Donor, DonorStatus } from "@/lib/types";

export interface ChartPoint {
  name: string;
  value: number;
}

const DONOR_STATUSES: DonorStatus[] = ["PENDING", "APPROVED", "REJECTED"];

const capitalize = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export function requestsByStatus(requests: BloodRequest[]): ChartPoint[] {
  return REQUEST_STATUS_VALUES.map((s) => ({
    name: capitalize(s),
    value: requests.filter((r) => r.status === s).length,
  }));
}

export function requestsByBloodGroup(requests: BloodRequest[]): ChartPoint[] {
  return BLOOD_GROUP_VALUES.map((g) => ({
    name: BLOOD_GROUP_LABEL[g],
    value: requests.filter((r) => r.bloodGroup === g).length,
  }));
}

export function applicationsByStatus(donors: Donor[]): ChartPoint[] {
  return DONOR_STATUSES.map((s) => ({
    name: capitalize(s),
    value: donors.filter((d) => d.status === s).length,
  }));
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);


export function donationsByDay(donations: Donation[], days = 14): ChartPoint[] {
  const buckets = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    buckets.set(dayKey(new Date(Date.now() - i * 86_400_000)), 0);
  }

  for (const d of donations) {
    if (d.status !== "PAID") continue;
    const key = dayKey(new Date(d.createdAt));
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + d.amount / 100);
  }

  return [...buckets].map(([key, value]) => ({
    name: new Date(key).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      timeZone: "UTC",
    }),
    value,
  }));
}

export function totalPaid(donations: Donation[]) {
  return donations
    .filter((d) => d.status === "PAID")
    .reduce((sum, d) => sum + d.amount, 0);
}