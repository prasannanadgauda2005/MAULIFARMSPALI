'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { faqs } from '../data/content';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-dark/80 py-4.5 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group py-2"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-base md:text-lg font-semibold text-primary group-hover:text-amber-800 transition-colors pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="p-1.5 rounded-full bg-secondary border border-secondary-dark text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-3 text-xs md:text-sm font-light text-dark/75 leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary-dark/30">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything You Need to Know"
          description="Common questions about our cooling architecture, waterfall access, guest capacities, pet policies, and meal arrangements."
          align="center"
        />

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-secondary-dark shadow-sm">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
