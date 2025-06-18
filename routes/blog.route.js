import { Router } from 'express'
import { BlogController } from '../controllers/blog.controller.js'

export const createBlogRouter = () => {
  const blogRouter = Router()
  const blogController = new BlogController()

  blogRouter.get('/', blogController.getAll)
  blogRouter.get('/:id', blogController.getById)
  blogRouter.post('/', blogController.create)
  blogRouter.patch('/:id', blogController.update)
  blogRouter.delete('/:id', blogController.delete)

  return blogRouter
}
