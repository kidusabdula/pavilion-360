// components/rentals/rentals-client-view.tsx
'use client';
import { useState, useMemo } from 'react';
import { RentalFiltersSidebar } from './rental-filters-sidebar';
import { RentalCard } from './rental-card';
import { RentalCardCompact } from './rental-card-compact';
import { ViewToggle, type ViewMode } from './view-toggle';
import { QuoteBasket } from './quote-basket';
import { Input } from '@/components/ui/input';
import { Search, X, Filter } from '@/components/icons';
import type { RentalItem, RentalCategory, EventType } from '@/lib/types/rentals';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface RentalsClientViewProps {
  initialRentals: RentalItem[];
  categories: Array<{ id: string; name: string; slug: string }>;
  eventTypes: Array<{ id: string; name: string; slug: string }>;
  allTags: string[];
}

export function RentalsClientView({
  initialRentals,
  categories,
  eventTypes,
  allTags,
}: RentalsClientViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<RentalCategory[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<EventType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return initialRentals.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.category)
      ) {
        return false;
      }
      // Event type filter
      if (selectedEventTypes.length > 0) {
        const hasMatchingEventType = selectedEventTypes.some((type) =>
          item.recommendedEventTypes.includes(type)
        );
        if (!hasMatchingEventType) return false;
      }
      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((tag) =>
          item.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }
      return true;
    });
  }, [initialRentals, searchQuery, selectedCategories, selectedEventTypes, selectedTags]);

  const toggleCategory = (category: RentalCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleEventType = (eventType: EventType) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((e) => e !== eventType)
        : [...prev, eventType]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedEventTypes([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  const totalActiveFilters =
    selectedCategories.length + selectedEventTypes.length + selectedTags.length;
  const hasFilters = totalActiveFilters > 0 || searchQuery;

  return (
    <>
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
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
          {/* Search and Controls Bar */}
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm pb-4 -mt-2 pt-2">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment, SKU, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-11 h-12 text-base rounded-xl border-border/50 focus:border-accent transition-all"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                {/* Mobile Filters Button */}
                <Sheet
                  open={mobileFiltersOpen}
                  onOpenChange={setMobileFiltersOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden h-12 px-4 rounded-xl border-border/50 bg-card hover:bg-muted"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                      {totalActiveFilters > 0 && (
                        <Badge className="ml-2 bg-accent text-accent-foreground text-xs">
                          {totalActiveFilters}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 sm:w-96">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 -mx-2">
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
                <ViewToggle
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>
            </div>

            {/* Results Summary Bar */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing{' '}
                  <span className="font-semibold text-foreground">
                    {filteredItems.length}
                  </span>{' '}
                  of {initialRentals.length} items
                </span>
                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs text-muted-foreground hover:text-accent h-7"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Quick category pills on desktop */}
              <div className="hidden md:flex items-center gap-2">
                {['Lounge Furniture', 'Audio Visual', 'Special Effects'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat as RentalCategory)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selectedCategories.includes(cat as RentalCategory)
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'border-border/50 hover:border-accent/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Items Grid/List */}
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 px-4"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="rounded-xl"
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                  >
                    <RentalCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                  >
                    <RentalCardCompact item={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load more indicator for long lists */}
          {filteredItems.length > 20 && (
            <div className="text-center mt-12 pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Showing all {filteredItems.length} items
              </p>
            </div>
          )}
        </div>
      </div>
      <QuoteBasket />
    </>
  );
}