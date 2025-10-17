'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface Project {
  id: string
  title: string
  clientName: string
  description?: string | object
  projectDetails?: {
    area?: number
    units?: number
    materials?: string[]
    features?: string[]
  }
}

interface ProjectDetailsProps {
  project: Project
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const t = useTranslations('project')
  
  // Use project description if available, otherwise use default content
  const hasDescription = project.description && typeof project.description === 'string' && project.description.trim() !== ''
  
  const details = hasDescription ? [
    {
      title: t('description'),
      content: project.description as string,
    },
  ] : [
    {
      title: 'Modern Minimalism Meets Eco-Friendly Living',
      content: `${project.clientName} is a 3-bedroom villa in Setúbal, Portugal, that embodies clean architectural lines and a neutral palette. The design features expansive floor-to-ceiling windows, a minimalist aesthetic, and an open-plan layout that maximizes natural light and creates a sense of spaciousness.`,
    },
    {
      title: 'Sustainable by Design',
      content: `Casa Azul's commitment to sustainability is evident throughout the design. The villa incorporates high-efficiency solar panels, energy-efficient fixtures, and sustainable materials, resulting in a low-carbon footprint that appeals to environmentally conscious residents or vacationers.`,
    },
    {
      title: 'A Space for Connection and Comfort',
      content: `The villa's versatility makes it perfect as a primary residence, weekend retreat, or short-term rental. The open-plan kitchen and dining area are designed for gatherings, while private bedrooms provide retreat spaces. Located near Setúbal's coastline and town center, it offers the perfect balance of tranquility and accessibility.`,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {details.map((detail, index) => (
          <motion.div
            key={index}
            className="mb-16 last:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
              {detail.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">{detail.content}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
