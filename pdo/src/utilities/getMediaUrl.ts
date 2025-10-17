import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol (including Vercel Blob URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // For local development, use direct file serving
  if (process.env.NODE_ENV === 'development') {
    const baseUrl = getClientSideURL()
    return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
  }

  // For production (Vercel), use API route
  const baseUrl = getClientSideURL()
  const apiUrl = url.startsWith('/media/') ? `${baseUrl}/api${url}` : `${baseUrl}/api/media${url}`
  return cacheTag ? `${apiUrl}?${cacheTag}` : apiUrl
}
