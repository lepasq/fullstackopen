const User = require('../models/user')


const initialBlogs = [
	{
		'title': "Blog post",
		'author': "Leonardo Pasquarelli",
		'url': "http://google.com",
		'likes': 3
	},
	{
		'title': "Second post post",
		'author': "Tuomas Pierra",
		'url': "http://youtube.com",
		'likes': 5
	}
]



const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  usersInDb,
}
