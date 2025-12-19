// components/cms/layout/cms-shell.tsx
'use client';
import { CMSSidebar } from './cms-sidebar';
import { CMSHeader } from './cms-header';

interface CMSShellProps {
  children: React.ReactNode;
}

export function CMSShell({ children }: CMSShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[280px] border-r border-border lg:block">
        <CMSSidebar />
      </aside>
      
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:ml-[280px]">
        <CMSHeader />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}