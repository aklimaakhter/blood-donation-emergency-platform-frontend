"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

export default function DashboardShell({
  title,
  links,
  children,
}: {
  title: string;
  links: NavLink[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const active = links
    .filter((l) => pathname === l.href || pathname.startsWith(l.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="md:w-56 md:shrink-0">
        <p className="mb-2 hidden text-xs font-semibold uppercase tracking-wide text-gray-400 md:block">
          {title}
        </p>
        <nav
          aria-label={`${title} navigation`}
          className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "page" : undefined}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
                active === l.href
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}