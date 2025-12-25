// app/(cms)/cms/dashboard-content.tsx
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/cms/modules/dashboard/dashboard-client";

interface DashboardStats {
  services: {
    total: number;
    active: number;
  };
  rentals: {
    total: number;
    active: number;
    popular: number;
  };
  portfolio: {
    total: number;
    featured: number;
  };
  testimonials: {
    total: number;
    featured: number;
  };
  team: {
    total: number;
    active: number;
  };
  inquiries: {
    total: number;
    new: number;
    thisWeek: number;
  };
  quotes: {
    total: number;
    new: number;
    thisWeek: number;
  };
  blog: {
    total: number;
    published: number;
    drafts: number;
  };
}

interface RecentActivity {
  id: string;
  type: "inquiry" | "quote" | "view";
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();

  try {
    // Fetch all stats in parallel
    const [
      servicesData,
      rentalsData,
      portfolioData,
      testimonialsData,
      teamData,
      inquiriesData,
      quotesData,
      blogData,
    ] = await Promise.all([
      // Services
      supabase
        .from("services")
        .select("id, is_active", { count: "exact", head: true })
        .is("deleted_at", null),

      // Rentals
      supabase
        .from("rental_items")
        .select("id, is_active, is_popular", { count: "exact" })
        .is("deleted_at", null),

      // Portfolio
      supabase
        .from("portfolio_projects")
        .select("id, is_featured", { count: "exact" })
        .is("deleted_at", null),

      // Testimonials
      supabase
        .from("testimonials")
        .select("id, is_featured", { count: "exact" })
        .is("deleted_at", null),

      // Team
      supabase
        .from("team_members")
        .select("id, is_active", { count: "exact" })
        .is("deleted_at", null),

      // Inquiries
      supabase.from("inquiries").select("id, status, created_at", {
        count: "exact",
      }),

      // Quotes
      supabase.from("quote_requests").select("id, status, created_at", {
        count: "exact",
      }),

      // Blog
      supabase
        .from("blog_posts")
        .select("id, is_published", { count: "exact" })
        .is("deleted_at", null),
    ]);

    // Calculate stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return {
      services: {
        total: servicesData.count || 0,
        active:
          servicesData.data?.filter((s) => s.is_active).length ||
          servicesData.count ||
          0,
      },
      rentals: {
        total: rentalsData.count || 0,
        active: rentalsData.data?.filter((r) => r.is_active).length || 0,
        popular: rentalsData.data?.filter((r) => r.is_popular).length || 0,
      },
      portfolio: {
        total: portfolioData.count || 0,
        featured: portfolioData.data?.filter((p) => p.is_featured).length || 0,
      },
      testimonials: {
        total: testimonialsData.count || 0,
        featured:
          testimonialsData.data?.filter((t) => t.is_featured).length || 0,
      },
      team: {
        total: teamData.count || 0,
        active: teamData.data?.filter((t) => t.is_active).length || 0,
      },
      inquiries: {
        total: inquiriesData.count || 0,
        new: inquiriesData.data?.filter((i) => i.status === "new").length || 0,
        thisWeek:
          inquiriesData.data?.filter(
            (i) => new Date(i.created_at!) >= oneWeekAgo
          ).length || 0,
      },
      quotes: {
        total: quotesData.count || 0,
        new: quotesData.data?.filter((q) => q.status === "new").length || 0,
        thisWeek:
          quotesData.data?.filter((q) => new Date(q.created_at!) >= oneWeekAgo)
            .length || 0,
      },
      blog: {
        total: blogData.count || 0,
        published: blogData.data?.filter((b) => b.is_published).length || 0,
        drafts: blogData.data?.filter((b) => !b.is_published).length || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Return empty stats on error
    return {
      services: { total: 0, active: 0 },
      rentals: { total: 0, active: 0, popular: 0 },
      portfolio: { total: 0, featured: 0 },
      testimonials: { total: 0, featured: 0 },
      team: { total: 0, active: 0 },
      inquiries: { total: 0, new: 0, thisWeek: 0 },
      quotes: { total: 0, new: 0, thisWeek: 0 },
      blog: { total: 0, published: 0, drafts: 0 },
    };
  }
}

async function getRecentActivity(): Promise<RecentActivity[]> {
  const supabase = await createClient();
  const activities: RecentActivity[] = [];

  try {
    // Get recent inquiries
    const { data: inquiries } = await supabase
      .from("inquiries")
      .select("id, name, created_at, status")
      .order("created_at", { ascending: false })
      .limit(3);

    if (inquiries) {
      inquiries.forEach((inquiry) => {
        activities.push({
          id: inquiry.id,
          type: "inquiry",
          title: "New inquiry received",
          description: `From ${inquiry.name}`,
          timestamp: inquiry.created_at!,
          link: `/cms/inquiries/${inquiry.id}`,
        });
      });
    }

    // Get recent quotes
    const { data: quotes } = await supabase
      .from("quote_requests")
      .select("id, name, created_at, status")
      .order("created_at", { ascending: false })
      .limit(3);

    if (quotes) {
      quotes.forEach((quote) => {
        activities.push({
          id: quote.id,
          type: "quote",
          title: "New quote request",
          description: `From ${quote.name}`,
          timestamp: quote.created_at!,
          link: `/cms/quotes/${quote.id}`,
        });
      });
    }

    // Sort by timestamp and take top 5
    return activities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 5);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}

export async function DashboardContent() {
  const [stats, recentActivity] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
  ]);

  return <DashboardClient stats={stats} recentActivity={recentActivity} />;
}
