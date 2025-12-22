'use client';
import { use } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/cms/shared/page-header';
import { LoadingSkeleton } from '@/components/cms/shared/loading-skeleton';
import { StatusBadge } from '@/components/cms/shared/status-badge';
import { QuoteItemsTable } from '@/components/cms/modules/quotes/quote-items-table';
import { useQuote, useUpdateQuote } from '@/hooks/cms/use-quotes';
import { QUOTE_STATUSES, type UpdateQuoteInput } from '@/lib/schemas/quote.schema';

interface QuotePageProps {
  params: Promise<{ id: string }>;
}

export default function QuotePage({ params }: QuotePageProps) {
  const { id } = use(params);
  const { data, isLoading, error } = useQuote(id);
  const updateMutation = useUpdateQuote();
  
  const [status, setStatus] = useState<string>('');
  const [totalEstimate, setTotalEstimate] = useState<number | undefined>();
  const [adminNotes, setAdminNotes] = useState<string>('');
  
  const quote = data?.data;
  
  const handleUpdate = async () => {
    if (!quote) return;
    
    try {
      await updateMutation.mutateAsync({
        id: quote.id,
        status: status as any,
        total_estimate: totalEstimate || null,
        admin_notes: adminNotes || null,
      });
    } catch (err) {
      // Error is handled by the mutation
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Loading..."
          breadcrumbs={[
            { label: 'Quotes', href: '/cms/quotes' },
            { label: 'Detail' },
          ]}
        />
        <LoadingSkeleton type="detail" />
      </div>
    );
  }
  
  if (error || !quote) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Error"
          breadcrumbs={[
            { label: 'Quotes', href: '/cms/quotes' },
            { label: 'Detail' },
          ]}
        />
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-500">
            {error?.message || 'Quote not found'}
          </p>
          <Button asChild className="mt-4" variant="outline">
            <Link href="/cms/quotes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quotes
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Quote from ${quote.name}`}
        breadcrumbs={[
          { label: 'Quotes', href: '/cms/quotes' },
          { label: quote.name },
        ]}
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column (2/3) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="font-medium">{quote.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Email:</span>
                <a href={`mailto:${quote.email}`} className="text-blue-600 hover:underline">
                  {quote.email}
                </a>
              </div>
              {quote.phone && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <a href={`tel:${quote.phone}`} className="text-blue-600 hover:underline">
                    {quote.phone}
                  </a>
                </div>
              )}
              {quote.company && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Company:</span>
                  <span>{quote.company}</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Event Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Event Type:</span>
                <span>{quote.event_types?.name || 'Not specified'}</span>
              </div>
              {quote.event_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span>{new Date(quote.event_date).toLocaleDateString()}</span>
                </div>
              )}
              {quote.event_location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span>{quote.event_location}</span>
                </div>
              )}
              {quote.guest_count && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Guest Count:</span>
                  <span>{quote.guest_count}</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Quote Items Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quote Items</CardTitle>
            </CardHeader>
            <CardContent>
              <QuoteItemsTable items={quote.items as any[]} />
            </CardContent>
          </Card>
          
          {/* Message Card */}
          {quote.message && (
            <Card>
              <CardHeader>
                <CardTitle>Message</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{quote.message}</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right column (1/3) */}
        <div className="space-y-6">
          {/* Status & Estimate Card */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Estimate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="w-full p-2 border rounded-md" 
                  value={status || quote.status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {QUOTE_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Total Estimate ($)</label>
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-md" 
                  value={totalEstimate ?? quote.total_estimate ?? undefined} 
                  onChange={(e) => setTotalEstimate(e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Notes</label>
                <textarea 
                  className="w-full p-2 border rounded-md min-h-[100px]" 
                  value={adminNotes ?? quote.admin_notes ?? undefined} 
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleUpdate} 
                disabled={updateMutation.isPending}
                className="w-full"
              >
                {updateMutation.isPending ? 'Updating...' : 'Update Quote'}
              </Button>
            </CardContent>
          </Card>
          
          {/* Metadata Card */}
          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(quote.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated</span>
                <span>{new Date(quote.updated_at).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}