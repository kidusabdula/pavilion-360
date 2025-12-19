// app/(cms)/cms/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Pavilion360 CMS Dashboard',
};

export default function CMSDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to Pavilion360 Content Management System
        </p>
      </div>
      
      {/* Placeholder Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Services', value: '9' },
          { label: 'Rentals', value: '65+' },
          { label: 'Portfolio', value: '5' },
          { label: 'Inquiries', value: '12' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Placeholder Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Getting Started</h2>
        <p className="mt-2 text-muted-foreground">
          Use the sidebar navigation to manage your content. Each section allows you to create, edit, and delete items.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Services:</strong> Manage your service offerings</li>
          <li>• <strong>Rentals:</strong> Manage rental equipment catalog</li>
          <li>• <strong>Portfolio:</strong> Showcase past projects</li>
          <li>• <strong>Blog:</strong> Write and publish articles</li>
          <li>• <strong>CRM:</strong> Handle quote requests and inquiries</li>
        </ul>
      </div>
    </div>
  );
}