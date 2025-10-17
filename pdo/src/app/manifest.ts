import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PDO Arquitetos - Arquitectura Moderna e Sustentável em Portugal',
    short_name: 'PDO Arquitetos',
    description:
      'Estúdio de arquitectura e construção especializado em casas modernas e sustentáveis em Portugal. Projectamos e construímos espaços habitacionais únicos com mais de 15 anos de experiência.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1B688C',
    scope: '/',
    id: 'pdo-arquitetos',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654317/favicon_p2x7ys.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'lifestyle', 'productivity', 'architecture'],
    lang: 'pt',
    dir: 'ltr',
    orientation: 'portrait-primary',
    prefer_related_applications: false,
    related_applications: [],
    shortcuts: [
      {
        name: 'Projectos',
        short_name: 'Projectos',
        description: 'Veja os nossos projectos de arquitectura',
        url: '/projects',
        icons: [
          {
            src: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png',
            sizes: 'any',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Contacto',
        short_name: 'Contacto',
        description: 'Entre em contacto connosco',
        url: '/contact',
        icons: [
          {
            src: 'https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png',
            sizes: 'any',
            type: 'image/png',
          },
        ],
      },
    ],
  }
}
