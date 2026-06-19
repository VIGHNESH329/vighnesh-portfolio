import Navbar from '@/components/layout/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import BackgroundCanvas from '@/components/canvas/BackgroundCanvas';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Achievements from '@/components/sections/Achievements';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <CustomCursor />
      <BackgroundCanvas />
      <Navbar />
      
      <Hero />
      <Skills />
      <Projects />
      <Certifications />
      <Achievements />
      <ContactForm />
      <Footer />
    </main>
  );
}
