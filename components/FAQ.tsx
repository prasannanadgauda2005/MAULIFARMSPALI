'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { faqs } from '../data/content';

const FAQItem = ({ question, answer, idx }: { question: string; answer: string; idx: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-dark/60 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left focus:outline-none group py-2"
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-accent shrink-0" />
          <span className="font-serif text-base md:text-lg font-semibold text-primary group-hover:text-accent transition-colors">
            {question}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 rounded-full bg-secondary border border-secondary-dark text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors ml-4"
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-4 pl-8 text-sm font-light text-dark/75 leading-relaxed max-w-3xl">
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
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Clear Answers"
          align="center"
        />

        <div className="glass-card rounded-3xl p-6 md:p-10 border border-secondary-dark/60 shadow-lg">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
