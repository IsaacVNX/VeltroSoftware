
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veltro Software',
  description: 'Veltro Software: A solução ágil para o seu negócio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/LOGO-VELTRO-GALGO-SEM-TITULO.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
          {children}
      </body>
    </html>
  );
}
