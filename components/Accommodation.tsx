'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SectionTitle } from './SectionTitle';
import { bedrooms } from '../data/content';
import { Users, BedDouble, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const Accommodation = () => {
  const [activeTab, setActiveTab] = useState<string>(bedrooms[0].id);

  const selectedRoom = bedrooms.find((b) => b.id === activeTab) || bedrooms[0];

  const handleBookRoom = () => {
    const target = document.querySelector('#booking-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accommodation" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Designed for Deep Rest & Large Gatherings"
          subtitle="Villa Suites & Sanctuary"
          description="Booked exclusively as one private unit. Featuring 2 spacious ground-floor master suites, a massive vaulted Mezzanine Attic Sanctuary, and 3 modern washrooms."
          align="center"
        />

        {/* Room Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {bedrooms.map((room) => {
            const isActive = activeTab === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveTab(room.id)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-300 border focus:outline-none ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-secondary text-primary/80 border-secondary-dark hover:bg-secondary-dark'
                }`}
              >
                {room.title}
              </button>
            );
          })}
        </div>

        {/* Selected Room Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoom.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-secondary-dark bg-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Media Column (7 Cols) */}
              <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] bg-secondary-dark">
                <Image
                  src={selectedRoom.images[0] || '/images/gallery/bedroom-master.jpg'}
                  alt={selectedRoom.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Cap Tag */}
                <div className="absolute bottom-4 left-4 z-10 glass px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white/95 border border-white/20 flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-300" />
                  <span>Sleeps {selectedRoom.capacity}</span>
                </div>
              </div>

              {/* Details Column (5 Cols) */}
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-700 block mb-2">
                    Private Villa Layout
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
                    {selectedRoom.title}
                  </h3>
                  
                  {/* Bed Configuration Pill Box -> Clean unboxed text with icon */}
                  <div className="flex items-center gap-2 text-xs text-dark/70 font-medium mb-6 pb-4 border-b border-secondary-dark">
                    <BedDouble className="h-4 w-4 text-accent shrink-0" />
                    <span>Bed Setup: <strong>{selectedRoom.bedType}</strong></span>
                  </div>

                  {/* Room Highlights List */}
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-dark/50">
                      Suite Highlights & Comforts
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedRoom.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs md:text-sm text-dark/80 font-light">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-secondary-dark flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-dark/60 font-light">
                    Part of full-villa exclusive reservation
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleBookRoom}
                    className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold py-2.5 px-5 flex items-center justify-center gap-1.5"
                  >
                    Reserve Entire Villa <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Villa Specs Strip */}
        <div className="mt-12 rounded-2xl p-6 bg-secondary-dark/40 border border-secondary-dark grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary block">
              15–25
            </span>
            <span className="text-xs text-dark/65 font-medium mt-1 block">
              Total Guest Capacity
            </span>
          </div>
          <div>
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary block">
              3 Full
            </span>
            <span className="text-xs text-dark/65 font-medium mt-1 block">
              Modern Bathrooms
            </span>
          </div>
          <div>
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary block">
              100%
            </span>
            <span className="text-xs text-dark/65 font-medium mt-1 block">
              Sole Private Exclusivity
            </span>
          </div>
          <div>
            <span className="font-serif text-2xl md:text-3xl font-bold text-primary block">
              Stone
            </span>
            <span className="text-xs text-dark/65 font-medium mt-1 block">
              Natural Thermal Cooling
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
