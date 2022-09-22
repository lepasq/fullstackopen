const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
		.find({}).populate('user', 
			{ username: 1, name: 1 })
	response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
	const user = request.user;

  const blog = new Blog({
		...request.body,
		likes: request.body.likes,
		user: user._id,
	})

  const result = await blog.save()
	if(result) {
		user.blogs = user.blogs.concat(result._id)  
		await user.save()
		response.status(201).json(result)
	} else {
		response.status(400).end()
	}
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	const user = request.user;
	const blog = await Blog.findById(request.params.id).populate('user')

	if ( blog.user.username.toString() === user.username.toString() ) {
		await blog.remove()
		return response.status(204).end()
	} else {
		return response.status(401).end()
	}
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
	response.json(updatedBlog)
})

module.exports = blogRouter
