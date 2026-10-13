import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/shared/pageHeader";

export const metadata: Metadata = {
  title: "FAQ | BloodConnect",
  description:
    "Answers to common questions about finding donors, requesting blood, becoming a donor and how BloodConnect handles your information.",
  openGraph: {
    title: "FAQ | BloodConnect",
    description: "Frequently asked questions about BloodConnect.",
    type: "website",
  },
};

const FAQS = [
  {
    q: "How do I find a blood donor?",
    a: "Open the Find Donors page and filter by blood group, district or area. Only donors approved by an administrator are listed, and you can limit the list to people who are available right now.",
  },
  {
    q: "How do I request blood for a patient?",
    a: "Log in, open New Request from your dashboard and fill in three short steps: patient details, hospital details, and the date and contact number. Donors with the matching blood group will see your request on their dashboard.",
  },
  {
    q: "When can I see the donor's contact details?",
    a: "Only after a donor accepts your request. Their name and phone number then appear on your request. Contact details are never shown on the public donor list.",
  },
  {
    q: "How do I become a donor?",
    a: "Create an account and verify your email with the OTP we send you. Then apply as a donor from your user dashboard with your blood group and location. After an administrator approves you, use the Switch to Donor dashboard button to start accepting requests.",
  },
  {
    q: "My donor application was rejected. Can I apply again?",
    a: "Yes. You can submit a new application 24 hours after a rejection.",
  },
  {
    q: "Can I pause receiving requests?",
    a: "Yes. Use the availability switch on your donor dashboard. While you are marked unavailable you can be filtered out of searches for people looking for donors right now.",
  },
  {
    q: "Who is allowed to donate blood?",
    a: "Eligibility depends on your health, age, weight and recent medical history, and the final decision is always made by the hospital or blood bank. BloodConnect connects people but does not give medical clearance.",
  },
  {
    q: "How often can I donate?",
    a: "Whole blood donors are usually asked to wait several months between donations. Follow the advice of the blood bank, and keep your last donation date up to date in your donor profile.",
  },
  {
    q: "Is this a replacement for calling the hospital?",
    a: "No. In a life-threatening emergency, contact the nearest hospital or emergency number first, then use BloodConnect to reach donors in parallel.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        description="Quick answers about requesting blood, donating and how the platform works."
      />

      <section className="mx-auto max-w-3xl space-y-3 px-4 py-12 sm:px-6 lg:px-8">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-lg border bg-white p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm text-gray-600">{f.a}</p>
          </details>
        ))}

        <p className="pt-6 text-center text-sm text-gray-600">
          Still have a question?{" "}
          <Link href="/contact" className="font-semibold text-emerald-600 hover:underline">
            Contact us
          </Link>
        </p>
      </section>
    </>
  );
}