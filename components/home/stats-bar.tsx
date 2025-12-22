// components/home/stats-bar.tsx
'use client';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Events Annually' },
  { value: '15+', label: 'Years Experience' },
  { value: '200+', label: 'Rental Items' },
  { value: '98%', label: 'Client Satisfaction' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StatsBar() {
  return (
    <section className="bg-accent/5 border-y border-accent/10 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-background hidden md:block" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-accent/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`text-center p-4 ${
                idx % 2 === 0 ? 'border-r border-accent/10 md:border-none' : ''
              }`}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}