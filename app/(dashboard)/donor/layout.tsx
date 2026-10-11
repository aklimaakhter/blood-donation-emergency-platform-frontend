import DashboardShell from "@/components/ui/shared/dashboardShell";

const LINKS = [
  { name: "Overview", href: "/donor" },
  { name: "Blood Requests", href: "/donor/requests" },
  { name: "Profile", href: "/donor/profile" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="Donor" links={LINKS}>{children}</DashboardShell>;
}