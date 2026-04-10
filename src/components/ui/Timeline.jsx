import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Timeline({ data, title, subtitle }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-cream md:px-10" ref={containerRef}>
      <div className="container-x max-w-7xl mx-auto py-20 md:py-28">
        {title && (
          <span className="eyebrow">Il Processo</span>
        )}
        {title && (
          <h2 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-ink text-balance max-w-4xl">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-muted max-w-2xl text-balance">
            {subtitle}
          </p>
        )}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-2 md:left-2 w-12 rounded-full bg-cream flex items-center justify-center shadow-md shadow-primary/10 ring-4 ring-cream">
                <div className="h-5 w-5 rounded-full bg-primary border-4 border-cream p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-display font-bold text-primary">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-display font-bold text-primary">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height + 'px' }}
          className="absolute md:left-7 left-7 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-primary via-primary-light to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
