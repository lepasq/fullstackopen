const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
	return blogs.reduce((prev, curr) => prev + curr.likes, 0)	
}

const favouriteBlog = (blogs) => {
	if(blogs.length === 0) {
		return {}
	}
	let maxBlog = blogs[0]
	blogs.forEach(blog => {
		if(maxBlog.likes < blog.likes) {
			maxBlog = blog
		}}
	)

	return {
		'title': maxBlog.title,
		'author': maxBlog.author,
		'likes': maxBlog.likes
	}
}


const mostBlogs = (blogs) => {
	if(blogs.length === 0) {
		return {}
	} 
	const authors = {}
	blogs.forEach(blog => {
		if(blog.author in authors) {
			authors[blog.author] += 1
		} else {
			authors[blog.author] = 1
		}
	})


	const maxAuthor = {
		'author': Object.keys(authors)[0],
		'blogs': Object.values(authors)[0]
	}

	if(authors.length === 1) {
		return maxAuthor;
	}

	Object.entries(authors).forEach((author) => {
		if(Object.values(maxAuthor)[0] < author[1]) {
			maxAuthor = {
				'author': author[0],
				'blogs': author[1]
			}
		}
	})
	return maxAuthor
}


const mostLikes = (blogs) => {
	if(blogs.length === 0) {
		return {}
	} 
	const authors = {}
	blogs.forEach(blog => {
		if(blog.author in authors) {
			authors[blog.author] += blog.likes
		} else {
			authors[blog.author] = blog.likes
		}
	})

	let maxAuthor = {
		'author': Object.keys(authors)[0],
		'likes': Object.values(authors)[0]
	}

	if(authors.length === 1) {
		return maxAuthor;
	}

	Object.entries(authors).forEach((author) => {
		if(maxAuthor.likes < author[1]) {
			maxAuthor = {
				'author': author[0],
				'likes': author[1]
			}
		}
	})

	return maxAuthor
}


module.exports = {
  dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}
