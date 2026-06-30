'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Waves, Sparkles, Droplets, Home, Wind, PawPrint, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { siteConfig } from '../data/content';
import { useCustomImages } from '../hooks/useCustomImages';

const iconMap: Record<string, React.ComponentType<any>> = {
  Waves,
  Sparkles,
  Droplets,
  Home,
  Wind,
  PawPrint,
};

const heroCards = [
  { label: 'Private Pool', icon: 'Waves', desc: '12x24 ft private pool' },
  { label: 'Private Waterfall', icon: 'Sparkles', desc: 'Flowing natural fall' },
  { label: 'Natural Stream', icon: 'Droplets', desc: 'Passing through plot' },
  { label: 'Villa Layout', icon: 'Home', desc: '2 Bed + Mezzanine Loft' },
  { label: 'Naturally Cooled', icon: 'Wind', desc: 'Stone & canopy cooling' },
  { label: 'Pet Friendly', icon: 'PawPrint', desc: '1 acre gated property' },
];

export const Hero = () => {
  const { images } = useCustomImages();

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-dark text-white">
      {/* Photo Background (Actual property photo) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-primary-dark/65 z-10" /> {/* Dark Overlay */}
        <Image
          src={images.heroBg}
          alt="Mauli Farms Pali Villa Night View"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-grow flex items-center justify-center px-6 md:px-12 pt-32 pb-16">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md text-accent text-xs font-semibold uppercase tracking-widest"
          >
            Exclusive Private Farmhouse Estate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            <span className="block text-white">Escape the City.</span>
            <span className="block text-accent">Experience Nature.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-secondary/90 font-light tracking-wide max-w-2xl mx-auto mb-10"
          >
            {siteConfig.taglineSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => handleScrollTo('#booking-form')}
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-dark"
              onClick={() => handleScrollTo('#about')}
            >
              Explore Property
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Info Cards Panel */}
      <div className="relative z-20 bg-gradient-to-t from-dark via-dark/95 to-transparent pt-12 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {heroCards.map((card, idx) => {
              const Icon = iconMap[card.icon];
              return (
                <div
                  key={card.label}
                  className="glass-dark rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:border-accent/40 group hover:-translate-y-1"
                >
                  <div className="p-3 rounded-full bg-accent/10 border border-accent/20 text-accent mb-3 group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <span className="text-sm font-semibold text-white/95 tracking-wide">{card.label}</span>
                  <span className="text-[11px] text-white/60 font-medium mt-1">{card.desc}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => handleScrollTo('#about')}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-opacity hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Scroll</span>
          <ChevronDown className="h-4 w-4 text-accent" />
        </motion.div>
      </div>
    </section>
  );
};
