'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Calendar, 
  Users, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';
import { generateWhatsAppLink } from '../lib/utils';
import { syncBookingToDatabase } from '../lib/integrations';
import { siteConfig } from '../data/content';

const bookingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().min(10, 'Valid 10-digit phone number required').max(14, 'Phone number too long'),
  email: z.string().email('Valid email address required'),
  guests: z.number().min(1, 'Minimum 1 guest').max(25, 'Maximum limit is 25 guests'),
  checkIn: z.string().min(1, 'Select check-in date'),
  checkOut: z.string().min(1, 'Select check-out date'),
  purpose: z.string().min(1, 'Select stay purpose'),
  message: z.string().max(500, 'Max 500 characters').optional()
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate >= checkInDate;
}, {
  message: 'Check-out date must be on or after check-in',
  path: ['checkOut']
});

type BookingFormSchema = z.infer<typeof bookingSchema>;

export const BookingForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [waLink, setWaLink] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 12,
      purpose: 'Family Stay'
    }
  });

  const watchGuests = watch('guests') || 12;

  const onSubmit = async (data: BookingFormSchema) => {
    setSubmitting(true);
    try {
      await syncBookingToDatabase({
        name: data.name,
        phone: data.phone,
        email: data.email,
        guests: data.guests,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        purpose: data.purpose,
        message: data.message || ''
      });

      const whatsappUrl = generateWhatsAppLink({
        name: data.name,
        guests: data.guests,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        purpose: data.purpose,
        message: data.message
      });

      setWaLink(whatsappUrl);
      setIsSuccess(true);

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1200);
    } catch (e) {
      console.error('Booking sync failed:', e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    reset();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="booking-form" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Reserve Your Private Getaway"
          subtitle="Direct Reservations & Inquiries"
          description="Send an inquiry directly to our management desk on WhatsApp or email. We respond with live availability, meal quotes, and booking confirmation within minutes."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column: Form (7 Cols) */}
          <motion.div
            layout
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-secondary-dark shadow-md"
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Your Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <User className="h-4 w-4" />
                        </span>
                        <input
                          id="name"
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          {...register('name')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        WhatsApp / Contact No.
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <Phone className="h-4 w-4" />
                        </span>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+91 98200 12345"
                          {...register('phone')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <Mail className="h-4 w-4" />
                        </span>
                        <input
                          id="email"
                          type="email"
                          placeholder="rahul@example.com"
                          {...register('email')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Check In */}
                    <div>
                      <label htmlFor="checkIn" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Check-In Date
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <input
                          id="checkIn"
                          type="date"
                          min={todayStr}
                          {...register('checkIn')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.checkIn && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.checkIn.message}
                        </p>
                      )}
                    </div>

                    {/* Check Out */}
                    <div>
                      <label htmlFor="checkOut" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Check-Out Date
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <input
                          id="checkOut"
                          type="date"
                          min={todayStr}
                          {...register('checkOut')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.checkOut && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.checkOut.message}
                        </p>
                      )}
                    </div>

                    {/* Guests */}
                    <div>
                      <label htmlFor="guests" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Total Guests ({watchGuests} Selected)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/40">
                          <Users className="h-4 w-4" />
                        </span>
                        <input
                          id="guests"
                          type="number"
                          min={1}
                          max={25}
                          {...register('guests', { valueAsNumber: true })}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
                        />
                      </div>
                      {errors.guests && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.guests.message}
                        </p>
                      )}
                    </div>

                    {/* Purpose of Stay */}
                    <div>
                      <label htmlFor="purpose" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Purpose of Stay
                      </label>
                      <div className="relative">
                        <select
                          id="purpose"
                          {...register('purpose')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 px-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all appearance-none"
                        >
                          <option value="Family Stay">Family Vacation</option>
                          <option value="Corporate Outing">Corporate Team Offsite</option>
                          <option value="Celebration">Birthday / Anniversary Bash</option>
                          <option value="Day Picnic">Day Picnic (10 AM - 6 PM)</option>
                          <option value="Other">Monsoon Relaxation</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark/40 text-xs">
                          ▼
                        </div>
                      </div>
                      {errors.purpose && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1 font-medium">
                          <AlertCircle className="h-3 w-3" /> {errors.purpose.message}
                        </p>
                      )}
                    </div>

                    {/* Message / Special Requests */}
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="text-xs uppercase font-bold tracking-wider text-dark/70 block mb-2">
                        Special Requests / Food Preferences
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-dark/40">
                          <MessageSquare className="h-4 w-4" />
                        </span>
                        <textarea
                          id="message"
                          rows={3}
                          placeholder="Tell us about meal preferences (veg/non-veg/jain), extra beds, barbecue setup, or custom timings..."
                          {...register('message')}
                          className="w-full bg-secondary border border-secondary-dark rounded-xl py-3 pl-10 pr-3.5 text-xs sm:text-sm font-medium text-dark focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={submitting}
                      className="w-full justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider bg-primary hover:bg-primary-light"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Inquiry on WhatsApp
                    </Button>
                    <p className="text-[11px] text-center text-dark/50 font-light mt-2.5">
                      Fast 15-minute response · No advance payment needed for inquiry
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 flex flex-col items-center"
                >
                  <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-5 border border-emerald-200">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs md:text-sm font-light text-dark/75 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you! Your details have been prepared. We are redirecting you to WhatsApp to connect with our estate concierge.
                  </p>

                  <div className="space-y-3 w-full max-w-sm">
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="accent" size="lg" className="w-full justify-center gap-2 text-xs font-bold uppercase tracking-wider py-3.5">
                        <MessageSquare className="h-4 w-4" />
                        Open WhatsApp Chat
                      </Button>
                    </a>
                    <Button
                      variant="secondary"
                      size="md"
                      className="w-full justify-center border border-secondary-dark text-xs uppercase tracking-wider text-dark/70 hover:text-primary py-2.5"
                      onClick={handleReset}
                    >
                      Inquire for Another Date
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Rate Inclusions & Trust Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary text-white rounded-3xl p-8 border border-white/10 shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 block mb-2">
                100% Private Estate Rental
              </span>
              <h3 className="font-serif text-2xl font-bold mb-4">
                What&apos;s Included in Your Stay
              </h3>
              
              <ul className="space-y-3 text-xs sm:text-sm font-light text-white/80">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Exclusive 1-acre property for your group only</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Private 12×24 ft filtered pool & sun deck</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Vitthal Rukhmini Mandir inside the property grounds</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>In-plot natural waterfall (monsoon seasonal) & mountain stream</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>4BHK layout + spacious Mezzanine Attic Sanctuary</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>24/7 on-site caretaker assistance & kitchen setup</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>High-speed fiber optic WiFi & generator backup</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Gated private parking for up to 6 cars</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 block">Standard Hours</span>
                  <span className="text-xs font-semibold text-white">Check-in: 1:00 PM · Check-out: 11:00 AM</span>
                </div>
              </div>
            </div>

            {/* Direct Call Card */}
            <div className="bg-white rounded-2xl p-6 border border-secondary-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-dark/50 block">Need Instant Assistance?</span>
                <span className="font-serif text-lg font-bold text-primary block mt-0.5">{siteConfig.phone}</span>
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="p-3 rounded-full bg-primary text-white hover:bg-primary-light transition-colors"
                aria-label="Call Reservations"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
