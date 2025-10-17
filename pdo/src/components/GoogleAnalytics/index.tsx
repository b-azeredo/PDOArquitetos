'use client'

import Script from 'next/script'
import { seoConfig } from '@/config/seo'

export const GoogleAnalytics = () => {
  const GA_MEASUREMENT_ID = seoConfig.analytics.googleAnalytics

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'GA_MEASUREMENT_ID') {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            send_page_view: true,
            anonymize_ip: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: false,
            cookie_flags: 'SameSite=None;Secure',
            custom_map: {
              'custom_parameter_1': 'business_type',
              'custom_parameter_2': 'service_area'
            }
          });
          
          // Enhanced ecommerce tracking
          gtag('config', '${GA_MEASUREMENT_ID}', {
            custom_map: {
              'custom_parameter_1': 'business_type',
              'custom_parameter_2': 'service_area'
            }
          });
          
          // Track page views
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            business_type: 'architecture',
            service_area: 'portugal'
          });
        `}
      </Script>
    </>
  )
}
