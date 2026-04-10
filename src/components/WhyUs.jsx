import { motion } from 'framer-motion';
import { features } from '../data/features';
import SectionTitle from './ui/SectionTitle';

export default function WhyUs() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionTitle
          eyebrow="I Nostri Punti di Forza"
          title="Perché Siracusa sceglie noi da 40 anni"
          subtitle="Ogni giorno, più di mille famiglie si affidano al nostro lavoro. Ecco cosa ci rende diversi."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative p-8 lg:p-10 rounded-3xl bg-cream border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-cardHover transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 font-display font-bold text-xl md:text-2xl text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{f.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
