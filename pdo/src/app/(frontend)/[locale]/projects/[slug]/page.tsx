import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectHero } from '@/components/ProjectHero'
import { ProjectDetails } from '@/components/ProjectDetails'
import { SeeMoreProjects } from '@/components/SeeMoreProjects'
import { ContactSection } from '@/components/ContactSection'
import { locales } from '@/i18n/config'

type Args = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

async function getProject(slug: string, locale: string = 'en') {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (result.docs.length === 0) {
    return null
  }

  const project = result.docs[0]

  console.log('Project from database:', project)
  console.log('Project images:', project.images)

  let processedDescription = ''
  const descriptionField = locale === 'pt' ? project.descriptionPt : project.description

  console.log('Locale:', locale)
  console.log('Description field:', descriptionField)
  console.log('Project descriptionPt:', project.descriptionPt)
  console.log('Project description:', project.description)

  if (descriptionField) {
    if (typeof descriptionField === 'string') {
      processedDescription = descriptionField
    } else if (typeof descriptionField === 'object' && descriptionField.root) {
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node
        if (node?.text) return node.text
        if (node?.children && Array.isArray(node.children)) {
          return node.children.map(extractText).join('')
        }
        return ''
      }
      processedDescription = extractText(descriptionField.root)
    }
  }

  return {
    id: project.id.toString(),
    title: project.name,
    clientName: project.name,
    technicalNote: project.technicalNote,
    value: project.value || '',
    featuredImage: {
      url:
        typeof project.featuredImage === 'object' && project.featuredImage?.url
          ? project.featuredImage.url
          : '/house1.jpg',
      alt: project.name,
    },
    slug: project.slug,
    description: processedDescription,
    images: (project.images || []).flatMap((item) => {
      const imageArray = Array.isArray(item.image) ? item.image : [item.image]

      return imageArray.map((img) => ({
        image: {
          url: typeof img === 'object' && img?.url ? img.url : '/house1.jpg',
          alt: typeof img === 'object' && img?.alt ? img.alt : 'Project image',
        },
        caption: item.caption || '',
      }))
    }),
    plantImages: (project.plantImages || []).flatMap((item) => {
      const imageArray = Array.isArray(item.image) ? item.image : [item.image]

      return imageArray.map((img) => ({
        image: {
          url: typeof img === 'object' && img?.url ? img.url : '/house1.jpg',
          alt: typeof img === 'object' && img?.alt ? img.alt : 'Plant image',
        },
        caption: item.caption || '',
      }))
    }),
  }

  console.log('Processed project data:', {
    id: project.id.toString(),
    imagesCount: (project.images || []).flatMap((item) => {
      const imageArray = Array.isArray(item.image) ? item.image : [item.image]
      return imageArray.map((img) => ({
        url: typeof img === 'object' && img?.url ? img.url : '/house1.jpg',
      }))
    }).length,
  })
}

async function getAllProjects() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
  })

  return result.docs.map((project) => ({
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

export default async function ProjectPage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise

  const project = await getProject(slug, locale)

  if (!project) {
    notFound()
  }

  const allProjects = await getAllProjects()

  return (
    <article>
      <ProjectHero project={project} />
      <ProjectDetails project={project} />
      <SeeMoreProjects projects={allProjects} currentProjectSlug={slug} />
      <ContactSection />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug } = await paramsPromise

  const project = await getProject(slug, locale)

  if (project) {
    return {
      title: `${project.clientName} - ${project.title}`,
      description: project.technicalNote,
    }
  }

  return {
    title: 'Project Not Found',
  }
}

export async function generateStaticParams() {
  const allProjects = await getAllProjects()

  return locales.flatMap((locale) =>
    allProjects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  )
}
