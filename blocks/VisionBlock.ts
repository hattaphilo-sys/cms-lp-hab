import type { Block } from 'payload'

export const VisionBlock: Block = {
  slug: 'vision',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'visualType',
      type: 'select',
      options: [
        { label: 'Bento Grid', value: 'bento' },
        { label: 'Trace Beam', value: 'trace-beam' },
        { label: 'Particles', value: 'particles' },
      ],
      defaultValue: 'bento',
    },
  ],
}
