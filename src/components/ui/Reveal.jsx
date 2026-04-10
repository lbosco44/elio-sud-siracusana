import { motion } from 'framer-motion';

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  x = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
