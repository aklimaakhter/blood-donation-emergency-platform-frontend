/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BloodGroupOptions from "./bloodGroupOptions";
import { useDebounce } from "@/app/hooks/useDebounce";

const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

export default function DonorFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(params.get("searchTerm") ?? "");
  const debouncedSearch = useDebounce(search);

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  useEffect(() => {
    if ((params.get("searchTerm") ?? "") !== debouncedSearch) update("searchTerm", debouncedSearch);
   
  }, [debouncedSearch]);

  const clear = () => {
    setSearch("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search name, district or area"
        aria-label="Search donors"
      />
      <select
        aria-label="Blood group"
        className={selectClass}
        value={params.get("bloodGroup") ?? ""}
        onChange={(e) => update("bloodGroup", e.target.value)}
      >
        <option value="">All blood groups</option>
        <BloodGroupOptions />
      </select>
      <select
        aria-label="Availability"
        className={selectClass}
        value={params.get("available") ?? ""}
        onChange={(e) => update("available", e.target.value)}
      >
        <option value="">Any availability</option>
        <option value="true">Available</option>
        <option value="false">Unavailable</option>
      </select>
      <Button type="button" variant="outline" onClick={clear}>Clear filters</Button>
    </div>
  );
}