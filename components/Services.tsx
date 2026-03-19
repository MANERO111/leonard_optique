"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Optique de Précision",
    subtitle: "Verres & Montures",
    description:
      "Nos ateliers spécialisés répondent aux ordonnances les plus délicates de Messieurs les Médecins oculistes. Un stock important de verres médicaux des marques les plus réputées — Zeïss, Stigmal, Télégie — est disponible en permanence.",
    features: ["Verres correcteurs sur mesure", "Montures de luxe", "Lentilles de contact", "Examens de vue"],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
    title: "Photographie",
    subtitle: "Appareils & Laboratoire",
    description:
      "En dépôt aux meilleures conditions : appareils photographiques des meilleures marques et fournitures diverses. Nos laboratoires correspondent à toutes les exigences des travaux photographiques, industriels ou amateurs.",
    features: ["Appareils des grandes marques", "Développement professionnel", "Tirage & agrandissement", "Travaux livrés rapidement"],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 3.75c-.621 0-1.125-.504-1.125-1.125v-1.5" />
      </svg>
    ),
    title: "Cinéma d'Amateurs",
    subtitle: "Conseils & Équipement",
    description:
      "Les Établissements Albert s'occupent de tout ce qui peut intéresser le cinéma d'amateurs. Notre équipe est à la disposition des personnes qui voudront bien demander conseils et renseignements.",
    features: ["Matériel cinématographique", "Conseils personnalisés", "Fournitures spécialisées", "Accompagnement technique"],
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

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`group ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative h-full bg-white rounded-3xl p-8 lg:p-10 shadow-lg shadow-sage-900/5 border border-sage-100/60 hover:shadow-2xl hover:shadow-sage-900/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-400 via-gold-500 to-sage-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-sage-50 flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-100 group-hover:text-sage-800 transition-all duration-500">
          {service.icon}
        </div>

        {/* Content */}
        <span className="text-gold-500 text-xs tracking-[0.3em] uppercase font-semibold">
          {service.subtitle}
        </span>
        <h3
          className="text-sage-900 text-2xl font-bold mt-2 mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {service.title}
        </h3>
        <p className="text-sage-500 leading-relaxed text-[15px] mb-6">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sage-600 text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const { ref: sectionRef, isVisible: sectionVisible } = useInView(0.1);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--sage-50) 0%, var(--cream-50) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-sage-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-20 ${
            sectionVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">
            Nos Savoir-Faire
          </span>
          <h2
            className="text-sage-900 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Services d&apos;Excellence
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-sage-500 max-w-2xl mx-auto leading-relaxed">
            Un savoir-faire artisanal au service de votre vision, hérité de
            plus de 90 ans d&apos;expertise en optique, photographie et cinéma.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
