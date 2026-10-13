import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, LayoutDashboard, Search, ShieldCheck, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/shared/pageHeader";

export const metadata: Metadata = {
  title: "Services | BloodConnect",
  description:
    "Search blood donors, post emergency blood requests, apply as a donor and manage everything from a role-based dashboard.",
  openGraph: {
    title: "Services | BloodConnect",
    description: "Everything BloodConnect offers to donors, patients and administrators.",
    type: "website",
  },
};

const SERVICES = [
  {
    icon: Search,
    title: "Donor search",
    text: "Filter approved donors by blood group, district and area, search by name, and see who is available right now. Every filter is saved in the page link, so you can share a search.",
    href: "/donors",
    cta: "Find a donor",
  },
  {
    icon: ClipboardList,
    title: "Emergency blood requests",
    text: "Describe the patient, hospital and date in a short three-step form. Requests are visible to donors with the matching blood group and can be tracked until they are fulfilled.",
    href: "/requests",
    cta: "See requests",
  },
  {
    icon: UserPlus,
    title: "Become a donor",
    text: "Apply with your blood group and location. Once an administrator approves you, you can accept requests and control your availability.",
    href: "/register",
    cta: "Get started",
  },
  {
    icon: ShieldCheck,
    title: "Donor verification",
    text: "Administrators review each application before a donor appears in the public list, and can approve or reject it from a dedicated dashboard.",
    href: "/about",
    cta: "How it works",
  },
  {
    icon: LayoutDashboard,
    title: "Role-based dashboards",
    text: "Users, donors and administrators each get their own dashboard with only the tools they need, from request tracking to profile and photo management.",
    href: "/login",
    cta: "Log in",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our services"
        description="Simple tools for the three people involved in every donation: the one who needs blood, the one who gives it, and the one who keeps the list trustworthy."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.title} className="flex flex-col space-y-3 p-6 shadow-none">
              <div className="w-fit rounded-full bg-emerald-50 p-3 text-emerald-600">
                <s.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="flex-1 text-sm text-gray-600">{s.text}</p>
              <Link href={s.href} className="text-sm font-semibold text-emerald-600 hover:underline">
                {s.cta}
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}