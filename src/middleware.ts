
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Substitua pelos seus domínios reais quando configurá-los no Firebase/DNS
  const landingPageDomain = 'veltro.software'; // Exemplo
  const appDomain = 'app.veltro.software';     // Exemplo

  // Lógica para o domínio do SISTEMA (App)
  if (hostname.includes('app.')) {
    // Se o usuário acessar a raiz do subdomínio app, mandamos para o dashboard
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/dashboard', request.url));
    }
  }

  // Lógica para o domínio da LANDING PAGE
  if (!hostname.includes('app.')) {
    // Se tentar acessar rotas do sistema pela landing page, redirecionamos para o subdomínio correto
    const restrictedPaths = ['/dashboard', '/obras', '/rh', '/expedicao', '/almoxarifado'];
    const isRestricted = restrictedPaths.some(path => url.pathname.startsWith(path));

    if (isRestricted) {
      // Opcional: Redirecionar para o domínio do app (ajuste a URL para produção)
      // return NextResponse.redirect(new URL(`https://${appDomain}${url.pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|public).*)',
  ],
};
