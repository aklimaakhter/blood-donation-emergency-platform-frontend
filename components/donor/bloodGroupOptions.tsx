import { BLOOD_GROUP_LABEL, BLOOD_GROUP_VALUES } from "@/lib/constants";

export default function BloodGroupOptions() {
  return (
    <>
      {BLOOD_GROUP_VALUES.map((v) => (
        <option key={v} value={v}>{BLOOD_GROUP_LABEL[v]}</option>
      ))}
    </>
  );
}