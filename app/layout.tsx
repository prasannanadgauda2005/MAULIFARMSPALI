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
    default: 'Mauli Farms Pali | Private 4BHK Nature Farmhouse with Pool',
    template: '%s | Mauli Farms Pali'
  },
  description: 'Escape the city and experience an authentic natural stay at Mauli Farms, Pali. A peaceful private 4BHK farmhouse with swimming pool, natural waterfall, mountain stream, organic orchards, and home-cooked food. Perfect for family and friends gatherings.',
  keywords: [
    'Mauli Farms Pali', 'farmhouse on rent Pali', '4BHK farmhouse Pali', 
    'private pool farmhouse Pali', 'family weekend getaway Mumbai Pune', 'nature farmstay Pali', 'Ashtavinayak temple stay Pali', 
    'farmstay near Mumbai Pune', 'private farmhouse Maharashtra with waterfall'
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
    title: 'Mauli Farms Pali | Private 4BHK Nature Farmhouse with Pool',
    description: 'A private 4BHK countryside nature stay for family and friends in Pali, Maharashtra. Private pool, in-plot natural waterfall, lush lawns, authentic local food, and peace.',
    siteName: 'Mauli Farms',
    images: [
      {
        url: '/images/gallery/villa-exterior-day.jpg',
        width: 1200,
        height: 630,
        alt: 'Mauli Farms Nature Farmhouse Exterior',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mauli Farms Pali | Private 4BHK Nature Farmhouse',
    description: 'A private countryside farmhouse stay in Pali, Maharashtra with a pool, mountain stream, and natural waterfall.',
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
    'description': 'Private 4BHK Nature Farmhouse with pool in Pali, Maharashtra. A natural stay for family and friends.',
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
        className={`${inter.variable} ${playfair.variable} font-sans bg-secondary text-dark antialiased selection:bg-accent selection:text-primary-dark min-h-screen flex flex-col overflow-x-hidden w-full max-w-full`}
      >
        {children}
      </body>
    </html>
  );
}
