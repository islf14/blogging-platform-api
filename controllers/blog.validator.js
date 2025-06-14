import { z } from 'zod/v4'

const Blog = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string())
})

export function validateBlog(input) {
  return Blog.safeParse(input)
}

export function validatePartialBlog(input) {
  return Blog.partial().safeParse(input)
}
