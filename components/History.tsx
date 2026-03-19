"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  {
    year: "1902",
    title: "Naissance à Oran",
    description:
      "Albert Zaquine naît le 9 février 1902 à Oran, en Algérie. Il poursuit ses études au Lycée d'Oran, où se forge sa passion pour l'optique et la précision.",
    icon: "🌟",
  },
  {
    year: "1920",
    title: "Champion Olympique",
    description:
      "Engagé volontaire au 157ᵉ Régiment d'Artillerie à pied, Albert participe aux Jeux Olympiques d'Anvers en 1920, démontrant la même rigueur et excellence qu'il apportera à son métier.",
    icon: "🏅",
  },
  {
    year: "1922",
    title: "Opticien à Oran",
    description:
      "Fort de sa formation et de son expérience, Albert s'installe comme opticien à Oran, où il exerce pendant dix ans, perfectionnant son savoir-faire artisanal.",
    icon: "🔬",
  },
  {
    year: "1932",
    title: "Arrivée au Maroc",
    description:
      "Albert Zaquine arrive au Maroc et fonde les Établissements Albert au 2 Rue Nationale et Place Edmond-Doutte à Casablanca. Deux établissements d'Optique-Photo voient le jour, marquant le début d'une institution.",
    icon: "🏛️",
  },
  {
    year: "Aujourd'hui",
    title: "Un héritage vivant",
    description:
      "Léonard Optique perpétue la tradition d'excellence instaurée par Albert Zaquine. Opticien, optométriste et contactologue, l'établissement continue de servir Casablanca avec le même dévouement.",
    icon: "✨",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.3);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center w-full mb-16 lg:mb-24">
      {/* Desktop: alternating layout */}
      <div
        className={`hidden lg:flex w-full items-center ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Content Card */}
        <div
          className={`w-5/12 ${
            isVisible
              ? isEven
                ? "animate-slide-in-left"
                : "animate-slide-in-right"
              : "opacity-0"
          }`}
        >
          <div
            className="bg-white rounded-2xl p-8 shadow-lg shadow-sage-900/5 border border-sage-100/80 hover:shadow-xl hover:shadow-sage-900/10 transition-all duration-500 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{milestone.icon}</span>
              <div>
                <span className="text-gold-500 text-sm font-semibold tracking-wider uppercase">
                  {milestone.year}
                </span>
                <h3
                  className="text-sage-900 text-xl font-bold mt-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {milestone.title}
                </h3>
              </div>
            </div>
            <p className="text-sage-600 leading-relaxed text-[15px]">
              {milestone.description}
            </p>
          </div>
        </div>

        {/* Center dot */}
        <div className="w-2/12 flex justify-center">
          <div
            className={`w-5 h-5 rounded-full border-[3px] border-gold-500 bg-cream-50 z-10 transition-all duration-500 ${
              isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
        </div>

        {/* Empty space */}
        <div className="w-5/12" />
      </div>

      {/* Mobile: single column */}
      <div
        className={`lg:hidden w-full pl-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Dot on timeline */}
        <div className="absolute left-4 top-2 w-4 h-4 rounded-full border-[3px] border-gold-500 bg-cream-50 z-10" />

        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-sage-900/5 border border-sage-100/80">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">{milestone.icon}</span>
            <div>
              <span className="text-gold-500 text-xs font-semibold tracking-wider uppercase">
                {milestone.year}
              </span>
              <h3
                className="text-sage-900 text-lg font-bold mt-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {milestone.title}
              </h3>
            </div>
          </div>
          <p className="text-sage-600 leading-relaxed text-sm">
            {milestone.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const { ref: sectionRef, isVisible: sectionVisible } = useInView(0.1);

  return (
    <section
      id="histoire"
      ref={sectionRef}
      className="relative py-28 lg:py-36 bg-cream-50 overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--sage-500) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div
          className={`text-center mb-20 ${
            sectionVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">
            Notre Héritage
          </span>
          <h2
            className="text-sage-900 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Une Histoire d&apos;Excellence
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-sage-500 max-w-2xl mx-auto leading-relaxed">
            Depuis 1932, les Établissements Albert incarnent la tradition
            d&apos;excellence en optique à Casablanca. Fondés par Albert Zaquine,
            opticien visionnaire et ancien olympien.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500/30 via-sage-300/30 to-transparent -translate-x-1/2" />
          {/* Timeline line — mobile */}
          <div className="lg:hidden absolute left-[22px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-500/30 via-sage-300/30 to-transparent" />

          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.year}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
