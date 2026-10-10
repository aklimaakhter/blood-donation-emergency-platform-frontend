import { logoutAction } from "@/app/(public)/(authentication)/_actions/authAction";
import { Button } from "@/components/ui/button";

export default function UserDashboardPage() {
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <form action={logoutAction}>
        <Button type="submit" variant="outline">
          Logout
        </Button>
      </form>
    </div>
  );
}