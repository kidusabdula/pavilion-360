"use client";
import { usePathname } from "next/navigation";
import { CMSShell } from "@/components/cms/layout";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap login page in CMS shell
  if (pathname === "/cms/login") {
    return <>{children}</>;
  }

  return <CMSShell>{children}</CMSShell>;
}
