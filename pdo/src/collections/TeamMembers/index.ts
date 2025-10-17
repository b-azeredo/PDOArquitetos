import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'createdAt'],
    group: 'Content',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Role/Position (English)',
    },
    {
      name: 'rolePt',
      type: 'text',
      required: true,
      label: 'Role/Position (Portuguese)',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description (English)',
      admin: {
        description: 'Brief description of the team member',
      },
    },
    {
      name: 'descriptionPt',
      type: 'textarea',
      required: true,
      label: 'Description (Portuguese)',
      admin: {
        description: 'Descrição breve do membro da equipe',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Image',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Additional Images',
      admin: {
        description: 'Additional images of the team member',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
      defaultValue: 0,
    },
  ],
  timestamps: true,
}
