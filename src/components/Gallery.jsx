import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { gallery } from '../data/gallery';
import SectionTitle from './ui/SectionTitle';

export default function Gallery() {
  return (
    <section id="lavori" className="section overflow-hidden">
      <div className="container-x">
        <SectionTitle
          eyebrow="Portfolio"
          title="I Nostri Lavori"
          subtitle="Ogni impianto è un progetto su misura"
        />
      </div>

      <div className="pl-5 sm:pl-8 lg:pl-0">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1.15}
          centeredSlides={false}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 32, centeredSlides: true },
          }}
          className="!pb-16 !pt-4 max-w-[1400px] mx-auto"
        >
          {gallery.map((item, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card hover:shadow-cardHover transition-shadow duration-500">
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-block bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-ink">
                    {item.label}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
