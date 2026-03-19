"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const overlay = heroRef.current.querySelector(
          ".hero-overlay"
        ) as HTMLElement;
        if (overlay) {
          overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1574258495973-f7a4e15e3b58?w=1920&q=80"
        alt="Optician workshop"
        fill
        className="object-cover z-0"
        priority
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Dark overlay on top of image */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(46,53,42,0.88) 0%, rgba(61,71,53,0.85) 25%, rgba(74,87,64,0.82) 50%, rgba(58,58,58,0.88) 75%, rgba(26,31,23,0.92) 100%)",
        }}
      />

      {/* Decorative pattern overlay */}
      <div
        className="hero-overlay absolute inset-0 z-[2] opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201, 168, 76, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative line */}
        <div className="animate-fade-in mb-8 flex items-center justify-center gap-4">
          <span className="block w-16 h-[1px] bg-gold-500/50" />
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-sans">
            Depuis 1932
          </span>
          <span className="block w-16 h-[1px] bg-gold-500/50" />
        </div>

        {/* Main Title */}
        <h1
          className="animate-fade-in-up text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide mb-6"
          style={{
            fontFamily: "var(--font-playfair)",
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
          }}
        >
          LÉONARD
        </h1>

        <p
          className="animate-fade-in-up delay-200 text-cream-200/80 text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Optique
        </p>

        {/* Divider line */}
        <div className="animate-fade-in delay-300 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-8" />

        {/* Tagline */}
        <p className="animate-fade-in-up delay-400 text-cream-200/70 text-sm sm:text-base tracking-[0.2em] uppercase font-light">
          Opticien · Optométriste · Contactologue
        </p>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-500 text-cream-300/50 text-sm mt-6 max-w-xl mx-auto leading-relaxed">
          Les Établissements Albert — 2 Rue Nationale, Casablanca
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-600 mt-12">
          <a
            href="#histoire"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold-500/40 text-gold-400 text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold-500/10 hover:border-gold-500/60 transition-all duration-500 group"
          >
            Découvrir notre histoire
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-cream-200/40 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-cream-200/20 relative overflow-hidden">
          <div className="absolute w-full h-3 bg-gold-500/60 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
