'use client';

import React from 'react';
import Image from 'next/image';
import { BedDouble, Bath, Sparkles } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';

export const VillaSpaces = () => {
  const { images } = useCustomImages();

  const masterBedImg = images.gallery?.bedroom?.[0] || '/images/gallery/bedroom-master.jpg';
  const secondBedImg = images.gallery?.bedroom?.[1] || '/images/gallery/bedroom-guest.jpg';
  const dormImg = images.gallery?.bedroom?.[2] || '/images/gallery/bedroom-view-1.png';
  const livingImg = images.gallery?.living?.[0] || '/images/gallery/living-room-glass.jpg';
  const verandahImg = images.gallery?.exterior?.[1] || '/images/gallery/villa-exterior-2.jpg';
  const kitchenImg = '/images/gallery/kitchen-modern.jpg';

  const spaces = [
    {
      id: 'master-bedroom',
      title: 'Master Bedroom',
      subtitle: 'Ground Floor',
      highlight: 'King Bed + Attached Washroom',
      image: masterBedImg,
      badge: 'King Size Bed',
      bath: 'Attached Washroom',
      capacity: '2–4 Guests',
      description: 'Comfortable ground-floor bedroom featuring a King size bed, attached private washroom, stone architecture, and quiet garden breezes.'
    },
    {
      id: 'bedroom-two',
      title: 'Bedroom Two',
      subtitle: 'Ground Floor',
      highlight: 'Two Single Beds',
      image: secondBedImg,
      badge: '2 Single Beds',
      bath: 'Fresh & Clean Linen',
      capacity: '2 Guests',
      description: 'Cozy and quiet bedroom furnished with two single beds, wide windows for natural ventilation, wardrobe, and serene property views.'
    },
    {
      id: 'upper-dormitory',
      title: 'Upper Floor Dormitory Room',
      subtitle: 'Upper Floor',
      highlight: 'Big Room + Attached Big Washroom + Big Balcony',
      image: dormImg,
      badge: 'Dormitory Setup',
      bath: 'Big Attached Washroom',
      capacity: '8–15 Guests',
      description: 'A massive upper-floor room designed for group sleepovers with multiple beds, an attached spacious washroom, and a big open balcony with panoramic Sahyadri hill views.'
    },
    {
      id: 'living-room',
      title: 'Living Room',
      subtitle: 'Ground Floor',
      highlight: 'Spacious Hall for Gathering',
      image: livingImg,
      badge: 'Family Gathering',
      bath: 'Open Social Hub',
      capacity: 'Full Group',
      description: 'Wide, airy living hall with comfortable sofas, direct view of the swimming pool and green lawn, perfect for talking, playing board games, and relaxing.'
    },
    {
      id: 'kitchen',
      title: 'Kitchen',
      subtitle: 'Ground Floor',
      highlight: 'Fully Equipped for Cooking',
      image: kitchenImg,
      badge: 'Gas, Fridge & Utensils',
      bath: 'Self-Cooking or Caretaker',
      capacity: 'All Meals',
      description: 'Complete kitchen equipped with gas stove, refrigerator, cookware, and water purifier. Use it for self-cooking or enjoy delicious meals cooked by local caretakers.'
    },
    {
      id: 'verandah',
      title: 'Verandah',
      subtitle: 'Ground Floor',
      highlight: 'Relaxing Open Sit-Out',
      image: verandahImg,
      badge: 'Lawn & Pool View',
      bath: 'Open-Air Seating',
      capacity: 'Morning Chai Spot',
      description: 'Spacious covered stone verandah overlooking the private swimming pool and green lawn. The favorite spot for morning tea, evening chats, and peaceful breeze.'
    }
  ];

  return (
    <section id="villa" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Heading with clean uncluttered spacing */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 mb-2 block">
            Farmhouse Rooms & Layout
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-primary tracking-tight leading-tight mb-3">
            Simple, Spacious Rooms for Your Stay
          </h2>
          <p className="text-dark/70 text-sm font-light leading-relaxed">
            The entire 1-acre property is reserved for your family & friends only. Explore the 6 dedicated living and sleeping spaces:
          </p>
        </div>

        {/* Clean 6 Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="rounded-2xl overflow-hidden border border-secondary-dark/80 bg-secondary/60 hover:bg-white hover:border-secondary-dark hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-secondary-dark">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-primary shadow-sm">
                  {space.subtitle}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                    {space.title}
                  </h3>
                  
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md mb-3 border border-amber-200/60">
                    <Sparkles className="h-3 w-3 text-amber-700 shrink-0" />
                    <span>{space.highlight}</span>
                  </div>

                  <p className="text-xs text-dark/75 font-light leading-relaxed mb-4">
                    {space.description}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div className="pt-3 border-t border-secondary-dark/60 flex items-center justify-between text-[11px] text-dark/70">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5 text-amber-800" />
                    {space.badge}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5 text-amber-800" />
                    {space.bath}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 bg-secondary px-6 py-3 rounded-2xl border border-secondary-dark/70 text-xs text-dark/80">
            <span className="font-semibold text-primary">Total Capacity:</span> Up to 25 Guests (Family & Friends)
            <span className="hidden sm:inline text-dark/30">·</span>
            <span className="font-semibold text-primary">Bathrooms:</span> 3 Full Washrooms with 24/7 Water
            <span className="hidden sm:inline text-dark/30">·</span>
            <span className="font-semibold text-primary">Upper Balcony:</span> Scenic Open Hill & Lawn View
          </div>
        </div>

      </div>
    </section>
  );
};
