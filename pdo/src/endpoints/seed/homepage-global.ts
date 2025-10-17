import type { GlobalSlug } from 'payload'

export const seedHomepageGlobal = async (payload: any) => {
  payload.logger.info(`— Seeding homepage global...`)

  // Clear existing homepage global
  await payload.updateGlobal({
    slug: 'homepage' as GlobalSlug,
    data: {},
    depth: 0,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info(`— Homepage global seeded.`)
}
