// app/(cms)/cms/page.tsx
"use client";
import { PageHeader } from "@/components/cms/shared/page-header";
import {
  Users,
  Briefcase,
  Package,
  Quote,
  Plus,
  ArrowUpRight,
  Eye,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Services",
    value: "12",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Active Rentals",
    value: "45",
    icon: Package,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Testimonials",
    value: "128",
    icon: Quote,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Team Members",
    value: "18",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const quickActions = [
  { title: "Add Service", href: "/cms/services/new", icon: Plus },
  { title: "New Rental", href: "/cms/rentals/new", icon: Plus },
  { title: "View Quotes", href: "/cms/quotes", icon: ShoppingCart },
  { title: "Messages", href: "/cms/inquiries", icon: MessageSquare },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening today."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${stat.bg} p-2.5 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto justify-between p-4 hover:border-primary/50"
              >
                <Link href={action.href}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-muted p-1">
                      <action.icon className="h-4 w-4" />
                    </div>
                    <span>{action.title}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Placeholder for Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="rounded-xl border border-border bg-card">
            <div className="flex flex-col">
              {[1, 2, 3, 4].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border p-4 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        New quote request received
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3 text-center">
              <Button variant="link" size="sm" asChild>
                <Link href="/cms/quotes">View all activity</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
