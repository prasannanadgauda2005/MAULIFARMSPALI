'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Sparkles, Users, Calendar, Flame, Waves, Briefcase } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';

const experiencesList = [
  {
    id: 'exp1',
    title: 'Waterfall & Stream Trails',
    tagline: 'Sensory Nature Encounter',
    description: 'Immerse yourself in our private cascading waterfall and dip your feet in the crystal clear mountain stream flowing directly through the farm lawn.',
    image: '/images/gallery/villa-exterior-3.jpg',
    highlight: 'Natural spring water on property',
    icon: Waves
  },
  {
    id: 'exp2',
    title: 'Monsoon Mist Retreat',
    tagline: 'June to October Magic',
    description: 'Pali transforms into a lush emerald heaven. Watch cascading waterfalls run off surrounding Sahyadri hills from your cozy room verandah.',
    image: '/images/experiences/monsoon-escape.jpg',
    highlight: 'Misty hills & full waterfalls',
    icon: Sparkles
  },
  {
    id: 'exp3',
    title: 'Private Family Gatherings',
    tagline: 'Multi-Generational Comfort',
    description: 'Bond across spacious lawns, splash in the private pool, and share authentic home-cooked meals in the open-air dining pavilions with absolute privacy.',
    image: '/images/experiences/family-stay.jpg',
    highlight: 'Exclusive estate for up to 25 guests',
    icon: Users
  },
  {
    id: 'exp4',
    title: 'Corporate Leadership Retreats',
    tagline: 'Focus & Strategic Ideation',
    description: 'Combine high-speed optical WiFi work sessions with outdoor stream trails, lawn brainstorming, team barbecues, and refreshing pool breaks.',
    image: '/images/experiences/corporate-retreat.jpg',
    highlight: 'High-speed fiber optic WiFi & desk',
    icon: Briefcase
  },
  {
    id: 'exp5',
    title: 'Birthday & Milestone Bashes',
    tagline: 'Unforgettable Celebrations',
    description: 'Celebrate special milestones in grand nature. Custom acoustic setups, balloon decor, curated catering, and party sound systems can be arranged.',
    image: '/images/experiences/birthday-party.jpg',
    highlight: 'Sound system & outdoor party setups',
    icon: Calendar
  },
  {
    id: 'exp6',
    title: 'Starlit Bonfires & Lawn Cinema',
    tagline: 'Magical Evenings',
    description: 'Gather around the stone bonfire under unpolluted starry skies, roast skewers, and projection-screen your favorite family movies on the lawn.',
    image: '/images/experiences/bonfire-night.jpg',
    highlight: 'Stone bonfire pit & projector screen',
    icon: Flame
  }
];

export const Experiences = () => {
  const handleInquire = (title: string) => {
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });

      const selectElement = document.getElementById('purpose') as HTMLSelectElement;
      if (selectElement) {
        let valueToSet = 'Other';
        if (title.toLowerCase().includes('corporate')) valueToSet = 'Corporate Outing';
        else if (title.toLowerCase().includes('birthday')) valueToSet = 'Celebration';
        else if (title.toLowerCase().includes('family')) valueToSet = 'Family Stay';
        selectElement.value = valueToSet;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const messageElement = document.getElementById('message') as HTMLTextAreaElement;
      if (messageElement) {
        messageElement.value = `Hi, I would like to inquire about the "${title}" package for our stay at Mauli Farms Pali.`;
        messageElement.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="experiences" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Curated Estate Experiences"
          subtitle="Unforgettable Stays"
          description="Every visit is tailored to your occasion. From misty monsoon retreats to leadership offsites and milestone celebrations."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiencesList.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-secondary-dark/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Media frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary-dark">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  {/* Clean unboxed tag */}
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-300">
                      {exp.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2.5 group-hover:text-amber-800 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-dark/75 text-xs sm:text-sm font-light leading-relaxed mb-6">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-secondary-dark/60">
                    <div className="text-[11px] font-medium text-primary-dark/80 flex items-center gap-1.5 mb-4">
                      <Icon className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                      <span>{exp.highlight}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-between text-xs tracking-wider uppercase border border-secondary-dark hover:bg-primary hover:text-white transition-all py-2.5 px-4 rounded-xl"
                      onClick={() => handleInquire(exp.title)}
                    >
                      <span>Inquire Experience</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
