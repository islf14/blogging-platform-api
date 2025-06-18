import { BlogModel } from '../models/mongodb/blog.model.js'
import { validateBlog, validatePartialBlog } from './blog.validator.js'

export class BlogController {
  // constructor() {}

  getAll = async (req, res) => {
    const blogs = await BlogModel.getAll()
    if (blogs) return res.status(200).json(blogs)
    else return res.status(400).json(blogs)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const blog = await BlogModel.getById({ id })
    if (blog) return res.status(200).json(blog)
    else return res.status(400).json(blog)
  }

  // new blog
  create = async (req, res) => {
    const result = validateBlog(req.body)
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const blog = await BlogModel.create({ input: result.data })
    if (blog) return res.status(201).json(blog)
    else return res.status(400).json(blog)
  }

  update = async (req, res) => {
    const result = validatePartialBlog(req.body)
    const { id } = req.params
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const blog = await BlogModel.update({ id, input: result.data })
    if (blog) return res.status(200).json(blog)
    else return res.status(400).json(blog)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const blog = await BlogModel.delete({ id })
    if (blog) return res.status(200).json(blog)
    else return res.status(400).json(blog)
  }
}
