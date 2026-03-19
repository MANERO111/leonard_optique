"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Fatima B.",
    role: "Cliente depuis 2015",
    text: "Un service exceptionnel et des conseils toujours pertinents. Mon opticien de confiance à Casablanca depuis des années.",
    rating: 5,
    avatar: "https://placehold.co/80x80/4a5740/faf6ef?text=FB",
  },
  {
    name: "Mohammed A.",
    role: "Client depuis 2018",
    text: "La qualité des verres est incomparable. L'équipe prend le temps de bien comprendre vos besoins et de vous proposer la meilleure solution.",
    rating: 5,
    avatar: "https://placehold.co/80x80/4a5740/faf6ef?text=MA",
  },
  {
    name: "Sophie L.",
    role: "Cliente depuis 2020",
    text: "J'ai découvert Léonard Optique sur recommandation et je n'ai jamais été déçue. Le choix de montures est magnifique et le service est aux petits soins.",
    rating: 5,
    avatar: "https://placehold.co/80x80/4a5740/faf6ef?text=SL",
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

export default function Testimonials() {
  const { ref: sectionRef, isVisible: sectionVisible } = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-cream-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            sectionVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">
            Témoignages
          </span>
          <h2
            className="text-sage-900 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ce Que Disent Nos Clients
          </h2>
          <div className="section-divider mb-6" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`${
                sectionVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg shadow-sage-900/5 border border-sage-100/60 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gold-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sage-600 leading-relaxed text-[15px] flex-1 mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-sage-100">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sage-800 font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-sage-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
