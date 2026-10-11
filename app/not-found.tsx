import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-5xl font-bold text-emerald-600">404</h1>
      <p className="text-gray-500">Ei page-ta paoa jayni.</p>
      <Link href="/" className={cn(buttonVariants(), "bg-emerald-600 text-white hover:bg-emerald-700")}>
        Back to home
      </Link>
    </div>
  );
}