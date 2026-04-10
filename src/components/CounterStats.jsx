import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';

const stats = [
  { end: 40, suffix: '+', label: 'Anni di Esperienza' },
  { end: 500, suffix: '+', label: 'Impianti Installati' },
  { end: 1000, suffix: '+', label: 'Famiglie Servite', separator: '.' },
  { end: 4, suffix: '', label: 'Marchi Certificati' },
];

export default function CounterStats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <section ref={ref} className="relative bg-primary overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-black/10 blur-3xl" />
      <div className="container-x relative py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-white">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center md:border-r md:border-white/20 md:last:border-0 md:px-4"
            >
              <div className="font-display font-extrabold text-6xl sm:text-7xl md:text-7xl lg:text-8xl leading-none tracking-tight">
                {started ? (
                  <CountUp
                    end={s.end}
                    duration={2.4}
                    separator={s.separator || ''}
                    suffix={s.suffix}
                  />
                ) : (
                  <span>0{s.suffix}</span>
                )}
              </div>
              <div
                className="mt-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/90"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
