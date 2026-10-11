"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { acceptBloodRequestAction } from "@/app/_actions/bloodRequestAction";

export default function AcceptRequestButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      disabled={pending}
      className="bg-emerald-600 text-white hover:bg-emerald-700"
      onClick={() =>
        startTransition(async () => {
          const res = await acceptBloodRequestAction(id);
          if (res.success) toast.success(res.message);
          else toast.error(res.message);
        })
      }
    >
      {pending ? "Accepting..." : "Accept request"}
    </Button>
  );
}