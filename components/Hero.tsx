'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquare, ArrowDown, Waves, Landmark, Users, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/content';
import { useCustomImages } from '../hooks/useCustomImages';

export const Hero = () => {
  const { images } = useCustomImages();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImageSrc = images.heroBg || '/images/gallery/villa-exterior-day.jpg';

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-primary-dark text-white pt-28 pb-8">
      {/* Dynamic Background Image from Admin / Backend */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageSrc}
          alt="Mauli Farms Private Farmhouse Stay Pali"
          fill
          priority
          unoptimized
          className="object-cover object-center scale-[1.01]"
          sizes="100vw"
        />
        {/* Soft elegant gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-black/40 z-10" />
      </div>

      {/* Main Text Content - Clean & uncluttered */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center my-auto">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-300 mb-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
          <MapPin className="h-3.5 w-3.5 text-amber-300" />
          <span>Pali, Maharashtra · 2.5 Hrs from Mumbai & Pune</span>
        </div>

        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.15] mb-5"
          style={{ textWrap: 'balance' }}
        >
          Natural Farm Stay with <br />
          <span className="italic text-amber-200">Family & Friends</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed max-w-2xl mx-auto mb-8">
          A peaceful 1-acre private countryside farmhouse with a private swimming pool, Vitthal Rukhmini Mandir, in-plot seasonal waterfall & stream, and home-cooked meals for up to 25 guests.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%20Pali%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20farmhouse%20for%20our%20family%20and%20friends.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-light text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => scrollTo('#about')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-7 py-3.5 rounded-full border border-white/25 backdrop-blur-sm transition-all"
          >
            <span>Explore Farmhouse</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Clean Trust Bar */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 w-full pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-white/15 pt-5 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/90">
            <Waves className="h-4 w-4 text-amber-300 shrink-0" />
            <span>Private Swimming Pool</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/90">
            <Landmark className="h-4 w-4 text-amber-300 shrink-0" />
            <span>Vitthal Rukhmini Mandir</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/90">
            <Sparkles className="h-4 w-4 text-amber-300 shrink-0" />
            <span>Seasonal Waterfall & Stream</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-white/90">
            <Users className="h-4 w-4 text-amber-300 shrink-0" />
            <span>1 Acre for Up to 25 Guests</span>
          </div>
        </div>
      </div>
    </section>
  );
};
