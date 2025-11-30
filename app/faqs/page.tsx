import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/lib/data/faqs"

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about Pavilion360's event services and rentals.",
}

export default function FaqsPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services and process."
        backgroundImage="/placeholder.svg?height=500&width=1920"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="rounded-lg border border-border bg-card px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
