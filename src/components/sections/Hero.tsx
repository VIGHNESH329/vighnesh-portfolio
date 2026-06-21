'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { cyberContent, sdeContent } from '@/data/content';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useState, useEffect } from 'react';
import LiveFeed from './LiveFeed';
import { Terminal, Code2, Download } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Hero() {
  const { activeIdentity } = useIdentityStore();
  const content = activeIdentity === 'cyber' ? cyberContent : sdeContent;
  const [titleIndex, setTitleIndex] = useState(0);

  // Spotlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const backgroundTemplate = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, var(--primary) 0%, transparent 60%)`;

  // Tilt logic for identity card
  const xSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });
  useEffect(() => {
    setWindowSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  const rotateX = useTransform(ySpring, [0, windowSize.h], [15, -15]);
  const rotateY = useTransform(xSpring, [0, windowSize.w], [-15, 15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % content.hero.rotatingTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.hero.rotatingTitles.length]);

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between min-h-screen px-8 md:px-24 pt-20 overflow-hidden">
      
      {/* Background Live Feed */}
      <LiveFeed />

      {/* Dynamic Spotlight */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20 transition-opacity duration-500 mix-blend-screen"
        style={{ background: backgroundTemplate }}
      />

      <div className="relative z-10 w-full lg:w-1/2 flex flex-col mt-20 lg:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdentity}
            initial={{ opacity: 0, filter: 'blur(10px)', x: -30 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-primary font-bold tracking-[0.3em] text-xs md:text-sm mb-6 uppercase drop-shadow-[0_0_10px_var(--primary)]">
              {content.hero.subheadline}
            </h2>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-[7rem] font-black mb-4 uppercase tracking-tighter leading-[0.9] text-foreground">
              {content.hero.headline.split(' ').map((word, i) => (
                 <span key={i} className="block">{word}</span>
              ))}
            </h1>
            
            <div className="h-12 mb-8 overflow-hidden">
               <AnimatePresence mode="popLayout">
                 <motion.span
                   key={titleIndex}
                   initial={{ y: 40, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -40, opacity: 0 }}
                   transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                   className="block text-xl md:text-3xl text-secondary font-bold tracking-wider"
                 >
                   {content.hero.rotatingTitles[titleIndex]}
                 </motion.span>
               </AnimatePresence>
            </div>

            <p className="text-base md:text-lg text-muted max-w-xl mb-8 leading-relaxed">
              {content.hero.tagline}
            </p>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Portrait & Socials */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-end justify-center mt-12 lg:mt-0">
        <div style={{ perspective: 1000 }} className="w-full flex justify-center lg:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdentity}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              style={{ rotateX, rotateY: rotateY as any }}
              className="w-full max-w-sm aspect-[3/4] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group"
            >
              {/* Card Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
              
              <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full mt-2">
                {/* Premium Glassmorphism Profile Frame */}
                <div className="w-full max-w-[220px] aspect-[4/5] rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-primary transition-colors duration-500 shadow-[0_0_30px_rgba(var(--primary),0.1)] p-2">
                   <img src="/images/profile.jpeg" alt="Profile" className="w-full h-full object-cover rounded-xl transition-all duration-700" />
                </div>
              </div>

              <div className="text-center pt-8 mt-4 relative z-10">
                <h3 className="font-heading font-black text-2xl uppercase tracking-wider text-foreground">{content.personal.name}</h3>
                <p className="text-primary font-bold text-sm tracking-widest uppercase mt-2">{content.identity}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Social Icons positioned cleanly below the ID card */}
        <div className="flex gap-4 mt-8 justify-center lg:justify-end w-full max-w-sm">
          {content.personal.links.github && (
            <a 
              href={content.personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 backdrop-blur-md"
            >
              <GithubIcon />
            </a>
          )}
          {content.personal.links.linkedin && (
            <a 
              href={content.personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 backdrop-blur-md"
            >
              <LinkedinIcon />
            </a>
          )}
          {(content.personal.links as any).tryhackme && (
            <a 
              href={(content.personal.links as any).tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 backdrop-blur-md"
            >
              <Terminal size={20} />
            </a>
          )}
          {(content.personal.links as any).leetcode && (
            <a 
              href={(content.personal.links as any).leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-primary hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 backdrop-blur-md"
            >
              <Code2 size={20} />
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-12 left-8 md:left-24 flex flex-wrap gap-8 md:gap-16 opacity-80 z-10 hidden md:flex">
        {content.stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-2xl md:text-3xl font-heading font-black text-foreground drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{stat.value}</span>
            <span className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
