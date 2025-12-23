// components/faqs/faqs-content.tsx
import { FaqsClientView } from './faqs-client-view';
import { adaptDbFaqsToFaqs } from '@/lib/utils/faq-adapter';

async function getFaqs() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/faqs`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    console.error('Failed to fetch FAQs');
    return [];
  }
  
  const { data } = await res.json();
  return adaptDbFaqsToFaqs(data || []);
}

async function getCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/public/faq-categories`, {
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) return [];
  const { data } = await res.json();
  return data || [];
}

export async function FaqsContent() {
  const [faqs, categories] = await Promise.all([
    getFaqs(),
    getCategories(),
  ]);
  
  return (
    <FaqsClientView
      initialFaqs={faqs}
      categories={categories}
    />
  );
}