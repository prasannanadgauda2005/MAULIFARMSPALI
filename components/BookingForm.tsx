'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Users, Mail, Phone, User, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';
import { generateWhatsAppLink } from '../lib/utils';
import { syncBookingToDatabase } from '../lib/integrations';

// Form Validation Schema
const bookingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(14, 'Phone number too long'),
  email: z.string().email('Invalid email address'),
  guests: z.number().min(1, 'Minimum 1 guest required').max(25, 'Maximum limit is 25 guests'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  purpose: z.string().min(1, 'Please select your purpose of stay'),
  message: z.string().max(500, 'Message cannot exceed 500 characters').optional()
}).refine((data) => {
  const checkInDate = new Date(data.checkIn);
  const checkOutDate = new Date(data.checkOut);
  return checkOutDate > checkInDate;
}, {
  message: 'Check-out date must be after check-in date',
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
    formState: { errors },
    reset
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: 12,
      purpose: 'Family Stay'
    }
  });

  const onSubmit = async (data: BookingFormSchema) => {
    setSubmitting(true);
    try {
      // Future ready integrations call
      const response = await syncBookingToDatabase({
        name: data.name,
        phone: data.phone,
        email: data.email,
        guests: data.guests,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        purpose: data.purpose,
        message: data.message || ''
      });
      
      if (response.success) {
        // Generate prefilled WhatsApp link
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
        
        // Open WhatsApp in new window automatically after brief delay
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    reset();
  };

  // Get current date for min attribute in HTML date picker
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="booking-form" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          title="Inquire About Your Stay"
          subtitle="Check Availability"
          align="center"
        />

        <motion.div
          layout
          className="glass-card rounded-3xl p-8 md:p-12 border border-secondary-dark/60 shadow-xl overflow-hidden relative"
        >
          {/* Visual premium corner gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <User className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div>
                    <label htmlFor="phone" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <Phone className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register('phone')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <Mail className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Check In Date */}
                  <div>
                    <label htmlFor="checkIn" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Check-In Date
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <Calendar className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="checkIn"
                        type="date"
                        min={todayStr}
                        {...register('checkIn')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.checkIn && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.checkIn.message}
                      </p>
                    )}
                  </div>

                  {/* Check Out Date */}
                  <div>
                    <label htmlFor="checkOut" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Check-Out Date
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <Calendar className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="checkOut"
                        type="date"
                        min={todayStr}
                        {...register('checkOut')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.checkOut && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.checkOut.message}
                      </p>
                    )}
                  </div>

                  {/* Guests count */}
                  <div>
                    <label htmlFor="guests" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Total Guests
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40">
                        <Users className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="guests"
                        type="number"
                        placeholder="12"
                        {...register('guests', { valueAsNumber: true })}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium"
                      />
                    </div>
                    {errors.guests && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.guests.message}
                      </p>
                    )}
                  </div>

                  {/* Purpose dropdown */}
                  <div>
                    <label htmlFor="purpose" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Purpose of Stay
                    </label>
                    <div className="relative">
                      <select
                        id="purpose"
                        {...register('purpose')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium appearance-none"
                      >
                        <option value="Family Stay">Family Vacation</option>
                        <option value="Corporate Outing">Corporate Meeting / Retreat</option>
                        <option value="Celebration">Birthday / Celebration</option>
                        <option value="Day Picnic">Day Picnic</option>
                        <option value="Other">Other Event</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-dark/50">
                        ▼
                      </div>
                    </div>
                    {errors.purpose && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.purpose.message}
                      </p>
                    )}
                  </div>

                  {/* Custom Message */}
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="text-xs uppercase font-semibold tracking-wider text-dark/70 block mb-2">
                      Additional Requests / Notes
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-4 text-dark/40">
                        <MessageSquare className="h-4.5 w-4.5" />
                      </span>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tell us about food requirements, decorations, music systems or custom hours..."
                        {...register('message')}
                        className="w-full bg-white border border-secondary-dark rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-dark font-medium resize-none"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={submitting}
                    className="w-full justify-center gap-2 flex"
                  >
                    Send Inquiry to WhatsApp
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="h-16 w-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6 border border-accent/20">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-primary mb-4">
                  Inquiry Initiated Successfully!
                </h3>
                <p className="text-sm font-light text-dark/75 max-w-md mx-auto mb-8 leading-relaxed">
                  Your inquiry details have been saved. We are redirecting you to WhatsApp to complete your booking with our caretaker staff.
                </p>
                
                <div className="space-y-4 w-full max-w-sm">
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="accent" size="lg" className="w-full justify-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Open WhatsApp Manually
                    </Button>
                  </a>
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full justify-center border border-secondary-dark text-dark/70 hover:text-primary"
                    onClick={handleReset}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
