import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Building2, BatteryCharging, Snowflake, ArrowRight } from 'lucide-react';

const FRAME_COUNT = 192;
const BG_HEX = '#2A2836';
const framePath = (i) => `/frames/panel_${String(i).padStart(4, '0')}.webp`;

const SERVICES = [
  {
    id: 'res',
    title: 'Fotovoltaico Residenziale',
    desc: 'Impianti su misura per la tua casa. Riduci la bolletta fino al 90%.',
    icon: Sun,
    threshold: 0.18,
    position: 'top-left',
  },
  {
    id: 'biz',
    title: 'Fotovoltaico Aziendale',
    desc: 'Soluzioni industriali e commerciali con monitoraggio dedicato.',
    icon: Building2,
    threshold: 0.36,
    position: 'top-right',
  },
  {
    id: 'bat',
    title: 'Sistemi di Accumulo',
    desc: "Batterie al litio per usare l'energia anche di notte.",
    icon: BatteryCharging,
    threshold: 0.54,
    position: 'bottom-left',
  },
  {
    id: 'clima',
    title: 'Climatizzazione',
    desc: 'Pompe di calore Mitsubishi Electric ad alta efficienza.',
    icon: Snowflake,
    threshold: 0.72,
    position: 'bottom-right',
  },
];

const POSITION_CLASS = {
  'top-left': 'top-2 left-2 sm:top-3 sm:left-3 lg:top-6 lg:left-6',
  'top-right': 'top-2 right-2 sm:top-3 sm:right-3 lg:top-6 lg:right-6',
  'bottom-left': 'bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-6 lg:left-6',
  'bottom-right': 'bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6',
};

const POSITION_OFFSET = {
  'top-left': { x: -24, y: -18 },
  'top-right': { x: 24, y: -18 },
  'bottom-left': { x: -24, y: 18 },
  'bottom-right': { x: 24, y: 18 },
};

function ServiceCard({ service, scrollYProgress }) {
  const { title, desc, icon: Icon, threshold, position } = service;
  const offset = POSITION_OFFSET[position];

  const opacity = useTransform(scrollYProgress, [threshold, threshold + 0.06], [0, 1]);
  const x = useTransform(scrollYProgress, [threshold, threshold + 0.06], [offset.x, 0]);
  const y = useTransform(scrollYProgress, [threshold, threshold + 0.06], [offset.y, 0]);

  const titleOpacity = useTransform(scrollYProgress, [threshold + 0.01, threshold + 0.07], [0, 1]);
  const titleY = useTransform(scrollYProgress, [threshold + 0.01, threshold + 0.07], [10, 0]);

  const descOpacity = useTransform(scrollYProgress, [threshold + 0.025, threshold + 0.085], [0, 1]);
  const descY = useTransform(scrollYProgress, [threshold + 0.025, threshold + 0.085], [10, 0]);

  return (
    <motion.div
      style={{ opacity, x, y }}
      className={`pointer-events-none absolute ${POSITION_CLASS[position]} w-[150px] sm:w-[200px] lg:w-[300px] z-10`}
    >
      <div className="rounded-xl lg:rounded-2xl border border-white/15 bg-siteBg/70 backdrop-blur-md p-3 sm:p-4 lg:p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-primary text-white">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5" strokeWidth={2} />
        </span>
        <motion.h3
          style={{ opacity: titleOpacity, y: titleY }}
          className="mt-2 sm:mt-3 lg:mt-4 font-display text-sm sm:text-base lg:text-xl font-semibold leading-tight text-white"
        >
          {title}
        </motion.h3>
        <motion.p
          style={{ opacity: descOpacity, y: descY }}
          className="mt-1 lg:mt-2 text-[11px] sm:text-xs lg:text-sm leading-relaxed text-white/70 hidden sm:block"
        >
          {desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.06, 0.1], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.1], [0, -60]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.96]);

  const ctaOpacity = useTransform(scrollYProgress, [0.88, 0.94, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.88, 0.94], [40, 0]);

  useEffect(() => {
    let mounted = true;
    let count = 0;
    const images = new Array(FRAME_COUNT);

    const handleDone = () => {
      if (!mounted) return;
      count += 1;
      setLoadedCount(count);
      if (count === FRAME_COUNT) setReady(true);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = framePath(i + 1);
      img.onload = handleDone;
      img.onerror = handleDone;
      images[i] = img;
    }
    imagesRef.current = images;

    return () => {
      mounted = false;
    };
  }, []);

  const drawFrame = (idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    ctx.fillStyle = BG_HEX;
    ctx.fillRect(0, 0, w, h);
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    window.addEventListener('resize', resize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    const tick = () => {
      rafRef.current = null;
      if (targetFrameRef.current !== currentFrameRef.current) {
        drawFrame(targetFrameRef.current);
      }
    };

    const unsubscribe = scrollYProgress.on('change', (p) => {
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(p * (FRAME_COUNT - 1)))
      );
      if (idx === targetFrameRef.current) return;
      targetFrameRef.current = idx;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    });

    drawFrame(0);

    return () => {
      unsubscribe();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [ready, scrollYProgress]);

  const loadProgress = Math.round((loadedCount / FRAME_COUNT) * 100);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[400vh]"
      style={{ backgroundColor: BG_HEX }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!ready && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
            style={{ backgroundColor: BG_HEX }}
          >
            <div className="font-display text-2xl tracking-wide text-white/90">
              Elio Sud Siracusana
            </div>
            <div className="mt-6 h-px w-48 overflow-hidden bg-white/15">
              <div
                className="h-full bg-primary transition-[width] duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.3em] text-white/50">
              {loadProgress}%
            </div>
          </div>
        )}

        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY, scale: headlineScale }}
          className="pointer-events-none absolute inset-x-0 top-[8vh] sm:top-[10vh] flex flex-col items-center px-6 text-center z-20"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Siracusa, dal 1984
          </span>
          <h1 className="font-display font-semibold text-balance text-white text-[2rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            40 anni di
            <br />
            <span className="italic text-primary">energia siciliana</span>
          </h1>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={wrapperRef}
            className="relative w-[min(100vw,1280px,142vh)] aspect-video"
          >
            <canvas
              ref={canvasRef}
              className="block w-full h-full"
              style={{
                backgroundColor: BG_HEX,
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                maskComposite: 'intersect',
              }}
            />

            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute inset-x-0 bottom-[8vh] sm:bottom-[10vh] flex flex-col items-center px-6 text-center z-20"
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold text-white text-balance max-w-3xl leading-tight">
            Richiedi un sopralluogo{' '}
            <span className="italic text-primary">gratuito</span>
          </h2>
          <a
            href="#contatti"
            className="mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_20px_60px_-20px_rgba(232,103,26,0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-dark pointer-events-auto"
          >
            Prenota ora
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
