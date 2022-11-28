import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => (a.likes < b.likes) ? 1 : -1) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setIsSuccess(false)
      setTimeout(() => {
        setNotification(null)
        setIsSuccess(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }

  const addBlogForm = () => (
    <BlogForm
      setNotification={setNotification}
      setIsSuccess={setIsSuccess}
      setBlogs={setBlogs}
      blogs={blogs}
    />
  )

  const updateLike = (blog) => {
    const likes = blog.likes ? blog.likes + 1 : 0
    blogService.update(blog.id, { title: blog.title, author: blog.author, url: blog.url, likes: likes }).then(() => {
      blog.likes += 1
      setBlogs(blogs.filter(x => x.id !== blog.id).concat(blog).sort((a, b) => (b.likes - a.likes)))
    })
  }

  const removeBlog = (blog) => {
    const conf = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if(conf) {
      console.log(blog)
      blogService.remove(blog.id).then(() => {
        setBlogs(blogs.filter(x => x.id !== blog.id))
      })
    }
  }


  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}  />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isSuccess={isSuccess}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={(event) => handleLogout(event)}>logout</button>  </p>
          {addBlogForm()}
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLike={updateLike} removeBlog={removeBlog}/>
      )}
    </div>
  )
}

export default App
