import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { ContactSection } from '@/components/ContactSection'

export const metadata: Metadata = {
  title: 'All Projects - PDO Arquitetos',
  description:
    'Explore our complete portfolio of architectural projects, from modern villas to elegant duplexes.',
}

async function getProjects() {
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
      url: typeof project.featuredImage === 'object' && project.featuredImage?.url 
        ? project.featuredImage.url 
        : '/house1.jpg', 
      alt: project.name,
    },
    slug: project.slug,
  }))
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-white">
      <ProjectsGrid projects={projects} />
      <ContactSection />
    </div>
  )
}
