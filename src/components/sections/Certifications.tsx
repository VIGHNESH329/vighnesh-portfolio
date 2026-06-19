'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { cyberContent, sdeContent } from '@/data/content';
import { motion } from 'framer-motion';

export default function Certifications() {
  const { activeIdentity } = useIdentityStore();
  const content = activeIdentity === 'cyber' ? cyberContent : sdeContent;

  const certLogos: Record<string, string> = {
    'ISC2 Certified in Cybersecurity (CC)': '/images/cert-isc2.png',
    'Google Cybersecurity Professional Certificate': '/images/cert-google.png',
    'Ethical Byte Penetration Pro Certification': '/images/cert-ethical.png',
    'Oracle OCI AI Foundations Associate': '/images/cert-oracle.png',
  };

  return (
    <section className="relative z-10 py-32 px-8 md:px-24">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-4xl md:text-6xl font-black mb-16 uppercase tracking-tighter text-foreground"
      >
        Visual Vault
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full min-h-[320px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 flex flex-col justify-between overflow-hidden shadow-lg"
            style={{ cursor: 'none' }}
          >
            {/* Holographic / Metallic effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/20 to-transparent translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out mix-blend-screen" />
            <div className="flex-1 flex flex-col justify-center items-center mb-6 mt-2 relative z-10">
              <div className="w-28 h-28 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center p-4 relative group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                 <img src={certLogos[cert] || '/images/cert-placeholder.png'} alt={cert} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex flex-col flex-1 justify-end">
              <h3 className="font-heading font-bold text-lg uppercase text-foreground relative z-10 leading-snug">
                {cert}
              </h3>
              
              <div className="mt-4 relative z-10 flex justify-between items-center border-t border-white/10 pt-4">
                 <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold">Verified Credential</p>
                 <button disabled className="border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/30 cursor-not-allowed">Verify</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
