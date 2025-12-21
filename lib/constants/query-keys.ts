// lib/constants/query-keys.ts
// Centralized query key factory for TanStack Query
// Using factory functions ensures consistent keys and enables proper cache invalidation

// Types for filter parameters
export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  category?: string;
  featured?: boolean;
}

export interface RentalFilters extends ListParams {
  category?: string;
  eventType?: string;
  tags?: string[];
  popular?: boolean;
}

export interface PortfolioFilters extends ListParams {
  eventType?: string;
}

export interface BlogFilters extends ListParams {
  category?: string;
  tag?: string;
  featured?: boolean;
}

export interface FAQFilters {
  category?: string;
}

// Public query keys (for public-facing site)
export const queryKeys = {
  // Services
  services: {
    all: ["services"] as const,
    list: () => [...queryKeys.services.all, "list"] as const,
    detail: (slug: string) =>
      [...queryKeys.services.all, "detail", slug] as const,
  },

  // Rentals
  rentals: {
    all: ["rentals"] as const,
    list: (filters?: RentalFilters) =>
      [...queryKeys.rentals.all, "list", filters] as const,
    detail: (slug: string) =>
      [...queryKeys.rentals.all, "detail", slug] as const,
    categories: () => [...queryKeys.rentals.all, "categories"] as const,
  },

  // Portfolio
  portfolio: {
    all: ["portfolio"] as const,
    list: (filters?: PortfolioFilters) =>
      [...queryKeys.portfolio.all, "list", filters] as const,
    detail: (slug: string) =>
      [...queryKeys.portfolio.all, "detail", slug] as const,
  },

  // Venues
  venues: {
    all: ["venues"] as const,
    list: () => [...queryKeys.venues.all, "list"] as const,
    detail: (slug: string) =>
      [...queryKeys.venues.all, "detail", slug] as const,
  },

  // Testimonials
  testimonials: {
    all: ["testimonials"] as const,
    list: () => [...queryKeys.testimonials.all, "list"] as const,
    featured: () => [...queryKeys.testimonials.all, "featured"] as const,
  },

  // FAQs
  faqs: {
    all: ["faqs"] as const,
    list: (filters?: FAQFilters) =>
      [...queryKeys.faqs.all, "list", filters] as const,
    categories: () => [...queryKeys.faqs.all, "categories"] as const,
  },

  // Blog
  blog: {
    all: ["blog"] as const,
    list: (filters?: BlogFilters) =>
      [...queryKeys.blog.all, "list", filters] as const,
    detail: (slug: string) => [...queryKeys.blog.all, "detail", slug] as const,
    categories: () => [...queryKeys.blog.all, "categories"] as const,
  },

  // Team
  team: {
    all: ["team"] as const,
    list: () => [...queryKeys.team.all, "list"] as const,
  },

  // Event Types (lookup)
  eventTypes: {
    all: ["event-types"] as const,
    list: () => [...queryKeys.eventTypes.all, "list"] as const,
  },

  // Tags (lookup)
  tags: {
    all: ["tags"] as const,
    list: () => [...queryKeys.tags.all, "list"] as const,
  },
};

// CMS query keys (for admin dashboard)
export const cmsQueryKeys = {
  // Services
  services: {
    all: ["cms", "services"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.services.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.services.all, "detail", id] as const,
  },

  // Rentals
  rentals: {
    all: ["cms", "rentals"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.rentals.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.rentals.all, "detail", id] as const,
    categories: () => [...cmsQueryKeys.rentals.all, "categories"] as const,
  },

  // Rental Categories
  rentalCategories: {
    all: ["cms", "rental-categories"] as const,
    list: () => [...cmsQueryKeys.rentalCategories.all, "list"] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.rentalCategories.all, "detail", id] as const,
  },

  // Portfolio
  portfolio: {
    all: ["cms", "portfolio"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.portfolio.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.portfolio.all, "detail", id] as const,
  },

  // Venues
  venues: {
    all: ["cms", "venues"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.venues.all, "list", params] as const,
    detail: (id: string) => [...cmsQueryKeys.venues.all, "detail", id] as const,
  },

  // Testimonials
  testimonials: {
    all: ["cms", "testimonials"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.testimonials.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.testimonials.all, "detail", id] as const,
  },

  // FAQs
  faqs: {
    all: ["cms", "faqs"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.faqs.all, "list", params] as const,
    detail: (id: string) => [...cmsQueryKeys.faqs.all, "detail", id] as const,
  },

  // FAQ Categories
  faqCategories: {
    all: ["cms", "faq-categories"] as const,
    list: () => [...cmsQueryKeys.faqCategories.all, "list"] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.faqCategories.all, "detail", id] as const,
  },

  // Blog
  blog: {
    all: ["cms", "blog"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.blog.all, "list", params] as const,
    detail: (id: string) => [...cmsQueryKeys.blog.all, "detail", id] as const,
  },

  // Blog Categories
  blogCategories: {
    all: ["cms", "blog-categories"] as const,
    list: () => [...cmsQueryKeys.blogCategories.all, "list"] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.blogCategories.all, "detail", id] as const,
  },

  // Team Members
  teamMembers: {
    all: ["cms", "team-members"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.teamMembers.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.teamMembers.all, "detail", id] as const,
  },

  // Team (legacy - keeping for backwards compatibility)
  team: {
    all: ["cms", "team"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.team.all, "list", params] as const,
    detail: (id: string) => [...cmsQueryKeys.team.all, "detail", id] as const,
  },

  // Quote Requests (CRM)
  quotes: {
    all: ["cms", "quotes"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.quotes.all, "list", params] as const,
    detail: (id: string) => [...cmsQueryKeys.quotes.all, "detail", id] as const,
    stats: () => [...cmsQueryKeys.quotes.all, "stats"] as const,
  },

  // Inquiries (CRM)
  inquiries: {
    all: ["cms", "inquiries"] as const,
    list: (params?: ListParams) =>
      [...cmsQueryKeys.inquiries.all, "list", params] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.inquiries.all, "detail", id] as const,
    stats: () => [...cmsQueryKeys.inquiries.all, "stats"] as const,
  },

  // Media Library
  media: {
    all: ["cms", "media"] as const,
    list: (folder?: string) =>
      [...cmsQueryKeys.media.all, "list", folder] as const,
  },

  // Analytics
  analytics: {
    all: ["cms", "analytics"] as const,
    dashboard: () => [...cmsQueryKeys.analytics.all, "dashboard"] as const,
    pageViews: (params?: {
      pageType?: string;
      startDate?: string;
      endDate?: string;
    }) => [...cmsQueryKeys.analytics.all, "pageViews", params] as const,
  },

  // Site Settings
  settings: {
    all: ["cms", "settings"] as const,
    byKey: (key: string) => [...cmsQueryKeys.settings.all, key] as const,
  },

  // Event Types (admin management)
  eventTypes: {
    all: ["cms", "event-types"] as const,
    list: () => [...cmsQueryKeys.eventTypes.all, "list"] as const,
    detail: (id: string) =>
      [...cmsQueryKeys.eventTypes.all, "detail", id] as const,
  },

  // Tags (admin management)
  tags: {
    all: ["cms", "tags"] as const,
    list: () => [...cmsQueryKeys.tags.all, "list"] as const,
    detail: (id: string) => [...cmsQueryKeys.tags.all, "detail", id] as const,
  },
};
