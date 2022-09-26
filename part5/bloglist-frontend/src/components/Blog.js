import Togglable from './Togglable'

import { useRef, useEffect } from 'react'

const Blog = ({blog, updateLike, removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

	useEffect(()=> {
		console.log(blog.likes, "likes changed")
	}, [blog.likes])


	const blogRef = useRef()

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}

			<Togglable buttonLabel='show details' ref={blogRef}>
				<p>
					likes: {blog.likes} <button onClick={() => updateLike(blog)}>like</button>
				</p>
				<p>
					{blog.url}
				</p>
				<p>
					{blog.user.username}
				</p>
		</Togglable>
			<button onClick={() => removeBlog(blog)}>remove</button>
		</div>  
	)
}

export default Blog
