import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import SectionTitle from './ui/SectionTitle';

export default function Services() {
  return (
    <section id="servizi" className="section bg-cream">
      <div className="container-x">
        <SectionTitle
          eyebrow="Cosa Facciamo"
          title="I Nostri Servizi"
          subtitle="Un unico partner affidabile per tutti gli impianti della tua casa o azienda"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-cardHover transition-shadow duration-500"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <span className="absolute top-5 left-5 font-display font-extrabold text-xl text-white bg-primary px-3 py-1 rounded-full">
                  {s.id}
                </span>
              </div>
              <div className="p-7 md:p-9">
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ink">{s.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{s.text}</p>
                <a
                  href="#contatti"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contatti')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-primary group/link"
                >
                  Scopri di più
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
