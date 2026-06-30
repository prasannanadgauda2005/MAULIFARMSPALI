import { Amenity, Experience, Bedroom, Testimonial, FAQItem, DistanceCard, GalleryItem } from '../types';

export const siteConfig = {
  name: 'Mauli Farms Pali',
  location: 'Pali, Maharashtra',
  tagline: 'Escape the City. Experience Nature.',
  taglineSub: 'Exclusive Private Villa Farmhouse with Waterfall & Stream in Pali',
  phone: '+91 99675 19079',
  whatsapp: '919967519079',
  email: 'bookings@maulifarms.com',
  address: 'Mauli Farms, State Highway 97, Pali, Sudhagad, Maharashtra 410205',
  workingHours: '9:00 AM - 9:00 PM (Monday - Sunday)',
  socials: {
    instagram: 'https://instagram.com/maulifarms.pali',
    facebook: 'https://facebook.com/maulifarms.pali',
    youtube: 'https://youtube.com/maulifarms.pali'
  }
};

export const quickFacts = [
  { label: 'Private Pool', icon: 'Waves', description: 'Sparkling swimming pool with sun deck' },
  { label: 'Private Waterfall', icon: 'Sparkles', description: 'Cascading natural waterfall inside the property' },
  { label: 'Natural Stream', icon: 'Droplets', description: 'Fresh mountain water stream flowing through the plot' },
  { label: 'Villa Layout', icon: 'Home', description: '2 Private Bedrooms + Mezzanine Loft Sanctuary' },
  { label: 'Naturally Cooled', icon: 'Wind', description: 'Nature-cooled by stone architecture & dense forest canopies' },
  { label: 'Pet Friendly', icon: 'PawPrint', description: '1.5 acres of gated green lawn' }
];

export const statistics = [
  { value: '1,200+', label: 'Guests Hosted' },
  { value: '150+', label: 'Events Organized' },
  { value: '5+', label: 'Years of Excellence' },
  { value: '4.8★', label: 'Google Rating' }
];

export const galleryCategories = [
  { id: 'all', label: 'All Images' },
  { id: 'villa', label: 'Villa Exterior' },
  { id: 'bedrooms', label: 'Suites & Lofts' },
  { id: 'living-room', label: 'Living Lounge' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'garden', label: 'Waterfall & Lawns' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bonfire', label: 'Estate at Night' }
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', category: 'villa', image: '/images/gallery/villa-exterior-day.jpg', title: 'Grand Exterior of Mauli Farms' },
  { id: 'g2', category: 'villa', image: '/images/gallery/villa-exterior-twilight.jpg', title: 'Twilight View of the Villa' },
  { id: 'g3', category: 'bedrooms', image: '/images/gallery/bedroom-master.jpg', title: 'The Royal Forest Bedroom' },
  { id: 'g4', category: 'bedrooms', image: '/images/gallery/bedroom-guest.jpg', title: 'Comfort Guest Bedroom' },
  { id: 'g5', category: 'living-room', image: '/images/gallery/living-room-glass.jpg', title: 'Glass-walled Living Lounge' },
  { id: 'g6', category: 'pool', image: '/images/gallery/pool-deck.jpg', title: 'Stunning Private Pool & Deck' },
  { id: 'g7', category: 'garden', image: '/images/gallery/drone-aerial-view.jpg', title: 'Lush 1.5 Acre Estate Surrounded by Forests' },
  { id: 'g8', category: 'kitchen', image: '/images/gallery/kitchen-modern.jpg', title: 'Fully-Equipped Modern Kitchen' },
  { id: 'g9', category: 'bonfire', image: '/images/gallery/bonfire-night.jpg', title: 'Cozy Bonfire Setup under the Stars' },
  { id: 'g10', category: 'bonfire', image: '/images/gallery/villa-night-view.jpg', title: 'Illuminated Estate at Night' },
  { id: 'g11', category: 'garden', image: '/images/gallery/villa-exterior-day.jpg', title: 'Private Water Stream Pathway' }
];

export const experiences: Experience[] = [
  {
    id: 'exp1',
    title: 'Waterfall & Stream Strolls',
    description: 'Immerse yourself in our private cascading waterfall and dip your feet in the crystal clear mountain stream flowing directly through the farm.',
    image: '/images/gallery/villa-exterior-3.jpg',
    highlight: 'Natural spring water on property'
  },
  {
    id: 'exp2',
    title: 'Family Stays',
    description: 'Bond with family members across spacious lawns, splash in the private pool, and share meals in the grand dining spaces.',
    image: '/images/gallery/villa-exterior-1.jpg',
    highlight: 'Private estate exclusively for your family'
  },
  {
    id: 'exp3',
    title: 'Corporate Retreats',
    description: 'Boost team collaboration. Combine high-speed internet work sessions with outdoor stream trails, indoor games, and poolside barbecues.',
    image: '/images/gallery/living-room-1.jpg',
    highlight: 'High-speed internet work setup'
  },
  {
    id: 'exp4',
    title: 'Birthday Celebrations',
    description: 'Celebrate your special milestones in a grand setting. Custom decoration, catering, and acoustic bonfire setups can be arranged.',
    image: '/images/gallery/villa-exterior-4.jpg',
    highlight: 'Up to 25 guests accommodation'
  },
  {
    id: 'exp5',
    title: 'Bonfire & Movie Nights',
    description: 'Gather around the warm stone bonfire under the starlit sky, roast marshmallows, and projection-screen your favorite movies on the lawn.',
    image: '/images/gallery/pool-view-2.jpg',
    highlight: '150-inch projector screen setup'
  },
  {
    id: 'exp6',
    title: 'Monsoon Escape',
    description: 'Pali transforms into a lush green heaven in the monsoons. Watch waterfalls run off surrounding hills from your cozy room.',
    image: '/images/gallery/villa-exterior-7.jpg',
    highlight: 'Breathtaking misty hill views'
  }
];

export const amenities: Amenity[] = [
  { id: 'am1', name: 'Private Pool', iconName: 'Waves', description: '12x24 ft private pool with filtration system', category: 'exterior' },
  { id: 'am2', name: 'Nature-Cooled Design', iconName: 'Wind', description: 'Stone architecture insulated by tree canopies & high-speed fans', category: 'interior' },
  { id: 'am3', name: 'Waterfall Access', iconName: 'Sparkles', description: 'In-plot natural cascading waterfall', category: 'exterior' },
  { id: 'am4', name: 'Mountain Stream', iconName: 'Droplets', description: 'Flowing clean water stream passing through the lawn', category: 'exterior' },
  { id: 'am5', name: 'Fully Equipped Kitchen', iconName: 'ChefHat', description: 'Refrigerators, stove, microwave, and utilities', category: 'interior' },
  { id: 'am6', name: 'Music System', iconName: 'Music', description: 'Powerful Bluetooth party speaker system', category: 'interior' },
  { id: 'am7', name: 'High-Speed WiFi', iconName: 'Wifi', description: 'Optical fiber connection covering the villa', category: 'interior' },
  { id: 'am8', name: 'Power Backup', iconName: 'Zap', description: 'Inverter backup for essential lights and fans', category: 'services' },
  { id: 'am9', name: 'Secure Parking', iconName: 'CircleParking', description: 'Private gated space for up to 6 cars', category: 'exterior' },
  { id: 'am10', name: 'BBQ Grill', iconName: 'Flame', description: 'Outdoor charcoal BBQ setup with skewers', category: 'exterior' },
  { id: 'am11', name: 'Lush Gardens', iconName: 'Leaf', description: '1 acre of manicured lawns and orchards', category: 'exterior' },
  { id: 'am12', name: 'Indoor Games', iconName: 'Gamepad2', description: 'Carrom, chess, and board games', category: 'interior' },
  { id: 'am13', name: 'Outdoor Games', iconName: 'Trophy', description: 'Badminton and cricket kits', category: 'exterior' },
  { id: 'am14', name: 'In-House Caretakers', iconName: 'ShieldAlert', description: '24/7 professional local staff on-property', category: 'services' }
];

export const bedrooms: Bedroom[] = [
  {
    id: 'room1',
    title: 'Presidential Master Suite',
    bedType: 'Royal King Bed',
    capacity: '2-4 Guests',
    features: ['Attached Luxury Bathroom', 'Private Verandah overlooking the Stream', 'Nature-cooled stone layout', 'Writing Desk'],
    hasWashroom: true,
    hasAC: false,
    images: ['/images/gallery/bedroom-master.jpg']
  },
  {
    id: 'room2',
    title: 'Lawn-facing Verandah Suite',
    bedType: 'King Size Bed',
    capacity: '2-3 Guests',
    features: ['Direct access to Lawn & Pool deck', 'Glass walls with garden views', 'Attached private bathroom', 'Comfort armchair'],
    hasWashroom: true,
    hasAC: false,
    images: ['/images/gallery/bedroom-guest.jpg']
  },
  {
    id: 'room3',
    title: 'The Mezzanine Loft Sanctuary',
    bedType: '4 Queen Beds + 4 Floor Mattresses',
    capacity: '6-12 Guests',
    features: ['Spacious attic loft design for groups', 'High vaulted ceilings', 'Cool breeze ventilation ducts', 'Indoor games nook'],
    hasWashroom: true,
    hasAC: false,
    images: ['/images/gallery/bedroom-master.jpg']
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Rohan Deshmukh',
    role: 'Mumbai (Family Stay)',
    rating: 5,
    content: 'Absolutely breathtaking! Having a private waterfall and stream flowing right through the garden was a dream come true for my kids. The villa is extremely clean and massive. Caretakers made great local food.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    date: '2 weeks ago'
  },
  {
    id: 't2',
    name: 'Sneha Kulkarni',
    role: 'Pune (Corporate HR)',
    rating: 5,
    content: 'We held our leadership retreat at Mauli Farms. We were skeptical about the lack of AC, but the stone construction and tree shade kept the place incredibly cool and fresh even in the afternoon. The flowing water stream adds pure peace.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    date: '1 month ago'
  },
  {
    id: 't3',
    name: 'Vikram Malhotra',
    role: 'Navi Mumbai (30th Birthday)',
    rating: 5,
    content: 'Celebrated my birthday here. The Mezzanine Loft is huge and slept 10 of us easily, while our parents stayed in the private suites. Bathing under the private waterfall on the plot is an experience hotels can never match.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    date: '3 weeks ago'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How is the farmhouse cooled without Air Conditioners?',
    answer: 'Mauli Farms is constructed using traditional stone insulation, high ceilings, and double-insulated roofs. Surrounded by dense forest tree cover and a flowing water stream, it experiences natural cooling drafts. We provide high-volume pedestal fans and ceiling fans in all suites, keeping the interiors highly comfortable and fresh.'
  },
  {
    id: 'faq2',
    question: 'Is the waterfall and stream safe for bathing?',
    answer: 'Yes, both the waterfall and stream originate from clean natural mountain springs upstream, free from urban drainage. They flow clean water throughout the year (highest in monsoons) and are fully accessible inside our gated plot, under caretakers supervision.'
  },
  {
    id: 'faq3',
    question: 'What is the bedroom layout of the private villa?',
    answer: 'The villa is booked exclusively as one private unit. It contains 2 master bedrooms on the ground floor (each sleeping 2 to 4 guests with en-suite baths) and one massive high-ceiling Mezzanine Loft Sanctuary (which sleeps 6 to 12 guests under a vaulted roof). There are 3 total bathrooms.'
  },
  {
    id: 'faq4',
    question: 'What are the check-in and check-out timings?',
    answer: 'Standard check-in is at 1:00 PM and check-out is at 11:00 AM. Early check-in or late check-out requests are subject to availability and caretaker alignment.'
  },
  {
    id: 'faq5',
    question: 'Is food/catering available?',
    answer: 'We have a fully functional kitchen for self-cooking. We can also connect you with our in-house local caretakers who cook authentic, home-cooked Maharashtrian meals (veg/non-veg) at nominal rates, or you can order from nearby Pali restaurants.'
  },
  {
    id: 'faq6',
    question: 'Are pets allowed?',
    answer: 'Yes! We are 100% pet-friendly. Our 1.5-acre property is entirely fenced so your pets can run free on the green grass safely.'
  }
];

export const travelDistances: DistanceCard[] = [
  { city: 'Mumbai', distance: '110 km', time: 'Approx. 2.5 hours', route: 'via Mumbai-Pune Expressway & Khopoli-Pali Rd' },
  { city: 'Navi Mumbai', distance: '85 km', time: 'Approx. 2 hours', route: 'via SH 92 & Khopoli-Pali Rd' },
  { city: 'Pune', distance: '120 km', time: 'Approx. 2.5 hours', route: 'via Lonavala, Expressway & Khopoli-Pali Rd' },
  { city: 'Lonavala', distance: '55 km', time: 'Approx. 1.2 hours', route: 'via Khopoli-Pali Road' }
];

export const nearbyAttractions = [
  { name: 'Ballaleshwar Pali Temple', description: 'One of the eight sacred Ashtavinayak Ganpati temples, located just 10 mins from the villa.', distance: '4 km' },
  { name: 'Sarasgad Fort Trekking', description: 'A historical hilltop fort offering a rewarding trek and panaromic views of the Sudhagad region.', distance: '5 km' },
  { name: 'Sudhagad Fort', description: 'A massive, well-preserved hill fort ideal for history buffs and experienced trekkers.', distance: '15 km' }
];
export const packages = []; // Kept as empty to prevent type checking failures elsewhere in imports
export type Package = never; // Prevent compiler errors in shared packages types
