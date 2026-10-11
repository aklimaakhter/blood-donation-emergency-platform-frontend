import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  basePath: string;
  params: Record<string, string | undefined>;
}

export default function Pagination({ page, totalPages, basePath, params }: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
    sp.set("page", String(p));
    return `${basePath}?${sp.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 pt-6">
      {page > 1 && (
        <Link href={href(page - 1)} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Previous
        </Link>
      )}
      <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
      {page < totalPages && (
        <Link href={href(page + 1)} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Next
        </Link>
      )}
    </nav>
  );
}