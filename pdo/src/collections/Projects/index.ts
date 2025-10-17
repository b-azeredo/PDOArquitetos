import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'technicalNote', 'createdAt'],
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
      label: 'Project Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the project name',
      },
    },
    {
      name: 'technicalNote',
      type: 'text',
      required: true,
      label: 'Technical Note',
      admin: {
        description: 'Brief technical description of the project',
      },
    },
    {
      name: 'value',
      type: 'text',
      label: 'Project Value',
      admin: {
        description: 'Value or price of the project (e.g., €250,000)',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Project Description (English)',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            LinkFeature(),
            UploadFeature({
              collections: {
                media: {
                  fields: [
                    {
                      name: 'caption',
                      type: 'text',
                    },
                  ],
                },
              },
            }),
          ]
        },
      }),
    },
    {
      name: 'descriptionPt',
      type: 'richText',
      label: 'Project Description (Portuguese)',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            LinkFeature(),
            UploadFeature({
              collections: {
                media: {
                  fields: [
                    {
                      name: 'caption',
                      type: 'text',
                    },
                  ],
                },
              },
            }),
          ]
        },
      }),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          hasMany: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
        },
      ],
    },
    {
      name: 'plantImages',
      type: 'array',
      label: 'Plant Images',
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          hasMany: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Image Caption',
        },
      ],
    },
    {
      name: 'builtByPDO',
      type: 'checkbox',
      label: 'Built by Pedro do Ó Arquitetos',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Check this if the project was built by PDO Arquitetos',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true,
}
