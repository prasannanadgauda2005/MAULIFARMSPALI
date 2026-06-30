'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '../data/content';
import { Button } from './ui/Button';

export const BookingCTA = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-dark text-white">
      {/* Background Image with Parallax Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary-dark/80 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url('/images/gallery/villa-exterior-twilight.jpg')` }}
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block px-4 py-1 rounded-full border border-accent/40 bg-accent/15 text-accent text-[10px] font-bold uppercase tracking-widest"
        >
          Exclusive Private Villa
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Ready for Your Perfect Getaway?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary/90 font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Book Mauli Farms exclusively for your group. Experience uncompromised privacy, nature hikes, pool sessions, and local Maharashtrian hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20villa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="accent"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              WhatsApp Booking
            </Button>
          </a>
          
          <a 
            href={`tel:${siteConfig.phone}`}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center gap-2 text-white border-white hover:bg-white hover:text-primary-dark"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
