// components/cms/shared/status-badge.tsx
import { cn } from '@/lib/utils/cn';

type StatusType =
  | 'active'
  | 'inactive'
  | 'draft'
  | 'published'
  | 'new'
  | 'reviewed'
  | 'contacted'
  | 'closed'
  | 'quoted'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'spam'
  | 'featured'
  | 'popular';

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  },
  draft: {
    label: 'Draft',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  published: {
    label: 'Published',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  new: {
    label: 'New',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  },
  reviewed: {
    label: 'Reviewed',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  },
  closed: {
    label: 'Closed',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  },
  quoted: {
    label: 'Quoted',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  },
  declined: {
    label: 'Declined',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
  expired: {
    label: 'Expired',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  },
  spam: {
    label: 'Spam',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  },
  featured: {
    label: 'Featured',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  },
  popular: {
    label: 'Popular',
    className: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  if (!config) {
    return null;
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}