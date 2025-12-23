// components/contact/contact-content.tsx
import { ContactForm } from "@/components/forms/contact-form";

async function getEventTypes() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/public/event-types`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

async function getServices() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/public/services`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const { data } = await res.json();
    return data || [];
  } catch {
    return [];
  }
}

export async function ContactContent() {
  const [eventTypes, services] = await Promise.all([
    getEventTypes(),
    getServices(),
  ]);

  return <ContactForm eventTypes={eventTypes} services={services} />;
}
