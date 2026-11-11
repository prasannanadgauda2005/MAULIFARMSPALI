'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useScroll } from '../hooks/useScroll';
import { siteConfig } from '../data/content';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Rooms & Layout', href: '#villa' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#book' },
];

import { TopNoticeBar } from './TopNoticeBar';

export const Navbar = () => {
  const { scrolled } = useScroll(30);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <TopNoticeBar />
        <div
          className={cn(
            'transition-all duration-300 px-6 lg:px-12',
            scrolled
              ? 'bg-secondary/95 backdrop-blur-md py-3 border-b border-secondary-dark shadow-sm'
              : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5 text-white'
          )}
        >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#home');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/30 bg-primary/20 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Mauli Farms Pali"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-logo text-xl sm:text-2xl font-bold tracking-wide transition-colors',
                  scrolled ? 'text-primary' : 'text-white'
                )}
              >
                {siteConfig.name}
              </span>
              <span
                className={cn(
                  'text-[10px] tracking-[0.2em] uppercase font-medium -mt-1',
                  scrolled ? 'text-dark/60' : 'text-white/70'
                )}
              >
                Pali, Maharashtra
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={cn(
                  'transition-colors hover:text-amber-600',
                  scrolled ? 'text-dark/80' : 'text-white/90'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className={cn(
                'flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition-colors',
                scrolled
                  ? 'text-primary hover:bg-secondary-dark'
                  : 'text-white hover:bg-white/10'
              )}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{siteConfig.phone}</span>
            </a>

            <button
              onClick={() => scrollTo('#book')}
              className="bg-accent hover:bg-accent-light text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
            >
              Reserve Stay
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => scrollTo('#book')}
              className="bg-accent text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={cn(
                'p-2 rounded-full',
                scrolled ? 'text-primary hover:bg-secondary-dark' : 'text-white hover:bg-white/10'
              )}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 bg-secondary flex flex-col p-6 border-t border-secondary-dark md:hidden">
          <div className="flex flex-col space-y-4 my-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className="font-serif text-2xl text-primary hover:text-accent py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-secondary-dark space-y-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%20Pali%2C%20I%20would%20like%20to%20inquire%20about%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-700 text-white rounded-xl text-sm font-semibold"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-secondary-dark text-primary rounded-xl text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              Call: {siteConfig.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
