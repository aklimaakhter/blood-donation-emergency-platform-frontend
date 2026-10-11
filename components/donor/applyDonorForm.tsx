"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applyDonorAction } from "@/app/_actions/donorAction";
import { applyDonorSchema, type ApplyDonorInput } from "@/lib/validation/donor.validation";
import BloodGroupOptions from "./bloodGroupOptions";

const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;
}

export default function ApplyDonorForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyDonorInput>({
    resolver: zodResolver(applyDonorSchema),
    defaultValues: { district: "", area: "", lastDonatedDate: "" },
  });

  const onSubmit = async (values: ApplyDonorInput) => {
    const res = await applyDonorAction({ ...values, lastDonatedDate: values.lastDonatedDate || undefined });
    if (res.success) {
      toast.success(res.message);
      reset();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <select aria-label="Blood group" className={selectClass} defaultValue="" {...register("bloodGroup")}>
          <option value="">Select blood group</option>
          <BloodGroupOptions />
        </select>
        <FieldError message={errors.bloodGroup?.message} />
      </div>
      <div>
        <Input placeholder="District" {...register("district")} />
        <FieldError message={errors.district?.message} />
      </div>
      <div>
        <Input placeholder="Area" {...register("area")} />
        <FieldError message={errors.area?.message} />
      </div>
      <div>
        <label htmlFor="lastDonatedDate" className="mb-1 block text-xs text-gray-500">
          Last donated date (optional)
        </label>
        <Input id="lastDonatedDate" type="date" {...register("lastDonatedDate")} />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {isSubmitting ? "Submitting..." : "Apply as donor"}
      </Button>
    </form>
  );
}