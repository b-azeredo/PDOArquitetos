import React from 'react'
import Image, { ImageProps } from 'next/image'

interface SEOImageProps extends Omit<ImageProps, 'alt'> {
  alt: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  className?: string
}

export const SEOImage: React.FC<SEOImageProps> = ({
  alt,
  priority = false,
  loading = 'lazy',
  className = '',
  ...props
}) => {
  return (
    <Image
      {...props}
      alt={alt}
      priority={priority}
      loading={loading}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
