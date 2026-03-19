"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Histoire", href: "#histoire" },
    { label: "Services", href: "#services" },
    { label: "Galerie", href: "#galerie" },
    { label: "Marques", href: "#marques" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 shadow-lg shadow-sage-900/5"
          : "bg-transparent"
      }`}
      style={{
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
          >
            {/* <div className="relative">
              <span
                className={`font-serif text-2xl font-bold tracking-wider transition-colors duration-500 ${
                  scrolled ? "text-sage-800" : "text-cream-50"
                }`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                LÉONARD
              </span>
              <span
                className={`block text-[10px] font-sans tracking-[0.35em] uppercase transition-colors duration-500 ${
                  scrolled ? "text-sage-500" : "text-cream-200"
                }`}
              >
                Optique
              </span>
            </div> */}
            <Image
              src={scrolled ? "/img/logo1.png" : "/img/logo_dark.png"}
              alt="Logo"
              width={150}
              height={150}
              className="object-contain"
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 group ${
                  scrolled
                    ? "text-sage-700 hover:text-sage-900"
                    : "text-cream-100 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    scrolled ? "bg-gold-500" : "bg-cream-200"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-sage-800" : "bg-cream-50"
              } ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-sage-800" : "bg-cream-50"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] transition-all duration-300 ${
                scrolled ? "bg-sage-800" : "bg-cream-50"
              } ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(254, 253, 251, 0.97)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sage-700 text-lg font-medium tracking-wide hover:text-sage-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
