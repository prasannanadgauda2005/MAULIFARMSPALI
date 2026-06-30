'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, 
  Snowflake, 
  ChefHat, 
  Music, 
  Wifi, 
  Zap, 
  CircleParking, 
  Flame, 
  Leaf, 
  Thermometer, 
  Sofa, 
  Tv, 
  Gamepad2, 
  Trophy, 
  UserCheck 
} from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { amenities } from '../data/content';
import { cn } from '../lib/utils';

const iconMap: Record<string, React.ComponentType<any>> = {
  Waves,
  Snowflake,
  ChefHat,
  Music,
  Wifi,
  Zap,
  CircleParking,
  Flame,
  Leaf,
  Thermometer,
  Sofa,
  Tv,
  Gamepad2,
  Trophy,
  ShieldAlert: UserCheck, // Map caretakers to UserCheck
};

export const Amenities = () => {
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior' | 'services'>('all');

  const filteredAmenities = filter === 'all'
    ? amenities
    : amenities.filter(item => item.category === filter);

  return (
    <section id="amenities" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="State-of-the-Art Amenities"
          subtitle="Everything You Need"
          align="center"
        />

        {/* Tab Filters */}
        <div className="flex justify-center gap-3 mb-12">
          {(['all', 'interior', 'exterior', 'services'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                'px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus:outline-none',
                filter === tab
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-secondary border-secondary-dark/60 text-primary hover:bg-secondary-dark/40'
              )}
            >
              {tab === 'all' ? 'Show All' : `${tab} amenities`}
            </button>
          ))}
        </div>

        {/* Amenities Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAmenities.map((amenity) => {
              const Icon = iconMap[amenity.iconName];
              return (
                <motion.div
                  key={amenity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-3xl bg-secondary border border-secondary-dark/50 flex flex-col items-center text-center group hover:bg-white hover:border-accent hover:shadow-md transition-all duration-300"
                >
                  <div className="p-4 rounded-2xl bg-white border border-secondary-dark/60 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                    {Icon && <Icon className="h-6 w-6" />}
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-primary-dark group-hover:text-primary transition-colors">
                    {amenity.name}
                  </h3>
                  <p className="text-[11px] text-dark/60 mt-2 leading-relaxed max-w-[150px]">
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
