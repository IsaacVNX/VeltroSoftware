'use client';

import React, { useRef, useCallback } from 'react';
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

        // Hero Text - Split Word Reveal
        gsap.to(".hero-word-inner", { 
             y: "0%", 
             opacity: 1, 
             rotateZ: 0,
             stagger: 0.04, 
             duration: 1.2, 
             ease: "power4.out",
             delay: 1.2
        });

        // Hero CTA Reveal
        gsap.to(".hero-cta", {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: 1.8
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
        <section ref={heroRef} className="relative w-full min-h-[100svh] h-[100svh] flex flex-col items-center justify-center text-foreground pt-12 md:pt-16">
            <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-[-1]" />
            <div className="absolute inset-0 bg-white/60 z-0"></div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <div className="hero-text space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#0A2A4D] flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1">
                        {heroTitleWords.map((word, i) => (
                            <span key={`h1-${i}`} className="inline-block overflow-hidden py-3 px-1 -my-2">
                                <span className="hero-word-inner inline-block opacity-0 translate-y-[120%] rotate-[10deg]">{word}</span>
                            </span>
                        ))}
                    </h1>
                    <p className="max-w-[700px] mx-auto text-sm sm:text-lg md:text-xl text-black flex flex-wrap justify-center gap-x-1.5 md:gap-x-2 gap-y-0.5 md:gap-y-1 px-4">
                        {heroSubtitleWords.map((word, i) => (
                            <span key={`p-${i}`} className="inline-block overflow-hidden pb-2">
                                <span className="hero-word-inner inline-block opacity-0 translate-y-[120%] rotate-[5deg]">{word}</span>
                            </span>
                        ))}
                    </p>
                    <div className="hero-cta opacity-0 translate-y-12">
                        <Button className="mt-6 md:mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer text-base md:text-lg px-6 md:px-8 py-6 md:py-6 w-full sm:w-auto shadow-xl" onClick={(e) => {
                            e.preventDefault();
                            const plansEl = document.getElementById('plans');
                            if (plansEl) {
                                window.scrollTo({ top: plansEl.getBoundingClientRect().top + window.scrollY + 850, behavior: 'instant' });
                            }
                        }}>
                            Começar Agora
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
