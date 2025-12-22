// app/(cms)/cms/media/page.tsx
// Media Library - Coming in V2.1
import { ImageIcon, Clock } from "lucide-react";
import { PageHeader } from "@/components/cms/shared/page-header";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Browse and manage uploaded media files"
        breadcrumbs={[{ label: "Media Library" }]}
      />

      {/* Coming Soon State */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-16 text-center">
        <div className="relative mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 ring-4 ring-background">
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
        </div>

        <h2 className="mb-2 text-2xl font-semibold">Coming Soon</h2>
        <p className="mb-4 max-w-md text-muted-foreground">
          The Media Library is under development and will be available in
          version 2.1. You can still upload images directly when editing
          content.
        </p>

        <div className="flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-600">
          <Clock className="h-4 w-4" />
          <span>Planned for V2.1</span>
        </div>
      </div>
    </div>
  );
}
