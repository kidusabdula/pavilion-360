"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { RentalCategory, EventType } from "@/lib/types/rentals";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Sparkles, Calendar, Tag, X } from "@/components/icons";

interface RentalFiltersSidebarProps {
  selectedCategories: RentalCategory[];
  selectedEventTypes: EventType[];
  selectedTags: string[];
  allTags: string[];
  onCategoryToggle: (category: RentalCategory) => void;
  onEventTypeToggle: (eventType: EventType) => void;
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const categories: RentalCategory[] = [
  "Lounge Furniture",
  "Bars & Shelves",
  "Tables",
  "Seating",
  "Room Dividers",
  "Pipe & Drape",
  "Flooring",
  "Decks And Foundations",
  "Stageline Stages",
  "Trussing",
  "Crowd Control",
  "Audio Visual",
  "Special Effects",
  "Live Entertainment",
  "Food & Beverage",
];

const eventTypes: EventType[] = [
  "Corporate",
  "Wedding",
  "Gala",
  "Festival",
  "Social",
  "Concert",
  "Outdoor",
];

export function RentalFiltersSidebar({
  selectedCategories,
  selectedEventTypes,
  selectedTags,
  allTags,
  onCategoryToggle,
  onEventTypeToggle,
  onTagToggle,
  onClearAll,
}: RentalFiltersSidebarProps) {
  const totalActiveFilters =
    selectedCategories.length + selectedEventTypes.length + selectedTags.length;
  const hasActiveFilters = totalActiveFilters > 0;

  return (
    <div className="w-full bg-linear-to-b from-card to-card/80 border border-border/50 rounded-xl p-5 h-fit sticky top-20 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10">
            <Filter className="h-4 w-4 text-accent" />
          </div>
          <h2 className="font-semibold text-lg">Filters</h2>
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <Badge className="bg-accent text-accent-foreground text-xs px-2">
                  {totalActiveFilters}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors px-2 py-1 rounded-md hover:bg-accent/10"
            >
              <X className="h-3 w-3" />
              Clear all
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Preview */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 p-3 bg-muted/30 rounded-lg border border-border/30">
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-destructive/20 transition-colors"
                  onClick={() => onCategoryToggle(cat)}
                >
                  {cat.length > 12 ? cat.slice(0, 12) + "..." : cat}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
              {selectedEventTypes.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-destructive/20 transition-colors"
                  onClick={() => onEventTypeToggle(type)}
                >
                  {type}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-destructive/20 transition-colors capitalize"
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                  <X className="h-2.5 w-2.5 ml-1" />
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-6 pr-4">
          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <h3 className="font-medium text-sm">Category</h3>
              {selectedCategories.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({selectedCategories.length})
                </span>
              )}
            </div>
            <div className="space-y-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <motion.div
                    key={category}
                    whileHover={{ x: 2 }}
                    className={`flex items-center space-x-2.5 p-2 rounded-lg transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-accent/10 border border-accent/20"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => onCategoryToggle(category)}
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={isSelected}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="text-sm cursor-pointer flex-1 leading-tight"
                    >
                      {category}
                    </Label>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Event Type Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <h3 className="font-medium text-sm">Event Type</h3>
              {selectedEventTypes.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({selectedEventTypes.length})
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {eventTypes.map((eventType) => {
                const isSelected = selectedEventTypes.includes(eventType);
                return (
                  <motion.button
                    key={eventType}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onEventTypeToggle(eventType)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                      isSelected
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-muted/30 border-border/50 hover:border-accent/50 hover:bg-muted/50"
                    }`}
                  >
                    {eventType}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Tags Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-3.5 w-3.5 text-accent" />
              <h3 className="font-medium text-sm">Style Tags</h3>
              {selectedTags.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({selectedTags.length})
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {allTags.slice(0, 20).map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTagToggle(tag)}
                    className={`px-2.5 py-1 text-xs capitalize rounded-full border transition-all duration-200 ${
                      isSelected
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-transparent border-border/50 hover:border-accent/50 hover:bg-accent/10"
                    }`}
                  >
                    {tag}
                  </motion.button>
                );
              })}
            </div>
            {allTags.length > 20 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{allTags.length - 20} more tags available
              </p>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
