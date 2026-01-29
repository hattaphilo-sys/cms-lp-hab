import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Simple', value: 'simple' },
        { label: 'Glitch Effect', value: 'glitch' },
        { label: '3D Text', value: '3d-text' },
      ],
      required: true,
      defaultValue: 'simple',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
