'use client';

import React, { useRef } from 'react';
import { HardHat, Users, Package, Warehouse, DollarSign, Truck, ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="feature-card flex h-full flex-col justify-center items-center p-8 text-center bg-white rounded-2xl shadow-xl transition-shadow duration-300 hover:shadow-2xl">
        <div className="mb-4 text-primary">
            <Icon className="h-12 w-12" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-black">{title}</h3>
        <p className="text-black">{description}</p>
    </div>
);

export function Features() {
    const featuresPinnedRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const track = document.querySelector(".features-horizontal-scroll-container") as HTMLElement;
        if(track && featuresPinnedRef.current) {
            let totalScrolling = track.scrollWidth - window.innerWidth + 100;
            if(totalScrolling < 0) totalScrolling = 0;

            gsap.to(track, {
                x: -totalScrolling,
                ease: "none",
                scrollTrigger: {
                    trigger: featuresPinnedRef.current,
                    start: "top top",
                    end: `+=${totalScrolling + 800}`,
                    scrub: 0.8,
                    pin: true,
                    anticipatePin: 1
                }
            });

            gsap.to(".veltro-gestao-marca", {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: featuresPinnedRef.current,
                    start: "top 60%"
                }
            });
        }
    }, { scope: featuresPinnedRef });

    return (
        <section id="features" ref={featuresPinnedRef} className="w-full bg-gradient-to-b from-accent to-[#153457] text-accent-foreground relative z-20 overflow-hidden h-screen flex items-center">
             <div className="features-horizontal-scroll-container flex items-stretch gap-6 px-4 md:px-24 w-[max-content] h-[450px]">
                {/* Intro Slide */}
                <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0 mr-8 flex flex-col justify-center md:text-left text-center">
                    <h1 className="veltro-gestao-marca text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300 drop-shadow-md mb-8 md:mb-12 opacity-0 translate-y-12">
                        Veltro Gestão
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-2 md:mb-3 leading-snug opacity-90">
                        Controle Total em <span className="text-white">Uma Plataforma</span>
                    </h2>
                    <p className="text-accent-foreground/80 md:text-xl/relaxed max-w-2xl mx-auto md:mx-0">
                      Do canteiro de obras ao escritório, a Veltro Software centraliza todas as operações com o seu novo sistema <strong>Veltro Gestão</strong>, garantindo eficiência e segurança em cada etapa do processo produtivo e administrativo.
                    </p>
                </div>

                {/* Horizontal Cards */}
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={HardHat} title="Gestão de Obras" description="Crie e gerencie obras, atribua encarregados, monte equipes e acompanhe o andamento de cada projeto em tempo real." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={Users} title="Módulo de RH" description="Administre usuários, defina níveis de acesso por função (de montador a gestor) e controle o status de cada colaborador." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={Package} title="Gestão de Expedição" description="Registre entradas e saídas de materiais, gerencie clientes, fornecedores e transportadoras para uma logística impecável." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={Warehouse} title="Controle Almoxarifado" description="Gerencie o inventário de produtos, ferramentas e equipamentos, garantindo material à disposição da equipe." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={DollarSign} title="Módulo Financeiro" description="Acompanhe os custos, faturamento e fluxo de caixa de cada obra integrado à saúde do negócio." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0">
                    <FeatureCard icon={Truck} title="Controle de Frotas" description="Gerencie a manutenção, localização e alocação de veículos e equipamentos pesados otimizando ativos." />
                </div>
                <div className="w-[80vw] sm:w-[350px] shrink-0 mr-24 md:mr-24">
                    <FeatureCard icon={ShoppingCart} title="Módulo de Suprimentos" description="Gerencie o processo de cotações, compras e aquisição de materiais de forma enxuta." />
                </div>
             </div>
        </section>
    );
}
