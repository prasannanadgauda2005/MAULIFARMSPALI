import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { siteConfig } from '../data/content';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://maulifarms.com'),
  title: {
    default: 'Mauli Farms Pali | Luxury Private 4BHK Farmhouse with Pool',
    template: '%s | Mauli Farms Pali'
  },
  description: 'Escape the city and experience nature at Mauli Farms, Pali. A premium private 4BHK farmhouse featuring a luxury pool, lawn, organic garden, and state-of-the-art amenities. Perfect for family stays, birthday celebrations, and corporate retreats.',
  keywords: [
    'Mauli Farms Pali', 'luxury villa Pali', 'farmhouse on rent Pali', '4BHK farmhouse Pali', 
    'private pool villa Pali', 'weekend gateaway Mumbai Pune', 'resorts in Pali', 'Ashtavinayak temple stay', 
    'Lohono stays Pali', 'best Airbnb Pali', 'private farmhouse Maharashtra'
  ],
  authors: [{ name: 'Mauli Farms Pali' }],
  creator: 'Mauli Farms',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://maulifarms.com',
    title: 'Mauli Farms Pali | Luxury Private 4BHK Farmhouse with Pool',
    description: 'Exclusive 4BHK private villa experience in Pali, Maharashtra. Beautiful pool, lush lawns, delicious local food, and absolute privacy.',
    siteName: 'Mauli Farms',
    images: [
      {
        url: '/images/gallery/villa-exterior-day.jpg',
        width: 1200,
        height: 630,
        alt: 'Mauli Farms Luxury Farmhouse Exterior',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mauli Farms Pali | Luxury Private 4BHK Farmhouse',
    description: 'Exclusive private farmhouse stay in Pali, Maharashtra with a pool and lush garden.',
    images: ['/images/gallery/villa-exterior-day.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    'name': siteConfig.name,
    'description': 'Luxury 4BHK Private Farmhouse with pool in Pali, Maharashtra. Escape the city and experience nature.',
    'image': 'https://maulifarms.com/images/gallery/villa-exterior-day.jpg',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': siteConfig.address,
      'addressLocality': 'Pali',
      'addressRegion': 'Maharashtra',
      'postalCode': '410205',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.5348,
      'longitude': 73.2238
    },
    'url': 'https://maulifarms.com',
    'telephone': siteConfig.phone,
    'priceRange': '₹₹₹',
    'numberOfRooms': 4,
    'amenityFeature': [
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Private Filtration Swimming Pool',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Free High-Speed WiFi',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Pet Friendly',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Diesel Generator Power Backup',
        'value': true
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-secondary text-dark antialiased selection:bg-accent selection:text-primary-dark min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
