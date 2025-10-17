'use client'

import React from 'react'

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'LocalBusiness' | 'ArchitecturalService'
  data: Record<string, unknown>
}

// Função para gerar URL base dinâmica
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://pdo-arquitetos.pt'
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'PDO Arquitetos',
          alternateName: 'Pedro do Ó Arquitetos',
          url: getBaseUrl(),
          logo: `https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png`,
          description:
            'Estúdio de arquitectura e construção especializado em casas modernas e sustentáveis em Portugal',
          foundingDate: '2008',
          founder: {
            '@type': 'Person',
            name: 'Pedro do Ó',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2845-546 Amora',
            addressLocality: 'Amora',
            addressCountry: 'PT',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+351-912-344-767',
            contactType: 'customer service',
            email: 'po@pdo-arquitetos.pt',
          },
          sameAs: [
            'https://www.facebook.com/pdoarquitetos',
            'https://www.instagram.com/pdoarquitetos',
            'https://www.linkedin.com/company/pdo-arquitetos',
          ],
        }

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'PDO Arquitetos',
          url: getBaseUrl(),
          description:
            'Website oficial da PDO Arquitetos - Arquitectura moderna e sustentável em Portugal',
          inLanguage: ['pt-PT', 'en-US'],
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://pdo-arquitetos.pt/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://pdo-arquitetos.pt/#business',
          name: 'PDO Arquitetos',
          image: `https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png`,
          description:
            'Estúdio de arquitectura e construção especializado em casas modernas e sustentáveis',
          url: getBaseUrl(),
          telephone: '+351-912-344-767',
          email: 'po@pdo-arquitetos.pt',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2845-546 Amora',
            addressLocality: 'Amora',
            addressRegion: 'Setúbal',
            postalCode: '2845-546',
            addressCountry: 'PT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '38.6295',
            longitude: '-9.1153',
          },
          openingHours: 'Mo-Fr 09:00-18:00',
          priceRange: '€€€',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '47',
          },
        }

      case 'ArchitecturalService':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Serviços de Arquitectura',
          description: 'Projecto e construção de casas modernas e sustentáveis',
          provider: {
            '@type': 'Organization',
            name: 'PDO Arquitetos',
            url: getBaseUrl(),
          },
          serviceType: 'Architectural Design',
          areaServed: {
            '@type': 'Country',
            name: 'Portugal',
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Serviços de Arquitectura',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Projecto Arquitectónico',
                  description: 'Design e projecto de casas modernas',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Construção',
                  description: 'Construção de casas sustentáveis',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Consultoria',
                  description: 'Consultoria em arquitectura e construção',
                },
              },
            ],
          },
        }

      default:
        return {}
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
