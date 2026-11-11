'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { siteConfig } from '../data/content';
import { Button } from './ui/Button';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Connect with Our Reservations Desk"
          subtitle="Get In Touch"
          description="Have questions about dates, custom food catering, or group sizes? Reach out directly via WhatsApp, phone, or email."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Details column (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
                Planning Your Nature Retreat?
              </h3>
              <p className="text-sm font-light text-dark/75 leading-relaxed max-w-xl mb-8">
                Our on-property management team is pleased to assist with custom meal arrangements, birthday decor, waterfall access advisories, and booking confirmation.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-secondary-dark">
                <div className="h-10 w-10 rounded-xl bg-white border border-secondary-dark text-primary flex items-center justify-center shrink-0">
                  <Phone className="h-4.5 w-4.5 text-amber-800" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/50 tracking-wider">Direct Hotline</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm sm:text-base font-bold text-primary hover:text-amber-800 transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-secondary-dark">
                <div className="h-10 w-10 rounded-xl bg-white border border-secondary-dark text-primary flex items-center justify-center shrink-0">
                  <Mail className="h-4.5 w-4.5 text-amber-800" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/50 tracking-wider">Email Inquiry</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm sm:text-base font-bold text-primary hover:text-amber-800 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-secondary-dark">
                <div className="h-10 w-10 rounded-xl bg-white border border-secondary-dark text-primary flex items-center justify-center shrink-0">
                  <Clock className="h-4.5 w-4.5 text-amber-800" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/50 tracking-wider">Desk Hours</p>
                  <p className="text-sm font-semibold text-primary">
                    {siteConfig.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-secondary-dark flex items-center gap-3">
              <span className="text-xs font-medium text-dark/60 mr-2">Follow Us:</span>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </motion.div>

          {/* Quick Contact WhatsApp Card (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 bg-secondary rounded-3xl p-8 sm:p-10 border border-secondary-dark flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 mb-2 block">
                Instant Chat & Photos
              </span>
              <h4 className="font-serif text-2xl font-bold text-primary mb-3">
                Connect Directly on WhatsApp
              </h4>
              <p className="text-xs sm:text-sm font-light text-dark/75 leading-relaxed mb-6">
                Receive live photos of the farmhouse, current waterfall flow status, directions map, and customized food menus directly on your phone.
              </p>

              <div className="space-y-2.5 text-xs text-dark/70 font-light mb-8">
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Fast response within 15 minutes
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Customized quotes for family, birthday & corporate groups
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Live date availability checks
                </p>
              </div>
            </div>

            <div>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%20Pali%2C%20I%20would%20like%20to%20inquire%20about%20booking%20the%20farmhouse.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="accent" size="lg" className="w-full justify-center gap-2 text-xs font-bold uppercase tracking-wider py-3.5 bg-accent hover:bg-accent-light shadow-md">
                  <MessageSquare className="h-4 w-4" />
                  Chat with Us on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
