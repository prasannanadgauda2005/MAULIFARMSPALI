'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle2, User } from 'lucide-react';
import { siteConfig } from '../data/content';

export const BookingSection = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('12');
  const [purpose, setPurpose] = useState('Family Stay');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const text = `Hello Mauli Farms Pali,\n\nI would like to inquire about booking the private villa:\n- Name: ${name}\n- Phone: ${phone}\n- Check-In: ${checkIn || 'Flexible'}\n- Check-Out: ${checkOut || 'Flexible'}\n- Guests: ${guests}\n- Purpose: ${purpose}${message ? `\n- Notes: ${message}` : ''}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 800);
  };

  return (
    <section id="book" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800 mb-3 block">
            Direct Reservations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-primary tracking-tight leading-[1.15] mb-4">
            Plan Your Private Stay
          </h2>
          <p className="text-dark/70 text-sm sm:text-base font-light leading-relaxed">
            Connect directly with our reservation desk. We share live dates, custom food menus, and confirmation on WhatsApp within 15 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* Left: Simple 5-field Form (7 cols) */}
          <div className="lg:col-span-7 bg-secondary rounded-3xl p-7 sm:p-9 border border-secondary-dark shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/40" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98200 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                      Check-In Date
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 px-3.5 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                      Check-Out Date
                    </label>
                    <input
                      type="date"
                      min={checkIn || todayStr}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 px-3.5 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                      Guest Count
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 px-3.5 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    >
                      <option value="4-8">4–8 Guests (Small Group)</option>
                      <option value="12">12 Guests (Standard Villa)</option>
                      <option value="15-18">15–18 Guests (Large Group)</option>
                      <option value="20-25">20–25 Guests (Full Capacity)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                      Occasion
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full bg-white border border-secondary-dark rounded-xl py-3 px-3.5 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700"
                    >
                      <option value="Family Stay">Family Vacation</option>
                      <option value="Celebration">Birthday / Anniversary</option>
                      <option value="Corporate Retreat">Corporate Offsite</option>
                      <option value="Friends Gathering">Friends Reunion</option>
                      <option value="Day Picnic">Day Picnic</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark/70 block mb-1.5">
                    Food & Extra Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Meal preferences (veg/non-veg), barbecue setup, early check-in, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-secondary-dark rounded-xl py-2.5 px-3.5 text-sm font-medium text-dark focus:outline-none focus:ring-1 focus:ring-amber-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold text-sm py-3.5 rounded-xl transition-all shadow-md mt-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                  Inquiry Ready!
                </h3>
                <p className="text-xs sm:text-sm text-dark/70 mb-6 max-w-sm mx-auto">
                  Opening WhatsApp to connect you directly with the Mauli Farms reservations desk.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-primary underline"
                >
                  Fill another inquiry
                </button>
              </div>
            )}
          </div>

          {/* Right: Quick Contacts & Inclusions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-3xl bg-primary text-white">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 block mb-2">
                100% Private Booking
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal mb-4">
                Every Stay Includes:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-white/85 font-light">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Exclusive private 1-acre farmhouse property</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Private 12×24 ft swimming pool with filtration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Vitthal Rukhmini Mandir inside the grounds for prayer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>In-plot natural waterfall (monsoon seasonal) & stream</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>24/7 Caretaker & authentic meals assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>Fiber optic WiFi & generator power backup</span>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/70">
                Check-in: 1:00 PM · Check-out: 11:00 AM
              </div>
            </div>

            {/* Direct Phone Box */}
            <div className="p-6 rounded-2xl bg-secondary border border-secondary-dark flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-dark/50 block">Direct Hotline</span>
                <a href={`tel:${siteConfig.phone}`} className="font-serif text-lg font-bold text-primary hover:text-accent">
                  {siteConfig.phone}
                </a>
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="p-3 rounded-full bg-primary text-white hover:bg-primary-light transition-colors"
                aria-label="Call"
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
