import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface SwiperComponentProps {
  images: { imageUrl: string; alt?: string }[];
}

export const CarWiew: React.FC<SwiperComponentProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto p-2">
      <Swiper
        modules={[Navigation, Autoplay, Thumbs]}
        spaceBetween={2} /* Espaciado entre slides */
        slidesPerView={1} /* Número de slides por vista */
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={img.imageUrl}>
              <img
                src={img.imageUrl}
                alt={img.alt || `Imagen ${index + 1}`}
                className="w-full h-52 sm:h-50 md:h-[550px] rounded-lg shadow-md hover:shadow-lg object-cover cursor-pointer"
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay imágenes disponibles.
          </p>
        )}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper} // Asigna el swiper para conectar con el slider principal
        spaceBetween={10}
        slidesPerView={4} // Número de thumbnails visibles
        freeMode={true}
        watchSlidesProgress={true} // Mejora la sincronización
        className="mt-4"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.imageUrl}>
            <img
              src={img.imageUrl}
              alt={img.alt || `Thumbnail ${index + 1}`}
              className="w-full h-16 md:h-36 object-cover rounded-lg cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
