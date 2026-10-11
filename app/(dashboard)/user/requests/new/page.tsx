import type { Metadata } from "next";
import CreateRequestWizard from "@/components/blood-requests/createRequestWizard";

export const metadata: Metadata = { title: "New Blood Request | BloodConnect" };

export default function NewRequestPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Request blood</h1>
      <CreateRequestWizard />
    </div>
  );
}