'use client';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="relative z-10 w-full shrink-0 bg-secondary">
            <div className="mx-auto flex flex-col items-center justify-center gap-2 py-6 rounded-t-2xl bg-accent text-accent-foreground">
                <p className="text-xs text-center">&copy; {new Date().getFullYear()} Veltro Software. Todos os direitos reservados.</p>
                <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-2 px-4">
                <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Termos de Serviço
                </Link>
                <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                    Política de Privacidade
                </Link>
                <span className="text-xs cursor-pointer hover:underline underline-offset-4" onClick={(e) => {
                    e.preventDefault();
                    const plansEl = document.getElementById('plans');
                    if (plansEl) {
                        window.scrollTo({ top: plansEl.getBoundingClientRect().top + window.scrollY + 850, behavior: 'instant' });
                    }
                }}>
                    Planos
                </span>
                </nav>
            </div>
        </footer>
    );
}
