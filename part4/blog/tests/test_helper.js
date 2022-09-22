const User = require('../models/user')
const Blog = require('../models/blog')


const initialBlogs = [
	{
		'title': "Blog post",
		'author': "Leonardo Pasquarelli",
		'url': "http://google.com",
		'likes': 3,
		'user': {
			'username': 'root',
			'id': '632b025677e68f76742ea296'
		}
	},
	{
		'title': "Second post post",
		'author': "Leonardo Pasquarelli",
		'url': "http://youtube.com",
		'likes': 5,
		'user': {
			'username': 'root',
			'id': '632b025677e68f76742ea296'
		}
	}
]


const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const testUser = () => {
	return { username: 'testroot', password: "hashed" }
}

module.exports = {
  initialBlogs,
  usersInDb,
	blogsInDb,
	testUser
}
