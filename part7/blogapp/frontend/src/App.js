import { useState, useEffect, useRef } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'

import Blog from './components/Blog'
import BlogPage from './components/BlogPage'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { Table, Button } from 'react-bootstrap'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)))
    userService.getAll().then((users) => setUsers(users))
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      setUser(userFromStorage)
    }
  }, [])

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user)
        userService.setUser(user)
        notify(`${user.name} logged in!`)
      })
      .catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const logout = () => {
    setUser(null)
    userService.clearUser()
    notify('good bye!')
  }

  const createBlog = async (blog) => {
    blogService
      .create(blog)
      .then((createdBlog) => {
        notify(
          `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
        )
        setBlogs(blogs.concat(createdBlog))
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        notify('creating a blog failed: ' + error.response.data.error, 'alert')
      })
  }

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id)
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    }

    blogService.update(liked.id, liked).then((updatedBlog) => {
      notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? updatedBlog : b))
        .sort(byLikes)
      setBlogs(updatedBlogs)
    })
  }

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} />
      </>
    )
  }

  const padding = {
    padding: 5
  }

  const main = () => {
    return (
      <div>
        <h2>blogs</h2>

        <Notification notification={notification} />

        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <NewBlogForm onCreate={createBlog} />
        </Togglable>

        <div id="blogs">
          <Table striped bordered hover>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td key={blog.id}>
                    <Blog
                      key={blog.id}
                      blog={blog}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>

        {user.name} logged in
        <Button variant="danger" onClick={logout}>logout</Button>

      </div>
      {main()}
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/users" element={<Users users={users}/> } />
        <Route path="/users/:userId" element={<User users={users}/>} />
        <Route path="/blogs/:blogId" element={<BlogPage likeBlog={likeBlog} blogs={blogs}/>} />
      </Routes>
    </div>
  )
}


const RouterApp = () => (
  <Router><App/></Router>
)

export default RouterApp
