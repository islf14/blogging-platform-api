import { BlogModel } from '../models/mongodb/blog.model.js'
import { validateBlog } from './blog.validator.js'

export class BlogController {
  // constructor() {}

  getAll = (req, res) => {
    const blogs = BlogModel.getAll()
    return res.json(blogs)
  }

  // new blog
  create = async (req, res) => {
    const result = validateBlog(req.body)
    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const blog = await BlogModel.create({ input: result.data })

    res.json(blog)
  }
}
