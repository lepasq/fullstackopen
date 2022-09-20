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

module.exports = blogRouter
