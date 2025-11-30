"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { services } from "@/lib/data/services"
import type { ContactFormData, BudgetRange } from "@/lib/types/forms"
import type { EventType } from "@/lib/types/rentals"
import { useQuoteBasket } from "@/lib/context/quote-basket-context"
import { submitContactForm } from "@/app/actions/contact"

const eventTypes: EventType[] = ["Corporate", "Wedding", "Gala", "Festival", "Nonprofit", "Social"]
const budgetRanges: BudgetRange[] = ["Under $5k", "$5k-$10k", "$10k-$25k", "$25k-$50k", "$50k-$100k", "Over $100k"]

export function ContactForm() {
  const { items: quoteItems } = useQuoteBasket()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const formData = new FormData(e.currentTarget)

    const data: ContactFormData = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      eventType: formData.get("eventType") as EventType,
      eventDate: formData.get("eventDate") as string,
      venue: formData.get("venue") as string,
      guestCount: formData.get("guestCount") ? Number(formData.get("guestCount")) : undefined,
      budgetRange: formData.get("budgetRange") as BudgetRange,
      servicesNeeded: selectedServices,
      message: formData.get("message") as string,
      rentalItems: quoteItems.map((item) => item.id),
    }

    try {
      await submitContactForm(data)
      setSubmitStatus("success")
      // Reset form
      e.currentTarget.reset()
      setSelectedServices([])
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input id="name" name="name" required placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" name="company" placeholder="Company Name" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input id="email" name="email" type="email" required placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input id="phone" name="phone" type="tel" required placeholder="(317) 555-0123" />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Event Details</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="eventType">
              Event Type <span className="text-destructive">*</span>
            </Label>
            <select
              id="eventType"
              name="eventType"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            <Label htmlFor="eventDate">Event Date</Label>
            <Input id="eventDate" name="eventDate" type="date" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" name="venue" placeholder="The Pavilion at Pan Am" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestCount">Guest Count</Label>
            <Input id="guestCount" name="guestCount" type="number" placeholder="150" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget Range</Label>
          <select
            id="budgetRange"
            name="budgetRange"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        <h3 className="text-lg font-semibold">Services Needed</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="flex items-start space-x-2">
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <Label htmlFor={service.id} className="cursor-pointer font-normal leading-tight">
                {service.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Basket Items */}
      {quoteItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Rental Items in Quote</h3>
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <ul className="space-y-2">
              {quoteItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.sku}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea id="message" name="message" required placeholder="Tell us about your event vision..." rows={5} />
      </div>

      {/* Submit Button */}
      <div className="space-y-4">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Submitting..." : "Request Quote"}
        </Button>

        {submitStatus === "success" && (
          <p className="text-sm text-green-600">
            Thank you! Your quote request has been submitted. We'll be in touch soon.
          </p>
        )}

        {submitStatus === "error" && (
          <p className="text-sm text-destructive">
            Something went wrong. Please try again or call us at (317) 602-5050.
          </p>
        )}
      </div>
    </form>
  )
}
