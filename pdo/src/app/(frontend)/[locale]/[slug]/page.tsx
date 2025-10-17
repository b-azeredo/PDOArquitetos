import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { staticProjects } from '@/data/static-projects'
import { teamStatic } from '@/endpoints/seed/team-static'
import { aboutUsCardsStatic } from '@/endpoints/seed/about-us-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { BuiltByUsSection } from '@/components/BuiltByUsSection'
import { ExpertiseSection } from '@/components/ExpertiseSection'
import { AboutUsSection } from '@/components/AboutUsSection'
import { ContactSection } from '@/components/ContactSection'
import { CTASection } from '@/components/CTASection'
import { StructuredData } from '@/components/StructuredData'

type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: _locale, slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  let projects: Array<{
    id: string
    title: string
    clientName: string
    technicalNote: string
    featuredImage: { url: string; alt: string }
    slug: string
  }> = []
  let builtByUsProjects: Array<{
    id: string
    title: string
    clientName: string
    technicalNote: string
    featuredImage: { url: string; alt: string }
    slug: string
  }> = []
  let teamMembers: Array<{
    id: string
    name: string
    role: string
    rolePt: string
    description: string
    descriptionPt: string
    image: {
      url: string
      alt: string
    }
  }> = []
  let aboutUsCards: Array<{
    id: string
    title: string
    description: string
  }> = []

  if (slug === 'home') {
    try {
      const payload = await getPayload({ config: configPromise })
      const payloadProjects = await payload.find({
        collection: 'projects',
        limit: 6,
        sort: '-createdAt',
      })

      if (payloadProjects.docs.length > 0) {
        projects = payloadProjects.docs.map((project) => ({
          id: project.id.toString(),
          title: project.name,
          clientName: project.name,
          technicalNote: project.technicalNote,
          featuredImage: {
            url:
              typeof project.featuredImage === 'object' && project.featuredImage?.url
                ? project.featuredImage.url
                : '/house1.jpg',
            alt: project.name,
          },
          slug: project.slug,
        }))
      } else {
        projects = staticProjects.map((project) => ({
          id: project.id,
          title: project.title,
          clientName: project.clientName,
          technicalNote: project.technicalNote,
          featuredImage: project.featuredImage,
          slug: project.slug,
        }))
      }
    } catch (error) {
      projects = staticProjects.map((project) => ({
        id: project.id,
        title: project.title,
        clientName: project.clientName,
        technicalNote: project.technicalNote,
        featuredImage: project.featuredImage,
        slug: project.slug,
      }))
    }

    try {
      const payload = await getPayload({ config: configPromise })
      const payloadTeamMembers = await payload.find({
        collection: 'team-members',
        sort: 'order',
      })

      if (payloadTeamMembers.docs.length > 0) {
        teamMembers = payloadTeamMembers.docs.map((member) => ({
          id: member.id.toString(),
          name: member.name,
          role: member.role,
          rolePt: member.rolePt,
          description: member.description,
          descriptionPt: member.descriptionPt,
          image: {
            url:
              typeof member.image === 'object' && member.image?.url ? member.image.url : '/man.jpg',
            alt:
              typeof member.image === 'object' && member.image?.alt
                ? member.image.alt
                : member.name,
          },
        }))
      } else {
        teamMembers = teamStatic.map((member) => ({
          id: member.id,
          name: member.name,
          role: member.role,
          rolePt: member.role, 
          description: member.description,
          descriptionPt: member.description, 
          image: {
            url: member.image,
            alt: member.name,
          },
        }))
      }
    } catch (error) {
      teamMembers = teamStatic.map((member) => ({
        id: member.id,
        name: member.name,
        role: member.role,
        rolePt: member.role, 
        description: member.description,
        descriptionPt: member.description, 
        image: {
          url: member.image,
          alt: member.name,
        },
      }))
    }

    try {
      const payload = await getPayload({ config: configPromise })
      const payloadBuiltProjects = await payload.find({
        collection: 'projects',
        where: {
          builtByPDO: {
            equals: true,
          },
        },
        limit: 3,
        sort: '-createdAt',
      })

      if (payloadBuiltProjects.docs.length > 0) {
        builtByUsProjects = payloadBuiltProjects.docs.map((project) => ({
          id: project.id.toString(),
          title: project.name,
          clientName: project.name,
          technicalNote: project.technicalNote,
          featuredImage: {
            url:
              typeof project.featuredImage === 'object' && project.featuredImage?.url
                ? project.featuredImage.url
                : '/house1.jpg',
            alt: project.name,
          },
          slug: project.slug,
        }))
      }
    } catch (error) {
      console.error('Error fetching built by PDO projects:', error)
    }

    aboutUsCards = aboutUsCardsStatic
  }

  let homepageData = null
  try {
    const payload = await getPayload({ config: configPromise })
    homepageData = await payload.findGlobal({
      slug: 'homepage',
    })
  } catch (error) {
    console.error('Error fetching homepage data:', error)
  }

  return (
    <>
      {slug === 'home' && (
        <>
          <StructuredData type="Organization" data={{}} />
          <StructuredData type="WebSite" data={{}} />
          <StructuredData type="LocalBusiness" data={{}} />
          <StructuredData type="ArchitecturalService" data={{}} />
        </>
      )}

      <article className="pt-16">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <RenderHero
          {...hero}
          videoUrl={
            typeof homepageData?.heroVideo === 'object' && homepageData?.heroVideo?.url
              ? homepageData.heroVideo.url
              : undefined
          }
        />
        <AboutSection
          videoUrl={
            typeof homepageData?.aboutSectionVideo === 'object' &&
            homepageData?.aboutSectionVideo?.url
              ? homepageData.aboutSectionVideo.url
              : '/herovideo.mp4'
          }
          imageUrl={
            typeof homepageData?.aboutSectionImage === 'object' &&
            homepageData?.aboutSectionImage?.url
              ? homepageData.aboutSectionImage.url
              : '/man.jpg'
          }
          imageAlt={
            typeof homepageData?.aboutSectionImage === 'object' &&
            homepageData?.aboutSectionImage?.alt
              ? homepageData.aboutSectionImage.alt
              : 'Membro da equipa PDO Arquitetos - Especialista em arquitectura moderna e sustentável'
          }
        />
        {slug === 'home' && <ProjectsSection projects={projects} />}
        {slug === 'home' && builtByUsProjects.length > 0 && (
          <BuiltByUsSection projects={builtByUsProjects} />
        )}
        {slug === 'home' && <ExpertiseSection teamMembers={teamMembers} />}
        {slug === 'home' && (
          <AboutUsSection
            cards={aboutUsCards}
            imageUrl={
              typeof homepageData?.aboutUsImage === 'object' && homepageData?.aboutUsImage?.url
                ? homepageData.aboutUsImage.url
                : undefined
            }
            imageAlt={
              typeof homepageData?.aboutUsImage === 'object' && homepageData?.aboutUsImage?.alt
                ? homepageData.aboutUsImage.alt
                : 'About Us - PDO Arquitetos'
            }
          />
        )}
        {slug === 'home' && <ContactSection />}
        {slug === 'home' && <CTASection />}
        <RenderBlocks blocks={layout} />
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return {
      title: 'Page Not Found',
    }
  }

  if (slug === 'home') {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pdo-arquitetos.pt'
    const currentUrl = `${baseUrl}/${locale}${url}`

    return {
      title:
        locale === 'pt'
          ? 'PDO Arquitetos - Arquitectura Moderna e Sustentável em Portugal'
          : 'PDO Arquitetos - Modern & Sustainable Architecture in Portugal',
      description:
        locale === 'pt'
          ? 'PDO Arquitetos é um estúdio de arquitectura e construção em Portugal especializado em casas modernas, sustentáveis e funcionais. Projectamos e construímos espaços habitacionais únicos com mais de 15 anos de experiência.'
          : 'PDO Arquitetos is a Portugal-based architecture and construction studio specializing in modern, sustainable, and functional homes. We design and build unique residential spaces with over 15 years of experience.',
      keywords:
        locale === 'pt'
          ? 'arquitectura portugal, casas modernas, construção sustentável, projecto arquitectónico, arquitecto lisboa, casas contemporâneas, design residencial, construção ecológica'
          : 'architecture portugal, modern homes, sustainable construction, architectural design, architect lisbon, contemporary houses, residential design, eco-friendly construction',
      authors: [{ name: 'PDO Arquitetos' }],
      creator: 'PDO Arquitetos',
      publisher: 'PDO Arquitetos',
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: currentUrl,
        languages: {
          pt: `${baseUrl}/pt${url}`,
          en: `${baseUrl}/en${url}`,
        },
      },
      openGraph: {
        title:
          locale === 'pt'
            ? 'PDO Arquitetos - Arquitectura Moderna e Sustentável em Portugal'
            : 'PDO Arquitetos - Modern & Sustainable Architecture in Portugal',
        description:
          locale === 'pt'
            ? 'Projectamos e construímos casas modernas e sustentáveis em Portugal. Mais de 15 anos de experiência em arquitectura residencial contemporânea.'
            : 'We design and build modern, sustainable homes in Portugal. Over 15 years of experience in contemporary residential architecture.',
        url: currentUrl,
        siteName: 'PDO Arquitetos',
        locale: locale === 'pt' ? 'pt_PT' : 'en_US',
        type: 'website',
        images: [
          {
            url: `${baseUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt:
              locale === 'pt'
                ? 'PDO Arquitetos - Arquitectura Moderna em Portugal'
                : 'PDO Arquitetos - Modern Architecture in Portugal',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title:
          locale === 'pt'
            ? 'PDO Arquitetos - Arquitectura Moderna e Sustentável'
            : 'PDO Arquitetos - Modern & Sustainable Architecture',
        description:
          locale === 'pt'
            ? 'Projectamos e construímos casas modernas e sustentáveis em Portugal'
            : 'We design and build modern, sustainable homes in Portugal',
        images: [`${baseUrl}/og-image.jpg`],
        creator: '@pdoarquitetos',
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
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
      },
    }
  }

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})
