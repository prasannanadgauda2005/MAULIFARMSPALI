'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { testimonials } from '../data/content';

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Verified Experiences from Real Guests"
          subtitle="Guest Reviews & Ratings"
          description="Rated 4.8★ on Google with over 1,200 delighted guests hosted across families, retreats, and celebrations."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-secondary rounded-3xl p-8 border border-secondary-dark/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 5-Star Row */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-dark/40 ml-2">
                    5.0 Google Review
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-light leading-relaxed text-dark/85 italic mb-6">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Reviewer info */}
              <div className="pt-5 border-t border-secondary-dark flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-dark/60 font-light mt-0.5">
                    {review.role}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
