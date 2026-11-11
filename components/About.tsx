'use client';

import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';

const highlights = [
  'Entire 1-acre property exclusively for your group (no other guests)',
  'Private 12×24 ft swimming pool with spacious sun deck',
  'Vitthal Rukhmini Mandir built inside the property for quiet prayers',
  'In-plot natural waterfall (monsoon seasonal) & freshwater stream',
  'Master Bed, Bedroom Two, and Upper Floor Dormitory with Big Balcony',
  'In-house caretakers serving fresh home-cooked Maharashtrian meals',
  'Pet-friendly gated grounds where pets can roam freely',
  'High-speed WiFi, music speaker, and power backup'
];

export const About = () => {
  const { images } = useCustomImages();
  const aboutImageSrc = images.aboutBg || '/images/about-villa.jpg';

  return (
    <section id="about" className="py-20 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Image with Subtle Frame from Admin */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-secondary-dark shadow-md bg-secondary-dark">
            <Image
              src={aboutImageSrc}
              alt="Mauli Farms Pali Farmhouse and Grounds"
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 block mb-1">
                Pali, Sudhagad
              </span>
              <p className="font-serif text-lg font-normal text-white/95">
                A natural retreat designed for privacy, fresh hill air, and joyful family celebrations.
              </p>
            </div>
          </div>

          {/* Right: Clean Narrative & Features */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-2 block">
              About The Farmhouse
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-primary tracking-tight leading-tight mb-4">
              Your Own Countryside Haven in the Sahyadris
            </h2>

            <div className="space-y-3.5 text-dark/80 text-sm font-light leading-relaxed mb-6">
              <p>
                Located just <strong>2.5 hours from Mumbai and Pune</strong>, Mauli Farms is a peaceful countryside farmhouse set across <strong>1 acre of gated greenery</strong> in Pali, Maharashtra.
              </p>
              <p>
                Unlike crowded public resorts, <strong>we host only one group at a time</strong>. The private swimming pool, Vitthal Rukhmini Mandir, in-plot seasonal waterfall & stream, lawns, and full farmhouse are reserved exclusively for your family and friends.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-secondary-dark">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-dark/85 font-normal">
                  <Check className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
