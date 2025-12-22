// components/home/who-we-serve-section.tsx
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clientTypes = [
  {
    title: "Planners",
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    description:
      "Tailored solutions for corporate event planners, ensuring each event is meticulously designed and executed.",
  },
  {
    title: "Marketers",
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 4.702a.705.705 0 0 0-.598-.698L7 3.5v13l3.402-.504a.705.705 0 0 0 .598-.698V4.702Z"></path>
        <path d="M17 3.5v13"></path>
        <path d="M14 5.5v11"></path>
      </svg>
    ),
    description:
      "Robust event marketing strategies that amplify brand visibility and drive attendance.",
  },
  {
    title: "Venues",
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    description:
      "Partner with venues to optimize event spaces, ensuring efficient use of resources and seamless execution.",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Who We Serve
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Trusted by event professionals across the Midwest. We partner
              with planners, businesses, and venues to create seamless
              experiences.
            </p>

            <div className="grid gap-6">
              {clientTypes.map((client, idx) => (
                <motion.div
                  key={client.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 p-6 rounded-2xl bg-background border border-border/50 hover:border-accent/40 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="shrink-0 h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <client.icon className="h-8 w-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {client.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {client.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/professional-event-production-team-setup.jpg"
              alt="Pavilion360 team collaborating with clients"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <p className="text-white text-lg font-medium leading-relaxed">
                  &ldquo;Pavilion360 is the gold standard for event production
                  in Indianapolis. Their attention to detail is
                  unmatched.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    JM
                  </div>
                  <div className="text-white/90 text-sm">
                    <span className="block font-bold">Jessica Miller</span>
                    <span className="opacity-80">
                      Corporate Event Director
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}