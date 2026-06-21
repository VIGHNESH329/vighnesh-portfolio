'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const { activeIdentity } = useIdentityStore();
  const isCyber = activeIdentity === 'cyber';

  const handleDownload = () => {
    const fileName = isCyber ? 'resume-cyber.pdf' : 'resume-sde.pdf';
    fetch(`/${fileName}`)
      .then(response => {
        if (!response.ok) throw new Error('File not found');
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert('Resume file is currently being updated. Please check back later.');
      });
  };

  return (
    <footer className="relative z-10 py-32 px-8 md:px-24 border-t border-white/5 bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-16">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-black uppercase text-foreground mb-4 tracking-tighter"
          >
            Ready to <br/> <span className="text-primary">{isCyber ? 'Deploy?' : 'Build?'}</span>
          </motion.h2>
          <p className="text-muted text-sm tracking-[0.3em] uppercase">
            {isCyber ? 'Initiate Secure Comms' : 'Open a Pull Request'}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <MagneticButton>
            <button onClick={handleDownload} className="w-48 h-48 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition-transform relative overflow-hidden group shadow-[0_0_40px_var(--primary)]" style={{ cursor: 'none' }}>
              <div 
                className="font-black tracking-widest text-lg text-white" 
                style={{ position: 'relative', zIndex: 9999, color: 'white', opacity: 1, visibility: 'visible', display: 'block', textAlign: 'center' }}
              >
                DOWNLOAD<br/>RESUME
              </div>
              <div className="absolute inset-0 bg-black/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10" />
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <a href="#contact" className="w-32 h-32 rounded-full border border-primary text-primary font-bold tracking-widest uppercase text-xs hover:bg-primary/10 transition-colors flex items-center justify-center" style={{ cursor: 'none' }}>
              Contact
            </a>
          </MagneticButton>
        </div>
      </div>
      
      <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/50 tracking-widest uppercase">
        <span>© {new Date().getFullYear()} DEEPAK SAI VIGHNESH.</span>
        <span>{isCyber ? 'SECURE CONNECTION ESTABLISHED.' : 'ALL SYSTEMS OPERATIONAL.'}</span>
      </div>
    </footer>
  );
}
