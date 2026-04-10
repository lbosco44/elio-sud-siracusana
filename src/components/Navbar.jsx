import { useState } from 'react';
import { Phone } from 'lucide-react';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from './ui/ResizableNavbar';
import { site } from '../data/site';

const navItems = site.nav.map((n) => ({ name: n.label, link: n.href }));

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <ResizableNavbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo onClick={handleNav} />
        <NavItems items={navItems} onItemClick={handleNav} />
        <div className="relative z-20 flex items-center gap-3">
          <NavbarButton
            href={site.phoneLink}
            variant="secondary"
            className="!px-3"
          >
            <Phone className="w-4 h-4 mr-1" />
            {site.phone}
          </NavbarButton>
          <NavbarButton href="#contatti" variant="primary" onClick={handleNav}>
            Preventivo
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo onClick={handleNav} />
          <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open}>
          {navItems.map((item, i) => (
            <a
              key={`mobile-link-${i}`}
              href={item.link}
              onClick={(e) => handleNav(e, item.link)}
              className="relative w-full py-3 text-lg font-display font-semibold text-ink hover:text-primary transition-colors border-b border-cream last:border-0"
            >
              {item.name}
            </a>
          ))}
          <div className="w-full pt-3 flex flex-col gap-3">
            <a
              href={site.phoneLink}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted"
            >
              <Phone className="w-4 h-4 text-primary" />
              {site.phone}
            </a>
            <NavbarButton
              href="#contatti"
              variant="primary"
              onClick={handleNav}
              className="!w-full !py-3 !text-sm"
            >
              Preventivo Gratuito
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
