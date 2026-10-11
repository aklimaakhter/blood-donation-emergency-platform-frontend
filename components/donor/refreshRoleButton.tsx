"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { refreshSessionAction } from "@/app/_actions/donorAction";

export default function RefreshRoleButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      disabled={pending}
      className="bg-emerald-600 text-white hover:bg-emerald-700"
      onClick={() =>
        startTransition(async () => {
          const res = await refreshSessionAction();
          if (res && !res.success) toast.error(res.message);
        })
      }
    >
      {pending ? "Switching..." : "Switch to Donor dashboard"}
    </Button>
  );
}