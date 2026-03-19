"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

export default function Footer() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative bg-charcoal-900 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div
          className={`grid lg:grid-cols-3 gap-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* <h2
              className="text-cream-50 text-3xl font-bold tracking-wider mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              LÉONARD
            </h2>
            <p className="text-cream-200/40 text-xs tracking-[0.35em] uppercase mb-6">
              Optique
            </p>
            <div className="w-12 h-[1px] bg-gold-500/50 mb-6" />
            <p className="text-cream-200/50 text-sm leading-relaxed max-w-xs">
              Opticien · Optométriste · Contactologue
              <br />
              Un héritage d&apos;excellence depuis 1932.
            </p> */}
            <Image
              src="/img/logo_dark.png"
              alt="Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-gold-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Nous Trouver
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <div>
                  <p className="text-cream-100/70 text-sm">
                    2 Rue Nationale et Place Edmond-Doutte
                  </p>
                  <p className="text-cream-100/70 text-sm">
                    Casablanca, Maroc
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-sage-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <p className="text-cream-100/70 text-sm">
                  contact@leonard-optique.ma
                </p>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-sage-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <p className="text-cream-100/70 text-sm">
                  +212 5 22 XX XX XX
                </p>
              </div>
            </div>
          </div>

          {/* Hours Column */}
          <div>
            <h3 className="text-gold-400 text-xs tracking-[0.3em] uppercase font-semibold mb-6">
              Horaires
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-cream-100/50 text-sm">Lun – Ven</span>
                <span className="text-cream-100/70 text-sm font-medium">
                  9h00 – 19h00
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-cream-100/50 text-sm">Samedi</span>
                <span className="text-cream-100/70 text-sm font-medium">
                  9h00 – 17h00
                </span>
              </div>
              <div className="w-full h-[1px] bg-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-cream-100/50 text-sm">Dimanche</span>
                <span className="text-cream-100/70 text-sm font-medium">
                  Fermé
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-200/30 text-xs">
            © 2024 Léonard Optique — Tous droits réservés
          </p>
          <p className="text-cream-200/20 text-xs">
            Les Établissements Albert — Fondés en 1932 à Casablanca
          </p>
        </div>
      </div>
    </footer>
  );
}
