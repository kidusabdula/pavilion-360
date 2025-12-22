// lib/constants/navigation.ts
// CMS Navigation configuration
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FolderOpen,
  Building2,
  Users,
  Quote,
  HelpCircle,
  FileText,
  MessageSquare,
  ShoppingCart,
  Image as ImageIcon,
  Settings,
  Tags,
  CalendarDays,
  FolderTree,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const cmsNavigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/cms",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "Services",
        href: "/cms/services",
        icon: Briefcase,
      },
      {
        title: "Rentals",
        href: "/cms/rentals",
        icon: Package,
      },
      {
        title: "Portfolio",
        href: "/cms/portfolio",
        icon: FolderOpen,
      },
      {
        title: "Venues",
        href: "/cms/venues",
        icon: Building2,
      },
      {
        title: "Blog",
        href: "/cms/blog",
        icon: FileText,
      },
    ],
  },
  {
    title: "People & Feedback",
    items: [
      {
        title: "Team",
        href: "/cms/team-members",
        icon: Users,
      },
      {
        title: "Testimonials",
        href: "/cms/testimonials",
        icon: Quote,
      },
      {
        title: "FAQs",
        href: "/cms/faqs",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "CRM",
    items: [
      {
        title: "Quote Requests",
        href: "/cms/quotes",
        icon: ShoppingCart,
      },
      {
        title: "Inquiries",
        href: "/cms/inquiries",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Media Library",
        href: "/cms/media",
        icon: ImageIcon,
      },
      {
        title: "Event Types",
        href: "/cms/event-types",
        icon: CalendarDays,
      },
      {
        title: "Tags",
        href: "/cms/tags",
        icon: Tags,
      },
      {
        title: "Categories",
        href: "/cms/categories",
        icon: FolderTree,
      },
      {
        title: "Settings",
        href: "/cms/settings",
        icon: Settings,
      },
    ],
  },
];
