'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, 
  Wind, 
  Droplets, 
  ChefHat, 
  Music, 
  Wifi, 
  Zap, 
  CircleParking, 
  Flame, 
  Leaf, 
  Gamepad2, 
  Trophy, 
  UserCheck,
  Sparkles
} from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { amenities } from '../data/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Wind,
  Sparkles,
  Droplets,
  ChefHat,
  Music,
  Wifi,
  Zap,
  CircleParking,
  Flame,
  Leaf,
  Gamepad2,
  Trophy,
  ShieldAlert: UserCheck,
};

const filterTabs = [
  { id: 'all', label: 'All Amenities' },
  { id: 'exterior', label: 'Water & Grounds' },
  { id: 'interior', label: 'Interiors & Comforts' },
  { id: 'services', label: 'Services & Caretakers' }
];

export const Amenities = () => {
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior' | 'services'>('all');

  const filteredAmenities = filter === 'all'
    ? amenities
    : amenities.filter(item => item.category === filter);

  return (
    <section id="amenities" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Curated Estate Inclusions"
          subtitle="Amenities & Comforts"
          description="From recreational sports and sound systems to pristine spring water and dedicated 24/7 on-site caretakers."
          align="center"
        />

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 border focus:outline-none ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-secondary text-primary/80 border-secondary-dark hover:bg-secondary-dark'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Amenities Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredAmenities.map((amenity) => {
              const Icon = iconMap[amenity.iconName] || Sparkles;
              return (
                <motion.div
                  key={amenity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 rounded-2xl bg-secondary border border-secondary-dark/60 flex flex-col items-center text-center group hover:bg-white hover:border-amber-700/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-white border border-secondary-dark text-primary mb-3.5 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-primary mb-1">
                    {amenity.name}
                  </h3>
                  <p className="text-[11px] text-dark/65 font-light leading-snug">
                    {amenity.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
