export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company?: string
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    id: "test001",
    quote:
      "Pavilion360 exceeded our expectations in every way. Their team was professional, creative, and made our corporate event truly memorable.",
    author: "Michael Chen",
    role: "Director of Marketing",
    company: "Salesforce",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "test002",
    quote:
      "From planning to execution, Pavilion360 made our wedding day absolutely perfect. We couldn't have asked for a better partner.",
    author: "Sarah & David Martinez",
    role: "Newlyweds",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "test003",
    quote:
      "The technical expertise and attention to detail from Pavilion360 helped us raise record funds at our annual gala. Highly recommend!",
    author: "Rebecca Thompson",
    role: "Executive Director",
    company: "United Way of Central Indiana",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "test004",
    quote:
      "Working with Pavilion360 felt like having an extension of our own team. They understood our vision and brought it to life flawlessly.",
    author: "James Rodriguez",
    role: "Event Manager",
    company: "Indiana Convention Center",
    image: "/placeholder.svg?height=80&width=80",
  },
]
