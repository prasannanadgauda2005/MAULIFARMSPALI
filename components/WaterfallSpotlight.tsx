'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Play, X, Waves, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';
import { useCustomImages } from '../hooks/useCustomImages';

export const WaterfallSpotlight = () => {
  const { images } = useCustomImages();
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="waterfall-spotlight" className="compact-section bg-primary text-white relative overflow-hidden">
      {/* Dynamic Background accents */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Text Description Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">
              Signature Estate Feature
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Our Crown Jewel: <br />
              <span className="text-accent">A Private Cascading Waterfall</span>
            </h2>

            <div className="space-y-4 text-white/80 text-xs md:text-sm leading-relaxed font-light mb-8">
              <p>
                At Mauli Farms Pali, nature is not just a view—it is a physical experience. Tucked inside the borders of our gated 1.5-acre property lies a **private, natural cascading waterfall** that flows directly during the monsoon seasons.
              </p>
              <p>
                The clean mountain water cascades down the natural stone steps of our backyard, pooling into a shallow, refreshing stream that flows directly past the outdoor seating decks and manicured lawns. 
              </p>
              <p>
                Whether you want to sit by the pool and listen to the soothing rushing water, or stand directly under the cool, refreshing fall, this USP offers complete exclusivity. You never share this space with outside tourists.
              </p>
            </div>

            {/* Accent Card */}
            <div className="glass rounded-2xl p-4 mb-8 border border-white/10 flex items-start gap-3">
              <Waves className="h-5 w-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-accent">Pristine Spring Flow</h4>
                <p className="text-[11px] text-white/70 font-light mt-0.5 leading-relaxed">
                  Naturally cooled spring water flows directly from the surrounding Pali hills, providing a pure, chemical-free splash experience.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setIsOpen(true)}
                variant="accent"
                className="py-3 px-6 rounded-full flex items-center gap-2 group text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <Play className="h-4 w-4 fill-white/20 group-hover:scale-110 transition-transform" />
                Watch Waterfall Video
              </Button>
            </div>
          </motion.div>

          {/* Interactive Looping Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto min-h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-lg cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-primary-dark/30 group-hover:bg-primary-dark/40 transition-colors z-10" />

            {/* Play Button Indicator */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-primary transition-all duration-300"
              >
                <Play className="h-6 w-6 fill-current ml-1" />
              </motion.div>
            </div>

            {/* Dynamic Loop video for premium look */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              poster={images.waterfallBg}
            >
              <source src={images.waterfallVideo} type="video/mp4" />
            </video>

            {/* Bottom floating tag */}
            <div className="absolute bottom-4 left-4 z-20 glass px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-accent animate-pulse" />
               monsoons live view
            </div>
          </motion.div>

        </div>
      </div>

      {/* Full screen video modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-primary-dark/95 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl z-10"
            >
              {/* Controls Header */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-20 flex items-center justify-between text-white">
                <span className="font-serif text-sm font-semibold tracking-wide">Pali Cascading Waterfall — Mauli Farms</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10 transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main player - lazy load full stream */}
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
