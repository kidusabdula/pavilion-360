// components/portfolio/portfolio-client-view.tsx
'use client';
import { useState, useMemo } from 'react';
import { PortfolioCard } from './portfolio-card';
import { PortfolioFilter } from './portfolio-filter';
import { Input } from '@/components/ui/input';
import { Search, X } from '@/components/icons';
import type { PortfolioProject } from '@/lib/types/portfolio';
import type { EventType } from '@/lib/types/rentals';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioClientViewProps {
  initialProjects: PortfolioProject[];
  eventTypes: Array<{ id: string; name: string; slug: string }>;
}

export function PortfolioClientView({
  initialProjects,
  eventTypes,
}: PortfolioClientViewProps) {
  const [filter, setFilter] = useState<EventType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // Event type filter
      if (filter !== 'All' && p.eventType !== filter) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.eventType.toLowerCase().includes(query) ||
          (p.venue?.toLowerCase().includes(query) ?? false);
        if (!matchesSearch) return false;
      }
      return true;
    });
  }, [initialProjects, filter, searchQuery]);

  const clearFilters = () => {
    setFilter('All');
    setSearchQuery('');
  };

  const hasFilters = filter !== 'All' || searchQuery;

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects by name, type, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-11 h-12 text-base rounded-xl border-border/50 focus:border-accent transition-all bg-card"
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
      </div>

      {/* Filter Pills */}
      <PortfolioFilter onFilterChange={setFilter} activeFilter={filter} />

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
        <span className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-semibold text-foreground">
            {filteredProjects.length}
          </span>{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
        </span>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-muted-foreground hover:text-accent h-7"
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-20 px-4"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button onClick={clearFilters} variant="outline" className="rounded-xl">
              Clear all filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <PortfolioCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}