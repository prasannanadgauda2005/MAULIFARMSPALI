'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { siteConfig } from '../data/content';

export const FloatingButtons = () => {
  const { scrollY } = useScroll(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 select-none items-end">
      
      {/* Back to Top (Fades in dynamically on scroll) */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-white text-primary border border-secondary-dark/80 shadow-lg hover:bg-primary hover:text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone Call Floater */}
      <a 
        href={`tel:${siteConfig.phone}`}
        className="p-4 rounded-full bg-primary text-white shadow-xl hover:bg-primary-light hover:scale-105 active:scale-95 transition-all focus:outline-none flex items-center justify-center border border-primary-dark/20 cursor-pointer"
        aria-label="Call reservations desk"
      >
        <Phone className="h-5.5 w-5.5" />
      </a>

      {/* WhatsApp Chat Floater */}
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%2C%20I%20would%20like%20to%20chat%20about%20booking%20availability.`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 rounded-full bg-accent text-white shadow-xl hover:bg-accent-light hover:scale-105 active:scale-95 transition-all focus:outline-none flex items-center justify-center border border-accent-dark/20 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-5.5 w-5.5 fill-white/10" />
      </a>
      
    </div>
  );
};
