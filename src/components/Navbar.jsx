import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { site } from '../data/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-nav' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <nav className="container-x flex items-center justify-between h-20">
          <a
            href="#top"
            onClick={(e) => handleNav(e, '#top')}
            className="flex items-baseline gap-2 group"
          >
            <span className="font-display font-extrabold text-2xl md:text-3xl text-ink group-hover:text-primary transition-colors">
              {site.brand}
            </span>
            <span className="hidden sm:inline text-xs font-medium uppercase tracking-[0.2em] text-muted">
              {site.subtitle}
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-10">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className="relative text-sm font-medium text-ink hover:text-primary transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneLink}
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
            <a
              href="#contatti"
              onClick={(e) => handleNav(e, '#contatti')}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-primary/20 transition-all hover:bg-primary-dark hover:-translate-y-0.5"
            >
              Preventivo Gratuito
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-cream transition-colors"
              aria-label="Apri menu"
            >
              <Menu className="w-6 h-6 text-ink" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[70] h-full w-[85%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-cream">
                <span className="font-display font-extrabold text-2xl text-ink">{site.brand}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-cream"
                  aria-label="Chiudi menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ul className="flex-1 px-6 py-8 space-y-2">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNav(e, item.href)}
                      className="block py-4 text-xl font-display font-semibold text-ink hover:text-primary transition-colors border-b border-cream"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="p-6 border-t border-cream space-y-3">
                <a href={site.phoneLink} className="flex items-center gap-3 text-sm font-medium text-muted">
                  <Phone className="w-4 h-4 text-primary" />
                  {site.phone}
                </a>
                <a
                  href="#contatti"
                  onClick={(e) => handleNav(e, '#contatti')}
                  className="btn-primary w-full"
                >
                  Preventivo Gratuito
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
