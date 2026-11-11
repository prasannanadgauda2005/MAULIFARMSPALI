'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useCustomImages } from '../hooks/useCustomImages';

interface PhotoItem {
  id: string;
  category: string;
  src: string;
  title: string;
}

const defaultPhotos: PhotoItem[] = [
  { id: '1', category: 'exterior', src: '/images/gallery/drone-aerial-view.jpg', title: '1-Acre Gated Estate Aerial View' },
  { id: '2', category: 'exterior', src: '/images/gallery/villa-exterior-day.jpg', title: 'Farmhouse Exterior & Lawn' },
  { id: '3', category: 'pool', src: '/images/gallery/pool-deck.jpg', title: 'Private Swimming Pool & Sun Deck' },
  { id: '4', category: 'waterfall', src: '/images/gallery/villa-exterior-3.jpg', title: 'In-Plot Natural Cascading Waterfall' },
  { id: '5', category: 'interiors', src: '/images/gallery/living-room-glass.jpg', title: 'Glass Living Lounge with Lawn View' },
  { id: '6', category: 'interiors', src: '/images/gallery/bedroom-master.jpg', title: 'Master Bedroom Suite' },
  { id: '7', category: 'interiors', src: '/images/gallery/bedroom-guest.jpg', title: 'Verandah Suite Bedroom' },
  { id: '8', category: 'night', src: '/images/gallery/bonfire-night.jpg', title: 'Starlit Evening Bonfire' },
  { id: '9', category: 'night', src: '/images/gallery/villa-exterior-twilight.jpg', title: 'Twilight Exterior View' },
  { id: '10', category: 'waterfall', src: '/images/gallery/garden-lawn.jpg', title: 'Stream Pathway & Green Lawns' },
  { id: '11', category: 'pool', src: '/images/gallery/pool-view-2.jpg', title: 'Poolside Forest Panorama' },
  { id: '12', category: 'interiors', src: '/images/gallery/kitchen-modern.jpg', title: 'Fully Equipped Modern Kitchen' },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'exterior', label: 'Exterior & Lawns' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'waterfall', label: 'Waterfall & Stream' },
  { id: 'interiors', label: 'Bedrooms & Living' },
  { id: 'night', label: 'Twilight & Bonfire' },
];

export const Gallery = () => {
  const { images } = useCustomImages();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Combine default photos with any custom uploaded gallery photos from backend
  const photos: PhotoItem[] = React.useMemo(() => {
    const list = [...defaultPhotos];
    
    if (images.gallery?.exterior?.[0]) {
      list[1] = { id: 'ext-custom-0', category: 'exterior', src: images.gallery.exterior[0], title: 'Farmhouse Exterior & Grounds' };
    }
    if (images.waterfallBg) {
      list[3] = { id: 'wf-custom', category: 'waterfall', src: images.waterfallBg, title: 'In-Plot Cascading Waterfall' };
    }
    if (images.gallery?.pool?.[0]) {
      list[2] = { id: 'pool-custom-0', category: 'pool', src: images.gallery.pool[0], title: 'Private Swimming Pool' };
    }
    if (images.gallery?.bedroom?.[0]) {
      list[5] = { id: 'bed-custom-0', category: 'interiors', src: images.gallery.bedroom[0], title: 'Master Bedroom Suite' };
    }
    if (images.gallery?.living?.[0]) {
      list[4] = { id: 'liv-custom-0', category: 'interiors', src: images.gallery.living[0], title: 'Glass Living Lounge' };
    }

    return list;
  }, [images]);

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800 mb-3 block">
            Visual Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-primary tracking-tight leading-[1.15] mb-4">
            Photo Gallery
          </h2>
          <p className="text-dark/70 text-sm sm:text-base font-light leading-relaxed">
            Authentic photography of the farmhouse architecture, swimming pool, private waterfall, bedrooms, and evening grounds.
          </p>
        </div>

        {/* Clean Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-secondary text-dark/70 border border-secondary-dark hover:bg-secondary-dark'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(idx)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary-dark border border-secondary-dark/70 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 text-white">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs font-medium">{photo.title}</p>
                  <Maximize2 className="h-4 w-4 shrink-0 text-white/80" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setSelectedPhotoIndex(null)} />

          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] aspect-[16/10] w-full z-10">
            <Image
              src={filteredPhotos[selectedPhotoIndex].src}
              alt={filteredPhotos[selectedPhotoIndex].title}
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
            <div className="absolute -bottom-10 left-0 right-0 text-center text-white text-xs">
              {filteredPhotos[selectedPhotoIndex].title} ({selectedPhotoIndex + 1} of {filteredPhotos.length})
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
};
