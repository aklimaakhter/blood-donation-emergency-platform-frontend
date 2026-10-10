import { Suspense } from "react";
import Navbar from "./navBar";

export default function SiteHeader() {
  return (
    <Suspense fallback={<div className="h-16 border-b bg-white" />}>
      <Navbar />
    </Suspense>
  );
}