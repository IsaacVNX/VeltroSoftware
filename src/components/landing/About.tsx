'use client';

import React, { useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const aboutRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.to(".about-content > *", {
            scrollTrigger: { trigger: aboutRef.current, start: "top 75%" },
            x: 0, 
            opacity: 1, 
            stagger: 0.2, 
            duration: 0.8, 
            ease: "power2.out"
        });

        // Floating Blobs Animation
        gsap.to(".about-blob", {
            x: "random(-40, 40)",
            y: "random(-40, 40)",
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: aboutRef });

    return (
        <section id="about" ref={aboutRef} className="w-full py-12 md:py-24 lg:py-32 bg-secondary text-secondary-foreground relative overflow-hidden">
            {/* Background Decor - Blobs */}
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] z-0 about-blob"></div>
            <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] z-0 about-blob"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                 <div className="mx-auto max-w-7xl space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nossa Essência</h2>
                    <p className="max-w-3xl text-secondary-foreground/80 md:text-xl/relaxed mx-auto">
                        Entenda os pilares que guiam o desenvolvimento da Veltro Software.
                    </p>
                </div>
                <div className="mx-auto grid max-w-7xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-16 about-content overflow-x-hidden">
                    <div className="space-y-4 opacity-0 -translate-x-12">
                        <h3 className="text-2xl font-bold">Missão</h3>
                        <p className="text-secondary-foreground/80">
                          "Desenvolver soluções de software ágeis e inteligentes que caçam e eliminam ineficiências, capacitando empresas a focarem no que realmente importa: seu crescimento."
                        </p>
                         <h3 className="text-2xl font-bold mt-6">Visão</h3>
                        <p className="text-secondary-foreground/80">
                          "Ser a referência em software que transforma complexidade em simplicidade, tornando a tecnologia uma aliada instintiva para o sucesso de cada cliente."
                        </p>
                    </div>
                     <div className="space-y-4 rounded-lg bg-card p-6 text-card-foreground opacity-0 translate-x-12">
                        <h3 className="text-2xl font-bold">Nossos Valores</h3>
                        <ul className="space-y-3">
                           <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <div><strong className="font-semibold">Agilidade:</strong> Respostas rápidas e desenvolvimento iterativo.</div>
                           </li>
                           <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <div><strong className="font-semibold">Precisão:</strong> Soluções confiáveis e sem erros que funcionam como esperado.</div>
                           </li>
                           <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <div><strong className="font-semibold">Foco no Cliente:</strong> Suas necessidades são o centro do nosso desenvolvimento.</div>
                           </li>
                             <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <div><strong className="font-semibold">Inovação:</strong> Buscamos constantemente novas maneiras de resolver problemas.</div>
                           </li>
                             <li className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <div><strong className="font-semibold">Integridade:</strong> Transparência e honestidade em todas as nossas ações.</div>
                           </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
