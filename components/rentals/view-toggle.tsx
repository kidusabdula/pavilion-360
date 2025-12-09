"use client";

import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "@/components/icons";
import { motion } from "framer-motion";

export type ViewMode = "grid" | "compact";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 border border-border/50 rounded-xl p-1 bg-card/50 backdrop-blur-sm">
      <motion.div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange("grid")}
          className={`relative h-10 w-10 rounded-lg transition-colors ${
            viewMode === "grid"
              ? "text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {viewMode === "grid" && (
            <motion.span
              layoutId="viewToggle"
              className="absolute inset-0 bg-accent rounded-lg -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Grid3x3 className="h-4 w-4" />
          <span className="sr-only">Grid view</span>
        </Button>
      </motion.div>

      <motion.div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewModeChange("compact")}
          className={`relative h-10 w-10 rounded-lg transition-colors ${
            viewMode === "compact"
              ? "text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {viewMode === "compact" && (
            <motion.span
              layoutId="viewToggle"
              className="absolute inset-0 bg-accent rounded-lg -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <List className="h-4 w-4" />
          <span className="sr-only">List view</span>
        </Button>
      </motion.div>
    </div>
  );
}
