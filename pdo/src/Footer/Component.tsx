'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Mail, Phone } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const pathname = usePathname()
  
  const switchLocale = (locale: string) => {
    const currentPath = pathname || '/'
    const segments = currentPath.split('/')
    
    // Check if the first segment is a locale
    if (segments[1] === 'en' || segments[1] === 'pt') {
      segments[1] = locale
      return segments.join('/')
    } else {
      // If no locale in URL, add it
      return `/${locale}${currentPath}`
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Company Info & Socials */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <img src="https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png" alt="PDO Arquitetos" className="h-16 w-auto" />
              </div>
              <p className="text-gray-600 text-sm">{t('tagline')}</p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-full h-full" />
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links & Contact */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900">{t('quickLinks')}</h3>
                <nav className="space-y-2">
                  <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    {t('home')}
                  </Link>
                  <Link
                    href="/projects"
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {t('projects')}
                  </Link>
                  <button
                    onClick={() => {
                      const element = document.getElementById('our-team')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    {t('team')}
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('about')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    {t('about')}
                  </button>
                </nav>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900">{t('contact')}</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t('address')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm break-all">{t('email')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t('phone')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-16">
            {/* Left Column - Company Info & Socials */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center">
                <img src="https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png" alt="PDO Arquitetos" className="h-16 w-auto" />
              </div>
              <p className="text-gray-600 text-sm">{t('tagline')}</p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-full h-full" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-full h-full" />
                </motion.a>
              </div>
            </motion.div>

            {/* Right Column - Quick Links & Contact */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900">{t('quickLinks')}</h3>
                <nav className="space-y-2">
                  <Link href="/" className="block text-gray-600 hover:text-gray-900 transition-colors">
                    {t('home')}
                  </Link>
                  <Link
                    href="/projects"
                    className="block text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {t('projects')}
                  </Link>
                  <button
                    onClick={() => {
                      const element = document.getElementById('our-team')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    {t('team')}
                  </button>
                  <button
                    onClick={() => {
                      const element = document.getElementById('about')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="block text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    {t('about')}
                  </button>
                </nav>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900">{t('contact')}</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t('address')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Mail className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm break-all">{t('email')}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t('phone')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t('copyright')}
            </motion.p>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t('privacyPolicy')}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {t('termsOfService')}
              </Link>
            </motion.div>
          </div>
          
          {/* Language Selector - Mobile Only */}
          <motion.div
            className="flex md:hidden justify-center items-center space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              href={switchLocale('en')}
              className={`text-sm transition-colors ${
                pathname?.startsWith('/en')
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              English
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={switchLocale('pt')}
              className={`text-sm transition-colors ${
                pathname?.startsWith('/pt') || (!pathname?.startsWith('/en') && !pathname?.startsWith('/pt'))
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portuguese
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
