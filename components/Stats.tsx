"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 90, suffix: "+", label: "Années d'expérience", prefix: "" },
  { number: 10000, suffix: "+", label: "Clients satisfaits", prefix: "" },
  { number: 50, suffix: "+", label: "Marques partenaires", prefix: "" },
  { number: 3, suffix: "", label: "Générations de savoir-faire", prefix: "" },
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

function AnimatedCounter({
  target,
  suffix,
  prefix,
  isVisible,
}: {
  target: number;
  suffix: string;
  prefix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  const formatted = target >= 1000 ? count.toLocaleString("fr-FR") : count;

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, isVisible } = useInView(0.3);

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3d4735 0%, #4a5740 50%, #3d4735 100%)",
      }}
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className="text-cream-50 text-4xl sm:text-5xl lg:text-6xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <AnimatedCounter
                  target={stat.number}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isVisible={isVisible}
                />
              </div>
              <div className="w-8 h-[1px] bg-gold-500/50 mx-auto mb-3" />
              <p className="text-cream-200/60 text-sm tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
