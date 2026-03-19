"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const galleryItems = [
  {
    // src: "https://images.unsplash.com/photo-1574258495973-f7a4e15e tried-and-true?w=600",
    src: "/img/1.jpeg",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Atelier+Optique",
    alt: "Atelier d'optique — travail de précision",
    caption: "Notre Atelier",
  },
  {
    src: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
    // src: "/img/3.jpeg",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Montures",
    alt: "Collection de montures de luxe",
    caption: "Montures de Luxe",
  },
  {
    src: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Verres+M%C3%A9dicaux",
    alt: "Verres médicaux de précision",
    caption: "Verres Médicaux",
  },
  {
    // src: "https://images.unsplash.com/photo-1574258495973-f7a4e15e3b58?w=600&q=80",
    src: "/img/3.jpeg",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Examen+de+Vue",
    alt: "Examen de vue professionnel",
    caption: "Examen de Vue",
  },
  {
    src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Lunettes+de+Soleil",
    alt: "Lunettes de soleil — collection été",
    caption: "Solaires",
  },
  {
    src: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80",
    fallback: "https://placehold.co/600x400/4a5740/faf6ef?text=Casablanca+1932",
    alt: "Casablanca — notre ville depuis 1932",
    caption: "Casablanca",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.15);
  const [imgSrc, setImgSrc] = useState(item.src);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl ${
        isVisible ? "animate-scale-in" : "opacity-0"
      } ${index === 0 || index === 3 ? "sm:col-span-2 sm:row-span-2" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc(item.fallback)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-sage-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p
            className="text-cream-50 text-lg font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {item.caption}
          </p>
          <p className="text-cream-200/60 text-sm mt-1">{item.alt}</p>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { ref: sectionRef, isVisible: sectionVisible } = useInView(0.1);

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-cream-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            sectionVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">
            Notre Univers
          </span>
          <h2
            className="text-sage-900 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Galerie
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-sage-500 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre établissement, nos collections et l&apos;art de
            l&apos;optique à travers notre galerie.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.caption} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
