'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { assets } from '@/lib/assets';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Dynamic Header
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: { className: "shadow-lg", targets: headerRef.current },
            onEnter: () => gsap.to(headerRef.current, { backgroundColor: "rgba(10, 42, 77, 0.95)", backdropFilter: "blur(8px)", duration: 0.3 }),
            onLeaveBack: () => gsap.to(headerRef.current, { backgroundColor: "rgba(10, 42, 77, 1)", backdropFilter: "blur(0px)", duration: 0.3 })
        });
    }, { scope: headerRef });

    return (
        <header ref={headerRef} className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-accent text-accent-foreground transition-all duration-300">
            <Link href="/" className="flex items-center justify-center" prefetch={false}>
                <Image src={assets.logoBranca} alt="Veltro Software Logo" width={120} height={34} style={{ width: "auto", height: "auto" }} />
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="/" prefetch={false}>Home</Link>
                </Button>
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="#features" prefetch={false}>Nossos Produtos</Link>
                </Button>
                <Button variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground cursor-pointer" onClick={(e) => {
                    e.preventDefault();
                    const plansEl = document.getElementById('plans');
                    if (plansEl) {
                        window.scrollTo({ top: plansEl.getBoundingClientRect().top + window.scrollY + 850, behavior: 'instant' });
                    }
                }}>
                    Planos
                </Button>
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="#about" prefetch={false}>Sobre Nós</Link>
                </Button>
                <Button asChild variant="secondary" className="transition-all duration-300 ease-in-out hover:scale-105">
                    <Link href="https://app.veltrogestao.com/login" prefetch={false}>Entrar</Link>
                </Button>
            </nav>
        </header>
    );
}
