"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faqs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, HelpCircle } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Get unique categories from FAQs
const categories = [
  "All",
  "General",
  "Rentals",
  "Services",
  "Pricing",
  "Logistics",
] as const;
type FAQCategory = (typeof categories)[number];

export default function FaqsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("All");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Category filter
      if (activeCategory !== "All" && faq.category !== activeCategory) {
        return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  const hasFilters = searchQuery || activeCategory !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <div className="flex flex-col">
      <HeroSection
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services and process."
        backgroundImage="/event-planning-consultation.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 pr-11 h-12 text-base rounded-xl border-border/50 focus:border-accent transition-all bg-card"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "border border-border/50 bg-card/50 text-muted-foreground hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </motion.button>
                );
              })}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/30">
              <span className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredFaqs.length}
                </span>{" "}
                {filteredFaqs.length === 1 ? "question" : "questions"}
              </span>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-accent h-7"
                >
                  Clear filters
                </Button>
              )}
            </div>

            {/* FAQs Accordion */}
            <AnimatePresence mode="wait">
              {filteredFaqs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <HelpCircle className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No questions found
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Try adjusting your search or filter.
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Clear filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Accordion type="single" collapsible className="space-y-3">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <AccordionItem
                          value={faq.id}
                          className="rounded-xl border border-border/50 bg-gradient-to-b from-card to-card/80 px-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 data-[state=open]:border-accent/50"
                        >
                          <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 group">
                            <div className="flex items-start gap-3">
                              <span className="text-accent mt-0.5">Q:</span>
                              <span className="group-hover:text-accent transition-colors">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="leading-relaxed text-muted-foreground pb-5">
                            <div className="flex items-start gap-3 pl-0">
                              <span className="text-accent/60">A:</span>
                              <span>{faq.answer}</span>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    ))}
                  </Accordion>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-border/30 text-center"
            >
              <h3 className="text-lg font-semibold mb-3">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're here to help. Contact our team for personalized
                assistance.
              </p>
              <Button asChild className="rounded-xl">
                <a href="/contact">Contact Us</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
