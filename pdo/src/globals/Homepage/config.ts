import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'heroVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Video',
      admin: {
        description: 'Main video for the hero section',
      },
    },
    {
      name: 'aboutSectionVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'About Section Video',
      admin: {
        description: 'Video for the about section (left side)',
      },
    },
    {
      name: 'aboutSectionImage',
      type: 'upload',
      relationTo: 'media',
      label: 'About Section Image',
      admin: {
        description: 'Image for the about section (right side)',
      },
    },
    {
      name: 'aboutUsImage',
      type: 'upload',
      relationTo: 'media',
      label: 'About Us Image',
      admin: {
        description: 'Image for the About Us section (left side)',
      },
    },
  ],
}
