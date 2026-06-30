'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Layers, Film } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { useCustomImages } from '../hooks/useCustomImages';

interface Album {
  id: 'exterior' | 'living' | 'pool' | 'bedroom' | 'bathroom' | 'videos';
  title: string;
  category: string;
  description: string;
}

const ALBUMS: Album[] = [
  { id: 'exterior', title: 'Villa Exterior & Grounds', category: 'Exterior', description: 'Scenic outdoor look of the estate' },
  { id: 'living', title: 'Living Room & Interiors', category: 'Interior', description: 'Grand lounge and indoor glasshouse' },
  { id: 'pool', title: 'Private Pool Area', category: 'Amenities', description: 'Relaxing decks and 12x24 ft pool' },
  { id: 'bedroom', title: 'Bedroom Suites', category: 'Interior', description: 'Restful spaces and attic mezzanine' },
  { id: 'bathroom', title: 'Bathrooms & Washrooms', category: 'Interior', description: 'Clean, hygienic, and modern fittings' },
  { id: 'videos', title: 'Cinematic Video Tours', category: 'Video', description: 'Drone scans and cascading waterfall clips' }
];

export const Gallery = () => {
  const { images } = useCustomImages();
  const [activeAlbumId, setActiveAlbumId] = useState<Album['id'] | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number>(0);

  const activeAlbumImages = activeAlbumId ? images.gallery[activeAlbumId] : [];

  const openAlbum = (albumId: Album['id']) => {
    setActiveAlbumId(albumId);
    setLightboxImageIndex(0);
  };

  const closeLightbox = () => {
    setActiveAlbumId(null);
  };

  const showNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeAlbumId) return;
    setLightboxImageIndex((prevIndex) => 
      (prevIndex + 1) % activeAlbumImages.length
    );
  }, [activeAlbumId, activeAlbumImages.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!activeAlbumId) return;
    setLightboxImageIndex((prevIndex) => 
      (prevIndex - 1 + activeAlbumImages.length) % activeAlbumImages.length
    );
  }, [activeAlbumId, activeAlbumImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeAlbumId) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeAlbumId, showNext, showPrev]);

  return (
    <section id="gallery" className="compact-section bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Capturing the Essence"
          subtitle="Explore the Estate Albums"
          align="center"
          className="mb-10"
        />

        {/* Albums Grid (Clean 3-Column Layout, 3x2 on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALBUMS.map((album) => {
            const albumPhotos = images.gallery[album.id] || [];
            const isVideoAlbum = album.id === 'videos';
            
            // Set dynamic cover image
            const coverImage = isVideoAlbum 
              ? (images.waterfallBg || "/images/gallery/villa-exterior-twilight.jpg")
              : (albumPhotos[0] || "/images/gallery/villa-exterior-day.jpg");
              
            const photoCount = albumPhotos.length;

            return (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-secondary border border-secondary-dark/60 group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                onClick={() => openAlbum(album.id)}
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary-dark">
                  <Image
                    src={coverImage}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  
                  {/* Floating count / video indicator */}
                  <div className="absolute top-4 right-4 z-10 glass px-2.5 py-1 rounded-xl text-[9px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1">
                    {isVideoAlbum ? (
                      <>
                        <Film className="h-3 w-3 text-accent" />
                        {photoCount} {photoCount === 1 ? 'Video' : 'Videos'}
                      </>
                    ) : (
                      <>
                        <Layers className="h-3 w-3 text-accent" />
                        {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                      </>
                    )}
                  </div>
                </div>

                {/* Album text metadata */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-accent tracking-widest block mb-1">
                      {album.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-primary mb-1">
                      {album.title}
                    </h3>
                    <p className="text-[11px] text-dark/60 font-light leading-relaxed">
                      {album.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-secondary-dark/60 text-right">
                    <span className="text-[9px] uppercase font-bold text-primary group-hover:text-accent transition-colors flex items-center justify-end gap-1">
                      {isVideoAlbum ? 'Watch Clips' : 'Open Album'} <Maximize2 className="h-2.5 w-2.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal (Slideshow inside selected Album) */}
      <AnimatePresence>
        {activeAlbumId !== null && activeAlbumImages.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10 select-none">
            {/* Dark glass backdrop click handler */}
            <div className="absolute inset-0 z-0" onClick={closeLightbox} />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Navigation */}
            {activeAlbumImages.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Media Frame Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[80vh] aspect-video w-full flex items-center justify-center z-10"
            >
              {activeAlbumId === 'videos' ? (
                /* Dynamic Video Player */
                <video
                  src={activeAlbumImages[lightboxImageIndex]}
                  controls
                  autoPlay
                  className="h-full w-full object-contain rounded-2xl bg-black border border-white/10"
                  key={activeAlbumImages[lightboxImageIndex]}
                />
              ) : (
                /* Standard Image Renderer */
                <Image
                  src={activeAlbumImages[lightboxImageIndex]}
                  alt={`Photo ${lightboxImageIndex + 1} inside ${activeAlbumId}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                  unoptimized
                />
              )}
              
              {/* Info indicator */}
              <div className="absolute bottom-[-55px] left-0 right-0 text-center text-white">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                  {ALBUMS.find(a => a.id === activeAlbumId)?.title}
                </span>
                <p className="text-xs font-light text-white/70 mt-1">
                  {activeAlbumId === 'videos' ? 'Video clip' : 'Image'} {lightboxImageIndex + 1} of {activeAlbumImages.length}
                </p>
              </div>
            </motion.div>

            {/* Right Navigation */}
            {activeAlbumImages.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-55 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
