'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MessageSquare } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';
import { siteConfig } from '../data/content';

export const TopNoticeBar = () => {
  const { images } = useCustomImages();
  const [liveDate, setLiveDate] = useState('');

  useEffect(() => {
    const now = new Date();
    setLiveDate(
      now.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    );
  }, []);

  const seasonalStatus = images.siteContent?.waterfallSeasonStatus || 
    'Monsoon Seasonal (Active July – Sept) · Private Pool & Freshwater Stream Year-Round';

  return (
    <div className="bg-primary text-white text-[11px] py-2 px-4 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Left: Live seasonal status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-amber-200 font-semibold uppercase tracking-wider text-[10px]">
            Live Notice:
          </span>
          <span className="text-white/90 font-light truncate max-w-xs sm:max-w-md md:max-w-xl">
            {seasonalStatus}
          </span>
        </div>

        {/* Right: Real-time date & Quick WhatsApp */}
        <div className="hidden md:flex items-center gap-4 text-white/80 shrink-0">
          {liveDate && (
            <div className="flex items-center gap-1.5 text-white/70">
              <Calendar className="h-3 w-3 text-amber-300" />
              <span>{liveDate}</span>
            </div>
          )}
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Mauli%20Farms%2C%20I%20would%20like%20to%20check%20availability%20for%20our%20family%20stay.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 hover:text-white font-medium transition-colors"
          >
            <MessageSquare className="h-3 w-3" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
