export const seoConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'PDO Arquitetos',
  siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://pdo-arquitetos.pt',
  siteDescription:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Estúdio de arquitectura e construção especializado em casas modernas e sustentáveis em Portugal',
  defaultLocale: 'pt',
  locales: ['pt', 'en'],

  // Social Media
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@pdoarquitetos',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/pdoarquitetos',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/pdoarquitetos',
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/pdo-arquitetos',
  },

  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'po@pdo-arquitetos.pt',
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '+351 912 344 767',
    address: {
      street: '2845-546 Amora',
      city: 'Amora',
      region: 'Setúbal',
      postalCode: '2845-546',
      country: 'Portugal',
      countryCode: 'PT',
    },
    coordinates: {
      latitude: '38.6295',
      longitude: '-9.1153',
    },
  },

  // Business Information
  business: {
    name: 'PDO Arquitetos',
    alternateName: 'Pedro do Ó Arquitetos',
    description:
      'Estúdio de arquitectura e construção especializado em casas modernas e sustentáveis em Portugal',
    foundingDate: '2008',
    founder: 'Pedro do Ó',
    services: [
      'Projecto Arquitectónico',
      'Construção',
      'Consultoria',
      'Design de Interiores',
      'Sustentabilidade',
    ],
    areasServed: ['Portugal'],
    priceRange: '€€€',
  },

  // SEO Keywords
  keywords: {
    pt: [
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
    en: [
      'architecture portugal',
      'modern homes',
      'sustainable construction',
      'architectural design',
      'architect lisbon',
      'contemporary houses',
      'residential design',
      'eco-friendly construction',
      'sustainable architecture',
      'custom homes',
      'house design',
      'modern construction',
      'portuguese architect',
      'home design',
      'construction portugal',
    ],
  },

  // Open Graph Images
  ogImages: {
    default: '/og-image.jpg',
    width: 1200,
    height: 630,
  },

  // Analytics
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID',
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID || 'GTM_ID',
  },

  // Search Console
  searchConsole: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || 'your-yandex-verification-code',
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION || 'your-yahoo-verification-code',
  },
}
