// components/cms/layout/cms-sidebar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { cmsNavigation } from "@/lib/constants/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

interface CMSSidebarProps {
  onNavigate?: () => void;
}

export function CMSSidebar({ onNavigate }: CMSSidebarProps) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isActive = (href: string) => {
    if (href === "/cms") {
      return pathname === "/cms";
    }
    return pathname.startsWith(href);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.user_metadata?.full_name || user.email || "";
    if (user.user_metadata?.full_name) {
      return name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-screen max-h-screen flex-col overflow-hidden bg-card">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-6">
        <Image
          src="/logo.png"
          alt="Pavilion360"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Pavilion360</span>
          <span className="text-xs text-muted-foreground">CMS</span>
        </div>
      </div>

      {/* Navigation - with proper overflow handling */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <nav className="space-y-6 px-3 py-4">
            {cmsNavigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          active
                            ? "bg-accent text-accent-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute inset-0 rounded-lg bg-accent"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          />
                        )}
                        <item.icon
                          className={cn(
                            "relative z-10 h-5 w-5 shrink-0 transition-colors",
                            active
                              ? "text-accent-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="relative z-10">{item.title}</span>
                        {item.badge && (
                          <span className="relative z-10 ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Footer - User Info */}
      <div className="shrink-0 border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
          {loading ? (
            <div className="flex h-8 w-8 items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-sm">
              <span className="text-xs font-semibold text-accent">
                {getUserInitials()}
              </span>
            </div>
          )}
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium">
              {user?.user_metadata?.full_name || "Admin"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email || "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
