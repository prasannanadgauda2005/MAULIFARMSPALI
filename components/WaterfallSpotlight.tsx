'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX, Droplets, ShieldCheck } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';
import { useCustomImages } from '../hooks/useCustomImages';

export const WaterfallSpotlight = () => {
  const { images } = useCustomImages();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleBookNow = () => {
    const target = document.querySelector('#booking-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="waterfall" className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <SectionTitle
          title="The Crown Jewel of Pali: An In-Plot Natural Waterfall"
          subtitle="Exclusive Nature Feature"
          description="A rare natural wonder that crowded public places cannot replicate. Experience cool, unpolluted mountain water cascading down natural stone steps directly into the property lawn."
          dark
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="space-y-5 text-white/80 text-sm md:text-base font-light leading-relaxed mb-8">
              <p>
                At Mauli Farms, nature is not a view viewed through glass—it is an intimate, sensory encounter. Flowing straight from the protected watersheds of the surrounding Pali and Sudhagad hills, a <strong>natural freshwater spring cascades over natural basalt rock formations</strong> nestled right inside our gated boundary.
              </p>
              <p>
                The waterfall gathers into a crystal-clear, shallow stream that babbles peacefully across the lawn, running just steps away from the swimming pool and outdoor lounge decks. 
              </p>
              <p>
                Because the estate is booked exclusively for your group, you never share this pristine pool or waterfall with outside day-trippers. Dip your feet in the water, shower under the cool cascades during monsoons, or fall asleep to the hypnotic sound of rushing mountain water.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                <Droplets className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Natural Spring Water</h4>
                  <p className="text-[11px] text-white/60 font-light mt-0.5 leading-snug">
                    Zero chlorine or chemicals. Pure rainwater runoff filtered through virgin hill stone.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">100% Gated & Private</h4>
                  <p className="text-[11px] text-white/60 font-light mt-0.5 leading-snug">
                    Completely inside our private perimeter with safe, shallow stone plunge steps.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setIsOpen(true)}
                variant="accent"
                size="md"
                className="py-3 px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Play className="h-4 w-4 fill-white/20" />
                Watch Waterfall Video
              </Button>
              <Button
                onClick={handleBookNow}
                variant="outline"
                size="md"
                className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-white border-white/30 hover:bg-white hover:text-primary transition-colors"
              >
                Inquire For Monsoons
              </Button>
            </div>
          </motion.div>

          {/* Video Preview Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-2xl group cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-primary-dark/30 group-hover:bg-primary-dark/40 transition-colors z-10" />

            {/* Play Button Indicator */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
            </div>

            {/* Video Loop */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              poster={images.waterfallBg || '/images/gallery/villa-exterior-3.jpg'}
            >
              <source src={images.waterfallVideo} type="video/mp4" />
            </video>

            <div className="absolute bottom-4 left-4 z-20 glass px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white border border-white/15 flex items-center gap-1.5">
              <span>Recorded on Property · Monsoons</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl z-10"
            >
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between text-white">
                <span className="font-serif text-sm font-semibold tracking-wide">
                  Private Cascading Waterfall — Mauli Farms Pali
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 transition-colors"
                    aria-label="Close video"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <video
                autoPlay
                controls
                muted={isMuted}
                playsInline
                className="h-full w-full object-contain"
                src={images.waterfallVideo}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
