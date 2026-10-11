"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateRequestStatusAction } from "@/app/_actions/bloodRequestAction";
import type { RequestStatus } from "@/lib/constants";

export default function RequestStatusActions({ id, status }: { id: string; status: RequestStatus }) {
  const [pending, startTransition] = useTransition();

  if (status === "COMPLETED" || status === "REJECTED") return null;

  const run = (next: RequestStatus) =>
    startTransition(async () => {
      const res = await updateRequestStatusAction(id, next);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });

  return (
    <div className="flex gap-2">
      {status === "APPROVED" && (
        <Button
          size="sm"
          disabled={pending}
          onClick={() => run("COMPLETED")}
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Mark fulfilled
        </Button>
      )}
      <Button size="sm" variant="outline" disabled={pending} onClick={() => run("REJECTED")}>
        Cancel
      </Button>
    </div>
  );
}