'use client';
import { useIdentityStore } from '@/store/useIdentityStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const { activeIdentity } = useIdentityStore();
  const isCyber = activeIdentity === 'cyber';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('user_name'),
      email: formData.get('user_email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="relative z-10 py-32 px-8 md:px-24 bg-background/80 backdrop-blur-md border-t border-foreground/10" id="contact">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="flex-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter text-foreground"
          >
            Establish <br/> <span className="text-primary">{isCyber ? 'Secure Comms' : 'Connection'}</span>
          </motion.h2>
          <p className="text-muted leading-relaxed">
            {isCyber 
              ? 'Initiate a secure handshake to discuss cybersecurity operations, consulting, or CTF collaborations.' 
              : 'Open a channel to discuss software engineering roles, project builds, or open source contributions.'}
          </p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs uppercase tracking-widest">Name</label>
            <input 
              name="user_name"
              required 
              type="text" 
              className="bg-black/40 border border-white/10 p-4 text-foreground focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs uppercase tracking-widest">Email</label>
            <input 
              name="user_email"
              required 
              type="email" 
              className="bg-black/40 border border-white/10 p-4 text-foreground focus:border-primary outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs uppercase tracking-widest">Message</label>
            <textarea 
              name="message"
              required 
              rows={5}
              className="bg-black/40 border border-white/10 p-4 text-foreground focus:border-primary outline-none transition-colors resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success'}
            className={`self-start px-8 py-4 bg-black/40 border-2 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
              isCyber 
                ? 'border-primary hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                : 'border-primary hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
            } disabled:opacity-50 disabled:border-white/10 disabled:bg-white/5 disabled:text-white/40 disabled:hover:shadow-none disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:text-white/40 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? 'Transmitting...' : status === 'success' ? 'Transmission Sent' : 'Send Message'}
          </button>
          {status === 'success' && (
            <div className="mt-4 border-l-2 border-green-500 pl-4 py-2">
              <p className="text-green-500 text-sm tracking-widest uppercase">Message transmitted successfully.</p>
              <p className="text-green-400 text-xs tracking-wider mt-2">Thank you for reaching out. I will get back to you soon.</p>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 border-l-2 border-red-500 pl-4 py-2">
              <p className="text-red-500 text-sm tracking-widest uppercase mb-2">Unable to send message at the moment.</p>
              <p className="text-red-400 text-xs tracking-wider">Please contact me directly at:</p>
              <a href="mailto:deepaksaivighneshpanidam@gmail.com" className="block text-white text-sm mt-2 hover:text-primary transition-colors">deepaksaivighneshpanidam@gmail.com</a>
              <a href="tel:+919346096782" className="block text-white text-sm mt-1 hover:text-primary transition-colors">+91 9346096782</a>
            </div>
          )}
        </motion.form>
      </div>

      <div className="max-w-4xl mx-auto mt-24 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative z-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-primary font-bold uppercase tracking-widest text-[10px]">Email Communication</h4>
          <a href="mailto:deepaksaivighneshpanidam@gmail.com" className="text-muted text-sm hover:text-primary transition-colors">deepaksaivighneshpanidam@gmail.com</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-primary font-bold uppercase tracking-widest text-[10px]">Direct Line</h4>
          <a href="tel:+919346096782" className="text-muted text-sm hover:text-primary transition-colors">+91 9346096782</a>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-primary font-bold uppercase tracking-widest text-[10px]">Professional Network</h4>
          <a href="https://linkedin.com/in/deepak-sai-vighnesh" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:text-primary transition-colors">linkedin.com/in/deepak-sai-vighnesh</a>
        </div>
      </div>
    </section>
  );
}
