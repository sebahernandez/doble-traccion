import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import slidesData from "../../data/slides.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export const ImageSlider = () => {
  const slides = slidesData.slides;
  return (
    <div className="w-full h-[700px] relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-6 text-center">
                  {slide.title}
                </h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-center">
                  {slide.description}
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href="/catalogo"
                    className="bg-yellow-400 text-black px-8 py-3 rounded-md font-bold hover:bg-yellow-500"
                  >
                    Ver Catálogo
                  </a>
                  <a
                    href="/contacto"
                    className="bg-white text-black border-2 border-white px-8 py-3 rounded-md font-bold hover:bg-gray-100 hover:text-black"
                  >
                    Contáctanos
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
