'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionTitle } from './SectionTitle';
import { Utensils, Flame, ChefHat, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

const diningHighlights = [
  {
    title: 'Authentic Maharashtrian Cooking',
    desc: 'Local caretakers prepare piping-hot Gavran chicken/mutton handi, fresh Kokani fish curry, pitla-bhakri with thecha, and seasonal sweet puran poli.',
    icon: Utensils
  },
  {
    title: 'Fully-Equipped Modern Kitchen',
    desc: 'Equipped with gas ranges, refrigerator, microwave oven, RO water purifier, utensils, and dinnerware for guests who prefer self-cooking.',
    icon: ChefHat
  },
  {
    title: 'Outdoor Charcoal BBQ Grill',
    desc: 'Gather by the illuminated pool deck with our outdoor charcoal barbecue station, perfect for evening grilling and skewers under the stars.',
    icon: Flame
  }
];

export const DiningExperience = () => {
  const handleInquireFood = () => {
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      const messageElement = document.getElementById('message') as HTMLTextAreaElement;
      if (messageElement) {
        messageElement.value = 'Hi, I would like to inquire about authentic caretaker food and meal arrangements during our stay.';
        messageElement.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="dining" className="py-20 md:py-28 bg-secondary-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Wholesome Farmstead Dining"
          subtitle="Food & Gastronomy"
          description="From authentic home-cooked village delicacies to poolside charcoal grills and self-cooking conveniences."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Visual Showcase (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-secondary-dark shadow-md bg-secondary-dark"
          >
            <Image
              src="/images/gallery/kitchen-modern.jpg"
              alt="Mauli Farms Fully Equipped Kitchen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-300 block mb-1">
                Warm Farm Table Experience
              </span>
              <p className="font-serif text-lg font-normal text-white/95 leading-snug">
                Fresh ingredients, local Kokani spices, and customized menus tailored to your family.
              </p>
            </div>
          </motion.div>

          {/* Highlights & Copy (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="space-y-6">
              {diningHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-secondary-dark/70 shadow-sm hover:border-amber-700/30 transition-all">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-dark/70 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-secondary-dark flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-dark/60 font-light">
                Vegetarian, Jain, and non-vegetarian options available on advance notice.
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleInquireFood}
                className="text-xs uppercase tracking-wider font-semibold py-2.5 px-5 flex items-center gap-1.5"
              >
                Inquire Dining Options <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
