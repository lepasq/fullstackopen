import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ setIsSuccess, setNotification, setBlogs, blogs }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setIsSuccess(true)
        setNotification(`a new blog ${blogTitle} by ${blogAuthor} was added`)

        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setTimeout(() => {
          setNotification(null)
          setIsSuccess(false)
        }, 5000)
      }).catch(() => {
        setIsSuccess(false)
        setNotification('missing fields')
        setTimeout(() => {
          setNotification(null)
          setIsSuccess(false)
        }, 5000)
      })
  }


  return (
    <form onSubmit={addBlog}>
					title:
      <input
        type="text"
        value={blogTitle}
        name="Title"
        onChange={({ target }) => setBlogTitle(target.value)}
      />
      <br/>author:
      <input
        type="text"
        value={blogAuthor}
        name="Author"
        onChange={({ target }) => setBlogAuthor(target.value)}
      />
      <br/>url:
      <input
        type="text"
        value={blogUrl}
        name="Url"
        onChange={({ target }) => setBlogUrl(target.value)}
      />
      <br/>
      <button type="submit">create</button>
    </form>
  )
}


BlogForm.propTypes = {
  blogs: PropTypes.arrayOf(Object).isRequired,
  setIsSuccess: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default BlogForm
