export const BLOOD_GROUP_VALUES = [
  "A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE",
  "AB_POSITIVE", "AB_NEGATIVE", "O_POSITIVE", "O_NEGATIVE",
] as const; 

export type BloodGroup = (typeof BLOOD_GROUP_VALUES)[number];

export const BLOOD_GROUP_LABEL: Record<BloodGroup, string> = {
  A_POSITIVE: "A+", A_NEGATIVE: "A-", B_POSITIVE: "B+", B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+", AB_NEGATIVE: "AB-", O_POSITIVE: "O+", O_NEGATIVE: "O-",
};

export const REQUEST_STATUS_VALUES = ["PENDING", "APPROVED", "REJECTED", "COMPLETED"] as const;
export type RequestStatus = (typeof REQUEST_STATUS_VALUES)[number];

export const PAGE_SIZE = 9;