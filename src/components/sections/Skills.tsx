'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { cyberContent, sdeContent } from '@/data/content';
import { motion } from 'framer-motion';

export default function Skills() {
  const { activeIdentity } = useIdentityStore();
  const content = activeIdentity === 'cyber' ? cyberContent : sdeContent;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring' as const } }
  };

  return (
    <section className="relative z-10 py-32 px-8 md:px-24 border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
      <motion.h2 
        key={activeIdentity + '-skills-title'}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-6xl font-black mb-12 uppercase tracking-tighter text-foreground"
      >
        Arsenal
      </motion.h2>

      <motion.div 
        key={activeIdentity + '-skills-list'}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-wrap gap-4 max-w-5xl"
      >
        {content.skills.map((skill) => (
          <motion.div
            key={skill}
            variants={item}
            className="px-6 py-3 border border-primary/30 text-foreground font-bold tracking-widest uppercase text-sm hover:bg-primary hover:text-black transition-colors"
            style={{ cursor: 'none' }}
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
