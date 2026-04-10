import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

const stats = [
  { end: 40, suffix: '+', label: 'Anni di Esperienza' },
  { end: 500, suffix: '+', label: 'Impianti Installati' },
  { end: 1000, suffix: '+', label: 'Famiglie Servite', separator: '.' },
  { end: 4, suffix: '', label: 'Marchi Certificati' },
];

function formatNumber(n, separator) {
  if (!separator) return String(n);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function Counter({ end, duration = 2.4, separator, suffix, start }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, end, duration]);

  return (
    <span>
      {formatNumber(value, separator)}
      {suffix}
    </span>
  );
}

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
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center md:border-r md:border-white/20 md:last:border-0 md:px-4"
            >
              <div className="font-display font-extrabold text-6xl sm:text-7xl md:text-7xl lg:text-8xl leading-none tracking-tight">
                <Counter
                  end={s.end}
                  separator={s.separator}
                  suffix={s.suffix}
                  start={started}
                />
              </div>
              <div className="mt-4 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
