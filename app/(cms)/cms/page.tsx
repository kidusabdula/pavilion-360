// app/(cms)/cms/page.tsx
import { Suspense } from "react";
import { PageHeader } from "@/components/cms/shared/page-header";
import { DashboardContent } from "./dashboard-content";
import { DashboardSkeleton } from "./dashboard-skeleton";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every minute for fresh stats

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your content."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
