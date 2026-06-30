'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useScroll } from '../hooks/useScroll';
import { siteConfig } from '../data/content';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'The Villa', href: '#accommodation' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar = () => {
  const { scrolled } = useScroll(50);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper to handle smooth scroll on link click
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
          scrolled 
            ? 'bg-white shadow-md border-b border-secondary-dark/50 py-3' 
            : 'bg-gradient-to-b from-black/60 to-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Mauli Farms Pali Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <span className={cn(
              'font-logo text-xl md:text-2xl font-bold tracking-wider transition-colors duration-300',
              scrolled ? 'text-primary' : 'text-white'
            )}>
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-7">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={cn(
                  'text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300',
                  scrolled ? 'text-primary' : 'text-white/90'
                )}
              >
                {item.label}
              </a>
            ))}
            
            <Button
              variant={scrolled ? 'primary' : 'accent'}
              size="sm"
              onClick={() => {
                const target = document.querySelector('#booking-form');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Now
            </Button>
          </div>

          {/* Hamburger Trigger */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className={cn(
                'p-2 rounded-full transition-colors focus:outline-none',
                scrolled ? 'text-primary hover:bg-secondary' : 'text-white hover:bg-white/10'
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] z-40 bg-white flex flex-col p-6 border-t border-secondary-dark lg:hidden"
          >
            <div className="flex flex-col space-y-5 my-auto">
              {menuItems.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="font-serif text-2xl text-primary hover:text-accent tracking-wide transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto space-y-4"
            >
              <div className="border-t border-secondary-dark pt-6 text-sm text-primary/60 font-medium">
                Pali, Maharashtra • {siteConfig.phone}
              </div>
              
              <Button
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  const target = document.querySelector('#booking-form');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Inquire & Book Now <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
