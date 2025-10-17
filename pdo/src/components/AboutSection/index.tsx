'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { SEOImage } from '@/components/SEOImage'

interface AboutSectionProps {
  videoUrl?: string
  imageUrl?: string
  imageAlt?: string
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  videoUrl = '/herovideo.mp4',
  imageUrl = '/man.jpg',
  imageAlt = 'Membro da equipa PDO Arquitetos - Especialista em arquitectura moderna e sustentável',
}) => {
  const t = useTranslations('about')
  const textRef = useRef<HTMLParagraphElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return

      const element = textRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const elementTop = rect.top
      const elementHeight = rect.height

      const isMobile = window.innerWidth < 768
      const startPoint = isMobile ? windowHeight * 0.9 : windowHeight * 1.2
      const endPoint = isMobile ? windowHeight * 0.3 : windowHeight * 0.5

      let progress = 0

      if (elementTop <= startPoint) {
        if (elementTop >= endPoint) {
          const rawProgress = (startPoint - elementTop) / (startPoint - endPoint)
          progress = Math.max(0, Math.min(1, rawProgress))
        } else {
          progress = 1
        }
      } else {
        progress = 0
      }

      setScrollProgress(progress)
    }

    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizedScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', optimizedScroll)
  }, [])

  return (
    <section id="about" className="py-20 bg-white px-4 md:px-0" style={{ borderRadius: '36px' }}>
      <div className="container mx-auto px-0 md:px-4">
        {/* Media Boxes */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 justify-center overflow-hidden">
          {/* Left Box - Video */}
          <motion.div
            className="relative group cursor-pointer w-full max-w-[398px] lg:max-w-[803px] h-[597px] lg:h-[597px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <video className="w-full h-full object-cover" controls preload="metadata">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          {/* Right Box - Image */}
          <motion.div
            className="relative group w-full max-w-[398px] lg:max-w-[427px] h-[265px] lg:h-[597px] rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SEOImage
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={false}
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          className="max-w-7xl mx-auto text-left px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p
            ref={textRef}
            className="text-2xl md:text-[40px]"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '24px',
              lineHeight: '148%',
              letterSpacing: '0%',
            }}
          >
            {t('text')
              .split('')
              .map((char, index) => {
                const totalChars = t('text').length
                // No delay - direct fill based on scroll progress
                const charIndex = index / totalChars
                const shouldFill = scrollProgress > charIndex

                return (
                  <span
                    key={index}
                    style={{
                      color: shouldFill ? '#3B3B3B' : '#CCCCCC',
                      transition: 'color 0.1s ease-out',
                    }}
                  >
                    {char}
                  </span>
                )
              })}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
