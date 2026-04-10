import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';

const badges = [
  'Oltre 40 anni di esperienza',
  'Sopralluogo gratuito',
  'Mitsubishi & Vaillant',
  'Siracusa e provincia',
];

const parent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const child = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center overflow-hidden bg-ink">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-bg.jpg"
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="container-x relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 text-white"
      >
        <motion.span
          variants={child}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Siracusa, dal 1984
        </motion.span>

        <motion.h1
          variants={child}
          className="mt-6 font-display font-extrabold text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-balance max-w-5xl"
        >
          L'energia del sole,
          <br />
          <span className="text-primary">l'affidabilità</span> di 40 anni
        </motion.h1>

        <motion.p
          variants={child}
          className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80 text-balance"
        >
          Installiamo impianti fotovoltaici, climatizzatori e caldaie a Siracusa dal 1984.
          Sopralluogo e preventivo sempre gratuiti.
        </motion.p>

        <motion.div variants={child} className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <AnimatedButton href="#contatti" onClick={(e) => handleScroll(e, '#contatti')}>
            Richiedi Preventivo Gratuito
          </AnimatedButton>
          <a href="#servizi" onClick={(e) => handleScroll(e, '#servizi')} className="btn-outline">
            Scopri i Servizi
          </a>
        </motion.div>

        <motion.ul variants={child} className="mt-14 flex flex-wrap gap-3">
          {badges.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 text-sm font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-primary inline-flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-xs uppercase tracking-[0.3em] flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-white/60"
        />
      </motion.div>
    </section>
  );
}
