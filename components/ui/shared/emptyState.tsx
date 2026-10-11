import { Inbox } from "lucide-react";

export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-14 text-center">
      <Inbox className="mb-3 h-10 w-10 text-gray-300" aria-hidden="true" />
      <p className="font-medium text-gray-700">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    </div>
  );
}