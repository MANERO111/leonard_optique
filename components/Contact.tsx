"use client";

import { useEffect, useRef, useState } from "react";

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

export default function Contact() {
  const { ref, isVisible } = useInView(0.1);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to your backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--cream-50) 0%, var(--sage-50) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-sage-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="text-gold-500 text-xs tracking-[0.4em] uppercase font-semibold">
            Contactez-Nous
          </span>
          <h2
            className="text-sage-900 text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Prendre Rendez-vous
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-sage-500 max-w-2xl mx-auto leading-relaxed">
            Besoin d&apos;un examen de vue, d&apos;un conseil sur vos montures
            ou d&apos;une ordonnance à exécuter ? Contactez-nous et notre équipe
            se fera un plaisir de vous accompagner.
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-5 gap-12 ${
            isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
          }`}
        >
          {/* Contact Info Side */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sage-800 font-semibold text-sm mb-1">
                    Adresse
                  </h4>
                  <p className="text-sage-500 text-sm leading-relaxed">
                    2 Rue Nationale et Place Edmond-Doutte
                    <br />
                    Casablanca, Maroc
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sage-800 font-semibold text-sm mb-1">
                    Téléphone
                  </h4>
                  <p className="text-sage-500 text-sm">+212 5 22 XX XX XX</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sage-800 font-semibold text-sm mb-1">
                    Email
                  </h4>
                  <p className="text-sage-500 text-sm">
                    contact@leonard-optique.ma
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sage-800 font-semibold text-sm mb-1">
                    Horaires
                  </h4>
                  <p className="text-sage-500 text-sm leading-relaxed">
                    Lun – Ven : 9h00 – 19h00
                    <br />
                    Samedi : 9h00 – 17h00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-sage-900/5 border border-sage-100/60"
            >
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-sage-50 border border-sage-200 text-sage-700 text-sm flex items-center gap-3 animate-fade-in">
                  <svg className="w-5 h-5 text-sage-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Merci ! Votre message a été envoyé avec succès. Nous vous
                  répondrons dans les plus brefs délais.
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sage-700 text-xs font-semibold tracking-wider uppercase mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-sage-50/50 text-sage-800 text-sm placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-400/30 focus:border-sage-400 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sage-700 text-xs font-semibold tracking-wider uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-sage-50/50 text-sage-800 text-sm placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-400/30 focus:border-sage-400 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sage-700 text-xs font-semibold tracking-wider uppercase mb-2"
                  >
                    Téléphone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="+212 6 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-sage-50/50 text-sage-800 text-sm placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-400/30 focus:border-sage-400 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sage-700 text-xs font-semibold tracking-wider uppercase mb-2"
                  >
                    Sujet
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-sage-50/50 text-sage-800 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400/30 focus:border-sage-400 transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2395a37f' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      backgroundSize: "16px",
                    }}
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="rdv">Rendez-vous examen de vue</option>
                    <option value="montures">Conseil montures</option>
                    <option value="lentilles">Lentilles de contact</option>
                    <option value="ordonnance">Exécution d&apos;ordonnance</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="contact-message"
                  className="block text-sage-700 text-xs font-semibold tracking-wider uppercase mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Décrivez votre demande..."
                  className="w-full px-4 py-3 rounded-xl border border-sage-200 bg-sage-50/50 text-sage-800 text-sm placeholder:text-sage-300 focus:outline-none focus:ring-2 focus:ring-sage-400/30 focus:border-sage-400 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-sage-700 text-cream-50 text-sm font-semibold tracking-wider uppercase rounded-xl hover:bg-sage-800 focus:ring-4 focus:ring-sage-400/30 transition-all duration-300 group flex items-center justify-center gap-3"
              >
                Envoyer le message
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
