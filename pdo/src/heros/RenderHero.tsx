import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { FullScreenHero } from '@/heros/FullScreenHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  fullScreen: FullScreenHero,
}

interface RenderHeroProps {
  type?: 'none' | 'highImpact' | 'mediumImpact' | 'lowImpact' | 'fullScreen'
  videoUrl?: string
  [key: string]: any
}

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { type, videoUrl, ...restProps } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Pass videoUrl only to FullScreenHero
  if (type === 'fullScreen') {
    return <HeroToRender {...restProps} type={type} videoUrl={videoUrl} />
  }

  return <HeroToRender {...restProps} type={type} />
}
