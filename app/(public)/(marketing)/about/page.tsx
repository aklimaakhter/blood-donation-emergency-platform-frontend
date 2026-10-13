import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/shared/pageHeader";

export const metadata: Metadata = {
  title: "About | BloodConnect",
  description:
    "BloodConnect connects patients in emergency need with verified blood donors. Learn how the platform works and who it is built for.",
  openGraph: {
    title: "About | BloodConnect",
    description: "A community platform that connects blood donors with patients in emergency need.",
    type: "website",
  },
};

const ROLES = [
  {
    icon: Users,
    title: "Patients and families",
    text: "Create an account, post a blood request in three short steps, and see the donor's contact details as soon as someone accepts it.",
  },
  {
    icon: HeartHandshake,
    title: "Blood donors",
    text: "Apply once, get approved, then see open requests that match your blood group. Switch your availability on or off whenever you need to.",
  },
  {
    icon: ShieldCheck,
    title: "Administrators",
    text: "Review every donor application before it goes public, and keep an eye on all blood requests across the platform.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About BloodConnect"
        description="Finding blood in an emergency should not depend on who you happen to know. We built BloodConnect to make that search faster and more reliable."
      />

      <section className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Our mission</h2>
        <p className="text-gray-600">
          When a patient needs blood, families often spend precious hours calling relatives and
          posting in social media groups. BloodConnect puts everything in one place: a searchable
          list of approved donors, a simple request form, and a clear way for donors to respond.
        </p>
        <p className="text-gray-600">
          Every donor is reviewed by an administrator before appearing in the public list, and
          personal contact details are shared only after a donor accepts a specific request.
        </p>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold">Who the platform is built for</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {ROLES.map((r) => (
              <Card key={r.title} className="space-y-3 p-6 shadow-none">
                <r.icon className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-4 px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Be part of it</h2>
        <p className="text-gray-600">Whether you need blood today or want to be ready to help tomorrow, it starts with an account.</p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className={cn(buttonVariants(), "bg-emerald-600 text-white hover:bg-emerald-700")}
          >
            Create an account
          </Link>
          <Link href="/donors" className={cn(buttonVariants({ variant: "outline" }))}>
            Browse donors
          </Link>
        </div>
      </section>
    </>
  );
}