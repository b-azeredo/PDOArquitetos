'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

interface SeeMoreProjectsProps {
  projects: Project[]
  currentProjectSlug?: string
}

export const SeeMoreProjects: React.FC<SeeMoreProjectsProps> = ({
  projects,
  currentProjectSlug,
}) => {
  const t = useTranslations('seeMoreProjects')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const minSwipeDistance = 50

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get number of visible projects based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 3 // Show 3 projects vertically on mobile
    if (isTablet) return 2
    return 3
  }

  const visibleCount = getVisibleCount()

  // Filter out current project
  const filteredProjects = projects.filter((project) => project.slug !== currentProjectSlug)

  const nextProject = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleCount >= filteredProjects.length ? 0 : prevIndex + visibleCount,
    )
  }

  const prevProject = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - visibleCount
      return newIndex < 0 ? Math.max(0, filteredProjects.length - visibleCount) : newIndex
    })
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextProject()
    } else if (isRightSwipe) {
      prevProject()
    }
  }

  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + visibleCount)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="mb-4"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '44px',
              lineHeight: '110%',
              letterSpacing: '-2%',
              color: '#3B3B3B',
            }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative w-full mx-auto">
          <div
            className="overflow-hidden pb-10"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`${currentIndex}-${visibleCount}`}
                className={`grid gap-24 px-4 ${
                  isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
                }`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                {visibleProjects.map((project) => (
                  <div key={project.id} className="w-full flex justify-center">
                    <div
                      className="group hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full"
                      style={{
                        backgroundColor: '#FAFAFA',
                        maxWidth: isMobile ? '95vw' : '550px',
                        minWidth: isMobile ? 'auto' : '450px',
                        minHeight: '600px',
                        borderRadius: '24px',
                        padding: '24px',
                        gap: '12px',
                      }}
                    >
                      {/* Project Image */}
                      <div
                        className="relative overflow-hidden rounded-2xl w-full"
                        style={{ height: '350px', flexShrink: 0 }}
                      >
                        <Image
                          src={project.featuredImage.url}
                          alt={project.featuredImage.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        {/* Navigation Arrows Overlay - Only on Desktop */}
                        <div className="hidden lg:flex absolute inset-0 items-center justify-between px-4 pointer-events-none">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronLeft className="w-4 h-4 text-white" />
                          </div>
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="flex flex-col justify-between flex-1" style={{ gap: '12px' }}>
                        <div className="flex flex-col" style={{ gap: '12px' }}>
                          {/* Project Title */}
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-left">
                            {project.clientName}
                          </h3>

                          {/* Technical Note */}
                          <div
                            className="bg-gray-100"
                            style={{
                              maxWidth: '500px',
                              height: '36px',
                              borderRadius: '28px',
                              paddingTop: '10px',
                              paddingRight: '18px',
                              paddingBottom: '10px',
                              paddingLeft: '18px',
                              gap: '10px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <p className="text-base text-gray-600 text-left leading-none truncate">
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
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons - Hidden on Mobile */}
          {filteredProjects.length > visibleCount && (
            <div className="hidden md:flex justify-center mt-12 space-x-6">
              <motion.button
                onClick={prevProject}
                className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-600" />
              </motion.button>

              <motion.button
                onClick={nextProject}
                className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-600" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
