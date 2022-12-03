import { useState, useEffect } from 'react'

import { Button } from 'react-bootstrap'

import {
  useParams,
} from 'react-router-dom'

const BlogPage = ({ blogs, likeBlog }) => {
  const [blog, setBlog] = useState(null)
  const { blogId } = useParams()

  useEffect(() => {
    console.log('runnign update...')
    if(blogs.length > 0) {
      setBlog(blogs.find(x => blogId === x.id))
    }
  }, [blog, blogs, blogId])


  if(blog === null) {
    return <></>
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <Button variant="success" onClick={() => likeBlog(blog.id)}>like</Button> </p>
		  <p>added by {blog.author}</p>
    </>
  )
}

export default BlogPage
