'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { assets } from '@/lib/assets';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Loader() {
    const loaderRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        const headerLogo = document.querySelector('#header-logo');

        tl.to(logoRef.current, {
            opacity: 1,
            duration: 0.5,
            delay: 0.2
        });

        tl.add(() => {
            if (!headerLogo || !logoRef.current) return;

            // Medir as posições atuais
            const targetRect = headerLogo.getBoundingClientRect();
            const currentRect = logoRef.current.getBoundingClientRect();

            // Calcular os centros para evitar jitter no scale
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;
            const currentCenterX = currentRect.left + currentRect.width / 2;
            const currentCenterY = currentRect.top + currentRect.height / 2;

            const deltaX = targetCenterX - currentCenterX;
            const deltaY = targetCenterY - currentCenterY;
            const scale = targetRect.width / currentRect.width;

            // Garantir que a logo do header esteja pronta (mas invisível)
            gsap.set(headerLogo, { opacity: 0 });

            // Animação da logo
            gsap.to(logoRef.current, {
                x: deltaX,
                y: deltaY,
                scale: scale,
                duration: 1.2,
                ease: "power4.inOut",
                force3D: true,
                transformOrigin: "center center",
                onComplete: () => {
                    // Handoff instantâneo
                    gsap.set(headerLogo, { opacity: 1 });
                    gsap.set(logoRef.current, { opacity: 0 });
                }
            });

            // Animação dos painéis (curtains)
            gsap.to(topPanelRef.current, {
                yPercent: -100,
                duration: 1.3,
                ease: "power4.inOut"
            });

            gsap.to(bottomPanelRef.current, {
                yPercent: 100,
                duration: 1.3,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.set(loaderRef.current, { display: "none" });
                }
            });
        }, "+=0.6");

    }, { scope: loaderRef });

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
            {/* Logo Centralizado Flutuante */}
            <div className="absolute inset-0 flex items-center justify-center z-50">
               <Image ref={logoRef} src={assets.logoBranca} alt="Veltro Software" width={240} height={68} className="w-[180px] md:w-[240px] h-auto opacity-0" priority />
            </div>
            
            {/* Painel Superior */}
            <div ref={topPanelRef} className="w-full h-1/2 bg-accent shadow-2xl relative z-40 border-b border-accent/20" />
            
            {/* Painel Inferior */}
            <div ref={bottomPanelRef} className="w-full h-1/2 bg-accent shadow-2xl relative z-40 border-t border-accent/20" />
        </div>
    );
}
