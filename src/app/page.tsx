'use client';

import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Plans } from '@/components/landing/Plans';
import { About } from '@/components/landing/About';
import { Footer } from '@/components/landing/Footer';
import { Loader } from '@/components/landing/Loader';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    useGSAP(() => {
        // Força a página a sempre carregar no Topo
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            touchMultiplier: 2,
        });

        // Força reset imediato e após um pequeno delay para garantir
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
        
        setTimeout(() => {
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });
        }, 50);

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen text-foreground relative">
            <Loader />
            <Header />
            <main className="flex-1 relative z-10 overflow-x-hidden">
                <Hero />
                <Features />
                <Plans />
                <About />
            </main>
            <Footer />
        </div>
    );
}
