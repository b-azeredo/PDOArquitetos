'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

interface ProjectLinkProps {
  slug: string
  children: React.ReactNode
  className?: string
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ slug, children, className }) => {
  const locale = useLocale()

  return (
    <Link href={`/${locale}/projects/${slug}`} className={className}>
      {children}
    </Link>
  )
}
