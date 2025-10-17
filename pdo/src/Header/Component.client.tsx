'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { ConditionalLogo } from '@/components/ConditionalLogo'
import { LanguageSelector } from '@/components/LanguageSelector'
import { HeaderNav } from './Nav'
import { useIsHomePage } from '@/hooks/useIsProjectPage'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const isHomePage = useIsHomePage()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20 bg-white md:bg-transparent" {...(theme ? { 'data-theme': theme } : {})}>
      <div className={`${isHomePage ? 'py-0 md:py-8' : 'py-0'} flex justify-between items-center`}>
        <Link href="/">
          <ConditionalLogo 
            logoUrl={typeof data?.logo === 'object' && data?.logo?.url ? data.logo.url : undefined}
            logoAlt={typeof data?.logo === 'object' && data?.logo?.alt ? data.logo.alt : "PDO Arquitetos"}
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <HeaderNav data={data} />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <HeaderNav data={data} />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  )
}
