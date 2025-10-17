'use client'

import { usePathname } from 'next/navigation'

export const useIsProjectPage = () => {
  const pathname = usePathname()
  return pathname.includes('/project/')
}

export const useIsHomePage = () => {
  const pathname = usePathname()
  return (
    pathname === '/' || 
    pathname === '/en' || 
    pathname === '/pt' || 
    pathname === '/en/home' || 
    pathname === '/pt/home'
  )
}
