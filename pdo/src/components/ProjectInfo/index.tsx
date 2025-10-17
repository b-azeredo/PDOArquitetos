'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Ruler, Users, Wrench, Star } from 'lucide-react'

interface Project {
  id: string
  title: string
  clientName: string
  projectDetails?: {
    area?: number
    units?: number
    materials?: string[]
    features?: string[]
  }
  status?: string
  publishedAt?: string
}

interface ProjectInfoProps {
  project: Project
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => {
  const infoItems = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'Setúbal, Portugal',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Year',
      value: '2024',
    },
    {
      icon: <Ruler className="w-6 h-6" />,
      label: 'Area',
      value: project.projectDetails?.area ? `${project.projectDetails.area} sqm` : '350 sqm',
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Bedrooms',
      value: project.projectDetails?.units ? `${project.projectDetails.units}` : '3',
    },
  ]

  const features = project.projectDetails?.features || [
    'Solar Panels',
    'Energy Efficient',
    'Open Plan Design',
    'Floor-to-Ceiling Windows',
    'Sustainable Materials',
  ]

  const materials = project.projectDetails?.materials || [
    'Concrete',
    'Glass',
    'Natural Wood',
    'Steel',
    'Local Stone',
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {infoItems.map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Features and Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="w-6 h-6 text-blue-600 mr-3" />
                Key Features
              </h3>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Wrench className="w-6 h-6 text-blue-600 mr-3" />
                Materials Used
              </h3>
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3" />
                    <span className="text-gray-700">{material}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Interested in a Similar Project?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with our expertise in modern,
              sustainable architecture.
            </p>
            <motion.button
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactTitle = document.querySelector('#contact h2')
                if (contactTitle) {
                  contactTitle.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }
              }}
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
