import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt'],

  // Used when no locale matches
  defaultLocale: 'pt',

  // Always show locale prefix
  localePrefix: 'always',
})

export const config = {
  // Match only internationalized pathnames, excluding admin routes and API routes
  matcher: [
    // Skip all internal paths (_next, api, admin)
    '/((?!_next|api|admin|favicon.ico|.*\\..*).*)',
  ],
}
