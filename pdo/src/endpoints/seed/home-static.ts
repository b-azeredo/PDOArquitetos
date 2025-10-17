import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'fullScreen',
  },
  meta: {
    description:
      'PDO Arquitetos - Designing & Building Modern Homes in Portugal. We create inspiring living spaces crafted with precision, built with purpose.',
    title: 'PDO Arquitetos - Modern Architecture in Portugal',
  },
  title: 'Home',
  layout: [],
}
