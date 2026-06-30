'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { SectionTitle } from './SectionTitle';
import { statistics } from '../data/content';
import { WeatherWidget } from './WeatherWidget';
import { useCustomImages } from '../hooks/useCustomImages';

const Counter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  // Extract digits and suffix (e.g., "1,200+" -> number: 1200, suffix: "+", "4.8★" -> number: 4.8, suffix: "★")
  const numericString = value.replace(/[^0-9.]/g, '');
  const target = parseFloat(numericString) || 0;
  const suffix = value.replace(/[0-9.,]/g, '');
  const hasDecimal = value.includes('.');

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * target;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  const formatValue = () => {
    if (hasDecimal) {
      return `${count.toFixed(1)}${suffix}`;
    }
    return `${Math.floor(count).toLocaleString()}${suffix}`;
  };

  return (
    <div ref={ref} className="text-center p-4 border border-secondary-dark rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">
        {formatValue()}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-dark/60">
        {label}
      </div>
    </div>
  );
};

export const About = () => {
  const { images } = useCustomImages();

  return (
    <section id="about" className="compact-section bg-secondary-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main 3-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Column 1: Large Image (5/12 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative min-h-[300px] lg:min-h-auto rounded-3xl overflow-hidden shadow-md border border-secondary-dark/60"
          >
            <Image
              src={images.aboutBg}
              alt="Mauli Farms Private Waterfall Estate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Visual decorative accents */}
            <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 shadow-lg border border-white/20">
              <span className="font-serif text-xs italic text-primary-dark font-semibold">
                "A peaceful sanctuary where a private cascading waterfall and natural stream flow directly through the plot."
              </span>
            </div>
          </motion.div>

          {/* Column 2: Narrative (4/12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <SectionTitle
              title="A Sanctuary in the Wild"
              subtitle="The Private Estate Experience"
              align="left"
              className="mb-5"
            />

            <div className="space-y-4 text-dark/85 text-xs md:text-sm leading-relaxed font-light tracking-wide">
              <p>
                Nestled in the green hills of <strong>Pali, Maharashtra</strong>, Mauli Farms is an exclusive private villa farmhouse designed to offer complete harmony with nature.
              </p>
              <p>
                The entire 1-acre property belongs solely to your group. Our signature highlights are the **private cascading waterfall** and a **natural freshwater stream** flowing directly through the lawn.
              </p>
              <p>
                The villa's local stone construction keeps the interiors <strong>naturally cooled by mountain breezes</strong> and dense tree shade. It is the perfect escape for families, retreats, and celebrations.
              </p>
            </div>
          </motion.div>

          {/* Column 3: Live Weather Card (3/12 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col justify-center h-full"
          >
            <WeatherWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
