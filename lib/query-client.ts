// lib/query-client.ts
// TanStack Query client configuration
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 1 minute
        staleTime: 60 * 1000,
        // Keep unused data in cache for 10 minutes
        gcTime: 10 * 60 * 1000,
        // Only retry once on failure
        retry: 1,
        // Don't refetch on window focus (better for CMS)
        refetchOnWindowFocus: false,
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Global error handler for mutations
        onError: (error) => {
          console.error('Mutation error:', error);
          if (error instanceof Error) {
            toast.error(error.message || 'An error occurred');
          }
        },
      },
    },
  });
}

// Browser-side: create a singleton
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new client if we don't have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}