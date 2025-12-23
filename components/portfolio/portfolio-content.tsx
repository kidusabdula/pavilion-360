// components/portfolio/portfolio-content.tsx
import { PortfolioClientView } from './portfolio-client-view';
import { adaptDbProjectsToProjects } from '@/lib/utils/portfolio-adapter';

async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/portfolio`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Failed to fetch portfolio projects');
    return [];
  }
  
  const { data } = await res.json();
  return adaptDbProjectsToProjects(data || []);
}

async function getEventTypes() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/event-types`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export async function PortfolioContent() {
  const [projects, eventTypes] = await Promise.all([
    getProjects(),
    getEventTypes(),
  ]);
  
  // Filter to event types that actually have projects
  const usedEventTypes = new Set(projects.map(p => p.eventType));
  const relevantEventTypes = eventTypes.filter((et: any) =>
    usedEventTypes.has(et.name)
  );
  
  return (
    <PortfolioClientView
      initialProjects={projects}
      eventTypes={relevantEventTypes}
    />
  );
}