'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, X } from 'lucide-react'
import { useIsProjectPage } from '@/hooks/useIsProjectPage'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const t = useTranslations('nav')
  const navItems = data?.navItems || []
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isProjectPage = useIsProjectPage()
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className="flex gap-3 items-center">
        <motion.button
          onClick={toggleMenu}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 bg-white hover:bg-gray-100"
          style={{ color: '#1B688C' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium hidden md:block">{t('menu')}</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M20 18.25C20.4142 18.25 20.75 18.5858 20.75 19C20.75 19.4142 20.4142 19.75 20 19.75H4C3.58579 19.75 3.25 19.4142 3.25 19C3.25 18.5858 3.58579 18.25 4 18.25H20ZM20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20ZM20 4.25C20.4142 4.25 20.75 4.58579 20.75 5C20.75 5.41421 20.4142 5.75 20 5.75H4C3.58579 5.75 3.25 5.41421 3.25 5C3.25 4.58579 3.58579 4.25 4 4.25H20Z" fill="#1B688C"/>
          </motion.svg>
        </motion.button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/20 md:bg-transparent" onClick={closeMenu} />

            <motion.div
              ref={menuRef}
              className="absolute inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-96 bg-white p-8 shadow-2xl flex flex-col"
              initial={{
                scale: 0.8,
                opacity: 0,
                x: '100%', 
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0, 
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                x: '100%', 
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
                duration: 0.4,
              }}
            >
              {/* Header with Logo - Only on mobile */}
              <div className="flex md:hidden justify-between items-center px-6 py-6 -mx-8 -mt-8 mb-4">
                <Link href="/" onClick={closeMenu}>
                  <Image
                    src="https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png"
                    alt="PDO Arquitetos"
                    width={200}
                    height={66}
                    className="h-16 w-auto"
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Close button - Desktop only */}
              <div className="hidden md:flex justify-end mb-8">
                <button
                  onClick={closeMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col justify-start md:justify-start items-center md:items-start space-y-6 md:space-y-8 px-6 md:px-0 md:pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Link
                    href="/"
                    className={`block text-lg md:text-3xl font-normal md:font-bold hover:text-gray-900 md:hover:opacity-80 transition-colors text-center md:text-left ${
                      pathname === '/' || pathname?.startsWith('/en') || pathname?.startsWith('/pt')
                        ? 'text-gray-900 md:text-[#6A9EB9]'
                        : 'text-gray-600 md:text-[#6A9EB9]'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('home')}
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      closeMenu()
                      if (pathname === '/' || pathname?.startsWith('/en') || pathname?.startsWith('/pt')) {
                        const element = document.getElementById('about-us')
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      } else {
                        window.location.href = '/#about-us'
                      }
                    }}
                    className="block text-lg md:text-3xl font-normal md:font-bold text-gray-600 md:text-[#6A9EB9] hover:text-gray-900 md:hover:opacity-80 transition-colors text-center md:text-left"
                  >
                    {t('about')}
                  </button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Link
                    href="/projects"
                    className={`block text-lg md:text-3xl font-normal md:font-bold hover:text-gray-900 md:hover:opacity-80 transition-colors text-center md:text-left ${
                      pathname?.includes('/projects')
                        ? 'text-gray-900 md:text-[#6A9EB9]'
                        : 'text-gray-600 md:text-[#6A9EB9]'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('projects')}
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <Link
                    href="/built-by-us"
                    className={`block text-lg md:text-3xl font-normal md:font-bold hover:text-gray-900 md:hover:opacity-80 transition-colors text-center md:text-left ${
                      pathname?.includes('/built-by-us')
                        ? 'text-gray-900 md:text-[#6A9EB9]'
                        : 'text-gray-600 md:text-[#6A9EB9]'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('builtByUs')}
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      closeMenu()
                      if (pathname === '/' || pathname?.startsWith('/en') || pathname?.startsWith('/pt')) {
                        const element = document.getElementById('our-team')
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      } else {
                        window.location.href = '/#our-team'
                      }
                    }}
                    className="block text-lg md:text-3xl font-normal md:font-bold text-gray-600 md:text-[#6A9EB9] hover:text-gray-900 md:hover:opacity-80 transition-colors text-center md:text-left"
                  >
                    {t('ourTeam')}
                  </button>
                </motion.div>

                {/* Contact Us Button - Mobile only */}
                <motion.div
                  className="pt-4 w-full md:hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <button
                    onClick={() => {
                      closeMenu()
                      const element = document.getElementById('contact')
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="w-full py-4 px-6 text-white font-medium rounded-full transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: '#1B688C' }}
                  >
                    {t('contactUs')}
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
