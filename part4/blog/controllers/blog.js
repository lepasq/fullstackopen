const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
		.find({}).populate('user', {username: 1, name: 1})
	response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user = await User.findById(body.userId)
  const blog = new Blog(request.body.push({user: user._id}))
  const result = await blog.save()
	if(result) {
		user.blogs = user.blogs.concat(result._id)  
		await user.save()
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
