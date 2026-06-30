'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { siteConfig } from '../data/content';
import { Button } from './ui/Button';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Connect with Our Reservation Desk"
          subtitle="Get In Touch"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          {/* Details column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-between p-2"
          >
            <div>
              <h3 className="font-serif text-3xl font-bold text-primary mb-6">
                Planning your next getaway?
              </h3>
              <p className="text-sm font-light text-dark/75 leading-relaxed max-w-xl mb-10">
                Contact our booking agents for availability, custom event catering rates, or visual guides of the farm. We typically reply to WhatsApp messages and emails within 15 minutes during business hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone item */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-secondary border border-secondary-dark text-primary shadow-sm shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/45 tracking-wider">Direct Hotline</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-base font-bold text-primary hover:text-accent transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-secondary border border-secondary-dark text-primary shadow-sm shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/45 tracking-wider">Email Inquiry</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-base font-bold text-primary hover:text-accent transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-secondary border border-secondary-dark text-primary shadow-sm shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-dark/45 tracking-wider">Reservation Office Hours</p>
                  <p className="text-sm font-semibold text-primary-dark">
                    {siteConfig.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <p className="text-[10px] uppercase font-bold text-dark/45 tracking-widest mb-4">Follow the Experience</p>
              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary border border-secondary-dark text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
                  aria-label="Watch our YouTube video tours"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 glass-card rounded-3xl p-8 border border-secondary-dark/60 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Visual accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">Instant Chat</span>
              <h4 className="font-serif text-2xl font-bold text-primary mb-4">Direct WhatsApp Booking</h4>
              <p className="text-xs font-light text-dark/75 leading-relaxed mb-8">
                Skip the email queue entirely. Click below to message our estate caretaker directly on WhatsApp. We can share real-time pictures of the farm, custom meal pricing menus, and process immediate booking confirmation tokens.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-secondary/70 border border-secondary-dark text-xs text-primary font-semibold flex items-center gap-2">
                🟢 Caretaker is currently ONLINE and ready to chat.
              </div>
              
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Mauli%20Farms%2C%20I%20would%20like%20to%20chat%20about%20booking%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="accent" size="lg" className="w-full justify-center gap-2 flex py-4">
                  <MessageSquare className="h-5 w-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
