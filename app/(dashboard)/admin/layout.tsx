import DashboardShell from "@/components/ui/shared/dashboardShell";

const LINKS = [
  { name: "Overview", href: "/admin" },
  { name: "Donors", href: "/admin/donors" },
  { name: "Requests", href: "/admin/requests" },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell title="Admin" links={LINKS}>{children}</DashboardShell>;
}