"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { DataTable } from "@/components/cms/shared/data-table";
import { EmptyState } from "@/components/cms/shared/empty-state";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { ConfirmDialog } from "@/components/cms/shared/confirm-dialog";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import { useEventTypes, useDeleteEventType } from "@/hooks/cms/use-event-types";
import type { Tables } from "@/lib/supabase/types";

type EventType = Tables<"event_types">;

export default function EventTypesPage() {
  const [deleteTarget, setDeleteTarget] = useState<EventType | null>(null);

  const { data, isLoading, error } = useEventTypes();
  const deleteMutation = useDeleteEventType();

  const eventTypes = (data?.data || []) as EventType[];

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Event Types"
          description="Manage event type categories"
          breadcrumbs={[{ label: "Event Types" }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Event Types"
          description="Manage event type categories"
          breadcrumbs={[{ label: "Event Types" }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            Failed to load event types: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Event Types"
        description="Manage event type categories"
        breadcrumbs={[{ label: "Event Types" }]}
        actions={
          <Button asChild>
            <Link href="/cms/event-types/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Event Type
            </Link>
          </Button>
        }
      />

      {eventTypes.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No event types yet"
          description="Get started by adding your first event type."
          action={{ label: "Add Event Type", href: "/cms/event-types/new" }}
        />
      ) : (
        <DataTable
          data={eventTypes}
          baseUrl="/cms/event-types"
          searchPlaceholder="Search event types..."
          searchKey="name"
          onDelete={(eventType) => setDeleteTarget(eventType)}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (eventType) => (
                <div>
                  <p className="font-medium">{eventType.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {eventType.slug}
                  </p>
                </div>
              ),
            },
            {
              key: "display_order",
              label: "Order",
              className: "hidden md:table-cell",
              render: (eventType) => eventType.display_order,
            },
            {
              key: "is_active",
              label: "Status",
              className: "hidden sm:table-cell",
              render: (eventType) => (
                <StatusBadge
                  status={eventType.is_active ? "active" : "inactive"}
                />
              ),
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Event Type?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
