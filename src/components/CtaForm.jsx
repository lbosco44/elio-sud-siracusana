import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { site } from '../data/site';
import Reveal from './ui/Reveal';

const servizi = [
  'Fotovoltaico',
  'Climatizzazione',
  'Caldaia',
  'Solare Termico',
  'Altro',
];

export default function CtaForm() {
  const [form, setForm] = useState({ nome: '', telefono: '', servizio: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setForm({ nome: '', telefono: '', servizio: '' });
    }, 400);
  };

  return (
    <section id="contatti" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/preventivo-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-siteBg/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-siteBg/70 via-siteBg/50 to-primary/25" />
      </div>

      <div className="container-x section text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="eyebrow !text-primary-light">Contattaci Ora</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">
              Pronto a risparmiare sulla bolletta?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-white/80 text-balance">
              Sopralluogo gratuito, preventivo senza impegno. Ti richiamiamo entro poche ore.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 relative">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-[1.2fr_1fr_1fr_auto] gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl md:rounded-full p-3"
                  >
                    <input
                      type="text"
                      name="nome"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      placeholder="Nome e cognome"
                      className="w-full rounded-full bg-white/90 px-6 h-14 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="Telefono"
                      className="w-full rounded-full bg-white/90 px-6 h-14 text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <select
                      name="servizio"
                      required
                      value={form.servizio}
                      onChange={handleChange}
                      className="w-full rounded-full bg-white/90 px-6 h-14 text-ink focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Servizio di interesse
                      </option>
                      {servizi.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="btn-primary !h-14 !px-7 whitespace-nowrap">
                      Richiedi Preventivo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-10 flex flex-col items-center gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-primary flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-9 h-9 text-white" />
                    </motion.div>
                    <h3 className="font-display font-bold text-3xl">Grazie!</h3>
                    <p className="text-white/80 text-lg">Ti contatteremo presto.</p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-sm text-white/60 hover:text-white underline underline-offset-4"
                    >
                      Invia un'altra richiesta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
              <span>Oppure chiamaci subito:</span>
              <a
                href={site.phoneLink}
                className="inline-flex items-center gap-2 hover:text-primary-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                {site.phone}
              </a>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: {site.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
