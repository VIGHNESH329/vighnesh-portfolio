'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIdentityStore } from '@/store/useIdentityStore';
import { cyberContent, sdeContent } from '@/data/content';
import { X } from 'lucide-react';

export default function Projects() {
  const { activeIdentity } = useIdentityStore();
  const content = activeIdentity === 'cyber' ? cyberContent : sdeContent;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = content.projects.find(p => p.id === selectedId);

  return (
    <section className="relative z-10 py-32 px-8 md:px-24 min-h-screen">
      <motion.h2 
        key={activeIdentity + '-title'}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-heading text-5xl md:text-7xl font-black mb-16 uppercase tracking-tighter text-foreground"
      >
        {activeIdentity === 'cyber' ? 'Select Missions' : 'Featured Work'}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {content.projects.map((project: any) => (
          <motion.div
            key={project.id}
            layoutId={`card-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className={`group border border-foreground/10 bg-foreground/5 p-8 hover:bg-foreground/10 transition-colors relative overflow-hidden flex flex-col justify-end ${project.featured ? 'md:col-span-2 min-h-[400px]' : 'h-80'}`}
            style={{ cursor: 'none' }}
          >
            {project.featured && (
              <div className="absolute top-8 left-8 bg-primary text-black text-xs font-bold uppercase tracking-widest px-3 py-1 z-10">Featured</div>
            )}
            
            {project.image && (
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
            <div className="relative z-10 flex flex-col gap-4">
              <motion.h3 layoutId={`title-${project.id}`} className="font-heading text-2xl md:text-3xl font-bold uppercase text-foreground drop-shadow-md">
                {project.title}
              </motion.h3>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              {project.tech.slice(0,3).map((t: string) => (
                <span key={t} className="text-xs tracking-widest text-primary border border-primary/30 px-2 py-1 uppercase">{t}</span>
              ))}
            </div>
            {/* Hover Glitch Effect for Cyber Mode */}
            {activeIdentity === 'cyber' && (
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-screen" />
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/90 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-primary/50 bg-background shadow-[0_0_50px_rgba(var(--primary),0.1)] p-8 md:p-16 relative"
              style={{ cursor: 'none' }}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-8 right-8 text-foreground/50 hover:text-primary transition-colors focus:outline-none"
                style={{ cursor: 'none' }}
              >
                <X size={32} />
              </button>

              <motion.h3 layoutId={`title-${selectedProject.id}`} className="font-heading text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter text-primary">
                {selectedProject.title}
              </motion.h3>

                <div className="mb-12">
                   <div className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden rounded-lg w-full">
                      {selectedProject.image ? (
                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/30 text-xs uppercase tracking-widest font-bold">Project Screenshot</span>
                      )}
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                  <div className="md:col-span-2 space-y-12">
                    <div>
                      <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Overview</h4>
                      <p className="text-lg leading-relaxed text-foreground/90">{selectedProject.overview}</p>
                    </div>
                    <div>
                      <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Problem Statement</h4>
                      <p className="text-base leading-relaxed text-foreground/70">A critical challenge was identified requiring a robust and scalable technical solution to ensure operational integrity and performance.</p>
                    </div>
                    <div>
                      <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Key Features</h4>
                      <ul className="space-y-2 text-base leading-relaxed text-foreground/70">
                        <li className="flex items-start gap-2"><span className="text-primary mt-1">▹</span>High-performance processing engine</li>
                        <li className="flex items-start gap-2"><span className="text-primary mt-1">▹</span>Real-time analytics and monitoring</li>
                        <li className="flex items-start gap-2"><span className="text-primary mt-1">▹</span>Seamless cross-platform integration</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Challenges</h4>
                      <p className="text-base leading-relaxed text-foreground/70">Overcame significant technical hurdles related to performance optimization, edge-case handling, and secure data transmission.</p>
                    </div>
                    <div>
                      <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Results</h4>
                      <p className="text-base leading-relaxed text-foreground/70">Successfully deployed the architecture, resulting in measurable efficiency gains and zero critical downtime incidents.</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs tracking-widest text-primary uppercase mb-4 font-bold">Technologies Used</h4>
                    <div className="flex flex-col gap-2">
                      {selectedProject.tech.map(t => (
                        <div key={t} className="text-sm font-bold tracking-wider text-foreground uppercase border-l-2 border-primary/50 pl-4 py-2 bg-white/5">
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
