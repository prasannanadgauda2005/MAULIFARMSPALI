'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/content';
import { Button } from './ui/Button';

export const BookingCTA = () => {
  const handleScrollToBooking = () => {
    const target = document.querySelector('#booking-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-primary-dark text-white">
      {/* Background Image with Rich Scrim */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/images/gallery/villa-exterior-twilight.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60 z-10" />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Unboxed Kicker */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300 block mb-4"
        >
          Exclusive Private Estate Reservation
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-6 leading-[1.12]"
          style={{ textWrap: 'balance' }}
        >
          Your Private Oasis in Pali Awaits.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg text-white/80 font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Book Mauli Farms exclusively for your group. Experience uncompromised privacy, cascading waterfalls, fresh stream trails, and warm Maharashtrian hospitality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%20Pali%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20villa.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="accent"
              size="lg"
              className="w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider py-4 px-8 bg-accent hover:bg-accent-light shadow-xl"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </a>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleScrollToBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-white/40 hover:bg-white hover:text-primary transition-all py-4 px-8"
          >
            Inquire Availability <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
