// components/layout/layout-wrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { QuoteBasketProvider } from "@/lib/context/quote-basket-context";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();

  // Check if current route is CMS
  const isCMSRoute = pathname.startsWith("/cms");

  // CMS routes get their own layout - no header/footer
  if (isCMSRoute) {
    return <>{children}</>;
  }

  // Public routes get the full site layout
  return (
    <QuoteBasketProvider>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <SiteFooter />
    </QuoteBasketProvider>
  );
}
