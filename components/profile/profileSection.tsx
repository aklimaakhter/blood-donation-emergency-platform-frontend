import { Card } from "@/components/ui/card";
import InlineError from "@/components/ui/shared/inlineError";
import { ENDPOINTS } from "@/lib/endpoints";
import { authFetch } from "@/lib/server-api";
import type { UserProfile } from "@/lib/types";
import AvatarUploader from "./avatarUploader";
import ProfileForm from "./profileForm";

export default async function ProfileSection() {
  const res = await authFetch<UserProfile>(`${ENDPOINTS.auth}/me`);
  if (!res.success || !res.data) return <InlineError message={res.message} />;

  const user = res.data;

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="p-5 shadow-none">
        <AvatarUploader name={user.name} imageUrl={user.imageUrl} />
      </Card>
      <Card className="max-w-lg space-y-4 p-5 shadow-none">
        <h2 className="font-semibold">Account details</h2>
        <ProfileForm user={user} />
      </Card>
    </div>
  );
}