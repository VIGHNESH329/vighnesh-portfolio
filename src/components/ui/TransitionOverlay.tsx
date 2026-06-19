'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function TransitionOverlay() {
  const { isTransitioning, activeIdentity, nextIdentity } = useIdentityStore();
  const [displayText, setDisplayText] = useState('');
  
  const targetIdentity = nextIdentity || activeIdentity;
  const targetText = targetIdentity === 'cyber' ? 'LOADING CYBERSECURITY PROFILE...' : 'LOADING SOFTWARE ENGINEERING PROFILE...';

  useEffect(() => {
    if (isTransitioning) {
      let i = 0;
      setDisplayText('');
      const interval = setInterval(() => {
        setDisplayText(targetText.slice(0, i));
        i++;
        if (i > targetText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isTransitioning, targetText]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-auto"
        >
          {/* Scanline / Grid overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }}
          />
          
          {/* Glitch / Distortion Overlay */}
          <motion.div 
            animate={{ 
              x: [0, -10, 10, -5, 5, 0],
              y: [0, 5, -5, 10, -10, 0],
            }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror' }}
            className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" 
          />
          
          <motion.div 
            initial={{ scale: 0.9, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 relative z-10 w-full px-8"
          >
            <div className="text-[var(--color-cyber-primary)] font-heading text-sm md:text-2xl font-black tracking-[0.5em] uppercase text-center flex flex-col gap-4">
              <span className="text-white/50 animate-pulse tracking-[1em]">SYSTEM OVERRIDE</span>
              <span className="text-white h-8 block">{displayText}<span className="animate-ping">_</span></span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                className="absolute top-0 left-0 bottom-0 bg-white shadow-[0_0_20px_#fff]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
