'use client';

import React from 'react';
import { MapPin, Car, Clock } from 'lucide-react';
import { siteConfig, travelDistances } from '../data/content';

export const Location = () => {
  return (
    <section id="location" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800 mb-3 block">
            Easy Accessibility
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-primary tracking-tight leading-[1.15] mb-4">
            How to Reach Mauli Farms
          </h2>
          <p className="text-dark/70 text-sm sm:text-base font-light leading-relaxed">
            Conveniently situated right along State Highway 97 in Pali, Sudhagad — an easy 2 to 2.5 hour highway drive from Mumbai, Navi Mumbai, and Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12">
          {/* Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-secondary-dark shadow-sm bg-secondary-dark min-h-[360px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15124.636928812543!2d73.21385412959828!3d18.53483259837943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be80ee0e94bb555%3A0xe10433246ebcf259!2sPali%2C%20Maharashtra%20410205!5e0!3m2!1sen!2sin!4v1719590481234!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map embed location of Mauli Farms, Pali"
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Travel Distances (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="p-5 rounded-2xl bg-white border border-secondary-dark mb-1">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-bold text-primary">Farmhouse Address</h3>
                  <p className="text-xs text-dark/75 mt-0.5 font-light leading-relaxed">
                    {siteConfig.address}
                  </p>
                  <p className="text-[11px] text-amber-800 font-semibold mt-2">
                    Near Ballaleshwar Ashtavinayak Temple (4 km)
                  </p>
                </div>
              </div>
            </div>

            {travelDistances.map((dist) => (
              <div
                key={dist.city}
                className="p-4 rounded-2xl bg-white border border-secondary-dark flex items-start gap-3.5 hover:shadow-sm transition-all"
              >
                <div className="h-8 w-8 rounded-xl bg-secondary border border-secondary-dark text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Car className="h-4 w-4 text-amber-800" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-serif text-sm font-bold text-primary">{dist.city}</h4>
                    <span className="text-xs font-bold text-accent">{dist.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-dark/70 mt-0.5">
                    <Clock className="h-3 w-3 text-amber-800" />
                    <span>{dist.time}</span>
                  </div>
                  <p className="text-[11px] text-dark/55 font-light mt-0.5">
                    {dist.route}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
