import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="chi-siamo" className="section bg-white relative overflow-hidden">
      {/* Decorative "40" watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 font-display font-extrabold text-primary select-none leading-none"
        style={{ fontSize: 'clamp(20rem, 35vw, 40rem)', opacity: 0.06 }}
      >
        40
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline gap-5">
              <span className="font-display font-extrabold text-primary leading-none tracking-tighter text-[10rem] md:text-[14rem] lg:text-[16rem]">
                40
              </span>
              <div className="pb-6">
                <div className="text-sm uppercase tracking-[0.25em] text-muted font-semibold">anni di</div>
                <div className="text-sm uppercase tracking-[0.25em] text-muted font-semibold">esperienza</div>
              </div>
            </div>

            <span className="eyebrow mt-4 block">La Nostra Storia</span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink text-balance">
              Una storia di fiducia, costruita impianto per impianto
            </h2>

            <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-muted">
              <p>
                Elio Sud Siracusana nasce a Siracusa oltre 40 anni fa con una missione semplice:
                offrire impianti affidabili e un servizio che mette le persone al primo posto.
              </p>
              <p>
                Negli anni abbiamo installato caldaie, climatizzatori, pannelli solari e impianti
                fotovoltaici per centinaia di famiglie e aziende di Siracusa e provincia. Ogni
                lavoro porta la nostra firma: fatto bene, fatto per durare.
              </p>
              <p>
                Lavoriamo con i migliori marchi sul mercato — Mitsubishi Electric e Vaillant
                Saunier Duval — e seguiamo ogni cliente dalla consulenza iniziale fino
                all'assistenza post-installazione.
              </p>
            </div>

            <a
              href="#contatti"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-10 inline-flex items-center gap-2 font-semibold text-primary text-lg group"
            >
              Contattaci
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/chi-siamo-team.png"
                alt="Il team Elio Sud Siracusana"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-8 -left-6 md:-left-12 w-1/2 md:w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white"
            >
              <img
                src="/images/chi-siamo-lavoro.png"
                alt="Un intervento in corso"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-4 md:-right-8 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl rotate-3"
            >
              <div className="text-xs uppercase tracking-widest opacity-80">Dal</div>
              <div className="font-display font-extrabold text-3xl">1984</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
