'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NeonCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          backgroundColor: 'rgba(var(--neon-blue), 0.5)',
          boxShadow: '0 0 10px rgba(var(--neon-blue), 0.7), 0 0 20px rgba(var(--neon-blue), 0.5)',
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: isClicking ? 0.5 : 1,
          opacity: isClicking ? 0.8 : 0.6,
        }}
        transition={{ duration: 0.1 }}
      />
      
      <motion.div
        className="fixed w-24 h-24 rounded-full pointer-events-none z-40 mix-blend-screen"
        style={{
          backgroundColor: 'rgba(var(--neon-purple), 0.1)',
          boxShadow: '0 0 30px rgba(var(--neon-purple), 0.3)',
          left: mousePosition.x - 48,
          top: mousePosition.y - 48,
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          opacity: isClicking ? 0.3 : 0.15,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
} 