import DashboardShell from "@/components/ui/shared/dashboardShell";

const LINKS = [
  { name: "Overview", href: "/user" },
  { name: "My Requests", href: "/user/requests" },
  { name: "New Request", href: "/user/requests/new" },
  { name: "Profile", href: "/user/profile" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="User" links={LINKS}>{children}</DashboardShell>;
}