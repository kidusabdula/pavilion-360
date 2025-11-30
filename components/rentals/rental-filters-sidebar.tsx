"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { RentalCategory, EventType } from "@/lib/types/rentals"

interface RentalFiltersSidebarProps {
  selectedCategories: RentalCategory[]
  selectedEventTypes: EventType[]
  selectedTags: string[]
  allTags: string[]
  onCategoryToggle: (category: RentalCategory) => void
  onEventTypeToggle: (eventType: EventType) => void
  onTagToggle: (tag: string) => void
  onClearAll: () => void
}

const categories: RentalCategory[] = [
  "Audio",
  "Lighting",
  "Video",
  "Staging",
  "Furniture & Soft Seating",
  "Tables & Chairs",
  "Bars & Backbars",
  "Decor & Drapery",
  "Power & Cables",
  "Packages",
]

const eventTypes: EventType[] = ["Corporate", "Wedding", "Gala", "Festival", "Nonprofit", "Social"]

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
  const hasActiveFilters = selectedCategories.length > 0 || selectedEventTypes.length > 0 || selectedTags.length > 0

  return (
    <div className="w-full bg-card border rounded-lg p-4 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <button onClick={onClearAll} className="text-sm text-accent hover:underline">
            Clear all
          </button>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-6 pr-4">
          {/* Category Filter */}
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => onCategoryToggle(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Event Type Filter */}
          <div>
            <h3 className="font-medium mb-3">Event Type</h3>
            <div className="space-y-2">
              {eventTypes.map((eventType) => (
                <div key={eventType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`event-${eventType}`}
                    checked={selectedEventTypes.includes(eventType)}
                    onCheckedChange={() => onEventTypeToggle(eventType)}
                  />
                  <Label htmlFor={`event-${eventType}`} className="text-sm cursor-pointer">
                    {eventType}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tags Filter */}
          <div>
            <h3 className="font-medium mb-3">Tags</h3>
            <div className="space-y-2">
              {allTags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => onTagToggle(tag)}
                  />
                  <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer capitalize">
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
