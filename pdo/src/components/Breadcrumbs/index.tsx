'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  href: string
}

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const t = useTranslations('breadcrumbs')

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    breadcrumbs.push({
      name: t('home'),
      href: '/',
    })

    let currentPath = ''
    segments.forEach((segment) => {
      currentPath += `/${segment}`

      if (segment === 'pt' || segment === 'en') {
        return
      }

      let name = segment
      switch (segment) {
        case 'home':
          name = t('home')
          break
        case 'projects':
          name = t('projects')
          break
        case 'project':
          name = t('project')
          break
        case 'about':
          name = t('about')
          break
        case 'team':
          name = t('team')
          break
        case 'contact':
          name = t('contact')
          break
        default:
          name = segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
      }

      breadcrumbs.push({
        name,
        href: currentPath,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index === 0 ? (
            <Link
              href={breadcrumb.href}
              className="flex items-center hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          ) : (
            <Link href={breadcrumb.href} className="hover:text-gray-900 transition-colors">
              {breadcrumb.name}
            </Link>
          )}

          {index < breadcrumbs.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}
        </React.Fragment>
      ))}
    </nav>
  )
}
