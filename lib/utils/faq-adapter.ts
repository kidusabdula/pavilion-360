// lib/utils/faq-adapter.ts
export type FAQCategory =
  | "General"
  | "Rentals"
  | "Services"
  | "Pricing"
  | "Logistics";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

interface DbFaq {
  id: string;
  question: string;
  answer: string;
  display_order: number | null;
  faq_categories: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export function adaptDbFaqToFaq(dbFaq: DbFaq): FAQ {
  return {
    id: dbFaq.id,
    question: dbFaq.question,
    answer: dbFaq.answer,
    category: (dbFaq.faq_categories?.name || "General") as FAQCategory,
  };
}

export function adaptDbFaqsToFaqs(dbFaqs: DbFaq[]): FAQ[] {
  return dbFaqs.map(adaptDbFaqToFaq);
}
