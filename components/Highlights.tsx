'use client';

import React from 'react';
import Image from 'next/image';
import { Waves, Sparkles, Utensils, Flame, PawPrint, Landmark } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';

export const Highlights = () => {
  const { images } = useCustomImages();

  const poolImg = images.gallery?.pool?.[0] || '/images/gallery/pool-deck.jpg';
  const waterfallImg = images.waterfallBg || '/images/gallery/villa-exterior-3.jpg';
  const exteriorImg = images.gallery?.exterior?.[0] || '/images/gallery/villa-exterior-1.jpg';

  const highlights = [
    {
      icon: Waves,
      tag: 'Main Attraction',
      title: 'Private 12×24 ft Swimming Pool',
      desc: 'Sparkling freshwater pool with daily filtration system, safe shallow steps, and a wooden sun deck overlooking green Sahyadri hills.',
      image: poolImg
    },
    {
      icon: Landmark,
      tag: 'Spiritual Peace',
      title: 'Vitthal Rukhmini Mandir',
      desc: 'A serene private temple built right inside our 1-acre property grounds. Begin your day with tranquil morning darshan, prayer, and positive energy.',
      image: '/images/gallery/garden-lawn.jpg'
    },
    {
      icon: Sparkles,
      tag: 'Seasonal (Monsoon)',
      title: 'In-Plot Natural Waterfall',
      desc: 'Active during the monsoon season (July to September). Clean mountain water cascades down stone steps directly into the lawn. Mountain stream flows year-round.',
      image: waterfallImg
    },
    {
      icon: PawPrint,
      tag: 'Safe & Gated',
      title: '1-Acre Gated Green Lawn',
      desc: 'Entire 1-acre fenced estate with mango trees, fruit orchards, and wide open green lawn where children and pets can run freely with 100% safety.',
      image: exteriorImg
    },
    {
      icon: Utensils,
      tag: 'Home-Cooked Food',
      title: 'Maharashtrian Village Meals',
      desc: 'In-house caretakers cook delicious fresh Gavran chicken/mutton handi, Kokani fish curry, and hot pitla-bhakri. Fully-equipped kitchen also ready for self-cooking.',
      image: '/images/gallery/kitchen-modern.jpg'
    },
    {
      icon: Flame,
      tag: 'Starlit Evenings',
      title: 'Stone Bonfire & Barbecue',
      desc: 'Gather around the warm stone bonfire pit under the clear starry sky. We provide charcoal barbecue grill setups and 150-inch lawn movie projector.',
      image: '/images/gallery/bonfire-night.jpg'
    }
  ];

  return (
    <section id="highlights" className="py-20 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-2 block">
            Property Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-primary tracking-tight leading-tight mb-3">
            Natural Features for Family & Friends
          </h2>
          <p className="text-dark/70 text-sm font-light leading-relaxed">
            Relax and reconnect in our private 1-acre countryside farm stay in Pali.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden border border-secondary-dark/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] w-full bg-secondary-dark overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Icon className="h-3 w-3 text-amber-800" />
                    <span>{item.tag}</span>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-dark/75 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
