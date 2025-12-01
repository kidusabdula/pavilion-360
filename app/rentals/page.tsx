"use client"
import { HeroSection } from "@/components/shared/hero-section"
import { rentalItems } from "@/lib/data/rentals"
import { RentalFiltersSidebar } from "@/components/rentals/rental-filters-sidebar"
import { RentalCard } from "@/components/rentals/rental-card"
import { RentalCardCompact } from "@/components/rentals/rental-card-compact"
import { ViewToggle, type ViewMode } from "@/components/rentals/view-toggle"
import { QuoteBasket } from "@/components/rentals/quote-basket"
import { Input } from "@/components/ui/input"
import { Search, X } from "@/components/icons"
import { useState, useMemo } from "react"
import type { RentalCategory, EventType } from "@/lib/types/rentals"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function RentalsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<RentalCategory[]>([])
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    rentalItems.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return rentalItems.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)

        if (!matchesSearch) return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
        return false
      }

      // Event type filter
      if (selectedEventTypes.length > 0) {
        const hasMatchingEventType = selectedEventTypes.some((type) => item.recommendedEventTypes.includes(type))
        if (!hasMatchingEventType) return false
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((tag) => item.tags.includes(tag))
        if (!hasMatchingTag) return false
      }

      return true
    })
  }, [searchQuery, selectedCategories, selectedEventTypes, selectedTags])

  const toggleCategory = (category: RentalCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleEventType = (eventType: EventType) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType) ? prev.filter((e) => e !== eventType) : [...prev, eventType],
    )
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedEventTypes([])
    setSelectedTags([])
    setSearchQuery("")
  }

  return (
    <div className="flex flex-col">
      <HeroSection
        title="Equipment Rentals"
        subtitle="Professional-grade AV, lighting, staging, and furniture rentals for any event."
        backgroundImage="/event-equipment-rentals.jpg"

      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <RentalFiltersSidebar
                selectedCategories={selectedCategories}
                selectedEventTypes={selectedEventTypes}
                selectedTags={selectedTags}
                allTags={allTags}
                onCategoryToggle={toggleCategory}
                onEventTypeToggle={toggleEventType}
                onTagToggle={toggleTag}
                onClearAll={clearAllFilters}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search and View Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, SKU, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Filters Button */}
                  <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden bg-transparent">
                        Filters
                        {(selectedCategories.length > 0 || selectedEventTypes.length > 0 || selectedTags.length > 0) &&
                          ` (${selectedCategories.length + selectedEventTypes.length + selectedTags.length})`}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <RentalFiltersSidebar
                          selectedCategories={selectedCategories}
                          selectedEventTypes={selectedEventTypes}
                          selectedTags={selectedTags}
                          allTags={allTags}
                          onCategoryToggle={toggleCategory}
                          onEventTypeToggle={toggleEventType}
                          onTagToggle={toggleTag}
                          onClearAll={clearAllFilters}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                </div>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredItems.length} of {rentalItems.length} items
              </p>

              {/* Items Grid/List */}
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No items match your filters.</p>
                  <Button onClick={clearAllFilters} variant="link" className="mt-2">
                    Clear all filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <RentalCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <RentalCardCompact key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <QuoteBasket />
    </div>
  )
}
