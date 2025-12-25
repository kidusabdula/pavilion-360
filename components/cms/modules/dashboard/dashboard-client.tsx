// app/(cms)/cms/dashboard-client.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Package,
  FolderKanban,
  Quote,
  Users,
  MessageSquare,
  ShoppingCart,
  FileText,
  Plus,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DashboardStats {
  services: { total: number; active: number };
  rentals: { total: number; active: number; popular: number };
  portfolio: { total: number; featured: number };
  testimonials: { total: number; featured: number };
  team: { total: number; active: number };
  inquiries: { total: number; new: number; thisWeek: number };
  quotes: { total: number; new: number; thisWeek: number };
  blog: { total: number; published: number; drafts: number };
}

interface RecentActivity {
  id: string;
  type: "inquiry" | "quote" | "view";
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

interface DashboardClientProps {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
}

export function DashboardClient({
  stats,
  recentActivity,
}: DashboardClientProps) {
  const statCards = [
    {
      label: "Services",
      value: stats.services.total.toString(),
      subtitle: `${stats.services.active} active`,
      icon: Briefcase,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      href: "/cms/services",
    },
    {
      label: "Rental Items",
      value: stats.rentals.total.toString(),
      subtitle: `${stats.rentals.popular} popular`,
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      href: "/cms/rentals",
    },
    {
      label: "Portfolio",
      value: stats.portfolio.total.toString(),
      subtitle: `${stats.portfolio.featured} featured`,
      icon: FolderKanban,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      href: "/cms/portfolio",
    },
    {
      label: "Testimonials",
      value: stats.testimonials.total.toString(),
      subtitle: `${stats.testimonials.featured} featured`,
      icon: Quote,
      color: "text-green-500",
      bg: "bg-green-500/10",
      href: "/cms/testimonials",
    },
  ];

  const activityCards = [
    {
      label: "New Inquiries",
      value: stats.inquiries.new.toString(),
      subtitle: `${stats.inquiries.thisWeek} this week`,
      icon: MessageSquare,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
      href: "/cms/inquiries",
      alert: stats.inquiries.new > 0,
    },
    {
      label: "Quote Requests",
      value: stats.quotes.new.toString(),
      subtitle: `${stats.quotes.thisWeek} this week`,
      icon: ShoppingCart,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      href: "/cms/quotes",
      alert: stats.quotes.new > 0,
    },
    {
      label: "Blog Posts",
      value: stats.blog.published.toString(),
      subtitle: `${stats.blog.drafts} drafts`,
      icon: FileText,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      href: "/cms/blog",
    },
    {
      label: "Team Members",
      value: stats.team.total.toString(),
      subtitle: `${stats.team.active} active`,
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      href: "/cms/team",
    },
  ];

  const quickActions = [
    { title: "New Service", href: "/cms/services/new", icon: Briefcase },
    { title: "New Rental", href: "/cms/rentals/new", icon: Package },
    { title: "New Blog Post", href: "/cms/blog/new", icon: FileText },
    { title: "New Portfolio", href: "/cms/portfolio/new", icon: FolderKanban },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inquiry":
        return MessageSquare;
      case "quote":
        return ShoppingCart;
      default:
        return AlertCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "inquiry":
        return "bg-cyan-500/10 text-cyan-500";
      case "quote":
        return "bg-yellow-500/10 text-yellow-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Alerts Section */}
      {(stats.inquiries.new > 0 || stats.quotes.new > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">Action Required</h3>
              <p className="text-sm text-muted-foreground">
                You have{" "}
                {stats.inquiries.new > 0 && (
                  <Link
                    href="/cms/inquiries"
                    className="text-yellow-600 hover:underline font-medium"
                  >
                    {stats.inquiries.new} new{" "}
                    {stats.inquiries.new === 1 ? "inquiry" : "inquiries"}
                  </Link>
                )}
                {stats.inquiries.new > 0 && stats.quotes.new > 0 && " and "}
                {stats.quotes.new > 0 && (
                  <Link
                    href="/cms/quotes"
                    className="text-yellow-600 hover:underline font-medium"
                  >
                    {stats.quotes.new} new quote{" "}
                    {stats.quotes.new === 1 ? "request" : "requests"}
                  </Link>
                )}{" "}
                waiting for review.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Stats */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Content Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={stat.href}
                className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-lg ${stat.bg} p-2.5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity & Requests */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Activity & Requests
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activityCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            >
              <Link
                href={stat.href}
                className="block rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 group relative"
              >
                {stat.alert && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                )}
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-lg ${stat.bg} p-2.5 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto justify-start p-4 hover:border-primary/50 hover:bg-accent/50"
              >
                <Link href={action.href}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="rounded-full bg-primary/10 p-2">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="flex-1 text-left">{action.title}</span>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Activity
          </h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {recentActivity.length > 0 ? (
              <>
                <div className="flex flex-col">
                  {recentActivity.map((activity, i) => {
                    const Icon = getActivityIcon(activity.type);
                    const colorClass = getActivityColor(activity.type);

                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between border-b border-border p-4 last:border-0 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {activity.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(
                                new Date(activity.timestamp),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        {activity.link && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={activity.link}>View</Link>
                          </Button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="border-t border-border p-3 text-center bg-muted/30">
                  <Button variant="link" size="sm" asChild>
                    <Link href="/cms/inquiries">View all activity</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full bg-muted p-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">No recent activity</p>
                    <p className="text-sm text-muted-foreground">
                      Activity will appear here as it happens
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
