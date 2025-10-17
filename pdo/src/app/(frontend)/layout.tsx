import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // Get locale and messages for NextIntl
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />

        {/* Favicon and Icons */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="https://res.cloudinary.com/dramzribs/image/upload/v1760654317/favicon_p2x7ys.svg" rel="icon" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1B688C" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap"
          rel="stylesheet"
        />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1B688C" />
        <meta name="msapplication-TileColor" content="#1B688C" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Amora, Setúbal, Portugal" />
        <meta name="geo.position" content="38.6295;-9.1153" />
        <meta name="ICBM" content="38.6295, -9.1153" />

        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="2845-546 Amora" />
        <meta name="business:contact_data:locality" content="Amora" />
        <meta name="business:contact_data:region" content="Setúbal" />
        <meta name="business:contact_data:postal_code" content="2845-546" />
        <meta name="business:contact_data:country_name" content="Portugal" />

        {/* Language and Locale */}
        <meta httpEquiv="content-language" content="pt-PT, en-US" />
        <meta name="language" content="Portuguese, English" />

        {/* Mobile Optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PDO Arquitetos" />

        {/* Security */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      </head>
      <body>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* AdminBar hidden for production */}
            {process.env.NODE_ENV === 'development' && (
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
            )}

            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'PDO Arquitetos - Arquitectura Moderna e Sustentável em Portugal',
    template: '%s | PDO Arquitetos',
  },
  description:
    'PDO Arquitetos é um estúdio de arquitectura e construção em Portugal especializado em casas modernas, sustentáveis e funcionais. Projectamos e construímos espaços habitacionais únicos com mais de 15 anos de experiência.',
  keywords: [
    'arquitectura portugal',
    'casas modernas',
    'construção sustentável',
    'projecto arquitectónico',
    'arquitecto lisboa',
    'casas contemporâneas',
    'design residencial',
    'construção ecológica',
    'arquitectura sustentável',
    'casas personalizadas',
    'projecto casa',
    'construção moderna',
    'arquitecto português',
    'design casa',
    'construção portugal',
  ],
  authors: [{ name: 'PDO Arquitetos', url: 'https://pdo-arquitetos.pt' }],
  creator: 'PDO Arquitetos',
  publisher: 'PDO Arquitetos',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...mergeOpenGraph(),
    title: 'PDO Arquitetos - Arquitectura Moderna e Sustentável em Portugal',
    description:
      'Projectamos e construímos casas modernas e sustentáveis em Portugal. Mais de 15 anos de experiência em arquitectura residencial contemporânea.',
    siteName: 'PDO Arquitetos',
    locale: 'pt_PT',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PDO Arquitetos - Arquitectura Moderna em Portugal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDO Arquitetos - Arquitectura Moderna e Sustentável',
    description: 'Projectamos e construímos casas modernas e sustentáveis em Portugal',
    creator: '@pdoarquitetos',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654317/favicon_p2x7ys.svg', type: 'image/svg+xml' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1B688C' }],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Architecture',
  classification: 'Business',
  other: {
    'msapplication-TileColor': '#1B688C',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#1B688C',
  },
}
