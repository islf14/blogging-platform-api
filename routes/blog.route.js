import { Router } from 'express'
import { BlogController } from '../controllers/blog.controller.js'

export const createBlogRouter = () => {
  const blogRouter = Router()
  const blogController = new BlogController()

  blogRouter.get('/', blogController.getAll)
  blogRouter.post('/', blogController.create)
  blogRouter.patch('/:id', blogController.update)

  return blogRouter
}
