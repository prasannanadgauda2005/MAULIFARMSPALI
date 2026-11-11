'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { siteConfig } from '../data/content';

export const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-dark text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-white/20 bg-white/10 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Mauli Farms Pali Logo"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div>
                <span className="font-logo text-2xl font-bold tracking-wide text-white block">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 block">
                  Pali, Maharashtra
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed max-w-sm mb-6">
              An authentic 1-acre private farmhouse featuring a private swimming pool, Vitthal Rukhmini Mandir, in-plot seasonal waterfall & stream for family and friends.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-white/75">
              <li>
                <button onClick={() => scrollTo('#home')} className="hover:text-amber-200 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#about')} className="hover:text-amber-200 transition-colors">
                  About Estate
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#villa')} className="hover:text-amber-200 transition-colors">
                  Villa Spaces & Rooms
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#highlights')} className="hover:text-amber-200 transition-colors">
                  Waterfall & Highlights
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#gallery')} className="hover:text-amber-200 transition-colors">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#location')} className="hover:text-amber-200 transition-colors">
                  Location & Routes
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Hours (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300 mb-4">
              Estate Address
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-light text-white/75 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </p>
              <p className="pt-2 text-[11px] text-white/60">
                Near Ballaleshwar Ashtavinayak Temple (4 km)
              </p>
              <p className="text-[11px] text-white/60">
                Reservation Hours: 9:00 AM – 9:00 PM (Daily)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-white/50">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Private Farmhouse Stay in Pali, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
};
