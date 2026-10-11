"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";
import { updateDonorProfileAction } from "@/app/_actions/donorAction";

export default function AvailabilityToggle({ initial }: { initial: boolean }) {
  const [available, setAvailable] = useOptimistic(initial);
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    const next = !available;
    startTransition(async () => {
      setAvailable(next); // sathe sathe UI bodlay, fail korle nijei ager obosthay phire jay
      const res = await updateDonorProfileAction({ isAvailable: next });
      if (res.success) toast.success(next ? "You are now available" : "You are now unavailable");
      else toast.error(res.message);
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={available}
      disabled={pending}
      onClick={toggle}
      className={`relative h-7 w-12 rounded-full transition-colors ${available ? "bg-emerald-600" : "bg-gray-300"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${available ? "left-6" : "left-1"}`}
      />
      <span className="sr-only">Toggle availability</span>
    </button>
  );
}