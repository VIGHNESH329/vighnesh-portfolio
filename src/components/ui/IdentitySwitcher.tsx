'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { motion } from 'framer-motion';
import { Shield, Code2 } from 'lucide-react';

export default function IdentitySwitcher() {
  const { activeIdentity, toggleIdentity } = useIdentityStore();
  const isCyber = activeIdentity === 'cyber';

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
      <span className={`text-sm font-bold tracking-widest transition-colors duration-500 ${isCyber ? 'text-primary' : 'text-muted'}`}>
        CYBER
      </span>
      <button
        onClick={toggleIdentity}
        className="relative w-16 h-8 rounded-full bg-foreground/10 border border-foreground/20 p-1 focus:outline-none hover:bg-foreground/20 transition-colors"
      >
        <motion.div
          className="absolute top-1 left-1 bottom-1 w-6 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_var(--primary)]"
          initial={false}
          animate={{ x: isCyber ? 0 : 32 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isCyber ? <Shield size={12} className="text-black" /> : <Code2 size={12} className="text-black" />}
        </motion.div>
      </button>
      <span className={`text-sm font-bold tracking-widest transition-colors duration-500 ${!isCyber ? 'text-primary' : 'text-muted'}`}>
        SDE
      </span>
    </div>
  );
}
