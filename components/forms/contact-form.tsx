// components/forms/contact-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuoteBasket } from "@/lib/context/quote-basket-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Mail,
  Phone,
  Calendar,
  Users,
  MapPin,
  AlertCircle,
} from "@/components/icons";
import { BUDGET_RANGES } from "@/lib/constants/company";

interface EventType {
  id: string;
  name: string;
  slug: string;
}

interface Service {
  id: string;
  name: string;
  slug: string;
}

interface ContactFormProps {
  eventTypes: EventType[];
  services: Service[];
}

export function ContactForm({ eventTypes, services }: ContactFormProps) {
  const { items: quoteItems, clearBasket } = useQuoteBasket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const hasQuoteItems = quoteItems.length > 0;

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    try {
      if (hasQuoteItems) {
        // Submit as quote request with rental items
        const quoteData = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: (formData.get("phone") as string) || null,
          company: (formData.get("company") as string) || null,
          event_type_id: (formData.get("eventType") as string) || null,
          event_date: (formData.get("eventDate") as string) || null,
          event_location: (formData.get("venue") as string) || null,
          guest_count: formData.get("guestCount")
            ? Number(formData.get("guestCount"))
            : null,
          items: quoteItems.map((item) => ({
            rental_item_id: item.id,
            quantity: 1, // Default to 1, could add quantity picker later
            name: item.name,
            thumbnail: item.thumbnail || null,
          })),
          message: (formData.get("message") as string) || null,
        };

        const res = await fetch("/api/public/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to submit quote request");
        }

        // Clear the quote basket on success
        clearBasket();
      } else {
        // Submit as general inquiry
        const inquiryData = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: (formData.get("phone") as string) || null,
          company: (formData.get("company") as string) || null,
          message: formData.get("message") as string,
          source: "contact_form",
        };

        const res = await fetch("/api/public/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiryData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to submit inquiry");
        }
      }

      setSubmitStatus("success");
      form.reset();
      setSelectedServices([]);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact Information */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-accent/10">
            <Mail className="h-4 w-4 text-accent" />
          </div>
          <h3 className="text-lg font-semibold">Contact Information</h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-accent">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="John Doe"
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Company Name"
              className="h-11 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-accent">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone {hasQuoteItems && <span className="text-accent">*</span>}
            </Label>
            <div className="relative">
              <Input
                id="phone"
                name="phone"
                type="tel"
                required={hasQuoteItems}
                placeholder="(317) 555-0123"
                className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Details - Only show if quote items present or for detailed inquiries */}
      {hasQuoteItems && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <Calendar className="h-4 w-4 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Event Details</h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-medium">
                Event Type
              </Label>
              <select
                id="eventType"
                name="eventType"
                className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              >
                <option value="">Select event type</option>
                {eventTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-sm font-medium">
                Event Date
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-sm font-medium">
                Venue / Location
              </Label>
              <div className="relative">
                <Input
                  id="venue"
                  name="venue"
                  placeholder="The Pavilion at Pan Am"
                  className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guestCount" className="text-sm font-medium">
                Guest Count
              </Label>
              <div className="relative">
                <Input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  placeholder="150"
                  className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetRange" className="text-sm font-medium">
              Budget Range
            </Label>
            <select
              id="budgetRange"
              name="budgetRange"
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="">Select budget range</option>
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Services Needed - Only show for quote requests */}
      {hasQuoteItems && services.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Services Needed</h3>
            {selectedServices.length > 0 && (
              <span className="text-xs text-accent">
                {selectedServices.length} selected
              </span>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.slice(0, 8).map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.01 }}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    isSelected
                      ? "border-accent/50 bg-accent/5"
                      : "border-border/50 hover:border-accent/30 hover:bg-muted/30"
                  }`}
                >
                  <Checkbox
                    id={service.id}
                    checked={isSelected}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                    className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                  />
                  <Label
                    htmlFor={service.id}
                    className="cursor-pointer font-normal text-sm leading-tight flex-1"
                  >
                    {service.name}
                  </Label>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quote Basket Items */}
      <AnimatePresence>
        {hasQuoteItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Rental Items in Quote
              <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                {quoteItems.length}
              </span>
            </h3>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <ul className="space-y-2">
                {quoteItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {item.sku}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={
            hasQuoteItems
              ? "Tell us about your event vision, specific requirements, or any questions you have..."
              : "How can we help you?"
          }
          rows={5}
          className="transition-all duration-200 focus:ring-2 focus:ring-accent/20 resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="space-y-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-12 px-8 text-base font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              />
              Submitting...
            </span>
          ) : hasQuoteItems ? (
            "Request Quote"
          ) : (
            "Send Message"
          )}
        </Button>

        <AnimatePresence mode="wait">
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <Check className="h-5 w-5 text-green-500" />
              <p className="text-sm text-green-600">
                {hasQuoteItems
                  ? "Thank you! Your quote request has been submitted. We'll be in touch within 24 hours."
                  : "Thank you for your message! We'll respond within 24 hours."}
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-sm text-destructive font-medium">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Or call us at (317) 456-9100
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
