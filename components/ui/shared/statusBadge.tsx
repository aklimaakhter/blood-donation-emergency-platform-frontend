const STYLES: Record<string, string> = {
  PENDING: "border-amber-200 bg-amber-50 text-amber-700",
  APPROVED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  FULFILLED: "border-blue-200 bg-blue-50 text-blue-700",
  CANCELLED: "border-gray-200 bg-gray-50 text-gray-600",
  PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
FAILED: "border-red-200 bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        STYLES[status] ?? "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}