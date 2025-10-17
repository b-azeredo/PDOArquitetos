'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PageClient() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('refresh')) {
      window.location.reload()
    }
  }, [searchParams])

  return null
}
