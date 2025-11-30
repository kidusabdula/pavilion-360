export interface FAQ {
  id: string
  question: string
  answer: string
  category: "General" | "Rentals" | "Services" | "Pricing" | "Logistics"
}

export const faqs: FAQ[] = [
  {
    id: "faq001",
    question: "How far in advance should I book Pavilion360?",
    answer:
      "We recommend booking as early as possible, especially for peak wedding season (May-October) and major holidays. For full-service event planning, 6-12 months in advance is ideal. For rentals only, 4-8 weeks is typically sufficient, though popular items may book earlier.",
    category: "General",
  },
  {
    id: "faq002",
    question: "Do you travel outside of Indianapolis?",
    answer:
      "Yes! While Indianapolis is our home base, we regularly work on events throughout Indiana and the Midwest. Travel fees may apply for events outside our local service area. Contact us for a custom quote.",
    category: "General",
  },
  {
    id: "faq003",
    question: "What is your rental delivery and pickup process?",
    answer:
      "We deliver, set up, and retrieve all rental items. Delivery typically occurs the day before or morning of your event, and pickup happens the following day. Our team handles all the heavy lifting—you just enjoy your event!",
    category: "Rentals",
  },
  {
    id: "faq004",
    question: "Can I see rental items in person before booking?",
    answer:
      "We encourage you to visit our showroom to see furniture, bars, and other rental items. Schedule an appointment and our team will walk you through options that fit your vision and budget.",
    category: "Rentals",
  },
  {
    id: "faq005",
    question: "What happens if a rental item is damaged during my event?",
    answer:
      "Normal wear and tear is expected and included. However, clients are responsible for significant damage or loss. We recommend reviewing your event insurance or venue policy to ensure coverage. We'll provide a damage waiver option at booking.",
    category: "Rentals",
  },
  {
    id: "faq006",
    question: "What services are included in full-service event planning?",
    answer:
      "Our full-service planning includes venue sourcing, vendor coordination, design consultation, budget management, timeline creation, and day-of coordination. We customize each package to your specific needs and event type.",
    category: "Services",
  },
  {
    id: "faq007",
    question: "Do you provide event staff and crew?",
    answer:
      "Yes! We provide experienced technical crew, event coordinators, bartenders, and support staff as needed. All staff are insured, background-checked, and trained professionals.",
    category: "Services",
  },
  {
    id: "faq008",
    question: "Can you work with my existing vendors?",
    answer:
      "Of course! We love collaborating with other talented professionals. Whether you already have a caterer, photographer, or florist, we'll coordinate seamlessly to ensure everyone is on the same page.",
    category: "Services",
  },
  {
    id: "faq009",
    question: "How is pricing determined for custom events?",
    answer:
      "Pricing varies based on event type, guest count, services needed, and rental items. We provide detailed quotes after an initial consultation. Many services have package options, and we're happy to create custom bundles that fit your budget.",
    category: "Pricing",
  },
  {
    id: "faq010",
    question: "What payment methods do you accept?",
    answer:
      "We accept checks, credit cards, and ACH transfers. A deposit (typically 25-50%) is required to reserve your date, with the balance due 1-2 weeks before the event. Payment schedules vary by service type.",
    category: "Pricing",
  },
  {
    id: "faq011",
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary by service. For rentals, cancellations made 30+ days in advance receive a full refund minus a processing fee. For planning services, deposits are non-refundable but may be applied to a future event within 12 months. Contact us for specific policy details.",
    category: "Logistics",
  },
  {
    id: "faq012",
    question: "Do you provide certificates of insurance?",
    answer:
      "Yes! We carry comprehensive general liability and equipment insurance. We can provide certificates of insurance to venues or clients upon request, typically within 24-48 hours.",
    category: "Logistics",
  },
]
