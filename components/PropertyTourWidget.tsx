'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Volume2, VolumeX, SquarePlay } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { useCustomImages } from '../hooks/useCustomImages';

export const PropertyTourWidget = () => {
  const { images } = useCustomImages();
  const { scrolled } = useScroll(600); // Only show after scrolling past Hero (600px)
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // If user dismissed it, do not show again during this session
  useEffect(() => {
    const dismissedStatus = sessionStorage.getItem('tour_widget_dismissed');
    if (dismissedStatus === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    sessionStorage.setItem('tour_widget_dismissed', 'true');
  };

  const videoUrl = images.tourVideo;

  if (isDismissed) return null;

  return (
    <>
      {/* Floating Mini Player / Badge */}
      <AnimatePresence>
        {scrolled && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 cursor-pointer group flex items-center gap-3 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl border border-secondary-dark/60 shadow-lg hover:shadow-xl transition-all duration-300 max-w-[240px]"
          >
            {/* Loop video snippet container */}
            <div className="relative h-12 w-16 rounded-xl overflow-hidden bg-primary shrink-0 border border-secondary-dark/80">
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-primary-dark/30 transition-colors z-10 flex items-center justify-center">
                <Play className="h-4.5 w-4.5 text-white fill-white/20 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover scale-110"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>

            {/* Title / Description */}
            <div className="pr-4">
              <span className="text-[9px] uppercase font-bold text-accent tracking-widest block">Virtual Tour</span>
              <span className="text-xs font-semibold text-primary block leading-tight mt-0.5 group-hover:text-accent transition-colors">
                Watch Property Tour
              </span>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-1.5 -left-1.5 p-1 rounded-full bg-white hover:bg-accent hover:text-white border border-secondary-dark/60 text-dark/40 shadow-sm transition-colors hover:scale-105"
              aria-label="Dismiss tour prompt"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full screen Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-primary-dark/80 backdrop-blur-sm"
            />

            {/* Video Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl z-10"
            >
              {/* Header inside modal */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-20 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <SquarePlay className="h-5 w-5 text-accent" />
                  <span className="font-serif text-sm font-semibold tracking-wide">Mauli Farms Pali — Property Tour</span>
                </div>
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

              {/* Main Video Frame */}
              <video
                autoPlay
                controls
                muted={isMuted}
                playsInline
                className="h-full w-full object-contain"
                src={videoUrl}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
