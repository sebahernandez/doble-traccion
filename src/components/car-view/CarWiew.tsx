import React, { useState, useRef } from "react";

interface CarViewProps {
  images: { imageUrl: string; alt?: string }[];
}

export const CarWiew: React.FC<CarViewProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const maxVisibleThumbnails = 5;
  const canScrollUp = thumbnailStartIndex > 0;
  const canScrollDown =
    thumbnailStartIndex + maxVisibleThumbnails < images.length;

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const scrollThumbnailsUp = () => {
    if (canScrollUp) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    }
  };

  const scrollThumbnailsDown = () => {
    if (canScrollDown) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  if (!images.length) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  const visibleThumbnails = images.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + maxVisibleThumbnails
  );

  return (
    <div className="flex gap-4 max-w-5xl mx-auto p-2">
      {/* Thumbnails Column - Hidden on mobile */}
      <div className="hidden md:flex flex-col w-20 md:w-24">
        {/* Scroll Up Button */}
        {canScrollUp && (
          <button
            onClick={scrollThumbnailsUp}
            className="flex items-center justify-center h-8 bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out rounded mb-1 transform hover:scale-110"
          >
            <svg
              className="w-4 h-4 text-gray-600 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}

        {/* Thumbnails Container */}
        <div className="flex flex-col gap-1 flex-1 transition-all duration-300 ease-in-out">
          {visibleThumbnails.map((img, index) => {
            const actualIndex = thumbnailStartIndex + index;
            return (
              <button
                key={actualIndex}
                onClick={() => handleThumbnailClick(actualIndex)}
                className={`relative w-full h-16 md:h-20 rounded border-2 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  actualIndex === currentImageIndex
                    ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={img.imageUrl}
                  alt={img.alt || `Thumbnail ${actualIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                />
              </button>
            );
          })}
        </div>

        {/* Scroll Down Button */}
        {canScrollDown && (
          <button
            onClick={scrollThumbnailsDown}
            className="flex items-center justify-center h-8 bg-gray-200 hover:bg-gray-300 transition-all duration-300 ease-in-out rounded mt-1 transform hover:scale-110"
          >
            <svg
              className="w-4 h-4 text-gray-600 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main Image Container */}
      <div className="flex-1 w-full relative">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-lg">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-x-1"
              >
                <svg
                  className="w-5 h-5 text-gray-700 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:translate-x-1"
              >
                <svg
                  className="w-5 h-5 text-gray-700 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={toggleZoom}
              className="bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              {isZoomed ? (
                <svg
                  className="w-5 h-5 text-gray-700 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10h-6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Main Image */}
          <div
            className={`relative overflow-hidden transition-all duration-300 ease-in-out ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
            style={{ height: "500px" }}
          >
            <img
              ref={imageRef}
              src={images[currentImageIndex].imageUrl}
              alt={
                images[currentImageIndex].alt ||
                `Imagen ${currentImageIndex + 1}`
              }
              className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};
