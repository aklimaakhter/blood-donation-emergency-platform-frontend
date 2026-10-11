"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUrlParams } from "@/app/hooks/useUrlParams";
import { useDebounce } from "@/app/hooks/useDebounce";
import BloodGroupOptions from "../donor/bloodGroupOptions";


const selectClass = "h-9 w-full rounded-md border border-input bg-background px-3 text-sm";

export default function RequestFilters({ statuses }: { statuses?: readonly string[] }) {
  const { params, set, clear } = useUrlParams();
  const [search, setSearch] = useState(params.get("searchTerm") ?? "");
  const debounced = useDebounce(search);

  useEffect(() => {
    if ((params.get("searchTerm") ?? "") !== debounced) set("searchTerm", debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patient, hospital or area"
        aria-label="Search requests"
      />
      <select
        aria-label="Blood group"
        className={selectClass}
        value={params.get("bloodGroup") ?? ""}
        onChange={(e) => set("bloodGroup", e.target.value)}
      >
        <option value="">All blood groups</option>
        <BloodGroupOptions />
      </select>
      {statuses ? (
        <select
          aria-label="Status"
          className={selectClass}
          value={params.get("status") ?? ""}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ) : (
        <div />
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setSearch("");
          clear();
        }}
      >
        Clear filters
      </Button>
    </div>
  );
}