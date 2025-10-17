'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LanguageSelector() {
  const t = useTranslations('language')
  const locale = useLocale()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    console.log('Current locale:', locale)
    console.log('New locale:', newLocale)
    console.log('Current pathname:', pathname)

    const currentUrl = window.location.href
    const baseUrl = window.location.origin

    let newUrl
    if (newLocale === 'en') {
      newUrl = baseUrl + '/en'
    } else {
      newUrl = baseUrl + '/pt'
    }

    console.log('Navigating to:', newUrl)
    window.location.href = newUrl
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-sm font-medium cursor-pointer hover:text-white transition-colors px-3 py-1 rounded-md hover:bg-white/10 min-w-[40px] text-center"
        style={{ color: '#141B34' }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        type="button"
      >
        <span className="md:hidden">{locale.toUpperCase()}</span>
        <span className="hidden md:inline text-gray-300">{locale.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 min-w-[100px] bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-[100] overflow-visible"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
          >
            <motion.button
              onClick={() => handleLanguageChange('en')}
              className="block w-full px-4 py-3 text-sm text-center hover:bg-white/20 first:rounded-t-lg transition-colors touch-manipulation whitespace-nowrap"
              style={{ color: '#141B34' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <span className="md:hidden">{t('english')}</span>
              <span className="hidden md:inline text-white">{t('english')}</span>
            </motion.button>
            <motion.button
              onClick={() => handleLanguageChange('pt')}
              className="block w-full px-4 py-3 text-sm text-center hover:bg-white/20 last:rounded-b-lg transition-colors touch-manipulation whitespace-nowrap"
              style={{ color: '#141B34' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <span className="md:hidden">{t('portuguese')}</span>
              <span className="hidden md:inline text-white">{t('portuguese')}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
