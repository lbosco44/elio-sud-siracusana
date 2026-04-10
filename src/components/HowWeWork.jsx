import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { steps } from '../data/steps';
import SectionTitle from './ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const length = line.getTotalLength?.() || 1000;
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-cream relative overflow-hidden">
      <div className="container-x">
        <SectionTitle
          eyebrow="Il Processo"
          title="Come Lavoriamo"
          subtitle="Un processo semplice e trasparente, dalla prima chiamata all'impianto funzionante"
        />

        <div className="relative">
          {/* Connector SVG — desktop only */}
          <svg
            className="hidden md:block absolute left-0 right-0 top-10 w-full h-4 pointer-events-none"
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 60 10 L 940 10"
              stroke="#E8671A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="6 10"
              fill="none"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center md:px-4"
              >
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-white border-4 border-primary flex items-center justify-center font-display font-extrabold text-2xl text-primary shadow-lg shadow-primary/10">
                  {step.id}
                </div>
                <h3 className="mt-6 font-display font-bold text-xl md:text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted max-w-xs mx-auto">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
