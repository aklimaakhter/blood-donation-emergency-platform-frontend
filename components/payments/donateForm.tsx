"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCheckoutAction } from "@/app/_actions/paymentAction";
import { donationSchema, type DonationInput } from "@/lib/validation/payment.validation";

const PRESETS = [5, 10, 25, 50];

export default function DonateForm() {
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { amount: 10 },
  });

  const amount = watch("amount");

  const onSubmit = (values: DonationInput) =>
    startTransition(async () => {
      const res = await createCheckoutAction(values.amount);
      if (res && !res.success) toast.error(res.message);
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an amount">
        {PRESETS.map((p) => (
          <Button
            key={p}
            type="button"
            variant={amount === p ? "default" : "outline"}
            onClick={() => setValue("amount", p, { shouldValidate: true })}
            className={amount === p ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""}
          >
            ৳{p}
          </Button>
        ))}
      </div>

      <div>
        <label htmlFor="amount" className="mb-1 block text-xs text-gray-500">
          Or enter an amount (BDT)
        </label>
        <Input
          id="amount"
          type="number"
          min={1}
          max={1000}
          step="1"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {pending ? "Redirecting to Stripe..." : "Donate with Stripe"}
      </Button>
      <p className="text-xs text-gray-500">
        Secure payment by Stripe. You will be redirected to complete the payment.
      </p>
    </form>
  );
}