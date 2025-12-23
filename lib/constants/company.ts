// lib/constants/company.ts
// Company information - Update here when details change

export const COMPANY_INFO = {
  name: "Pavilion360",
  legalName: "Pavilion360 Event Production",
  tagline: "Elevating Events. Creating Experiences.",

  // Contact
  phone: "(317) 456-9100",
  phoneRaw: "+13174569100", // For tel: links
  email: "info@pavilion360.com",

  // Address
  address: {
    street: "6002 Corporate Drive",
    city: "Indianapolis",
    state: "IN",
    zip: "46278",
    full: "6002 Corporate Drive, Indianapolis, IN 46278",
  },

  // Links
  googleMapsUrl: "https://maps.app.goo.gl/CuwLzeA4ywMx98an9",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.759841566882!2d-86.2714!3d39.8904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b5744ba1e4f09%3A0x9a0d6c7c6e8b0d9f!2s6002%20Corporate%20Dr%2C%20Indianapolis%2C%20IN%2046278!5e0!3m2!1sen!2sus!4v1702149600000!5m2!1sen!2sus",

  // Business Hours
  hours: {
    weekdays: { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    saturday: { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
    sunday: { days: "Sunday", hours: "By Appointment" },
  },

  // Response time
  responseTime: "24 hours",

  // Social (for future use)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  },
} as const;

// Budget ranges (for contact form)
export const BUDGET_RANGES = [
  "Under $5k",
  "$5k-$10k",
  "$10k-$25k",
  "$25k-$50k",
  "$50k-$100k",
  "Over $100k",
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number];
