'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageHeader } from '@/components/cms/shared/page-header';
import { DataTable } from '@/components/cms/shared/data-table';
import { EmptyState } from '@/components/cms/shared/empty-state';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { useQuotes } from '@/hooks/cms/use-quotes';
import { QUOTE_STATUSES } from '@/lib/schemas/quote.schema';
import type { Tables } from '@/lib/supabase/types';

type Quote = Tables<'quote_requests'> & {
  event_types: { id: string; name: string } | null;
};

export default function QuotesPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { data, isLoading, error } = useQuotes({ status: statusFilter !== 'all' ? statusFilter : undefined });
  
  const quotes = (data?.data || []) as Quote[];
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Quote Requests"
          description="Manage rental quote requests"
          breadcrumbs={[{ label: 'Quotes' }]}
        />
        <LoadingSkeleton type="table" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Quote Requests"
          description="Manage rental quote requests"
          breadcrumbs={[{ label: 'Quotes' }]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">Failed to load quotes: {error.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Quote Requests"
        description="Manage rental quote requests"
        breadcrumbs={[{ label: 'Quotes' }]}
      />
      
      {/* Status Filter */}
      <div className="flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {QUOTE_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {quotes.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="No quotes yet"
          description="Quote requests will appear here."
        />
      ) : (
        <DataTable
          data={quotes}
          baseUrl="/cms/quotes"
          searchPlaceholder="Search quotes..."
          searchKey="name"
          columns={[
            {
              key: 'name',
              label: 'Contact',
              render: (quote) => (
                <div>
                  <p className="font-medium">{quote.name}</p>
                  <p className="text-xs text-muted-foreground">{quote.email}</p>
                </div>
              ),
            },
            {
              key: 'event',
              label: 'Event',
              className: 'hidden md:table-cell',
              render: (quote) => (
                <div>
                  <p>{quote.event_types?.name || 'Not specified'}</p>
                  <p className="text-xs text-muted-foreground">
                    {quote.event_date ? new Date(quote.event_date).toLocaleDateString() : 'Date TBD'}
                  </p>
                </div>
              ),
            },
            {
              key: 'items',
              label: 'Items',
              className: 'hidden lg:table-cell',
              render: (quote) => `${(quote.items as any[])?.length || 0} items`,
            },
            {
              key: 'created_at',
              label: 'Received',
              className: 'hidden sm:table-cell',
              render: (quote) => new Date(quote.created_at).toLocaleDateString(),
            },
            {
              key: 'status',
              label: 'Status',
              render: (quote) => <StatusBadge status={quote.status} />,
            },
          ]}
        />
      )}
    </div>
  );
}