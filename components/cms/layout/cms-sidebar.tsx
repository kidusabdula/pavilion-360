// components/cms/layout/cms-sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { cmsNavigation } from '@/lib/constants/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

interface CMSSidebarProps {
  onNavigate?: () => void;
}

export function CMSSidebar({ onNavigate }: CMSSidebarProps) {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/cms') {
      return pathname === '/cms';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
          <span className="text-sm font-bold text-accent-foreground">P</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Pavilion360</span>
          <span className="text-xs text-muted-foreground">CMS</span>
        </div>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-6 px-3">
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
                        'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                        active
                          ? 'bg-accent text-accent-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-lg bg-accent"
                          initial={false}
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                      <item.icon
                        className={cn(
                          'relative z-10 h-5 w-5 shrink-0 transition-colors',
                          active ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'
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
      
      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
            <span className="text-xs font-semibold text-accent">A</span>
          </div>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium">Admin</p>
            <p className="truncate text-xs text-muted-foreground">admin@pavilion360.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}