import type { Metadata } from "next"
import { HeroSection } from "@/components/shared/hero-section"
import { TestimonialCard } from "@/components/shared/testimonial-card"
import { testimonials } from "@/lib/data/testimonials"
import { CtaButton } from "@/components/shared/cta-button"

export const metadata: Metadata = {
  title: "About Pavilion360",
  description: "Learn about Pavilion360's mission, team, and 15+ years of event production excellence in Indianapolis.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="About Pavilion360"
        subtitle="Elevating events through creativity, expertise, and unwavering dedication to excellence."
        backgroundImage="/professional-event-production-team-setup.jpg"
        size="medium"
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              Founded in Indianapolis over 15 years ago, Pavilion360 has grown from a small AV rental company into a
              full-service event production powerhouse. We've produced over 500 events annually, from intimate corporate
              gatherings to large-scale festivals.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our team of experienced event professionals, technical directors, and creative designers work together to
              bring your vision to life—no matter the size or scope of your event.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="text-xl leading-relaxed text-foreground">
              To deliver exceptional event experiences through innovative technology, creative design, and unparalleled
              service—transforming visions into unforgettable moments that exceed expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Core Values</h2>
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">1</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Excellence</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We hold ourselves to the highest standards in every aspect of event production.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Innovation</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We stay ahead of industry trends to deliver cutting-edge experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Partnership</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We collaborate closely with clients to understand and exceed their vision.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">4</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Reliability</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Our clients trust us to deliver flawless execution, every single time.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">5</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Creativity</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We bring fresh ideas and artistic vision to make every event unique.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <span className="text-2xl font-bold text-accent">6</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Community</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Proud to serve Indianapolis and contribute to our vibrant local events scene.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Journey</h2>
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  09
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">2009 - Founded</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Started as a small AV rental company with 2 employees and a passion for great events.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  12
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">2012 - Expanded Services</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Added event production, staging, and lighting to become a full-service provider.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  16
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">2016 - The Pavilion Opens</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Opened our flagship venue at Pan Am Plaza, serving as our headquarters and premier event space.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  20
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">2020 - Adapted & Innovated</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Pioneered hybrid event solutions, helping clients navigate the new landscape of virtual experiences.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  24
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">2024 - 500+ Events Annually</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Now serving over 500 events per year with a team of 30+ professionals and state-of-the-art equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Clients Say</h2>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 text-center lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-3xl font-bold text-accent-foreground">Ready to Work Together?</h2>
          <p className="mb-8 text-lg text-accent-foreground/90">
            Let's create something extraordinary for your next event.
          </p>
          <CtaButton href="/contact" variant="secondary">
            Get Started Today
          </CtaButton>
        </div>
      </section>
    </div>
  )
}
