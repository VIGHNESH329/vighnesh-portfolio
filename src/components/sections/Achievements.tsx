'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { cyberContent, sdeContent } from '@/data/content';
import { motion } from 'framer-motion';

export default function Achievements() {
  const { activeIdentity } = useIdentityStore();
  const content = activeIdentity === 'cyber' ? cyberContent : sdeContent;

  return (
    <section className="relative z-10 py-32 px-8 md:px-24 border-t border-foreground/10 bg-background/50 backdrop-blur-sm">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter text-foreground"
      >
        Achievements
      </motion.h2>

      <div className="flex flex-col gap-12 max-w-5xl">
        {content.achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-6 items-start group"
          >
            <div className="text-transparent text-stroke-primary font-black font-heading text-5xl md:text-7xl opacity-30 group-hover:opacity-100 transition-opacity leading-none">
              0{index + 1}
            </div>
            <div className="md:border-l border-primary/20 md:pl-8 group-hover:border-primary transition-colors duration-500">
              <p className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-light">
                {achievement}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
