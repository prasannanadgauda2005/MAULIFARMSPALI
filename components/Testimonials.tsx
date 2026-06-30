'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { testimonials } from '../data/content';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle
          title="Loved by Our Guests"
          subtitle="Guest Reviews"
          align="center"
        />

        {/* Custom Glass Review Slider */}
        <div className="relative">
          <div className="max-w-4xl mx-auto relative min-h-[320px] md:min-h-[260px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full glass-card rounded-3xl p-8 md:p-12 border border-secondary-dark/60 shadow-lg flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative"
              >
                {/* Decorative Quote Icon */}
                <div className="absolute top-4 right-6 text-accent/15 select-none font-serif text-8xl pointer-events-none">
                  “
                </div>

                {/* Profile Avatar Column */}
                <div className="flex flex-col items-center text-center shrink-0">
                  <div className="h-16 w-16 rounded-full bg-accent text-white flex items-center justify-center font-serif text-2xl font-semibold shadow-sm mb-3 border-2 border-accent-light/20">
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <h4 className="font-serif text-base font-bold text-primary">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-accent mt-1">
                    {testimonials[activeIndex].role}
                  </p>
                </div>

                {/* Review Text Column */}
                <div className="flex-grow">
                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonials[activeIndex].rating 
                            ? 'text-accent fill-accent' 
                            : 'text-dark/20'
                        }`}
                      />
                    ))}
                    <span className="text-[10px] uppercase font-bold tracking-wider text-dark/40 ml-2">
                      Verified Review
                    </span>
                  </div>

                  <p className="text-sm font-light leading-relaxed text-dark/85 italic mb-4">
                    "{testimonials[activeIndex].content}"
                  </p>

                  <span className="text-[10px] font-semibold text-dark/50 block">
                    Posted {testimonials[activeIndex].date}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3.5 rounded-full bg-secondary border border-secondary-dark hover:bg-primary hover:text-white transition-all text-primary focus:outline-none shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3.5 rounded-full bg-secondary border border-secondary-dark hover:bg-primary hover:text-white transition-all text-primary focus:outline-none shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-6 bg-accent' 
                    : 'w-2 bg-secondary-dark hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
