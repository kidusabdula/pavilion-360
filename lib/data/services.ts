import type { Service } from "@/lib/types/services"

export const services: Service[] = [
  {
    id: "svc001",
    name: "Venue and Event Management",
    slug: "venue-event-management",
    tagline: "Comprehensive Event Solutions",
    description:
      "From live events to virtual experiences, we provide full-service event management with safety planning, talent acquisition, and operations expertise.",
    icon: "calendar",
    whatWeDo: [
      "Live Events",
      "Virtual Events",
      "Hybrid Events & Live-stream Broadcasting",
      "Safety and Emergency Planning Operations",
      "Keynote Speaker Acquisition & Production",
      "Entertainment Talent Acquisition & Production",
      "Digital Marketing Campaigns",
      "Trade Show Planning",
      "Permanent Structure Management",
      "Ticketing Operations",
      "Event and Venue Traffic and Parking Planning",
    ],
    useCases: [
      {
        title: "Multi-Day Conferences",
        description:
          "Complete event management including keynote coordination, breakout sessions, and hybrid streaming capabilities.",
        image: "/conference-hall-keynote-presentation.jpg",
      },
      {
        title: "Music Festivals",
        description:
          "Full festival production with ticketing, traffic planning, safety operations, and talent management.",
        image: "/outdoor-music-festival-stage-crowd.jpg",
      },
      {
        title: "Corporate Events",
        description: "Live and virtual event production for product launches, town halls, and company gatherings.",
        image: "/corporate-event-presentation-stage.jpg",
      },
    ],
    process: [
      {
        step: 1,
        title: "Event Strategy",
        description:
          "We develop a comprehensive event plan tailored to your goals, audience, and format (live, virtual, or hybrid).",
      },
      {
        step: 2,
        title: "Talent & Logistics",
        description:
          "Secure keynote speakers, entertainment, and manage all operational logistics including ticketing and parking.",
      },
      {
        step: 3,
        title: "Safety Planning",
        description: "Implement safety protocols, emergency planning, and crowd management strategies.",
      },
      {
        step: 4,
        title: "Execution & Operations",
        description: "Manage all aspects of event day operations with our experienced production team.",
      },
    ],
    gallery: ["/event-management-team-coordination.jpg", "/trade-show-floor-management.jpg", "/virtual-event-broadcast-setup.jpg"],
    relatedServices: ["svc002", "svc003", "svc004"],
  },
  {
    id: "svc002",
    name: "Media and Creative Services",
    slug: "media-creative-services",
    tagline: "Visionary Design & Digital Excellence",
    description:
      "Full-service creative team offering 3D modeling, motion graphics, brand messaging, and digital marketing for unforgettable event experiences.",
    icon: "palette",
    whatWeDo: [
      "Creative Team Management",
      "Marketing Communications & Brand Messaging",
      "Motion Graphics",
      "3D Modeling, Animation & Renderings",
      "Trade Show Exhibit Design & Development",
      "Event Game-ification & Game Design",
      "Website & Mobile App Development",
      "Social Media Content Curation",
      "Sponsorship Activation Plan",
      "Audience Acquisition Strategy",
      "User Experience Design & Journey",
      "Marketing Executive Planning & Management",
    ],
    useCases: [
      {
        title: "Brand Activations",
        description:
          "Immersive brand experiences with custom 3D renderings, interactive games, and social media integration.",
        image: "/brand-activation-3d-display.jpg",
      },
      {
        title: "Trade Show Exhibits",
        description: "Eye-catching booth design with motion graphics, interactive displays, and sponsor activation.",
        image: "/modern-trade-show-booth-design.jpg",
      },
      {
        title: "Digital Campaigns",
        description:
          "End-to-end digital marketing including websites, apps, social content, and audience acquisition strategies.",
        image: "/digital-marketing-campaign-graphics.jpg",
      },
    ],
    process: [
      {
        step: 1,
        title: "Creative Discovery",
        description:
          "Understand your brand, messaging goals, and target audience through comprehensive creative briefing.",
      },
      {
        step: 2,
        title: "Concept Development",
        description: "Develop 3D renderings, motion graphics, and UX designs with mood boards and mockups.",
      },
      {
        step: 3,
        title: "Content Production",
        description: "Create all digital assets including animations, social content, and interactive experiences.",
      },
      {
        step: 4,
        title: "Campaign Execution",
        description: "Launch and manage digital campaigns with real-time optimization and analytics.",
      },
    ],
    gallery: ["/motion-graphics-animation-production.jpg", "/3d-modeling-event-rendering.jpg", "/social-media-content-design.jpg"],
    relatedServices: ["svc001", "svc003"],
  },
  {
    id: "svc003",
    name: "Audio Visual and Rentals",
    slug: "audio-visual-rentals",
    tagline: "World-Class Production Technology",
    description:
      "State-of-the-art audio, video, lighting systems with staging, trussing, and event furniture rentals for spectacular productions.",
    icon: "speaker",
    whatWeDo: [
      "World-Class Audio, Video, and Lighting Systems",
      "Staging",
      "Video Production",
      "Projection-Mapping",
      "Animation Production",
      "Truss",
      "Live Event Design",
      "Virtual Reality Production",
      "Touch Experiences for Monitors, Walls and Tables",
      "Hologram Content Creation",
      "Event Furniture and Decor Rentals",
    ],
    useCases: [
      {
        title: "Concert Productions",
        description:
          "Full production with professional audio systems, intelligent lighting, video walls, and staging infrastructure.",
        image: "/concert-stage-lighting-production.jpg",
      },
      {
        title: "Projection Mapping",
        description:
          "Stunning architectural projection mapping with animation and hologram content for immersive experiences.",
        image: "/building-projection-mapping-show.jpg",
      },
      {
        title: "VR Experiences",
        description:
          "Virtual reality production with touch-screen walls, interactive displays, and cutting-edge technology.",
        image: "/virtual-reality-interactive-display.jpg",
      },
    ],
    process: [
      {
        step: 1,
        title: "Technical Design",
        description: "Our engineers design custom AV systems with staging, truss rigging, and video integration plans.",
      },
      {
        step: 2,
        title: "Equipment Selection",
        description: "Choose from our world-class inventory of audio, video, lighting, and event furniture rentals.",
      },
      {
        step: 3,
        title: "Installation & Programming",
        description: "Professional installation with system programming, projection mapping, and content creation.",
      },
      {
        step: 4,
        title: "Live Operation",
        description: "Experienced technicians operate all systems throughout your event with real-time support.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc001", "svc004"],
  },
  {
    id: "svc004",
    name: "Food and Beverage",
    slug: "food-beverage",
    tagline: "Culinary Excellence for Every Event",
    description:
      "Full-service bar operations, custom food menus, and flexible serving options tailored to your event's traffic flow and style.",
    icon: "utensils",
    whatWeDo: [
      "Concessions",
      "Full Service Bar Operations",
      "Custom Food Menus",
      "Plated, Passed and Buffet Style Serving Structures",
      "Custom food and beverage programs for your attendance that best accommodates the traffic flow throughout your show",
    ],
    useCases: [
      {
        title: "Festival Concessions",
        description: "High-volume food and beverage operations with multiple concession stands and bar stations.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Corporate Catering",
        description: "Plated dinners, passed hors d'oeuvres, and buffet stations for conferences and galas.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Full Service Bars",
        description: "Professional bartenders with craft cocktail menus, beer, wine, and premium spirits service.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Menu Planning",
        description: "Design custom food and beverage menus that match your event style and guest preferences.",
      },
      {
        step: 2,
        title: "Traffic Flow Design",
        description: "Create service structures that optimize guest flow and minimize wait times.",
      },
      {
        step: 3,
        title: "Staff & Setup",
        description: "Professional bartenders and service staff arrive early for complete setup and prep.",
      },
      {
        step: 4,
        title: "Service & Operations",
        description: "Execute seamless food and beverage service with experienced hospitality professionals.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc001", "svc003"],
  },
  {
    id: "svc005",
    name: "Event Planning & Management",
    slug: "event-planning-management",
    tagline: "From Vision to Reality",
    description:
      "Comprehensive event planning services that transform your ideas into flawlessly executed experiences.",
    icon: "calendar",
    whatWeDo: [
      "Full-service event design and conceptualization",
      "Vendor coordination and management",
      "Timeline development and execution",
      "Budget planning and tracking",
      "Day-of event coordination",
      "Post-event wrap-up and reporting",
    ],
    useCases: [
      {
        title: "Corporate Conferences",
        description: "Multi-day conferences with breakout sessions, keynote presentations, and networking events.",
        image: "/corporate-conference-hall.jpg",
      },
      {
        title: "Fundraising Galas",
        description: "Elegant nonprofit galas with silent auctions, dinner service, and entertainment.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Wedding Receptions",
        description: "Seamless coordination of ceremony, cocktail hour, dinner, and dancing.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Vision",
        description: "We meet with you to understand your goals, audience, and budget.",
      },
      {
        step: 2,
        title: "Concept Development",
        description: "Our team creates a detailed event plan with timelines and vendor recommendations.",
      },
      {
        step: 3,
        title: "Vendor Coordination",
        description: "We manage all vendor relationships, contracts, and logistics.",
      },
      {
        step: 4,
        title: "Execution & Oversight",
        description: "On event day, we manage setup, run-of-show, and teardown seamlessly.",
      },
    ],
    packages: [
      {
        name: "Essential Planning",
        description: "Core planning services with vendor coordination and day-of management.",
        startingPrice: "$2,500",
        features: [
          "Initial consultation and concept development",
          "Vendor recommendations and coordination",
          "Timeline creation",
          "8 hours day-of coordination",
        ],
      },
      {
        name: "Full-Service Planning",
        description: "Comprehensive planning from start to finish with unlimited support.",
        startingPrice: "$5,000",
        features: [
          "Everything in Essential Planning",
          "Unlimited planning meetings",
          "Budget management and tracking",
          "Venue sourcing",
          "Design and décor consultation",
          "Full day-of team (2-3 coordinators)",
        ],
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc003", "svc006", "svc008"],
  },
  {
    id: "svc006",
    name: "Audio Visual Production",
    slug: "audio-visual-production",
    tagline: "Sound & Vision Excellence",
    description: "Professional audio, video, and lighting solutions that elevate every moment of your event.",
    icon: "speaker",
    whatWeDo: [
      "High-fidelity sound system design and operation",
      "Projection and LED video walls",
      "Broadcast-quality camera production",
      "Architectural and stage lighting design",
      "Live streaming and recording",
      "Technical crew and engineers",
    ],
    useCases: [
      {
        title: "Keynote Presentations",
        description:
          "Crystal-clear audio, confidence monitors, and high-brightness projection for impactful presentations.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Live Music Events",
        description: "Professional-grade sound reinforcement and stage lighting for concerts and performances.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Award Ceremonies",
        description: "Multi-camera production, video playback, and dramatic lighting for memorable moments.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Site Survey",
        description: "We visit your venue to assess acoustics, power, and technical requirements.",
      },
      {
        step: 2,
        title: "System Design",
        description: "Our engineers create a custom AV design tailored to your event needs.",
      },
      {
        step: 3,
        title: "Installation & Testing",
        description: "Equipment is installed, tested, and optimized before your event begins.",
      },
      {
        step: 4,
        title: "Live Operation",
        description: "Experienced technicians operate all systems throughout your event.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc003", "svc007"],
  },
  {
    id: "svc007",
    name: "Event Production & Technical Direction",
    slug: "event-production-technical-direction",
    tagline: "Seamless Execution",
    description: "Expert technical directors and production managers who ensure every detail runs flawlessly.",
    icon: "clipboard",
    whatWeDo: [
      "Technical direction and show calling",
      "Production management and oversight",
      "Crew coordination and scheduling",
      "Run-of-show documentation",
      "Rehearsal and pre-production planning",
      "Post-event strike management",
    ],
    useCases: [
      {
        title: "Multi-Day Conferences",
        description: "Coordinating breakout sessions, general sessions, and social events across multiple venues.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Theatrical Productions",
        description: "Managing lighting cues, sound effects, and scene changes for live theater.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Product Launches",
        description: "Orchestrating reveals, video content, and interactive elements for brand experiences.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Pre-Production",
        description: "Detailed planning meetings, script review, and technical rider creation.",
      },
      {
        step: 2,
        title: "Rehearsals",
        description: "Technical and dress rehearsals to refine timing and troubleshoot issues.",
      },
      {
        step: 3,
        title: "Show Call",
        description: "Our technical director calls all cues and coordinates crew in real-time.",
      },
      {
        step: 4,
        title: "Strike & Debrief",
        description: "Efficient teardown and post-event debrief with stakeholders.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc006", "svc005"],
  },
  {
    id: "svc008",
    name: "Creative Design",
    slug: "creative-design",
    tagline: "Visionary Aesthetics",
    description: "Innovative design services that create immersive environments and memorable brand experiences.",
    icon: "palette",
    whatWeDo: [
      "Event branding and identity",
      "Environmental design and décor",
      "Scenic and stage design",
      "Graphic design for signage and collateral",
      "Floral design consultation",
      "3D renderings and mockups",
    ],
    useCases: [
      {
        title: "Branded Experiences",
        description: "Cohesive design that integrates your brand into every touchpoint.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Themed Galas",
        description: "Transformative décor that transports guests to another world.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Trade Show Booths",
        description: "Eye-catching booth design that attracts visitors and showcases products.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Creative Brief",
        description: "We gather inspiration, brand guidelines, and design objectives.",
      },
      {
        step: 2,
        title: "Concept Presentation",
        description: "Mood boards, sketches, and 3D renderings bring the vision to life.",
      },
      {
        step: 3,
        title: "Design Development",
        description: "Refining details, selecting materials, and finalizing specifications.",
      },
      {
        step: 4,
        title: "Installation",
        description: "Our team brings the design to life with precision and care.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc005", "svc009"],
  },
  {
    id: "svc009",
    name: "Furniture & Decor Rentals",
    slug: "furniture-decor-rentals",
    tagline: "Comfort Meets Style",
    description: "Curated furniture collections that create inviting lounge spaces and elegant event setups.",
    icon: "sofa",
    whatWeDo: [
      "Modern lounge furniture collections",
      "Chiavari and specialty chairs",
      "Farm tables and specialty dining tables",
      "Illuminated bars and pedestals",
      "Room dividers and pipe & drape",
      "Delivery, setup, and retrieval",
    ],
    useCases: [
      {
        title: "Cocktail Lounges",
        description: "Plush sofas, accent chairs, and coffee tables for networking areas.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "Formal Dinners",
        description: "Elegant chiavari chairs and specialty linens for seated receptions.",
        image: "/placeholder.svg?height=400&width=600",
      },
      {
        title: "VIP Areas",
        description: "Exclusive furniture setups with illuminated bars and premium seating.",
        image: "/placeholder.svg?height=400&width=600",
      },
    ],
    process: [
      {
        step: 1,
        title: "Browse Inventory",
        description: "Explore our catalog featuring Mondrian, Colette, and Kincaid collections.",
      },
      {
        step: 2,
        title: "Design Consultation",
        description: "Our team helps you select pieces that match your aesthetic and layout.",
      },
      {
        step: 3,
        title: "Delivery & Setup",
        description: "Furniture arrives clean, inspected, and is set up according to your floorplan.",
      },
      {
        step: 4,
        title: "Retrieval",
        description: "After your event, we handle all teardown and removal.",
      },
    ],
    gallery: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    relatedServices: ["svc005", "svc008"],
  },
]
