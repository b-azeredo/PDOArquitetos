'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Project {
  id: string
  title: string
  clientName: string
  value?: string
  featuredImage: {
    url: string
    alt: string
  }
  images?: Array<{
    image: {
      url: string
      alt: string
    }
    caption?: string
  }>
  plantImages?: Array<{
    image: {
      url: string
      alt: string
    }
    caption?: string
  }>
}

interface ProjectHeroProps {
  project: Project
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({ project }) => {
  const t = useTranslations('project')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPlan, setShowPlan] = useState(false)

  // Debug: Log project data
  console.log('ProjectHero - Project data:', project)
  console.log('ProjectHero - Images:', project.images)

  // Combine featured image with gallery images
  const allImages = [
    {
      url: project.featuredImage.url,
      alt: project.featuredImage.alt,
      caption: 'Featured Image',
    },
    ...(project.images || []).map((item) => ({
      url: item.image.url,
      alt: item.image.alt,
      caption: item.caption || '',
    })),
  ]

  // Add plan images when showPlan is true
  const planImages =
    project.plantImages?.map((item) => ({
      url: item.image.url,
      alt: item.image.alt,
      caption: item.caption || 'Plant Image',
    })) || []

  const displayImages = showPlan ? [...planImages, ...allImages] : allImages

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const handleViewPlan = () => {
    setShowPlan(!showPlan)
    setCurrentImageIndex(0) // Reset to first image when toggling
  }

  return (
    <section className="bg-white">
      {/* Header Section - Above the Image */}
      <div className="container mx-auto px-4 py-8">
        <div
          className="flex flex-col md:flex-row md:justify-between md:items-center mx-auto"
          style={{
            backgroundColor: '#FAFAFA',
            width: '100%',
            height: 'auto',
            minHeight: '115px',
            borderRadius: '48px',
            paddingTop: '19px',
            paddingRight: '20px',
            paddingBottom: '19px',
            paddingLeft: '20px',
            gap: '16px',
          }}
        >
          {/* Project Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-black"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.clientName}
          </motion.h1>

          {/* View Plan Button */}
          <motion.button
            onClick={handleViewPlan}
            className="w-full md:w-auto px-6 py-3 text-white rounded-full font-medium transition-colors duration-200 shadow-lg"
            style={{ backgroundColor: '#1B688C' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPlan ? t('back') : t('viewPlan')}
          </motion.button>
        </div>
      </div>

      {/* Main Image Section */}
      <div className="container mx-auto px-4 pb-8">
        <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden">
          <Image
            src={displayImages[currentImageIndex].url}
            alt={displayImages[currentImageIndex].alt}
            fill
            className="object-cover"
            priority
          />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              showPlan
                ? 'bg-black/40 backdrop-blur-sm shadow-2xl hover:bg-black/50'
                : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextImage}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              showPlan
                ? 'bg-black/40 backdrop-blur-sm shadow-2xl hover:bg-black/50'
                : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Pagination Dots */}
          {displayImages.length > 1 && (
            <div
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 backdrop-blur-sm rounded-full px-4 py-2 ${
                showPlan ? 'bg-black/40 shadow-2xl' : 'bg-black/20'
              }`}
            >
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Value Section - Below Image, Right Aligned */}
        {project.value && (
          <motion.div
            className="mt-6 flex justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white px-8 py-0 rounded-full">
              <p
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '30px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  textAlign: 'right',
                  color: '#0E0E0F',
                }}
              >
                {project.value}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
