'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIdentityStore } from '@/store/useIdentityStore';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border-2 border-primary pointer-events-none z-[100] hidden md:block"
      animate={{
        x: mousePosition.x - (isHovering ? 24 : 16),
        y: mousePosition.y - (isHovering ? 24 : 16),
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? 'var(--primary)' : 'transparent',
        opacity: isHovering ? 0.2 : 1,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      style={{
        boxShadow: isHovering ? '0 0 20px var(--primary)' : 'none',
      }}
    />
  );
}
