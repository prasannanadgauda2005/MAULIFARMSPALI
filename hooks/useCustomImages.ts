import { useState, useEffect } from 'react';

export interface GalleryAlbums {
  exterior: string[];
  living: string[];
  pool: string[];
  bedroom: string[];
  bathroom: string[];
  videos: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  highlight: string;
}

export interface DealsOffer {
  enabled: boolean;
  badge: string;
  title: string;
  description: string;
  posterImage?: string;
  perks: string[];
  code: string;
  ctaText: string;
  ctaUrl: string;
}

export interface SiteContent {
  announcement?: string;
  waterfallSeasonStatus?: string;
  templeNote?: string;
  poolNote?: string;
  plotArea?: string;
  lastUpdated?: string;
}

export interface CustomImages {
  heroBg: string;
  aboutBg: string;
  waterfallBg: string;
  waterfallVideo: string;
  tourVideo: string;
  posterImage?: string;
  posters?: string[];
  siteContent?: SiteContent;
  gallery: GalleryAlbums;
  experiences: ExperienceItem[];
  deals?: DealsOffer;
  hasBlobToken?: boolean;
}

const defaultSiteContent: SiteContent = {
  announcement: "Welcome to Mauli Farms! Current Season: Private Swimming Pool, Bonfire Nights & Peaceful Sahyadri Hill Stays.",
  waterfallSeasonStatus: "Monsoon Seasonal (Active July – Sept) · Private Pool & Freshwater Stream Year-Round",
  templeNote: "Vitthal Rukhmini Mandir: Sacred private temple inside our 1-acre property for quiet morning darshan and prayer.",
  poolNote: "Private 12×24 ft Swimming Pool with sun loungers, daily filtration, and scenic forest views.",
  plotArea: "1 Acre",
  lastUpdated: new Date().toISOString()
};

const defaultDeals: DealsOffer = {
  enabled: true,
  badge: "Family & Friends Gathering Special",
  title: "Weekend & Holiday Group Offer",
  description: "Book for 10 or more family & friends and enjoy a complimentary evening stone bonfire with barbecue grill setup, plus special packages for multi-night stays!",
  posterImage: "/images/gallery/pool-deck.jpg",
  perks: [
    "Complimentary Evening Bonfire & Charcoal BBQ Setup",
    "Private 12×24 ft swimming pool with spacious sun deck",
    "Sacred Vitthal Rukhmini Mandir inside the 1-acre property",
    "In-plot natural waterfall (monsoon seasonal) & freshwater stream",
    "Home-cooked Maharashtrian feasts prepared fresh by caretakers",
    "100% Gated 1-Acre Lawn for kids and pets to play safely"
  ],
  code: "FAMILYMAULI",
  ctaText: "Claim Deal on WhatsApp",
  ctaUrl: "https://wa.me/919967519079?text=Hi%20Mauli%20Farms%2C%20I%20saw%20your%20Family%20Gathering%20Offer%20and%20would%20like%20to%20inquire%20for%20our%20stay."
};

const defaultImages: CustomImages = {
  heroBg: "/images/gallery/villa-exterior-1.jpg",
  aboutBg: "/images/gallery/villa-exterior-2.jpg",
  waterfallBg: "/images/gallery/villa-exterior-3.jpg",
  waterfallVideo: "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
  tourVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4",
  posterImage: "/images/gallery/villa-exterior-day.jpg",
  posters: [
    "/images/gallery/villa-exterior-day.jpg",
    "/images/gallery/pool-deck.jpg"
  ],
  siteContent: defaultSiteContent,
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
      "/images/gallery/bedroom-view-1.png",
      "/images/gallery/bedroom-master.jpg"
    ],
    bathroom: [
      "/images/gallery/villa-exterior-day.jpg"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-thick-green-forest-42377-large.mp4"
    ]
  },
  deals: defaultDeals,
  experiences: [
    {
      id: "exp1",
      title: "Swimming Pool & Sun Deck",
      description: "Enjoy the private 12×24 ft swimming pool with daily filtration and wooden sun deck overlooking green hills.",
      image: "/images/gallery/pool-deck.jpg",
      highlight: "Filtered fresh water, safe steps"
    },
    {
      id: "exp2",
      title: "Vitthal Rukhmini Mandir",
      description: "Begin your day with peaceful morning prayers at our private in-plot temple surrounded by flowering trees.",
      image: "/images/gallery/garden-lawn.jpg",
      highlight: "Private temple on 1-acre grounds"
    },
    {
      id: "exp3",
      title: "In-Plot Waterfall (Seasonal) & Stream",
      description: "Experience our cascading natural waterfall (active in monsoons) and year-round cool mountain stream running through the plot.",
      image: "/images/gallery/villa-exterior-3.jpg",
      highlight: "Monsoon waterfall & fresh stream"
    },
    {
      id: "exp4",
      title: "Family & Friends Stays",
      description: "Relax together across spacious lawns, share home-cooked meals, and unwind in the large verandah.",
      image: "/images/gallery/villa-exterior-1.jpg",
      highlight: "Private farmhouse exclusively for your group"
    },
    {
      id: "exp5",
      title: "Bonfire & Movie Nights",
      description: "Gather around the warm stone bonfire under the starlit sky, roast barbecue skewers, and watch movies on the lawn.",
      image: "/images/gallery/pool-view-2.jpg",
      highlight: "150-inch projector & bonfire setup"
    },
    {
      id: "exp6",
      title: "Maharashtrian Chulha Feasts",
      description: "Savor authentic home-cooked Gavran chicken, pitla-bhakri, and local seasonal dishes prepared by caring in-house staff.",
      image: "/images/gallery/kitchen-modern.jpg",
      highlight: "Fresh local village ingredients"
    }
  ]
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
          posterImage: data.posterImage || defaultImages.posterImage,
          posters: data.posters && data.posters.length > 0 ? data.posters : defaultImages.posters,
          siteContent: {
            ...defaultSiteContent,
            ...(data.siteContent || {})
          },
          gallery: {
            exterior: gallery.exterior && gallery.exterior.length > 0 ? gallery.exterior : defaultImages.gallery.exterior,
            living: gallery.living && gallery.living.length > 0 ? gallery.living : defaultImages.gallery.living,
            pool: gallery.pool && gallery.pool.length > 0 ? gallery.pool : defaultImages.gallery.pool,
            bedroom: gallery.bedroom && gallery.bedroom.length > 0 ? gallery.bedroom : defaultImages.gallery.bedroom,
            bathroom: gallery.bathroom && gallery.bathroom.length > 0 ? gallery.bathroom : defaultImages.gallery.bathroom,
            videos: gallery.videos && gallery.videos.length > 0 ? gallery.videos : defaultImages.gallery.videos,
          },
          deals: data.deals ? { ...defaultDeals, ...data.deals } : defaultDeals,
          experiences: data.experiences && data.experiences.length > 0 ? data.experiences : defaultImages.experiences,
          hasBlobToken: data.hasBlobToken
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
