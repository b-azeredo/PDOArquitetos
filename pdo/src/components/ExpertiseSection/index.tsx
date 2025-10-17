'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMember {
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
}

interface ExpertiseSectionProps {
  teamMembers: TeamMember[]
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ teamMembers }) => {
  const t = useTranslations('expertise')
  const locale = useLocale()
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="our-team" className="py-12 bg-white">
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
            className="mb-8"
            style={{
              fontFamily: 'Geist, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: isClient && isMobile ? '36px' : '64px',
              lineHeight: '110%',
              letterSpacing: '-2%',
              textAlign: 'center',
              color: '#3B3B3B',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="max-w-4xl mx-auto"
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
            {t('description')}
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 max-w-7xl mx-auto justify-items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group flex flex-col w-full"
              style={{
                backgroundColor: '#FAFAFA',
                maxWidth: '410px',
                height: '606px',
                minWidth: '400px',
                borderRadius: '48px',
                gap: '24px',
                padding: '20px',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Team Member Image */}
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{ height: '350px', flexShrink: 0 }}
              >
                <Image
                  src={member.image.url}
                  alt={member.image.alt || member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Team Member Info */}
              <div className="flex flex-col" style={{ gap: '12px' }}>
                <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-lg font-medium text-gray-700">
                  {locale === 'pt' ? member.rolePt : member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {locale === 'pt' ? member.descriptionPt : member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
