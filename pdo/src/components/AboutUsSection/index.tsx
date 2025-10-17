'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutCard {
  id: string
  title: string
  description: string
}

interface AboutUsSectionProps {
  cards: AboutCard[]
  imageUrl?: string
  imageAlt?: string
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ cards, imageUrl, imageAlt }) => {
  const t = useTranslations('aboutUs')
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
    <section id="about-us" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.h2
          className="mb-12"
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '40px',
            lineHeight: '110%',
            letterSpacing: '-2%',
            color: '#3B3B3B',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[398px] mx-auto lg:max-w-none h-[374px] lg:h-[700px] rounded-[20px] lg:rounded-2xl overflow-hidden">
              <Image
                src={imageUrl || '/about.jpg'}
                alt={imageAlt || 'Modern living room interior'}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Description Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p
                className="text-center lg:text-left"
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: isClient && isMobile ? '24px' : '40px',
                  lineHeight: '148%',
                  letterSpacing: '0%',
                  textAlign: isClient && isMobile ? 'center' : 'left',
                  color: '#3B3B3B',
                }}
              >
                <span>{t('description1')}</span>
                <span> {t('description2')}</span>
              </p>
            </motion.div>

            {/* Get in Touch Button */}
            <motion.button
              className="w-full lg:w-auto px-8 py-4 text-white rounded-full font-medium transition-colors duration-200"
              style={{ backgroundColor: '#1B688C' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactTitle = document.querySelector('#contact h2')
                if (contactTitle) {
                  contactTitle.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }
              }}
            >
              {t('cta')}
            </motion.button>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`${card.id}.title`)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(`${card.id}.description`)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
