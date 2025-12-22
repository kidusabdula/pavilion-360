"use client";
import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/cms/shared/page-header";
import { DataTable } from "@/components/cms/shared/data-table";
import { EmptyState } from "@/components/cms/shared/empty-state";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useInquiries } from "@/hooks/cms/use-inquiries";
import { INQUIRY_STATUSES } from "@/lib/schemas/inquiry.schema";
import type { Tables } from "@/lib/supabase/types";

type Inquiry = Tables<"inquiries">;

export default function InquiriesPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data, isLoading, error } = useInquiries({
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const inquiries = (data?.data || []) as Inquiry[];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Inquiries"
          description="Manage contact form submissions"
          breadcrumbs={[{ label: "Inquiries" }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Inquiries"
          description="Manage contact form submissions"
          breadcrumbs={[{ label: "Inquiries" }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            Failed to load inquiries: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inquiries"
        description="Manage contact form submissions"
        breadcrumbs={[{ label: "Inquiries" }]}
      />

      {/* Status Filter */}
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {INQUIRY_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No inquiries yet"
          description="Contact form submissions will appear here."
        />
      ) : (
        <DataTable
          data={inquiries}
          baseUrl="/cms/inquiries"
          searchPlaceholder="Search inquiries..."
          searchKey="name"
          columns={[
            {
              key: "name",
              label: "Contact",
              render: (inquiry) => (
                <div>
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {inquiry.email}
                  </p>
                </div>
              ),
            },
            {
              key: "message",
              label: "Message",
              className: "hidden md:table-cell max-w-xs",
              render: (inquiry) => (
                <p className="truncate">{inquiry.message}</p>
              ),
            },
            {
              key: "created_at",
              label: "Received",
              className: "hidden sm:table-cell",
              render: (inquiry) =>
                inquiry.created_at
                  ? new Date(inquiry.created_at).toLocaleDateString()
                  : "N/A",
            },
            {
              key: "status",
              label: "Status",
              render: (inquiry) => (
                <StatusBadge status={inquiry.status || "new"} />
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
