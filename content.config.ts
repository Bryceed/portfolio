import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: {
        repository: 'https://github.com/Bryceed/markdown-blog',
        include: 'Posts/*.md',
      },
      schema: z.object({
        date: z.string()
      }),
    })
  },
});