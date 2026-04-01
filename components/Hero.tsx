"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Particle System Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Responsive amount
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5 - 0.2, // Slight upward drift
          opacity: Math.random() * 0.5 + 0.1,
          fadeSpeed: (Math.random() * 0.01) + 0.002,
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;

        // Pulsing opacity
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.8 || p.opacity < 0.1) p.fadeSpeed *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Using a gold-ish color that matches the theme: rgba(201, 168, 76, opacity)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
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
        className="object-cover z-0 transition-transform duration-1000 ease-out hover:scale-105"
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
        className="hero-overlay absolute inset-0 z-[2] opacity-10 transition-transform duration-700"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201, 168, 76, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[4] mix-blend-screen pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Decorative line */}
        <div className="animate-fade-in mb-8 flex items-center justify-center gap-4 opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '200ms' }}>
          <span className="block w-16 h-[1px] bg-gold-500/60" />
          <span className="text-gold-400 text-xs tracking-[0.4em] uppercase font-sans">
            Depuis 1932
          </span>
          <span className="block w-16 h-[1px] bg-gold-500/60" />
        </div>

        {/* Main Title */}
        <h1
          className="animate-fade-in-up text-cream-50 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide mb-6 opacity-0 [animation-fill-mode:forwards] hover:scale-[1.02] transition-transform duration-500 cursor-default"
          style={{
            fontFamily: "var(--font-playfair)",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
            animationDelay: '400ms'
          }}
        >
          LÉONARD
        </h1>

        <p
          className="animate-fade-in-up text-cream-200/90 text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase mb-4 opacity-0 [animation-fill-mode:forwards]"
          style={{ fontFamily: "var(--font-playfair)", animationDelay: '600ms' }}
        >
          Optique
        </p>

        {/* Divider line */}
        <div 
          className="animate-fade-in mx-auto w-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mb-8 opacity-0 [animation-fill-mode:forwards]" 
          style={{ 
            animationDelay: '800ms',
            animationName: 'expandLine',
            animationDuration: '1s'
          }} 
        />

        {/* Tagline */}
        <p 
          className="animate-fade-in-up text-cream-200/80 text-sm sm:text-base tracking-[0.2em] uppercase font-light opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: '1000ms' }}
        >
          Opticien · Optométriste · Contactologue
        </p>

        {/* Subtitle */}
        <p 
          className="animate-fade-in-up text-cream-300/60 text-sm mt-6 max-w-xl mx-auto leading-relaxed opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: '1200ms' }}
        >
          Les Établissements Albert — 2 Rue Nationale, Casablanca
        </p>

        {/* CTA Button */}
        <div 
          className="animate-fade-in-up mt-12 opacity-0 [animation-fill-mode:forwards]"
          style={{ animationDelay: '1400ms' }}
        >
          <a
            href="#histoire"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold-500/40 text-gold-400 text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold-500/10 hover:border-gold-500/80 hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-500 group"
          >
            Découvrir notre histoire
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0 animate-fade-in [animation-fill-mode:forwards]"
        style={{ animationDelay: '1800ms' }}
      >
        <span className="text-cream-200/50 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-cream-200/20 relative overflow-hidden">
          <div className="absolute w-full h-4 bg-gold-400/80 animate-scroll-down shadow-[0_0_8px_rgba(201,168,76,0.8)]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes expandLine {
          from { width: 0; opacity: 0; }
          to { width: 8rem; opacity: 1; }
        }
      `}} />
    </section>
  );
}

