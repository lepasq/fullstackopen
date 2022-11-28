import PropTypes from 'prop-types'
import Togglable from './Togglable'

import { useRef } from 'react'

const Blog = ({ blog, updateLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogRef = useRef()

  return (
    <div className="blog" style={blogStyle}>
      <p>{blog.title}</p>
      <p>{blog.author}</p>

      <Togglable buttonLabel='show details' ref={blogRef}>
        <p>
					likes: {blog.likes} <button onClick={() => updateLike(blog)}>like</button>
        </p>
        <p className="url">
          {blog.url}
        </p>
        <p className="username">
          {blog.user.username}
        </p>
      </Togglable>
      <button onClick={() => removeBlog(blog)}>remove</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
