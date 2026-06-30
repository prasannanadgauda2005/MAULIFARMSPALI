/**
 * Integrations Layer (Future Ready Architecture)
 * This file serves as the abstraction layer for third-party services, APIs, and databases.
 * In the future, you can swap these mock implementations with actual integrations
 * (Firebase, Supabase, Razorpay/Stripe, Google Calendar, weather APIs, etc.)
 * without modifying the core UI components.
 */

import { BookingFormData } from '../types';

// ==========================================
// 1. DATABASE & AUTHENTICATION (Firebase / Supabase)
// ==========================================

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export async function loginGuest(email: string, phone: string): Promise<{ success: boolean; guest?: GuestProfile; token?: string }> {
  console.log('Future Integration: Guest Login through Firebase/Supabase Auth', { email, phone });
  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    guest: {
      id: 'guest_101',
      name: 'Simulated User',
      email,
      phone
    },
    token: 'jwt_firebase_mock_token'
  };
}

export async function syncBookingToDatabase(bookingData: BookingFormData): Promise<{ success: boolean; bookingId: string }> {
  console.log('Future Integration: Saving booking entry to Supabase/Firestore', bookingData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    bookingId: `MF-${Math.floor(100000 + Math.random() * 900000)}`
  };
}

// ==========================================
// 2. PAYMENT GATEWAY (Razorpay / Stripe)
// ==========================================

export interface PaymentSession {
  sessionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
}

export async function createPaymentSession(bookingId: string, amount: number): Promise<PaymentSession> {
  console.log('Future Integration: Initializing Razorpay / Stripe session', { bookingId, amount });
  return {
    sessionId: `pay_sess_${Math.random().toString(36).substring(7)}`,
    amount,
    currency: 'INR',
    status: 'pending'
  };
}

// ==========================================
// 3. CALENDAR SYNCHRONIZATION (Google Calendar API / iCal)
// ==========================================

export async function checkDateAvailability(checkIn: string, checkOut: string): Promise<boolean> {
  console.log('Future Integration: Fetching availability from Google Calendar sync', { checkIn, checkOut });
  // Mock availability: assume all dates are available
  return true;
}

export async function blockDatesInCalendar(checkIn: string, checkOut: string, guestName: string): Promise<boolean> {
  console.log('Future Integration: Creating calendar event in Google Calendar API', { checkIn, checkOut, guestName });
  return true;
}

// ==========================================
// 4. WEATHER WIDGET (OpenWeather / Weatherstack API)
// ==========================================

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export async function getLiveWeather(): Promise<WeatherData> {
  console.log('Future Integration: Fetching weather conditions for Pali coordinates (18.5348° N, 73.2238° E)');
  // Default fallback/mock weather
  return {
    temp: 28,
    condition: 'Mist / Scattered Clouds',
    icon: 'CloudRain',
    humidity: 82,
    windSpeed: 14
  };
}

// ==========================================
// 5. AI TRIP PLANNER (OpenAI / Gemini SDK Integration)
// ==========================================

export interface ItineraryItem {
  day: number;
  title: string;
  activities: string[];
}

export async function generateAILocalItinerary(guests: number, durationDays: number, interest: string): Promise<ItineraryItem[]> {
  console.log('Future Integration: Generating local travel recommendations using Gemini API', { guests, durationDays, interest });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  
  return [
    {
      day: 1,
      title: 'Arrival & Poolside Relaxation',
      activities: [
        'Check-in at Mauli Farms & enjoy traditional welcome drinks',
        'Settle into premium air-conditioned suites',
        'Spend the afternoon relaxing in the 40x20 ft private filtration pool',
        'Twilight hot tea and snacks on the garden gazebos',
        'Cozy bonfire and BBQ dinner under the stars'
      ]
    },
    {
      day: 2,
      title: 'Heritage Tour & Adventure',
      activities: [
        'Sunrise yoga session on the manicured lawns',
        'Traditional home-style breakfast prepared by local caretakers',
        'Visit the famous Ballaleshwar Pali Ashtavinayak temple (10 mins away)',
        'Afternoon trek to Sarasgad Fort or relax inside with indoor board games',
        'Outdoor screen projector movie night with fresh popcorn'
      ]
    }
  ];
}

// ==========================================
// 6. INSTAGRAM & PHOTO FEED API
// ==========================================

export interface InstagramPost {
  id: string;
  imageUrl: string;
  permalink: string;
  caption: string;
}

export async function fetchInstagramFeed(): Promise<InstagramPost[]> {
  console.log('Future Integration: Fetching media from Instagram Graph API');
  return [
    {
      id: 'ig_post_1',
      imageUrl: '/images/gallery/villa-exterior-twilight.jpg',
      permalink: 'https://instagram.com/p/mock1',
      caption: 'Sunset hues over our infinity-edge pool. Escape the city noise. #MauliFarms #Pali'
    },
    {
      id: 'ig_post_2',
      imageUrl: '/images/gallery/bedroom-master.jpg',
      permalink: 'https://instagram.com/p/mock2',
      caption: 'Waking up to forest views. Absolute luxury in the middle of nature. #VacationRentals'
    },
    {
      id: 'ig_post_3',
      imageUrl: '/images/gallery/bonfire-night.jpg',
      permalink: 'https://instagram.com/p/mock3',
      caption: 'Winters at Pali call for cozy bonfires and warm memories. #PrivateVilla'
    }
  ];
}
