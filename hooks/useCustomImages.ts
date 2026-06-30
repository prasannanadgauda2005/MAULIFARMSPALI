import { useState, useEffect } from 'react';

interface GalleryAlbums {
  exterior: string[];
  living: string[];
  pool: string[];
  bedroom: string[];
  bathroom: string[];
  videos: string[];
}

interface CustomImages {
  heroBg: string;
  aboutBg: string;
  waterfallBg: string;
  waterfallVideo: string;
  tourVideo: string;
  gallery: GalleryAlbums;
}

const defaultImages: CustomImages = {
  heroBg: "/images/gallery/villa-exterior-1.jpg",
  aboutBg: "/images/gallery/villa-exterior-2.jpg",
  waterfallBg: "/images/gallery/villa-exterior-3.jpg",
  waterfallVideo: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
  tourVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4",
  gallery: {
    exterior: [
      "/images/gallery/villa-exterior-1.jpg",
      "/images/gallery/villa-exterior-2.jpg",
      "/images/gallery/villa-exterior-3.jpg"
    ],
    living: [
      "/images/gallery/living-room-1.jpg",
      "/images/gallery/living-room-2.jpg"
    ],
    pool: [
      "/images/gallery/pool-view-1.jpg",
      "/images/gallery/pool-view-2.jpg"
    ],
    bedroom: [
      "/images/gallery/bedroom-view-1.png"
    ],
    bathroom: [
      "/images/gallery/villa-exterior-day.jpg"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4"
    ]
  }
};

export const useCustomImages = () => {
  const [images, setImages] = useState<CustomImages>(defaultImages);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/images');
      if (res.ok) {
        const data = await res.json();
        const gallery = data.gallery || {};
        
        setImages({
          heroBg: data.heroBg || defaultImages.heroBg,
          aboutBg: data.aboutBg || defaultImages.aboutBg,
          waterfallBg: data.waterfallBg || defaultImages.waterfallBg,
          waterfallVideo: data.waterfallVideo || defaultImages.waterfallVideo,
          tourVideo: data.tourVideo || defaultImages.tourVideo,
          gallery: {
            exterior: gallery.exterior && gallery.exterior.length > 0 ? gallery.exterior : defaultImages.gallery.exterior,
            living: gallery.living && gallery.living.length > 0 ? gallery.living : defaultImages.gallery.living,
            pool: gallery.pool && gallery.pool.length > 0 ? gallery.pool : defaultImages.gallery.pool,
            bedroom: gallery.bedroom && gallery.bedroom.length > 0 ? gallery.bedroom : defaultImages.gallery.bedroom,
            bathroom: gallery.bathroom && gallery.bathroom.length > 0 ? gallery.bathroom : defaultImages.gallery.bathroom,
            videos: gallery.videos && gallery.videos.length > 0 ? gallery.videos : defaultImages.gallery.videos,
          }
        });
      }
    } catch (e) {
      console.error('Error fetching custom images:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, refetch: fetchImages };
};
