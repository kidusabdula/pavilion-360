"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, FileText, HelpCircle, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/cms/shared/page-header";
import { RentalCategoriesTab } from "@/components/cms/modules/categories/rental-categories-tab";
import { BlogCategoriesTab } from "@/components/cms/modules/categories/blog-categories-tab";
import { FaqCategoriesTab } from "@/components/cms/modules/categories/faq-categories-tab";
import { cn } from "@/lib/utils/cn";

type TabValue = "rentals" | "blog" | "faqs";

interface TabConfig {
  value: TabValue;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const tabs: TabConfig[] = [
  {
    value: "rentals",
    label: "Rental Categories",
    icon: Package,
    description: "Manage rental item categories",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "blog",
    label: "Blog Categories",
    icon: FileText,
    description: "Organize blog post topics",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "faqs",
    label: "FAQ Categories",
    icon: HelpCircle,
    description: "Group frequently asked questions",
    color: "from-orange-500 to-red-500",
  },
];

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("rentals");

  const renderTabContent = () => {
    switch (activeTab) {
      case "rentals":
        return <RentalCategoriesTab />;
      case "blog":
        return <BlogCategoriesTab />;
      case "faqs":
        return <FaqCategoriesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage categories for rentals, blog posts, and FAQs"
        breadcrumbs={[{ label: "Categories" }]}
      />

      {/* Enhanced Tab Navigation */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "relative p-6 text-left transition-all duration-300 group",
                  "border-r border-border last:border-r-0",
                  "hover:bg-muted/50",
                  isActive ? "bg-muted/30" : "bg-transparent"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                {/* Top Border Accent */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBorder"
                    className={cn(
                      "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                      tab.color
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300",
                      isActive
                        ? `bg-gradient-to-br ${tab.color} text-white shadow-lg`
                        : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-6 w-6 transition-transform duration-300",
                        isActive && "scale-110"
                      )}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={cn(
                          "font-semibold transition-colors duration-300",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {tab.label}
                      </h3>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-all duration-300",
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                        )}
                      />
                    </div>
                    <p
                      className={cn(
                        "text-sm mt-1 transition-colors duration-300",
                        isActive
                          ? "text-muted-foreground"
                          : "text-muted-foreground/70"
                      )}
                    >
                      {tab.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-5",
                    tab.color
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Animated Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
