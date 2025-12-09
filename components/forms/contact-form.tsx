"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/lib/data/services";
import type { ContactFormData, BudgetRange } from "@/lib/types/forms";
import type { EventType } from "@/lib/types/rentals";
import { useQuoteBasket } from "@/lib/context/quote-basket-context";
import { submitContactForm } from "@/app/actions/contact";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Mail,
  Phone,
  Calendar,
  Users,
  MapPin,
} from "@/components/icons";

const eventTypes: EventType[] = [
  "Corporate",
  "Wedding",
  "Gala",
  "Festival",
  "Concert",
  "Social",
];
const budgetRanges: BudgetRange[] = [
  "Under $5k",
  "$5k-$10k",
  "$10k-$25k",
  "$25k-$50k",
  "$50k-$100k",
  "Over $100k",
];

export function ContactForm() {
  const { items: quoteItems } = useQuoteBasket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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

    const formData = new FormData(e.currentTarget);

    const data: ContactFormData = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventType: formData.get("eventType") as EventType,
      eventDate: formData.get("eventDate") as string,
      venue: formData.get("venue") as string,
      guestCount: formData.get("guestCount")
        ? Number(formData.get("guestCount"))
        : undefined,
      budgetRange: formData.get("budgetRange") as BudgetRange,
      servicesNeeded: selectedServices,
      message: formData.get("message") as string,
      rentalItems: quoteItems.map((item) => item.id),
    };

    try {
      await submitContactForm(data);
      setSubmitStatus("success");
      // Reset form
      e.currentTarget.reset();
      setSelectedServices([]);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
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
              Phone <span className="text-accent">*</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(317) 555-0123"
                className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-accent/20"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
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
              Event Type <span className="text-accent">*</span>
            </Label>
            <select
              id="eventType"
              name="eventType"
              required
              className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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
              Venue
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
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Needed */}
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
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent/50 bg-accent/5"
                    : "border-border/50 hover:border-accent/30 hover:bg-muted/30"
                }`}
                onClick={() => handleServiceToggle(service.id)}
              >
                <Checkbox
                  id={service.id}
                  checked={isSelected}
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

      {/* Quote Basket Items */}
      <AnimatePresence>
        {quoteItems.length > 0 && (
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
          placeholder="Tell us about your event vision, specific requirements, or any questions you have..."
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
          ) : (
            "Request Quote"
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
                Thank you! Your quote request has been submitted. We'll be in
                touch within 24 hours.
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <p className="text-sm text-destructive">
                Something went wrong. Please try again or call us at (317)
                456-9100.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
