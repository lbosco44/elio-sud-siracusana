import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faq } from '../data/faq';
import SectionTitle from './ui/SectionTitle';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section bg-cream">
      <div className="container-x">
        <SectionTitle
          eyebrow="Hai Dubbi?"
          title="Domande Frequenti"
          subtitle="Le risposte alle domande che ci vengono fatte più spesso"
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-primary shadow-card' : 'border-transparent'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 text-left p-6 md:p-7"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-lg md:text-xl text-ink pr-2">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isOpen ? 'bg-primary text-white' : 'bg-cream text-primary'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-7 pb-7 text-base md:text-lg leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
