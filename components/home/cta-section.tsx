// components/home/cta-section.tsx
'use client';
import { motion } from 'framer-motion';
import { CtaButton } from '@/components/shared/cta-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="bg-accent py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 blur-3xl" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 bg-repeat mix-blend-overlay" />

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
          Let&apos;s Work Together
        </span>
        <h2 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl text-white tracking-tight">
          Ready to Create Something <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-amber-100">
            Amazing?
          </span>
        </h2>
        <p className="mb-10 text-xl max-w-2xl mx-auto text-white/90 leading-relaxed font-light">
          Indy&apos;s premier creative event management, production, &
          planning solutions. Intentionally unique. Specially for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <CtaButton
            href="/contact"
            variant="secondary"
            size="lg"
            className="h-16 px-10 text-lg bg-white text-accent hover:bg-white/90 shadow-2xl shadow-black/20"
          >
            Get Started Today
          </CtaButton>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-16 px-10 text-lg border-2 border-white/30 text-white bg-transparent hover:bg-white/10 rounded-full transition-all duration-300"
          >
            <Link href="/rentals">Browse Equipment</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}