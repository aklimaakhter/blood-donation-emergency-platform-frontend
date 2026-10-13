import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ClipboardList, HeartHandshake, Search } from "lucide-react";
import LatestRequests from "@/components/home/latestRequests";
import LiveStats from "@/components/home/liveStats";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BLOOD_GROUP_LABEL, BLOOD_GROUP_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "BloodConnect | Blood Donation & Emergency Platform",
  description:
    "Find approved blood donors by group and area, post an emergency blood request, and connect with people ready to help.",
  openGraph: {
    title: "BloodConnect | Blood Donation & Emergency Platform",
    description: "Connecting blood donors with patients in emergency need, quickly and securely.",
    type: "website",
  },
};

const STEPS = [
  {
    icon: Search,
    title: "Search donors",
    text: "Filter approved donors by blood group, district and area, and see who is available right now.",
  },
  {
    icon: ClipboardList,
    title: "Post a request",
    text: "Share the patient, hospital and date in a short three-step form. Donors with the matching group are notified on their dashboard.",
  },
  {
    icon: HeartHandshake,
    title: "Get connected",
    text: "An approved donor accepts your request and you receive their contact details to arrange the donation.",
  },
];

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading statistics">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

function RequestsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading requests">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-44 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Every drop counts
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Find a blood donor in minutes, not hours
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            BloodConnect links patients in emergency need with verified local donors. Search the
            donor list, post a request, and get help from people nearby.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/donors"
              className={cn(
                buttonVariants(),
                "h-11 bg-emerald-600 px-6 text-base text-white hover:bg-emerald-700",
              )}
            >
              Find a donor
            </Link>
            <Link
              href="/user/requests/new"
              className={cn(buttonVariants({ variant: "outline" }), "h-11 px-6 text-base")}
            >
              Request blood
            </Link>
          </div>
        </div>
      </section>

      {/* Live stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense fallback={<StatsSkeleton />}>
          <LiveStats />
        </Suspense>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Card key={s.title} className="space-y-3 p-6 shadow-none">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <s.icon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Browse by blood group */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">Browse donors by blood group</h2>
          <p className="mt-2 text-center text-gray-600">Pick a group to see approved donors.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BLOOD_GROUP_VALUES.map((v) => (
              <Link
                key={v}
                href={`/donors?bloodGroup=${v}`}
                className="rounded-lg border bg-white py-5 text-center text-2xl font-bold text-red-600 transition hover:border-red-300 hover:bg-red-50"
              >
                {BLOOD_GROUP_LABEL[v]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest requests */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Latest blood requests</h2>
        <p className="mt-2 text-center text-gray-600">Patients who need a donor right now.</p>
        <div className="mt-8">
          <Suspense fallback={<RequestsSkeleton />}>
            <LatestRequests />
          </Suspense>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-emerald-600">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to save a life?</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50">
            Create an account, apply as a donor, and start responding to requests in your area.
          </p>
          <Link
            href="/register"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 h-11 bg-white px-6 text-base text-emerald-700")}
          >
            Become a donor
          </Link>
        </div>
      </section>
    </>
  );
}