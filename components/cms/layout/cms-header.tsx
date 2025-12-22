"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  LogOut,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CMSSidebar } from "./cms-sidebar";
import { CMSBreadcrumb } from "./cms-breadcrumb";
import { useAuth } from "@/hooks/use-auth";

export function CMSHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/60 lg:px-6">
      {/* Mobile Menu Button */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <CMSSidebar onNavigate={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <div className="hidden flex-1 lg:block">
        <CMSBreadcrumb />
      </div>

      {/* Mobile Title */}
      <div className="flex-1 lg:hidden">
        <span className="text-sm font-semibold">Pavilion360 CMS</span>
      </div>

      {/* Search */}
      <div className="hidden w-full max-w-sm lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-lg bg-muted/50 pl-9 focus:bg-background"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* View Site */}
        <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">View site</span>
          </Link>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-full border-0 hover:bg-accent/50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                  <span className="text-xs font-semibold text-primary-foreground">
                    {getUserInitials()}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">
                  {user?.user_metadata?.full_name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || "Loading..."}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/cms/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" target="_blank" className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-red-500 focus:text-red-500"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
