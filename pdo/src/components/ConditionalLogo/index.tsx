'use client'

import React from 'react'
import { useIsHomePage } from '@/hooks/useIsProjectPage'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

interface ConditionalLogoProps {
  className?: string
  logoUrl?: string
  logoAlt?: string
}

export const ConditionalLogo: React.FC<ConditionalLogoProps> = ({ 
  className, 
  logoUrl, 
  logoAlt = "PDO Arquitetos" 
}) => {
  const isHomePage = useIsHomePage()

  return (
    <div className={className}>
      <div className="block md:hidden">
        <Image 
          src="https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png" 
          alt={logoAlt} 
          width={123} 
          height={42} 
          className="h-auto" 
        />
      </div>
      
      <div className="hidden md:block">
        {isHomePage ? (
          <Logo />
        ) : (
          <Image 
            src={"https://res.cloudinary.com/dramzribs/image/upload/v1760654099/logo_vwt4sl.png"} 
            alt={logoAlt} 
            width={123} 
            height={42} 
            className="h-auto" 
          />
        )}
      </div>
    </div>
  )
}
