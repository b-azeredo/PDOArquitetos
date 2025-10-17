'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { ProjectLink } from '@/components/ProjectLink'

interface Project {
  id: string
  title: string
  clientName: string
  technicalNote: string
  featuredImage: {
    url: string
    alt: string
  }
  slug: string
}

interface ProjectsGridProps {
  projects: Project[]
  translationKey?: string
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  translationKey = 'projects',
}) => {
  const t = useTranslations(translationKey)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="mb-8"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '64px',
              lineHeight: '110%',
              letterSpacing: '-2%',
              color: '#3B3B3B',
            }}
          >
            {translationKey === 'builtByUs' ? t('title') : t('allProjects')}
          </h1>
          <p
            className="max-w-7xl mx-auto px-4"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '20px',
              lineHeight: '148%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#757575',
            }}
          >
            {t('allProjectsDescription')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-full flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                className="group transition-shadow duration-300 flex flex-col h-full w-full"
                style={{
                  backgroundColor: '#FAFAFA',
                  maxWidth: '450px',
                  minHeight: '508px',
                  borderRadius: '24px',
                  padding: '20px',
                  gap: '10px',
                }}
              >
                {/* Project Image */}
                <div
                  className="relative overflow-hidden rounded-2xl w-full"
                  style={{ height: '280px', flexShrink: 0 }}
                >
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Navigation Arrow Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="flex flex-col justify-between flex-1" style={{ gap: '10px' }}>
                  <div className="flex flex-col" style={{ gap: '10px' }}>
                    {/* Project Name */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 text-left">
                      {project.clientName}
                    </h3>

                    {/* Technical Note */}
                    <div
                      className="bg-gray-100"
                      style={{
                        maxWidth: '410px',
                        height: '32px',
                        borderRadius: '28px',
                        paddingTop: '8px',
                        paddingRight: '16px',
                        paddingBottom: '8px',
                        paddingLeft: '16px',
                        gap: '10px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <p className="text-sm text-gray-600 text-left leading-none truncate">
                        {project.technicalNote}
                      </p>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <ProjectLink slug={project.slug}>
                    <motion.button
                      className="py-3 px-6 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 hover:text-gray-900 transition-colors duration-200 text-left shadow-sm max-w-fit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('viewDetails')}
                    </motion.button>
                  </ProjectLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
