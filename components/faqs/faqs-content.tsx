// components/faqs/faqs-content.tsx
import { FaqsClientView } from "./faqs-client-view";
import { adaptDbFaqsToFaqs } from "@/lib/utils/faq-adapter";
import { createClient } from "@/lib/supabase/server";

async function getFaqs() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("faqs")
      .select(
        `
        *,
        faq_categories(id, name, slug)
      `
      )
      .eq("is_active", true)
      .is("deleted_at", null)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch FAQs:", error);
      return [];
    }

    return adaptDbFaqsToFaqs(data || []);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("faq_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch FAQ categories:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching FAQ categories:", error);
    return [];
  }
}

export async function FaqsContent() {
  const [faqs, categories] = await Promise.all([getFaqs(), getCategories()]);

  return <FaqsClientView initialFaqs={faqs} categories={categories} />;
}
