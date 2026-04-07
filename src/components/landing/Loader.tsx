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
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Fade do logo saindo da frente e rompimento horizontal (Curtain Reveal)
        tl.to(logoRef.current, { scale: 1.2, opacity: 0, duration: 0.4, ease: "power3.in", delay: 0.6 })
          .to(topPanelRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.1")
          .to(bottomPanelRef.current, { yPercent: 100, duration: 1, ease: "power4.inOut" }, "<")
          .set(loaderRef.current, { display: "none" }); // Remove da árvore de renders e eventos

    }, { scope: loaderRef });

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] pointer-events-none flex flex-col">
            {/* Logo Centralizado Flutuante */}
            <div ref={logoRef} className="absolute inset-0 flex items-center justify-center z-50">
               <Image src={assets.logoBranca} alt="Veltro Software" width={240} height={68} style={{ width: "auto", height: "auto" }} priority />
            </div>
            
            {/* Painel Superior */}
            <div ref={topPanelRef} className="w-full h-1/2 bg-accent shadow-2xl relative z-40 border-b border-accent/20" />
            
            {/* Painel Inferior */}
            <div ref={bottomPanelRef} className="w-full h-1/2 bg-accent shadow-2xl relative z-40 border-t border-accent/20" />
        </div>
    );
}
