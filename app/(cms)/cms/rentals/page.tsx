// app/(cms)/cms/rentals/page.tsx
// CMS Rentals list page
"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/cms/shared/page-header";
import { DataTable, TableThumbnail } from "@/components/cms/shared/data-table";
import { EmptyState } from "@/components/cms/shared/empty-state";
import { LoadingSkeleton } from "@/components/cms/shared/loading-skeleton";
import { ConfirmDialog } from "@/components/cms/shared/confirm-dialog";
import { StatusBadge } from "@/components/cms/shared/status-badge";
import {
  useRentals,
  useDeleteRental,
  useRentalCategories,
} from "@/hooks/cms/use-rentals";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Rental = Tables<"rental_items">;
type RentalWithCategory = Rental & {
  rental_categories: Tables<"rental_categories">;
};

export default function RentalsPage() {
  const [deleteTarget, setDeleteTarget] = useState<RentalWithCategory | null>(
    null
  );
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data, isLoading, error } = useRentals({
    category: categoryFilter === "all" ? undefined : categoryFilter,
  });
  const { data: categoriesData } = useRentalCategories();
  const deleteMutation = useDeleteRental();

  const rentals = (data?.data || []) as RentalWithCategory[];
  const categories = categoriesData?.data || [];

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Rental item deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete rental"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Rentals"
          description="Manage your rental inventory"
          breadcrumbs={[{ label: "Rentals" }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Rentals"
          description="Manage your rental inventory"
          breadcrumbs={[{ label: "Rentals" }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            Failed to load rentals: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rentals"
        description="Manage your rental inventory"
        breadcrumbs={[{ label: "Rentals" }]}
        actions={
          <Button asChild>
            <Link href="/cms/rentals/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Rental
            </Link>
          </Button>
        }
      />

      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {categoryFilter !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCategoryFilter("all")}
          >
            Clear filter
          </Button>
        )}
      </div>

      {rentals.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No rental items yet"
          description="Get started by adding your first rental item."
          action={{ label: "Add Rental", href: "/cms/rentals/new" }}
        />
      ) : (
        <DataTable
          data={rentals}
          baseUrl="/cms/rentals"
          searchPlaceholder="Search rentals..."
          searchKey="name"
          showViewButton
          viewUrl={(rental) => `/rentals/${rental.slug}`}
          onDelete={(rental) => setDeleteTarget(rental)}
          columns={[
            {
              key: "thumbnail",
              label: "",
              className: "w-16",
              render: (rental) => (
                <TableThumbnail
                  src={rental.thumbnail_url}
                  alt={rental.name}
                  fallback={rental.name.charAt(0)}
                />
              ),
            },
            {
              key: "name",
              label: "Name",
              render: (rental) => (
                <div>
                  <p className="font-medium">{rental.name}</p>
                  <p className="text-xs text-muted-foreground">{rental.slug}</p>
                </div>
              ),
            },
            {
              key: "category",
              label: "Category",
              className: "hidden md:table-cell",
              render: (rental) => (
                <span className="text-muted-foreground">
                  {rental.rental_categories?.name || "—"}
                </span>
              ),
            },
            {
              key: "is_active",
              label: "Status",
              className: "hidden sm:table-cell",
              render: (rental) => (
                <StatusBadge
                  status={rental.is_active ? "active" : "inactive"}
                />
              ),
            },
            {
              key: "is_popular",
              label: "Popular",
              className: "hidden lg:table-cell",
              render: (rental) => (
                <StatusBadge
                  status={rental.is_popular ? "featured" : "draft"}
                />
              ),
            },
          ]}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Rental?"
        description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
