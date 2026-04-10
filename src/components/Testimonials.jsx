import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { testimonials } from '../data/testimonials';
import SectionTitle from './ui/SectionTitle';

const initialsOf = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-x">
        <SectionTitle
          eyebrow="Dicono di Noi"
          title="Cosa Dicono i Nostri Clienti"
          subtitle="Oltre 40 anni di fiducia costruita una famiglia alla volta"
        />

        <div className="max-w-3xl mx-auto">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={40}
            className="!pb-16"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="relative bg-cream rounded-3xl p-10 md:p-14 text-center">
                  <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/15" />

                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                    ))}
                  </div>

                  <blockquote className="font-display italic text-2xl md:text-3xl leading-snug text-ink text-balance">
                    “{t.quote}”
                  </blockquote>

                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/15 text-primary font-display font-bold text-xl flex items-center justify-center">
                      {initialsOf(t.name)}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-ink">{t.name}</div>
                      <div className="text-sm text-muted">{t.city}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
