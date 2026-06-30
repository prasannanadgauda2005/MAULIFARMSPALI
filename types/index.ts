import { LucideIcon } from 'lucide-react';

export interface Amenity {
  id: string;
  name: string;
  iconName: string; // Dynamic icon rendering name
  description: string;
  category: 'interior' | 'exterior' | 'services';
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
  highlight?: string;
}

export interface Bedroom {
  id: string;
  title: string;
  bedType: string;
  capacity: string;
  features: string[];
  hasWashroom: boolean;
  hasAC: boolean;
  images: string[];
}

export interface Package {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  guests: string;
  features: string[];
  isRecommended?: boolean;
  tag?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface DistanceCard {
  city: string;
  distance: string;
  time: string;
  route: string;
}

export interface GalleryItem {
  id: string;
  category: 'villa' | 'bedrooms' | 'living-room' | 'pool' | 'garden' | 'kitchen' | 'bonfire' | 'night-view' | 'drone-photos';
  image: string;
  title: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  purpose: string;
  message: string;
}
