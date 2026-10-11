export default function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-4" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-36 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    </div>
  );
}