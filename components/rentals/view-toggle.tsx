"use client"

import { Button } from "@/components/ui/button"
import { Grid3x3, List } from "@/components/icons"

export type ViewMode = "grid" | "compact"

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border rounded-lg p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="h-8"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={viewMode === "compact" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("compact")}
        className="h-8"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">Compact view</span>
      </Button>
    </div>
  )
}
