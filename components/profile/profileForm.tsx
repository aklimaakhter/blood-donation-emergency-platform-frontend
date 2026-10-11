"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileAction } from "@/app/_actions/userAction";
import { profileSchema, type ProfileInput } from "@/lib/validation/profile.validation";
import type { UserProfile } from "@/lib/types";

export default function ProfileForm({ user }: { user: UserProfile }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name, phoneNumber: user.phoneNumber ?? "" },
  });

  const onSubmit = async (values: ProfileInput) => {
    const res = await updateProfileAction(values);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-xs text-gray-500">Email</label>
        <Input id="email" value={user.email} disabled readOnly />
      </div>
      <div>
        <label htmlFor="name" className="mb-1 block text-xs text-gray-500">Full name</label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-xs text-gray-500">Phone number</label>
        <Input id="phone" type="tel" {...register("phoneNumber")} />
        {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white hover:bg-emerald-700">
        {isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}