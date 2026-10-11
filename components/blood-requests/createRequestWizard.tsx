"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createBloodRequestAction } from "@/app/_actions/bloodRequestAction";
import {
  bloodRequestSchema,
  type BloodRequestInput,
} from "@/lib/validation/blood-request.validation";
import BloodGroupOptions from "../donor/bloodGroupOptions";

const STEPS: { title: string; fields: (keyof BloodRequestInput)[] }[] = [
  { title: "Patient", fields: ["patientName", "bloodGroup", "bagsNeeded"] },
  { title: "Hospital", fields: ["hospitalName", "hospitalAddress", "district", "area"] },
  { title: "Schedule", fields: ["dateOfDonation", "contactNumber", "reason"] },
];

const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;
}

export default function CreateRequestWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const last = STEPS.length - 1;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BloodRequestInput>({
    resolver: zodResolver(bloodRequestSchema),
    mode: "onTouched",
    defaultValues: {
      patientName: "",
      bagsNeeded: 1,
      hospitalName: "",
      hospitalAddress: "",
      district: "",
      area: "",
      dateOfDonation: "",
      contactNumber: "",
      reason: "",
    },
  });

  const next = async () => {
    const ok = await trigger(STEPS[step].fields);
    if (ok) setStep((s) => Math.min(s + 1, last));
  };

  const onSubmit = async (values: BloodRequestInput) => {
    const res = await createBloodRequestAction(values);
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    router.push("/user/requests");
  };

  return (
    <Card className="max-w-xl space-y-5 p-5 shadow-none">
      <ol className="flex gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-emerald-600" : "bg-gray-200"}`} />
            <p className={`mt-1 text-xs ${i === step ? "font-semibold text-emerald-700" : "text-gray-400"}`}>
              {i + 1}. {s.title}
            </p>
          </li>
        ))}
      </ol>

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          // Enter chaple form jeno age-e submit na hoy
          if (e.key === "Enter" && step < last && (e.target as HTMLElement).tagName !== "TEXTAREA") {
            e.preventDefault();
            next();
          }
        }}
        className="space-y-4"
      >
        {step === 0 && (
          <>
            <div>
              <Input placeholder="Patient name" {...register("patientName")} />
              <FieldError message={errors.patientName?.message} />
            </div>
            <div>
              <select aria-label="Blood group" className={selectClass} defaultValue="" {...register("bloodGroup")}>
                <option value="">Select blood group</option>
                <BloodGroupOptions />
              </select>
              <FieldError message={errors.bloodGroup?.message} />
            </div>
            <div>
              <label htmlFor="bagsNeeded" className="mb-1 block text-xs text-gray-500">Bags needed</label>
              <Input id="bagsNeeded" type="number" min={1} max={10} {...register("bagsNeeded", { valueAsNumber: true })} />
              <FieldError message={errors.bagsNeeded?.message} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <Input placeholder="Hospital name" {...register("hospitalName")} />
              <FieldError message={errors.hospitalName?.message} />
            </div>
            <div>
              <Input placeholder="Hospital address" {...register("hospitalAddress")} />
              <FieldError message={errors.hospitalAddress?.message} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input placeholder="District" {...register("district")} />
                <FieldError message={errors.district?.message} />
              </div>
              <div>
                <Input placeholder="Area" {...register("area")} />
                <FieldError message={errors.area?.message} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="dateOfDonation" className="mb-1 block text-xs text-gray-500">Date needed</label>
              <Input
                id="dateOfDonation"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                {...register("dateOfDonation")}
              />
              <FieldError message={errors.dateOfDonation?.message} />
            </div>
            <div>
              <Input type="tel" placeholder="Contact number" {...register("contactNumber")} />
              <FieldError message={errors.contactNumber?.message} />
            </div>
            <div>
              <textarea
                rows={3}
                placeholder="Reason (optional)"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("reason")}
              />
              <FieldError message={errors.reason?.message} />
            </div>
          </>
        )}

        <div className="flex justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0 || isSubmitting}
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
          >
            Back
          </Button>
          {step < last ? (
            <Button type="button" onClick={next} className="bg-emerald-600 text-white hover:bg-emerald-700">
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {isSubmitting ? "Submitting..." : "Submit request"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}