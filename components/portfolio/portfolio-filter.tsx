// components/portfolio/portfolio-filter.tsx
'use client';
import { motion } from 'framer-motion';
import type { EventType } from '@/lib/types/rentals';

interface PortfolioFilterProps {
  onFilterChange: (filter: EventType | 'All') => void;
  activeFilter?: EventType | 'All';
}

export function PortfolioFilter({ onFilterChange, activeFilter = 'All' }: PortfolioFilterProps) {
  const eventTypes: (EventType | 'All')[] = [
    'All',
    'Corporate',
    'Wedding',
    'Gala',
    'Festival',
    'Concert',
    'Social',
    'Nonprofit',
    'Trade Show',
    'Outdoor',
    'Family',
  ];

  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-center gap-3">
        {eventTypes.map((type) => {
          const isActive = activeFilter === type;
          return (
            <motion.button
              key={type}
              onClick={() => onFilterChange(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/25'
                  : 'border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {type === 'All' ? 'All Projects' : type}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}