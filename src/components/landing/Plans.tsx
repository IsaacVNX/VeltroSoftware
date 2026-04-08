'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlanCard = ({ plan, isAnnual, isPopular }: { plan: any, isAnnual: boolean, isPopular?: boolean }) => {
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    const isCustomPrice = price === 'Personalizado';
    const cardRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        gsap.to(cardRef.current, { rotateX: -y, rotateY: x, duration: 0.4, ease: "power2.out" });
        if(ctaRef.current) gsap.to(ctaRef.current, { x: x * 1.5, y: y * 1.5, duration: 0.4, ease: "power2.out" });
    };
    
    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
        if(ctaRef.current) gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    };

    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: "1000px" }} className={cn("plan-card h-full opacity-0 translate-y-12 relative flex flex-col rounded-lg border bg-white p-8 text-center shadow-lg transition-shadow hover:shadow-2xl duration-300 transform-gpu", isPopular ? "border-2 border-primary" : "border-border")}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    MAIS POPULAR
                </div>
            )}
            <h3 className="text-2xl font-bold text-accent">{plan.name}</h3>
            <p className="mt-2 min-h-[40px] text-sm text-muted-foreground">{plan.description}</p>
             <div className="my-8 flex h-[72px] items-center justify-center">
                {isCustomPrice ? (
                    <span className="text-3xl font-bold text-accent">{price}</span>
                ) : (
                    <div>
                        <span className="text-5xl font-bold text-accent">{price}</span>
                        <span className="text-muted-foreground">{isAnnual ? '/ano' : '/mês'}</span>
                    </div>
                )}
            </div>
            <Button asChild className={cn(isPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-accent/90", "w-full z-10")}>
                <Link ref={ctaRef} href={plan.cta.href} className="inline-block w-full">{plan.cta.text}</Link>
            </Button>
            <ul className="mt-8 space-y-4 text-left text-sm">
                {plan.features.map((feature: string, index: number) => (
                     <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span dangerouslySetInnerHTML={{ __html: feature }}></span>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export function Plans() {
    const plansRef = useRef<HTMLElement>(null);
    const [isAnnual, setIsAnnual] = useState(false);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        // Desktop: Fade Up and Pin Stagger
        mm.add("(min-width: 768px)", () => {
            gsap.to(".plan-card", {
                scrollTrigger: { 
                     trigger: plansRef.current, 
                     start: "top top", 
                     end: "+=800", 
                     scrub: 1,
                     pin: true,
                     anticipatePin: 1
                },
                y: 0, 
                opacity: 1, 
                stagger: 0.2, 
                ease: "none"
            });
        });

        // Mobile: Apenas o fade up, usamos Touch scroll nativo via CSS
        mm.add("(max-width: 767px)", () => {
            gsap.to(".plan-card", {
                scrollTrigger: { 
                     trigger: plansRef.current, 
                     start: "top 80%", 
                },
                y: 0, 
                opacity: 1, 
                stagger: 0.15, 
                ease: "power2.out",
                duration: 0.6
            });
        });

    }, { scope: plansRef });

    const plansData = [
        {
            name: "Essencial",
            description: "Para pequenas equipes e startups que estão começando a organizar seus processos.",
            price: { monthly: "R$ 99,00", annual: "R$ 950,00" },
            cta: { text: "Começar Agora", href: "#plans" },
            features: [
                "Até <strong>2 Usuários</strong>",
                "Gestão de Tarefas",
                "Relatórios Básicos",
                "Suporte via Email",
            ],
        },
        {
            name: "Profissional",
            description: "Para empresas em crescimento que buscam automação e eficiência máxima.",
            price: { monthly: "R$ 350,00", annual: "R$ 3.360,00" },
            cta: { text: "Falar com Vendas", href: "#plans" },
            features: [
                "Até <strong>5 Usuários</strong>",
                "<strong>Automação de Tarefas</strong>",
                "Relatórios <strong>Avançados</strong>",
                "<strong>Integrações com outras ferramentas</strong>",
                "Suporte <strong>Prioritário</strong>",
            ],
        },
        {
            name: "Enterprise",
            description: "Para grandes corporações com necessidades de personalização, segurança e escala.",
            price: { monthly: "R$ 1.200,00", annual: "R$ 11.520,00" },
            cta: { text: "Falar com Vendas", href: "#plans" },
            features: [
                 "Até <strong>10 Usuários</strong>",
                "Tudo do plano Profissional",
                "Gerente de Contas Dedicado",
                "SLA de Suporte e Uptime",
            ],
        },
    ];

    return (
        <section id="plans" ref={plansRef} className="w-full py-12 md:py-24 lg:py-32 bg-white flex flex-col justify-center min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-5xl space-y-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent">Planos que se adaptam ao seu crescimento</h2>
                    <p className="max-w-3xl text-secondary md:text-xl/relaxed mx-auto">
                        Escolha o plano Veltro ideal para caçar suas ineficiências e acelerar seus resultados. Sem complicação.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4 my-8">
                    <Label htmlFor="billing-cycle" className={cn(!isAnnual && "font-bold")}>Mensal</Label>
                    <Switch id="billing-cycle" checked={isAnnual} onCheckedChange={setIsAnnual} />
                    <Label htmlFor="billing-cycle" className={cn(isAnnual && "font-bold")}>
                        Anual
                        <Badge className="ml-2 bg-primary text-primary-foreground">Economize 20%</Badge>
                    </Label>
                </div>
                
                 <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-7xl mx-auto px-4 md:px-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <div className="w-[85vw] md:w-auto shrink-0 snap-center"><PlanCard plan={plansData[0]} isAnnual={isAnnual} /></div>
                    <div className="w-[85vw] md:w-auto shrink-0 snap-center"><PlanCard plan={plansData[1]} isAnnual={isAnnual} isPopular /></div>
                    <div className="w-[85vw] md:w-auto shrink-0 snap-center pr-4 md:pr-0"><PlanCard plan={plansData[2]} isAnnual={isAnnual} /></div>
                </div>
            </div>
        </section>
    );
}
