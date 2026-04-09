'use client';

import React, { useRef, useCallback, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!titleRef.current) return;
        const rect = titleRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const heroTitleWords = "Veltro Software: A solução ágil para o seu negócio.".split(" ");
    const heroSubtitleWords = "Desenvolvemos soluções de software ágeis e inteligentes que caçam e eliminam ineficiências, capacitando empresas a focarem no que realmente importa: seu crescimento.".split(" ");

    useGSAP(() => {
        // Parallax Hero Background (Particles)
        gsap.to("#tsparticles", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Hero Text - Veltro Software (Character Split 3D Animation)
        const tl = gsap.timeline({ delay: 1.2 });
        tl.fromTo(".veltro-title-char-base", 
            { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50" },
            { duration: 1, opacity: 1, scale: 1, y: 0, rotationX: 0, ease: "back.out(1.7)", stagger: 0.05 },
            0
        );
        tl.fromTo(".veltro-title-char-glow", 
            { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50" },
            { duration: 1, opacity: 1, scale: 1, y: 0, rotationX: 0, ease: "back.out(1.7)", stagger: 0.05 },
            0
        );

        // Hero Text - Subtitle & Paragraph
        tl.fromTo(".hero-char-inner", 
            { opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: "0% 50% -50" },
            { duration: 1, opacity: 1, scale: 1, y: 0, rotationX: 0, ease: "back.out(1.7)", stagger: 0.015 },
            0.6
        );

        // Hero CTA Reveal
        gsap.to(".hero-cta", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: 1.8
        });

        // Mockup Reveal
        gsap.to(".hero-mockup-container", {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            delay: 2.2
        });

        // Logo Bar Reveal
        gsap.to(".hero-logos", {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            delay: 2.5
        });

        // Floating Blobs Animation
        gsap.to(".hero-blob", {
            x: "random(-50, 50)",
            y: "random(-50, 50)",
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: heroRef });

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesOptions = {
        background: { color: { value: '#FFFFFF' } },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'grab' as const },
                resize: true,
            },
            modes: {
                grab: { distance: 140, links: { opacity: 1 } },
            },
        },
        particles: {
            color: { value: ['#0A2A4D', '#343A40'] },
            links: { color: '#343A40', distance: 150, enable: true, opacity: 0.5, width: 1 },
            collisions: { enable: true },
            move: { direction: 'none' as const, enable: true, outModes: { default: 'bounce' as const }, random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: 0.7 },
            shape: { type: 'circle' as const },
            size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
    };

    return (
        <section id="hero" ref={heroRef} className="relative w-full min-h-screen flex flex-col items-center justify-center text-foreground pt-36 pb-24 overflow-hidden">
            <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-[-1]" />
            <div className="absolute inset-0 bg-white/60 z-0"></div>
            
            {/* Background Decor - Blobs */}
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] z-0 hero-blob"></div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <div className="hero-text space-y-6 max-w-6xl mx-auto">
                    <h1 className="font-bold tracking-tight text-accent flex flex-col items-center gap-y-2 md:gap-y-4">
                        {/* Veltro Software (Maior) com Efeito Local (Spotlight) via Mask */}
                        <div 
                            ref={titleRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { setMousePos({x: -1000, y: -1000}); setHoveredWord(null); }}
                            className="relative flex flex-wrap justify-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter cursor-default w-full"
                        >
                            {/* Camada Base (Visível Normalmente) */}
                            <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 text-accent" style={{ perspective: "1000px" }}>
                                {"Veltro Software".split(" ").map((word, i) => (
                                    <span 
                                        key={`vh1-base-${i}`} 
                                        className={`inline-block py-3 px-1 -my-2 transition-transform duration-300 ${hoveredWord === i ? '-translate-y-2 scale-105' : ''}`}
                                        onMouseEnter={() => setHoveredWord(i)}
                                    >
                                        {word.split("").map((char, j) => (
                                            <span key={`vh1-base-char-${i}-${j}`} className="veltro-title-char-base inline-block opacity-0 will-change-[transform,opacity]">
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Camada Spotlight (Glow Revelado pelo Mouse) refinada (Limpa, sem box) */}
                            <div 
                                className="absolute inset-0 flex flex-wrap justify-center gap-x-3 md:gap-x-5 text-primary drop-shadow-[0_0_20px_rgba(160,217,17,0.7)] pointer-events-none"
                                style={{
                                    WebkitMaskImage: `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
                                    maskImage: `radial-gradient(140px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
                                    perspective: "1000px",
                                }}
                            >
                                {"Veltro Software".split(" ").map((word, i) => (
                                    <span 
                                        key={`vh1-glow-${i}`} 
                                        className={`inline-block py-3 px-1 -my-2 transition-transform duration-300 ${hoveredWord === i ? '-translate-y-2 scale-105' : ''}`}
                                    >
                                        {word.split("").map((char, j) => (
                                            <span key={`vh1-glow-char-${i}-${j}`} className="veltro-title-char-glow inline-block opacity-0 font-black brightness-110 will-change-[transform,opacity]">
                                                {char}
                                            </span>
                                        ))}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* A solução ágil... (Menor) */}
                        <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-accent/90 tracking-tight" style={{ perspective: "1000px" }}>
                             {"A solução ágil para o seu negócio.".split(" ").map((word, i) => (
                                <span key={`ah1-${i}`} className="inline-block py-2 px-1 -my-2">
                                    {word.split("").map((char, j) => (
                                        <span key={`ah1-char-${i}-${j}`} className="hero-char-inner inline-block opacity-0 will-change-[transform,opacity]">{char}</span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </h1>

                    <p className="max-w-4xl mx-auto text-sm sm:text-lg md:text-2xl text-foreground flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2 px-4 mt-6" style={{ perspective: "1000px" }}>
                        {heroSubtitleWords.map((word, i) => (
                            <span key={`p-${i}`} className="inline-block pb-2">
                                {word.split("").map((char, j) => (
                                    <span key={`p-char-${i}-${j}`} className="hero-char-inner inline-block opacity-0 will-change-[transform,opacity]">{char}</span>
                                ))}
                            </span>
                        ))}
                    </p>
                    <div className="hero-cta opacity-0 translate-y-12">
                        <Button className="mt-8 md:mt-12 bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer text-base md:text-xl px-8 md:px-12 py-7 md:py-8 w-full sm:w-auto shadow-xl" onClick={(e) => {
                            e.preventDefault();
                            const plansEl = document.getElementById('plans');
                            if (plansEl) {
                                window.scrollTo({ top: plansEl.getBoundingClientRect().top + window.scrollY + 850, behavior: 'instant' });
                            }
                        }}>
                            Começar Agora
                            <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                    </div>

                    {/* Product Mockup Container */}
                    <div className="hero-mockup-container mt-20 md:mt-32 relative max-w-5xl mx-auto opacity-0 translate-y-24 perspective-2000">
                        {/* Aspect-[4/3] (16/12) ensures it's taller than 16/11 avoiding cutting the pagination */}
                        <div className="relative rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border bg-white transform rotate-x-1 aspect-square sm:aspect-[4/3] md:aspect-[16/12.5]">
                            <img src="/hero-mockup.png" alt="Veltro Gestão Dashboard" className="w-full h-full object-cover object-top" />
                        </div>
                    </div>

                    {/* Trusted By / Logo Bar */}
                    <div className="hero-logos mt-24 md:mt-32 opacity-0">
                        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-accent/40 mb-10">Confiado por líderes do setor</p>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                             <div className="h-6 md:h-8 flex items-center font-black text-xl md:text-2xl text-accent select-none">BUILDER</div>
                             <div className="h-6 md:h-8 flex items-center font-black text-xl md:text-2xl text-accent select-none">CONSTRUX</div>
                             <div className="h-6 md:h-8 flex items-center font-black text-xl md:text-2xl text-accent select-none">VELOX</div>
                             <div className="h-6 md:h-8 flex items-center font-black text-xl md:text-2xl text-accent select-none">INFRA</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
