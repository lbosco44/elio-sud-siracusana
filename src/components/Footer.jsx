import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { site } from '../data/site';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const servizi = [
  'Impianti Fotovoltaici',
  'Climatizzazione',
  'Caldaie e Riscaldamento',
  'Solare Termico',
  'Manutenzione e Assistenza',
];

const azienda = [
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'I Nostri Lavori', href: '#lavori' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contatti', href: '#contatti' },
];

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-20 font-display font-extrabold text-primary/5 select-none leading-none text-[26rem]"
      >
        40
      </div>

      <div className="container-x pt-20 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-white">{site.brand}</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                {site.subtitle}
              </span>
            </div>
            <div className="mt-2 text-sm text-white/50">Siracusa, dal {site.since}</div>
            <p className="mt-6 text-sm leading-relaxed text-white/70 max-w-xs">
              Il partner di fiducia per impianti fotovoltaici, climatizzazione e riscaldamento a
              Siracusa.
            </p>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white">Servizi</h4>
            <ul className="mt-5 space-y-3">
              {servizi.map((s) => (
                <li key={s}>
                  <a
                    href="#servizi"
                    onClick={(e) => handleNav(e, '#servizi')}
                    className="text-sm text-white/70 hover:text-primary-light transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white">Azienda</h4>
            <ul className="mt-5 space-y-3">
              {azienda.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    onClick={(e) => handleNav(e, a.href)}
                    className="text-sm text-white/70 hover:text-primary-light transition-colors"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-display font-semibold text-lg text-white">Contatti</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>{site.address}</span>
              </li>
              <li>
                <a
                  href={site.phoneLink}
                  className="flex gap-3 hover:text-primary-light transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-3 hover:text-primary-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>WhatsApp: {site.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.emailLink}
                  className="flex gap-3 hover:text-primary-light transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-primary hover:border-primary transition-all"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © 2025 Elio Sud Siracusana di {site.owner} — P.IVA {site.vat}
          </p>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
