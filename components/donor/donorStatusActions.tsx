"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateDonorStatusAction } from "@/app/_actions/donorAction";
import type { DonorStatus } from "@/lib/types";

export default function DonorStatusActions({ id, status }: { id: string; status: DonorStatus }) {
  const [pending, startTransition] = useTransition();

  const act = (next: "APPROVED" | "REJECTED") =>
    startTransition(async () => {
      const res = await updateDonorStatusAction(id, next);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        disabled={pending || status === "APPROVED"}
        onClick={() => act("APPROVED")}
        className="bg-emerald-600 text-white hover:bg-emerald-700"
      >
        Approve
      </Button>
      <Button size="sm" variant="outline" disabled={pending || status === "REJECTED"} onClick={() => act("REJECTED")}>
        Reject
      </Button>
    </div>
  );
}