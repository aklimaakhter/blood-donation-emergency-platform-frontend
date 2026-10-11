import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Link href="/admin/donors" className="block max-w-sm">
        <Card className="p-5 shadow-none transition hover:border-emerald-600">
          <p className="font-semibold">Donor applications</p>
          <p className="text-sm text-gray-500">Approve ba reject koro</p>
        </Card>
      </Link>
    </div>
  );
}