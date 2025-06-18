import { BlogModel } from '../models/mongodb/blog.model.js'
import { validateBlog, validatePartialBlog } from './blog.validator.js'

export class BlogController {
  // constructor() {}

  getAll = async (req, res) => {
    const blogs = await BlogModel.getAll()
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

  update = async (req, res) => {
    const result = validatePartialBlog(req.body)
    const { id } = req.params
    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const blog = await BlogModel.update({ id, input: result.data })
    res.json(blog)
  }
}
