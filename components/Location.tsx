'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Landmark, Compass } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { travelDistances, nearbyAttractions, siteConfig } from '../data/content';

export const Location = () => {
  return (
    <section id="location" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Getting to Paradise"
          subtitle="Location & Travel Times"
          align="center"
        />

        {/* Maps & Directions Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-stretch">
          {/* Map Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 h-[350px] lg:h-auto min-h-[380px] rounded-3xl overflow-hidden border border-secondary-dark/60 shadow-md relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.636928812543!2d73.21385412959828!3d18.53483259837943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be80ee0e94bb555%3A0xe10433246ebcf259!2sPali%2C%20Maharashtra%20410205!5e0!3m2!1sen!2sin!4v1719590481234!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map embed location of Pali, Maharashtra"
            />
            <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl flex items-start gap-2.5 shadow-lg border border-white/20">
              <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-sm font-bold text-primary">Estate Address</h4>
                <p className="text-[11px] text-dark/75 mt-1 font-light leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Travel Distances Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {travelDistances.map((dist, idx) => (
              <div
                key={dist.city}
                className="p-4 rounded-3xl bg-secondary border border-secondary-dark/60 flex items-start gap-4 hover:border-accent hover:shadow-sm transition-all duration-300"
              >
                <div className="p-2.5 rounded-2xl bg-white border border-secondary-dark text-primary shadow-sm shrink-0">
                  <Car className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-serif text-sm font-bold text-primary">{dist.city}</h4>
                    <span className="text-xs font-bold text-accent tracking-wide">{dist.distance}</span>
                  </div>
                  <p className="text-[11px] font-bold text-primary-dark/80 mt-0.5">{dist.time}</p>
                  <p className="text-[10px] text-dark/60 font-light mt-1 leading-relaxed">
                    {dist.route}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Nearby attractions & temples */}
        <div className="border-t border-secondary-dark/60 pt-16">
          <SectionTitle
            title="Explore the Surroundings"
            subtitle="Nearby Attractions"
            align="center"
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyAttractions.map((attract, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={attract.name}
                className="p-6 rounded-3xl bg-white border border-secondary-dark/50 hover:border-accent hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2.5 rounded-xl bg-secondary border border-secondary-dark text-primary shadow-sm">
                      {attract.name.includes('Temple') ? <Landmark className="h-4.5 w-4.5" /> : <Compass className="h-4.5 w-4.5" />}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full">
                      {attract.distance} away
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-primary mb-2">{attract.name}</h4>
                  <p className="text-xs font-light text-dark/75 leading-relaxed">
                    {attract.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-secondary-dark/40 flex items-center gap-1.5 text-[10px] uppercase font-bold text-primary/75 tracking-wider">
                  <Navigation className="h-3 w-3 text-accent" />
                  <span>Direction available via Caretaker</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
