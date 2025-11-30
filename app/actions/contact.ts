"use server"

import type { ContactFormData } from "@/lib/types/forms"

export async function submitContactForm(data: ContactFormData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Console.log stub for now - replace with email service later
  console.log("[v0] Contact Form Submission:")
  console.log("[v0] ===========================")
  console.log("[v0] Name:", data.name)
  console.log("[v0] Company:", data.company || "N/A")
  console.log("[v0] Email:", data.email)
  console.log("[v0] Phone:", data.phone)
  console.log("[v0] Event Type:", data.eventType)
  console.log("[v0] Event Date:", data.eventDate || "N/A")
  console.log("[v0] Venue:", data.venue || "N/A")
  console.log("[v0] Guest Count:", data.guestCount || "N/A")
  console.log("[v0] Budget Range:", data.budgetRange || "N/A")
  console.log("[v0] Services Needed:", data.servicesNeeded.join(", ") || "None")
  console.log("[v0] Rental Items:", data.rentalItems?.join(", ") || "None")
  console.log("[v0] Message:", data.message)
  console.log("[v0] ===========================")

  // Simulate successful submission
  return { success: true }
}
