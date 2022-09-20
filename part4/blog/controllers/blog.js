const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
	if(result) {
		response.status(201).json(result)
	} else {
		response.status(400).end()
	}
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
	response.json(updatedBlog)
})

module.exports = blogRouter
