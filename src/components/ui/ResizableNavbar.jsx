import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/cn';

const NavbarCtx = createContext({ visible: false });
const useNavbar = () => useContext(NavbarCtx);

export function Navbar({ children, className }) {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 100);
  });

  return (
    <NavbarCtx.Provider value={{ visible }}>
      <motion.div
        ref={ref}
        className={cn('fixed inset-x-0 top-5 z-50 w-full', className)}
      >
        {Children.map(children, (child) =>
          isValidElement(child) ? cloneElement(child, { visible }) : child
        )}
      </motion.div>
    </NavbarCtx.Provider>
  );
}

export function NavBody({ children, className, visible }) {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(12px)' : 'blur(6px)',
        boxShadow: visible
          ? '0 10px 40px -10px rgba(28, 28, 30, 0.18), 0 0 0 1px rgba(28, 28, 30, 0.05)'
          : '0 0 0 1px rgba(255, 255, 255, 0.08)',
        width: visible ? '48%' : '100%',
        y: visible ? 14 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 50 }}
      style={{ minWidth: '760px' }}
      className={cn(
        'relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 py-2 lg:flex',
        visible ? 'bg-white/85' : 'bg-black/20',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function NavItems({ items, className, onItemClick }) {
  const { visible } = useNavbar();
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition-colors duration-300 lg:flex',
        visible ? 'text-ink' : 'text-white',
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={(e) => onItemClick?.(e, item.link)}
          className="relative px-4 py-2"
        >
          {hovered === idx && (
            <motion.div
              layoutId="navbar-hovered"
              className={cn(
                'absolute inset-0 h-full w-full rounded-full',
                visible ? 'bg-primary/10' : 'bg-white/15'
              )}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
}

export function MobileNav({ children, className, visible }) {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(12px)' : 'blur(6px)',
        boxShadow: visible
          ? '0 10px 40px -10px rgba(28, 28, 30, 0.18), 0 0 0 1px rgba(28, 28, 30, 0.05)'
          : '0 0 0 1px rgba(255, 255, 255, 0.08)',
        width: visible ? '92%' : '100%',
        paddingRight: visible ? '16px' : '16px',
        paddingLeft: visible ? '16px' : '16px',
        borderRadius: visible ? '28px' : '9999px',
        y: visible ? 10 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 50 }}
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-2 lg:hidden',
        visible ? 'bg-white/90' : 'bg-black/25',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function MobileNavHeader({ children, className }) {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  );
}

export function MobileNavMenu({ children, className, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-3xl bg-white px-6 py-6 shadow-[0_20px_60px_-15px_rgba(28,28,30,0.2),_0_0_0_1px_rgba(28,28,30,0.05)]',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MobileNavToggle({ isOpen, onClick }) {
  const { visible } = useNavbar();
  const color = visible ? 'text-ink' : 'text-white';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors',
        color
      )}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
}

export function NavbarLogo({ onClick }) {
  const { visible } = useNavbar();
  return (
    <a
      href="#top"
      onClick={(e) => onClick?.(e, '#top')}
      className="relative z-20 flex items-baseline gap-2 px-2 py-1"
    >
      <span
        className={cn(
          'font-display font-extrabold text-2xl md:text-[1.65rem] transition-colors duration-300',
          visible ? 'text-ink' : 'text-white'
        )}
      >
        Elio Sud
      </span>
      <span
        className={cn(
          'hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300',
          visible ? 'text-primary' : 'text-white/70'
        )}
      >
        Siracusana
      </span>
    </a>
  );
}

export function NavbarButton({
  href,
  as: Tag = 'a',
  children,
  className,
  variant = 'primary',
  onClick,
  ...props
}) {
  const { visible } = useNavbar();

  const base =
    'relative inline-flex items-center justify-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer hover:-translate-y-0.5';

  const variants = {
    primary:
      'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-primary/40',
    secondary: visible
      ? 'text-ink hover:text-primary'
      : 'text-white hover:text-white/80',
    dark: 'bg-ink text-white hover:bg-ink/90',
  };

  return (
    <Tag
      href={href}
      onClick={(e) => onClick?.(e, href)}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
