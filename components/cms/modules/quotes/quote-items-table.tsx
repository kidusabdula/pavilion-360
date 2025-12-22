'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { QuoteItem } from '@/lib/schemas/quote.schema';

interface QuoteItemsTableProps {
  items: QuoteItem[];
}

export function QuoteItemsTable({ items }: QuoteItemsTableProps) {
  if (!items || items.length === 0) {
    return <p className="text-muted-foreground">No items in this quote.</p>;
  }
  
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Item</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow key={`${item.rental_item_id}-${idx}`}>
              <TableCell>
                {item.thumbnail ? (
                  <div className="relative h-12 w-12">
                    <Image 
                      src={item.thumbnail} 
                      alt={item.name} 
                      fill
                      className="rounded object-cover" 
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 bg-muted rounded flex items-center justify-center text-xs">N/A</div>
                )}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/cms/rentals/${item.rental_item_id}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}