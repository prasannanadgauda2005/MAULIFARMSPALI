'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Check, MessageSquare, Phone, Copy, CheckCheck, Tag, Calendar } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';
import { siteConfig } from '../data/content';

export const DealsModal = () => {
  const { images } = useCustomImages();
  const deals = images.deals;

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    // Real-time client date
    const now = new Date();
    setTodayDate(
      now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    );
  }, []);

  useEffect(() => {
    if (!deals || deals.enabled === false) return;

    // Check if dismissed recently in this session
    const isDismissed = sessionStorage.getItem('mauli_deals_popup_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [deals]);

  if (!deals || deals.enabled === false) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('mauli_deals_popup_dismissed', 'true');
  };

  const handleCopyCode = () => {
    if (deals.code) {
      navigator.clipboard.writeText(deals.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Mauli Farms Pali! I am inquiring about the "${deals.title}" (Code: ${deals.code}). We are planning a stay for our family and friends. Could you share availability and rates for our dates?`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`;

  const posterImg = deals.posterImage || images.posterImage;

  return (
    <>
      {/* Persistent Floating Trigger Button to reopen anytime */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl border border-emerald-600/40 transition-all hover:scale-105 group"
        aria-label="View Deals & Offers"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
        </span>
        <Tag className="h-3.5 w-3.5 text-amber-300" />
        <span>Deals & Offers</span>
      </button>

      {/* Popup Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-emerald-900/10 z-10 flex flex-col animate-scaleUp">
            
            {/* Header banner */}
            <div className="bg-primary text-white p-6 relative overflow-hidden">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                aria-label="Close deals modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/30 text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  <span>{deals.badge || 'Limited Group Offer'}</span>
                </span>
                
                {todayDate && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-white/70">
                    <Calendar className="h-3 w-3 text-amber-300/80" />
                    <span>{todayDate}</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
                {deals.title}
              </h3>

              <p className="text-white/80 text-xs sm:text-sm font-light leading-relaxed">
                {deals.description}
              </p>
            </div>

            {/* Optional Promotional Poster Banner */}
            {posterImg && (
              <div className="relative aspect-[21/9] w-full bg-secondary-dark overflow-hidden border-b border-secondary-dark/60">
                <Image
                  src={posterImg}
                  alt={deals.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-2 right-3 text-[10px] text-white/90 font-medium bg-black/50 px-2 py-0.5 rounded-md">
                  Mauli Farms Pali · 1-Acre Estate
                </div>
              </div>
            )}

            {/* Body */}
            <div className="p-6 space-y-5 bg-white">
              {/* Perks list */}
              {deals.perks && deals.perks.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary/70 block">
                    What&apos;s Included In This Deal:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {deals.perks.map((perk, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-dark/85">
                        <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon / Code block */}
              {deals.code && (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-secondary-dark/80">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-dark/50 block">
                      Mention Special Code
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-primary tracking-wider">
                      {deals.code}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-semibold text-primary border border-secondary-dark shadow-sm hover:bg-secondary-dark transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-light text-white font-semibold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{deals.ctaText || 'Claim Deal on WhatsApp'}</span>
                </a>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark text-xs font-medium py-2.5 px-4 rounded-xl border border-secondary-dark transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>Call to Inquire</span>
                  </a>

                  <button
                    onClick={handleClose}
                    className="text-xs text-dark/60 hover:text-dark px-3 py-2 transition-colors font-light"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
