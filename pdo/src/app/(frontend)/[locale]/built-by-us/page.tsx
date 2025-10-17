import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'Built by PDO Arquitetos - Projects',
  description:
    "See the projects we've designed and built from start to finish. Each work represents our commitment to excellence in architecture and construction.",
}

async function getBuiltProjects() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: {
      builtByPDO: {
        equals: true,
      },
    },
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

export default async function BuiltByUsPage() {
  const projects = await getBuiltProjects()

  return (
    <div className="min-h-screen bg-white">
      <ProjectsGrid projects={projects} translationKey="builtByUs" />
      <ContactSection />
    </div>
  )
}
