'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { assets } from '@/lib/assets';
import React, { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const closeMenu = () => setIsMobileMenuOpen(false);

    const handleFeaturesScroll = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMenu();
        
        // Usar o ID do ScrollTrigger para controle preciso
        const st = ScrollTrigger.getById("features-scroll");
        
        if (st) {
            // Se houver uma animação (o scroll horizontal), force o reset para o início (x: 0)
            if (st.animation) {
                st.animation.progress(0);
            }
            
            // Pular exatamente para o ponto onde o gatilho começa
            window.scrollTo({
                top: st.start,
                behavior: 'instant'
            });
        } else {
            // Fallback caso o ScrollTrigger ainda não tenha sido registrado
            const featuresEl = document.getElementById('features');
            if (featuresEl) {
                window.scrollTo({
                    top: featuresEl.offsetTop,
                    behavior: 'instant'
                });
            }
        }
    };

    const handlePlansScroll = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMenu();
        const plansEl = document.getElementById('plans');
        const plansContainer = document.getElementById('plans-container');
        const isMobile = window.innerWidth < 768;

        if (isMobile && plansContainer) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = plansContainer.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'instant'
            });
        } else if (plansEl) {
            window.scrollTo({ 
                top: plansEl.getBoundingClientRect().top + window.scrollY + 850, 
                behavior: 'instant' 
            });
        }
    };

    const handleAboutScroll = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMenu();
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = aboutEl.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offset = 80;

            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'instant'
            });
        }
    };

    const handleHomeScroll = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMenu();
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });
    };

    return (
        <header ref={headerRef} className="px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-50 bg-accent text-accent-foreground transition-all duration-300">
            <Link href="/" className="flex items-center justify-center shrink-0 z-50" prefetch={false} onClick={closeMenu}>
                <Image id="header-logo" src={assets.logoBranca} alt="Veltro Software Logo" width={110} height={31} className="w-[100px] md:w-[120px] h-auto opacity-0" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="/" prefetch={false} onClick={handleHomeScroll}>Home</Link>
                </Button>
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="#features" prefetch={false} onClick={handleFeaturesScroll}>Nossos Produtos</Link>
                </Button>
                <Button variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground cursor-pointer" onClick={handlePlansScroll}>
                    Planos
                </Button>
                <Button asChild variant="ghost" className="text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                    <Link href="#about" prefetch={false} onClick={handleAboutScroll}>Sobre Nós</Link>
                </Button>
                <Button asChild variant="secondary" className="transition-all duration-300 ease-in-out hover:scale-105">
                    <Link href="https://app.veltrogestao.com/login" prefetch={false}>Entrar</Link>
                </Button>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button 
                className="md:hidden flex items-center justify-center p-2 z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-accent-foreground" />
                ) : (
                    <Menu className="h-6 w-6 text-accent-foreground" />
                )}
            </button>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-accent/95 backdrop-blur-md border-b border-border shadow-lg md:hidden flex flex-col p-4 gap-2 z-40">
                    <Button asChild variant="ghost" className="w-full justify-start text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground" onClick={handleHomeScroll}>
                        <Link href="/" prefetch={false}>Home</Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground">
                        <Link href="#features" prefetch={false} onClick={handleFeaturesScroll}>Nossos Produtos</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground cursor-pointer" onClick={handlePlansScroll}>
                        Planos
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground" onClick={handleAboutScroll}>
                        <Link href="#about" prefetch={false}>Sobre Nós</Link>
                    </Button>
                    <div className="pt-2 border-t border-accent-foreground/20 mt-2">
                        <Button asChild variant="secondary" className="w-full justify-center transition-all duration-300">
                            <Link href="https://app.veltrogestao.com/login" prefetch={false} onClick={closeMenu}>Entrar no Sistema</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
