import type { Payload } from 'payload'

export const seedHeaderGlobal = async (payload: Payload): Promise<void> => {
  await payload.updateGlobal({
    slug: 'header',
    data: {
      logo: null, // Placeholder, will be uploaded via admin
      navItems: [],
    },
  })
}
