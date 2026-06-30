'use client';

import React from 'react';
import { Landmark, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '../data/content';

const footerNavs = [
  {
    title: 'Discover',
    items: [
      { name: 'Home', href: '#home' },
      { name: 'About Estate', href: '#about' },
      { name: 'The Villa', href: '#accommodation' },
      { name: 'Experiences', href: '#experiences' }
    ]
  },
  {
    title: 'Details',
    items: [
      { name: 'Amenities List', href: '#amenities' },
      { name: 'Location Map', href: '#location' },
      { name: 'Make Booking', href: '#booking-form' }
    ]
  }
];

export const Footer = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark text-white border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-16 mb-16">
          
          {/* Logo & Info column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Mauli Farms Pali Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-logo text-2xl font-bold tracking-wider text-accent block">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-light text-white/50 tracking-widest uppercase block">
                  Pali, Maharashtra
                </span>
              </div>
            </div>
            <p className="text-sm font-light leading-relaxed text-white/70 max-w-sm mb-6">
              Escape the city noise. Immerse yourself in premium privacy, natural hill landscapes, and curated organic farm lifestyle experiences.
            </p>
            
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-accent text-white/60 hover:text-accent transition-colors"
                aria-label="Instagram link"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-accent text-white/60 hover:text-accent transition-colors"
                aria-label="Facebook link"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 hover:border-accent text-white/60 hover:text-accent transition-colors"
                aria-label="Youtube link"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          {footerNavs.map((nav, idx) => (
            <div key={idx} className="lg:col-span-2.5 md:col-span-1">
              <h4 className="text-xs uppercase font-bold text-accent tracking-widest mb-6">
                {nav.title}
              </h4>
              <ul className="space-y-4">
                {nav.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleScrollTo(e, item.href)}
                      className="text-sm font-light text-white/65 hover:text-accent transition-colors flex items-center gap-1 group"
                    >
                      {item.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase font-bold text-accent tracking-widest mb-6">
              Official Address
            </h4>
            <address className="not-italic text-sm font-light text-white/65 leading-relaxed space-y-4">
              <p>{siteConfig.address}</p>
              <p className="font-semibold text-accent mt-2">
                Inquiries: {siteConfig.phone}
              </p>
            </address>
          </div>

        </div>

        <hr className="border-white/5 mb-8" />

        {/* Legal copyrights bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-white/45">
          <p>© {new Date().getFullYear()} Mauli Farms, Pali. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
