'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { Button } from './ui/Button';
import { useCustomImages } from '../hooks/useCustomImages';

export const Experiences = () => {
  const { images } = useCustomImages();

  const handleInquireExperience = (experienceTitle: string) => {
    // Scroll to the booking form
    const formElement = document.getElementById('booking-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      
      // Attempt to auto-select the purpose dropdown in the form
      const selectElement = document.getElementById('purpose') as HTMLSelectElement;
      if (selectElement) {
        // Find option that matches
        let valueToSet = 'Other';
        if (experienceTitle.toLowerCase().includes('corporate')) valueToSet = 'Corporate Outing';
        else if (experienceTitle.toLowerCase().includes('birthday') || experienceTitle.toLowerCase().includes('anniversary')) valueToSet = 'Celebration';
        else if (experienceTitle.toLowerCase().includes('family')) valueToSet = 'Family Stay';
        
        selectElement.value = valueToSet;
        // Trigger synthetic change event for React Hook Form
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
      
      // Pre-fill message field if possible
      const messageElement = document.getElementById('message') as HTMLTextAreaElement;
      if (messageElement) {
        messageElement.value = `Hi, I am interested in inquiring about the "${experienceTitle}" package/experience at Mauli Farms.`;
        const event = new Event('change', { bubbles: true });
        messageElement.dispatchEvent(event);
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  } as const;

  return (
    <section id="experiences" className="py-20 md:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionTitle
          title="Curated Private Experiences"
          subtitle="Memorable Stays"
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {images.experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className="bg-white rounded-3xl overflow-hidden border border-secondary-dark/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
            >
              {/* Image box */}
              <div className="relative aspect-video w-full overflow-hidden bg-secondary-dark">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  unoptimized
                />
              </div>

              {/* Text content */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-dark/75 text-sm font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>
                </div>

                <div className="mt-auto">
                  {exp.highlight && (
                    <div className="mb-4 py-2 px-3 rounded-xl bg-secondary/80 text-xs font-semibold text-primary-dark/80 border border-secondary-dark/40">
                      ★ {exp.highlight}
                    </div>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center justify-between text-xs tracking-wider uppercase border border-secondary-dark/80 hover:bg-primary hover:text-white transition-all py-3 rounded-2xl"
                    onClick={() => handleInquireExperience(exp.title)}
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="h-4 w-4 text-accent group-hover:text-white" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
