"use client";

import { useEffect, useRef, useState } from "react";

const brands = [
  {
    name: "Zeïss",
    description: "Leader mondial de l'optique de précision depuis 1846",
    year: "Depuis 1846",
  },
  {
    name: "Stigmal",
    description: "Verres ophtalmiques d'une clarté exceptionnelle",
    year: "Qualité Premium",
  },
  {
    name: "Télégie",
    description: "Innovation en verres correcteurs haute performance",
    year: "Haute Performance",
  },
  {
    name: "Essilor",
    description: "N°1 mondial des verres ophtalmiques",
    year: "N°1 Mondial",
  },
  {
    name: "Ray-Ban",
    description: "L'icône des lunettes de soleil depuis 1937",
    year: "Depuis 1937",
  },
  {
    name: "Oakley",
    description: "Technologie de pointe ",
    year: "Performance",
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

export default function Brands() {
  const { ref: sectionRef, isVisible: sectionVisible } = useInView(0.1);

  return (
    <section
      id="marques"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2e352a 0%, #3d4735 30%, #4a5740 60%, #2e352a 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-20 ${
            sectionVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-semibold">
            Nos Partenaires
          </span>
          <h2
            className="text-cream-50 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Marques de Prestige
          </h2>
          <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />
          <p className="text-cream-200/60 max-w-2xl mx-auto leading-relaxed">
            Un stock important de verres médicaux des marques les plus réputées,
            soigneusement sélectionnées pour garantir une qualité optique
            irréprochable.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>

        {/* Scrolling Marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
              <span
                key={`${brand.name}-${i}`}
                className="mx-8 text-cream-200/15 text-4xl font-bold tracking-wider"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandCard({
  brand,
  index,
}: {
  brand: (typeof brands)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`${isVisible ? "animate-scale-in" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="group relative rounded-2xl p-8 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-500 cursor-default overflow-hidden">
        {/* Shimmer effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,168,76,0.05), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <h3
              className="text-cream-50 text-2xl font-bold group-hover:text-gold-400 transition-colors duration-300"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {brand.name}
            </h3>
            <span className="text-gold-500/60 text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-gold-500/20">
              {brand.year}
            </span>
          </div>
          <p className="text-cream-200/50 text-sm leading-relaxed">
            {brand.description}
          </p>
        </div>
      </div>
    </div>
  );
}
