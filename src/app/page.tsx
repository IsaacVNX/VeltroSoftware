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
        // Limpa a memória de scroll do GSAP e do navegador
        ScrollTrigger.clearScrollMemory();
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            touchMultiplier: 2,
        });

        // Reset agressivo para garantir o topo em todas as plataformas
        const forceScrollTop = () => {
            window.scrollTo(0, 0);
            lenis.scrollTo(0, { immediate: true });
        };

        // Executa em múltiplos estágios do ciclo de vida da página
        forceScrollTop();
        
        // Pequenos atrasos para cobrir o tempo de renderização dos componentes pesados no PC
        setTimeout(forceScrollTop, 50);
        setTimeout(forceScrollTop, 250);
        
        // Garante que o ScrollTrigger saiba que estamos no topo após recalcular tudo
        ScrollTrigger.refresh();

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
