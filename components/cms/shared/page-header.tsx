// components/cms/shared/page-header.tsx
'use client';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="space-y-1">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
              href="/cms"
              className="transition-colors hover:text-foreground"
            >
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground/50" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        )}
        
        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        
        {/* Description */}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      
      {/* Actions */}
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </motion.div>
  );
}