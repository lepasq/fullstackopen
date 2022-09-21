const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()

	// for(let blog of helper.initialBlogs) {
	//   let blogObj = new Blog(blog)
	//   await blogObj.save()
	// }
})


test('blogs are returned as json', async () => {
	const response = await api.get('/api/blogs');
	expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000)


test('blogs contain unique id', async () => {
	const response = await api.get('/api/blogs');
	response.body.forEach(blog => {
		expect(blog.id).toBeDefined();
		expect(blog._id).toBeUndefined();
	})
}, 300000)



test('a valid blog can be added', async () => {
  const newBlog = {
		'title': "Another post",
		'author': "Leonardo Pasquarelli",
		'url': "http://reddit.com",
		'likes': 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const url = response.body.map(r => r.url)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(url).toContainEqual(
		'http://reddit.com'
	)
})


test('a blog without likes defaults to 0', async () => {
  const newBlog = {
		'title': "Hello there",
		'author': "Leonardo Pasquarelli",
		'url': "http://amazon.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const blog = response.body.find(x => x.title === 'Hello there')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(blog).toBeDefined()
	expect(blog.likes).toEqual(0)
})


test('blog without title or url is not added', async () => {
	const newBlogs = [{
		'author': "Leonardo Pasquarelli",
		'url': "http://facebook.com",
		'likes': 0
		},
		{
			'title': "Book of faces",
			'author': "Leonardo Pasquarelli",
			'likes': 0
		}]

	for (let newBlog of newBlogs) {
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	}
})


test('blog can be deleted by identifier', async () => {
	const resp = await api.get('/api/blogs');
	const blog = resp.body[0]

	await api
			.delete(`/api/blogs/${blog.id}`)
			.expect(204)

	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
	expect(response.body.find(x => x.title === blog.title)).toBeUndefined()
})


test('blog can be updated by identifier', async () => {
	const resp = await api.get('/api/blogs');
	const blog = resp.body[0]

	const response = await api .put(`/api/blogs/${blog.id}`)
			.send({ 'likes': blog.likes + 1 })
			.expect(200)

	expect(response.body.likes).toEqual(blog.likes + 1);
})



afterAll(() => {
  mongoose.connection.close()
})
