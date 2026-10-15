import type { RequestStatus } from "./constants";

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospitalName: string;
  hospitalAddress: string;
  district: string;
  area: string;
  bagsNeeded: number;
  dateOfDonation: string;
  contactNumber: string;
  reason: string | null;
  status: RequestStatus;
  requesterId: string;
  donorId: string | null;
  createdAt: string;
  requester?: { id: string; name: string; email: string; phoneNumber: string | null };
  donor?: {
    id: string;
    user?: { name: string; email: string; phoneNumber: string | null };
  } | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  imageUrl: string | null;
  role: "ADMIN" | "USER" | "DONOR";
}
export type DonorStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DonorUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  imageUrl: string | null;
}

export interface Donor {
  id: string;
  userId: string;
  bloodGroup: string;
  district: string;
  area: string;
  isAvailable: boolean;
  lastDonatedDate: string | null;
  status: DonorStatus;
  createdAt: string;
  updatedAt: string;
  user?: DonorUser;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospitalName: string;
  hospitalAddress: string;
  district: string;
  area: string;
  bagsNeeded: number;
  dateOfDonation: string;
  contactNumber: string;
  reason: string | null;
  status: RequestStatus;
  requesterId: string;
  donorId: string | null;
  createdAt: string;
  requester?: { id: string; name: string; email: string; phoneNumber: string | null };
  donor?: {
    id: string;
    user?: { name: string; email: string; phoneNumber: string | null };
  } | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  imageUrl: string | null;
  role: "ADMIN" | "USER" | "DONOR";
}

export type DonationStatus = "PENDING" | "PAID" | "FAILED";

export interface Donation {
  id: string;
  userId: string;
  amount: number; 
  currency: string;
  status: DonationStatus;
  stripeSessionId: string;
  createdAt: string;
}