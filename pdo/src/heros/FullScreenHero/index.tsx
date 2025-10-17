'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface FullScreenHeroProps {
  videoUrl?: string
}

export const FullScreenHero: React.FC<FullScreenHeroProps> = ({ videoUrl }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const t = useTranslations('hero')

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="rounded-[36px] max-h-[523px] mx-2 -mt-[63px] md:mx-0 md:max-h-screen md:rounded-none relative md:-mt-[11rem] flex items-center justify-center text-white min-h-screen overflow-hidden"
      data-theme="dark"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src={videoUrl || "/herovideo.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-5xl text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('titleLine1')} <br />
            {t('titleLine2')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('subtitle')} <br />
            {t('subtitleLine2')}
          </motion.p>
          <motion.button
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }}
          >
            {t('cta')}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
